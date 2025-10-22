const path = require('path');
const fs = require('fs');
const { getPlatform } = require('./lib/getPlatform');
const { fetch, ensureDir } = require('./lib/download');
const { verify } = require('./lib/checksum');

const VERSION = process.env.VEX_VERSION || '0.1.0';
const REPO = process.env.VEX_REPO || 'JackDawsonX3/VexLanguage';
const BASE  = process.env.VEX_BASE  || `https://github.com/${REPO}/releases/download/v${VERSION}`;

async function main() {
  const { osPart, archPart } = getPlatform();
  const fileName = `vex-${osPart}-${archPart}-${VERSION}` + (osPart === 'win' ? '.exe' : '');
  const checksumName = `${fileName}.sha256`;

  const distDir = path.join(__dirname, 'dist');
  ensureDir(distDir);

  const binPath = path.join(distDir, fileName);
  const sumPath = path.join(distDir, checksumName);

  const url = `${BASE}/${fileName}`;
  const sumUrl = `${BASE}/${checksumName}`;

  console.log(`[vex] downloading: ${url}`);
  await fetch(url, binPath);
  console.log(`[vex] downloading: ${sumUrl}`);
  await fetch(sumUrl, sumPath);

  const expected = fs.readFileSync(sumPath, 'utf8').trim().split(/[\s]+/)[0];
  verify(binPath, expected);

  if (osPart !== 'win') fs.chmodSync(binPath, 0o755);

  const stable = path.join(distDir, osPart === 'win' ? 'vex-binary.exe' : 'vex-binary');
  try { fs.unlinkSync(stable); } catch {}
  fs.copyFileSync(binPath, stable);

  console.log('[vex] installed native binary ✓');
}

main().catch(err => {
  console.error('[vex] postinstall failed:', err.message);
  process.exit(1);
});
