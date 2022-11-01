// Copyright 2021 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import { noop } from 'lodash';
import type { LogFunction } from '../types/Logging';
import { LogLevel } from '../types/Logging';

type LogAtLevelFnType = (
  level: LogLevel,
  ...args: ReadonlyArray<unknown>
) => void;

let logAtLevel: LogAtLevelFnType = noop;

export const fatal: LogFunction = (...args) =>
  logAtLevel(LogLevel.Fatal, ...args);
export const error: LogFunction = (...args) =>
  logAtLevel(LogLevel.Error, ...args);
export const warn: LogFunction = (...args) =>
  logAtLevel(LogLevel.Warn, ...args);
export const info: LogFunction = (...args) =>
  logAtLevel(LogLevel.Info, ...args);
export const debug: LogFunction = (...args) =>
  logAtLevel(LogLevel.Debug, ...args);
export const trace: LogFunction = (...args) =>
  logAtLevel(LogLevel.Trace, ...args);
