// Copyright 2021 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

// << START ADDITIONS
import { Timers } from './context/Timers';

const timers: Timers = new Timers();
// END ADDITIONS >>

export type { Timeout } from './context/Timers';

export function setTimeout(
  ...args: Parameters<typeof timers.setTimeout>
): ReturnType<typeof timers.setTimeout> {
  return timers.setTimeout(...args);
}

export function clearTimeout(
  ...args: Parameters<typeof timers.clearTimeout>
): ReturnType<typeof timers.clearTimeout> {
  return timers.clearTimeout(...args);
}
