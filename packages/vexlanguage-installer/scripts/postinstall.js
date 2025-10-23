// Detect OS/arch and generate native launchers to call the packaged Vex binary.
// Node is used ONLY here. At runtime, user runs the native binary directly via the launcher.

const fs = require('fs');
const path = require('path');

const root = __dirname + '/..';

function pickTarget() {
  const pOS = process.platform;      // 'win32' | 'darwin' | 'linux'
  const pArch = process.arch;        // 'x64' | 'arm64' | etc.
  let osDir = null;
  if (pOS === 'win32') osDir = 'win32';
  else if (pOS === 'darwin') osDir = 'darwin';
  else if (pOS === 'linux') osDir = 'linux';
  else throw new Error('Unsupported OS: ' + pOS);

  if (pArch !== 'x64' && pArch !== 'arm64') {
    throw new Error('Unsupported CPU: ' + pArch);
  }
  return { osDir, arch: pArch };
}

function ensureExec(p) {
  try {
    fs.chmodSync(p, 0o755);
  } catch (e) {}
}

function main() {
  const { osDir, arch } = pickTarget();
  const vendor = path.join(root, 'vendor', `${osDir}-${arch}`);
  const exe = process.platform === 'win32' ? 'vex.exe' : 'vex';
  const binPath = path.join(vendor, exe);
  if (!fs.existsSync(binPath)) {
    console.warn('[vex] WARNING: packaged binary not found for', osDir, arch);
    console.warn('[vex] Using placeholder. Please replace with real Vex binary for production.');
  }

  // Create launchers in bin/
  const binDir = path.join(root, 'bin');
  if (!fs.existsSync(binDir)) fs.mkdirSync(binDir, { recursive: true });

  if (process.platform === 'win32') {
    // Windows .cmd launcher
    const cmd = `@echo off\r\n"%~dp0\\..\\vendor\\${osDir}-${arch}\\vex.exe" %*\r\n`;
    fs.writeFileSync(path.join(binDir, 'vex.cmd'), cmd);
    // Also create a bash-style file for environments like Git Bash
    const sh = `#!/usr/bin/env sh\n"$(dirname "$0")/../vendor/${osDir}-${arch}/vex.exe" "$@"\n`;
    fs.writeFileSync(path.join(binDir, 'vex'), sh);
    ensureExec(path.join(binDir, 'vex'));
  } else {
    // Unix launcher
    const sh = `#!/usr/bin/env sh\n"$(dirname "$0")/../vendor/${osDir}-${arch}/vex" "$@"\n`;
    fs.writeFileSync(path.join(binDir, 'vex'), sh);
    ensureExec(path.join(binDir, 'vex'));
  }

  console.log(`[vex] Installed launcher for ${osDir}-${arch}`);
  console.log(`[vex] Note: Node is ONLY used during installation. Runtime calls native Vex binary.`);
}

main();
