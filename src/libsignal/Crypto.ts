// Copyright 2020-2022 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import * as Bytes from './Bytes';
import * as log from './logging/log';
import { HashType, CipherType } from './types/Crypto';
import { UUID, UUID_BYTE_SIZE } from './types/UUID';
import type { UUIDStringType } from './types/UUID';

export { uuidToBytes } from './util/uuidToBytes';

export { HashType, CipherType };

// bytes
export const PaddedLengths = {
  Name: [53, 257],
  About: [128, 254, 512],
  AboutEmoji: [32],
  PaymentAddress: [554],
};

export type EncryptedAttachment = {
  ciphertext: Uint8Array;
  digest: Uint8Array;
};

export function getBytes(
  data: Uint8Array,
  start: number,
  n: number
): Uint8Array {
  return data.subarray(start, start + n);
}

export function bytesToUuid(bytes: Uint8Array): undefined | UUIDStringType {
  if (bytes.byteLength !== UUID_BYTE_SIZE) {
    log.warn(
      'bytesToUuid: received an Uint8Array of invalid length. ' +
        'Returning undefined'
    );
    return undefined;
  }

  const uuids = splitUuids(bytes);
  if (uuids.length === 1) {
    return uuids[0] || undefined;
  }
  return undefined;
}

export function splitUuids(buffer: Uint8Array): Array<UUIDStringType | null> {
  const uuids = new Array<UUIDStringType | null>();
  for (let i = 0; i < buffer.byteLength; i += UUID_BYTE_SIZE) {
    const bytes = getBytes(buffer, i, UUID_BYTE_SIZE);
    const hex = Bytes.toHex(bytes);
    const chunks = [
      hex.substring(0, 8),
      hex.substring(8, 12),
      hex.substring(12, 16),
      hex.substring(16, 20),
      hex.substring(20),
    ];
    const uuid = chunks.join('-');
    if (uuid !== '00000000-0000-0000-0000-000000000000') {
      uuids.push(UUID.cast(uuid));
    } else {
      uuids.push(null);
    }
  }
  return uuids;
}
