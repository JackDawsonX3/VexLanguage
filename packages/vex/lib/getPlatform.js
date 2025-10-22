const os = require('os');
function getPlatform() {
  const type = os.platform();
  const arch = os.arch();
  let osPart;
  if (type === 'win32') osPart = 'win';
  else if (type === 'darwin') osPart = 'macos';
  else if (type === 'linux') osPart = 'linux';
  else throw new Error(`Unsupported OS: ${type}`);
  let archPart;
  if (arch === 'x64') archPart = 'x64';
  else if (arch === 'arm64') archPart = 'arm64';
  else throw new Error(`Unsupported arch: ${arch}`);
  return { osPart, archPart };
}
module.exports = { getPlatform };
