const versions = ['nvi', 'acf', 'apee', 'bbe', 'kjv', 'ra', 'rvr'];

export function verifyVersion(versionName: string): boolean {
    return versions.includes(versionName.toLowerCase());
}
