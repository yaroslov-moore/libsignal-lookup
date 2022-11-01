import { HeadersInit, Response } from 'node-fetch';
import { to_base_64 } from './encoding';
import { for_response_not_ok } from './messages';
import { Credentials } from './../types/credentials';

export interface HTTPBase extends Credentials {
  http_url: string;
  version: string;
}

export function get_shared_headers(
  username: string,
  password: string,
  version: string
): HeadersInit {
  return {
    Authorization: `Basic ${to_base_64(`${username}:${password}`)}`,
    'User-Agent': `Signal-Desktop/${version}`,
    'X-Signal-Agent': 'OWD',
  };
}

export async function handle_response<D>(
  response: Response,
  path: string
): Promise<D> {
  if (!response.ok)
    throw new Error(
      for_response_not_ok(path, response.status, await response.text())
    );

  return response.json();
}
