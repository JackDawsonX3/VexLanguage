#!/usr/bin/env node
const path = require('path');
const { spawn } = require('child_process');
const os = require('os');
const bin = path.join(__dirname, '..', 'dist', os.platform() === 'win32' ? 'vex-binary.exe' : 'vex-binary');
const child = spawn(bin, process.argv.slice(2), { stdio: 'inherit' });
child.on('exit', code => process.exit(code ?? 0));
child.on('error', err => { console.error('[vex] failed to launch:', err.message); process.exit(1); });
