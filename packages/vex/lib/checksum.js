const fs = require('fs');
const crypto = require('crypto');
function sha256(filePath) {
  const hash = crypto.createHash('sha256');
  const data = fs.readFileSync(filePath);
  hash.update(data);
  return hash.digest('hex');
}
function verify(filePath, expected) {
  const got = sha256(filePath);
  if (got.toLowerCase() !== expected.toLowerCase()) {
    throw new Error(`Checksum mismatch. Expected ${expected}, got ${got}`);
  }
}
module.exports = { sha256, verify };
