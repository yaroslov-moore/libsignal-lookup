import * as log from './../libsignal/logging/log';
import { CDSI } from './../libsignal/textsecure/cds/CDSI';
import {
  CDSResponseEntryType,
  CDSResponseType,
} from './../libsignal/textsecure/cds/Types';
import { Credentials } from './../types/credentials';
import { get_cds_credentials } from './../utils/get_cds_credentials';
import { Profile, get_profile } from './../utils/get_profile';
import { sleep } from './../utils/sleep';

const SECOND: number = 1000;

export interface FindByNumbersOptions extends Credentials {
  cdsi_url?: string;
  cdsi_mrenclave: string;
  certificate_authority: string;
  http_backoff?: number;
  http_url?: string;
  phone_numbers: string[];
  version?: string;
}

export interface NumberToResult {
  [phone_number: string]: Error | Profile;
}

export async function find_by_numbers({
  cdsi_url = 'https://cdsi.signal.org',
  cdsi_mrenclave,
  certificate_authority,
  http_backoff = SECOND,
  http_url = 'https://chat.signal.org',
  password,
  phone_numbers,
  version = '5.57.0-beta.1',
  username,
}: FindByNumbersOptions): Promise<NumberToResult> {
  const cds: CDSI = new CDSI({
    getAuth: get_cds_credentials({
      http_url,
      password,
      version,
      username,
    }),
    version,
    certificateAuthority: certificate_authority,
    logger: log,
    mrenclave: cdsi_mrenclave,
    url: cdsi_url,
  });

  const number_to_result: NumberToResult = {},
    response: CDSResponseType = await cds.request({
      e164s: phone_numbers,
      acis: [],
      accessKeys: [],
      returnAcisWithoutUaks: true,
    });

  // not concurrent to prevent ratelimit
  for (let index: number = 0; index < phone_numbers.length; index++) {
    const phone_number: string = phone_numbers[index],
      entry: CDSResponseEntryType | undefined = response.get(phone_number);

    if (entry && entry.aci)
      try {
        number_to_result[phone_number] = await get_profile({
          http_url,
          password,
          username,
          version,
          aci: entry.aci,
        });
      } catch (error: any) {
        number_to_result[phone_number] = error;
      } finally {
        if (index !== phone_numbers.length - 1) await sleep(http_backoff);
      }
  }

  return number_to_result;
}
