// Copyright 2021-2022 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

export function isOlderThan(timestamp: number, delta: number): boolean {
  return timestamp <= Date.now() - delta;
}
