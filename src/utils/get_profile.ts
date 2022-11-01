import fetch, { Response } from 'node-fetch';
import { HTTPBase, get_shared_headers, handle_response } from './http';

const PATH_GET_PROFILE: string = 'v1/profile';

export interface GetProfileOptions extends HTTPBase {
  aci: string;
}

export interface Profile {
  about?: string;
  aboutEmoji?: string;
  avatar?: string;
  badges?: unknown;
  capabilities?: {
    announcementGroup: boolean;
    changeNumber: boolean;
    giftBadges: boolean;
    'gv1-migration': boolean;
    senderKey: boolean;
    stories: boolean;
  };
  credential?: string;
  identityKey?: string;
  name?: string;
  paymentAddress?: string;
  pniCredential?: string;
  unidentifiedAccess?: string;
  unrestrictedUnidentifiedAccess?: string;
  uuid?: string;
}

export async function get_profile({
  aci,
  http_url,
  password,
  username,
  version,
}: GetProfileOptions): Promise<Profile> {
  const response: Response = await fetch(
    `${http_url}/${PATH_GET_PROFILE}/${aci}`,
    {
      headers: get_shared_headers(username, password, version),
    }
  );

  return handle_response<Profile>(response, PATH_GET_PROFILE);
}
