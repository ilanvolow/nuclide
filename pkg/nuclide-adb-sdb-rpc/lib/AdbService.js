/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {NuclideUri} from 'nuclide-commons/nuclideUri';
import type {LegacyProcessMessage} from 'nuclide-commons/process';
import type {
  DeviceDescription,
  AndroidJavaProcess,
  Process,
  DBPathsInfo,
} from './types';

import {getStore} from './AdbSdbPathStore';
import {ConnectableObservable} from 'rxjs';
import {Adb} from './Adb';
import {AdbTop} from './AdbTop';

const adb = new Adb();

export async function registerAdbPath(
  id: string,
  path: NuclideUri,
  priority: number = -1,
): Promise<void> {
  getStore('adb').registerPath(id, {path, priority});
}

export async function getCurrentPathsInfo(): Promise<DBPathsInfo> {
  return getStore('adb').getCurrentPathsInfo();
}

export async function registerCustomPath(path: ?string): Promise<void> {
  getStore('adb').registerCustomPath(path);
}

export function getDeviceInfo(
  device: string,
): ConnectableObservable<Map<string, string>> {
  return adb.getDeviceInfo(device).publish();
}

export function getProcesses(
  device: string,
): ConnectableObservable<Array<Process>> {
  return new AdbTop(adb, device).fetch().publish();
}

export async function stopPackage(
  device: string,
  packageName: string,
): Promise<void> {
  return adb.stopPackage(device, packageName);
}

export function getDeviceList(): ConnectableObservable<
  Array<DeviceDescription>,
> {
  return adb.getDeviceList().publish();
}

export async function getPidFromPackageName(
  device: string,
  packageName: string,
): Promise<number> {
  return adb.getPidFromPackageName(device, packageName);
}

export function installPackage(
  device: string,
  packagePath: NuclideUri,
): ConnectableObservable<LegacyProcessMessage> {
  // TODO(T17463635)
  return adb.installPackage(device, packagePath).publish();
}

export function uninstallPackage(
  device: string,
  packageName: string,
): ConnectableObservable<LegacyProcessMessage> {
  // TODO(T17463635)
  return adb.uninstallPackage(device, packageName).publish();
}

export async function forwardJdwpPortToPid(
  device: string,
  tcpPort: number,
  pid: number,
): Promise<string> {
  return adb.forwardJdwpPortToPid(device, tcpPort, pid);
}

export async function launchActivity(
  device: string,
  packageName: string,
  activity: string,
  debug: boolean,
  action: ?string,
): Promise<string> {
  return adb.launchActivity(device, packageName, activity, debug, action);
}

export async function activityExists(
  device: string,
  packageName: string,
  activity: string,
): Promise<boolean> {
  return adb.activityExists(device, packageName, activity);
}

export function getJavaProcesses(
  device: string,
): ConnectableObservable<Array<AndroidJavaProcess>> {
  return adb.getJavaProcesses(device).publish();
}

export async function dumpsysPackage(
  device: string,
  identifier: string,
): Promise<?string> {
  return adb.dumpsysPackage(device, identifier);
}

export async function touchFile(device: string, path: string): Promise<string> {
  return adb.touchFile(device, path);
}

export async function removeFile(
  device: string,
  path: string,
): Promise<string> {
  return adb.removeFile(device, path);
}

export async function getInstalledPackages(
  device: string,
): Promise<Array<string>> {
  return adb.getInstalledPackages(device);
}
