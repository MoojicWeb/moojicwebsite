const path = require('node:path');

// Cache Chromium binaries inside the app/ folder (on D:\) so we don't
// fill the user's C:\ drive. Puppeteer reads this file at install time
// and at runtime, so the same path is used for download + launch.
module.exports = {
  cacheDirectory: path.join(__dirname, '.puppeteer-cache'),
};
