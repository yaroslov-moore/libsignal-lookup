import fetch, { Response } from 'node-fetch';
import { HTTPBase, get_shared_headers, handle_response } from './http';
import { CDSAuthType } from './../libsignal/textsecure/cds/Types';

const PATH_GET_CDS_CREDENTIALS: string = 'v2/directory/auth';

export type GetCDSOptions = HTTPBase;

export function get_cds_credentials({
  http_url,
  password,
  version,
  username,
}: GetCDSOptions): () => Promise<CDSAuthType> {
  return async (): Promise<CDSAuthType> => {
    const response: Response = await fetch(
      `${http_url}/${PATH_GET_CDS_CREDENTIALS}`,
      {
        headers: get_shared_headers(username, password, version),
      }
    );

    return handle_response<CDSAuthType>(response, PATH_GET_CDS_CREDENTIALS);
  };
}
