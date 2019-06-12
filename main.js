// articles:
// https://github.com/GoogleChrome/puppeteer
// https://www.scrapehero.com/how-to-take-screenshots-of-a-web-page-using-puppeteer/

const argv = require('minimist')(process.argv.slice(2));
const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices[ 'iPhone 8' ];
const pixel = devices[ 'Pixel 2' ];

if (!argv.url) {
  console.error('url argument is required!');
  console.error('Example: npm start -- --url="www.example.com"');
  return false;
}

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(argv.url.toString());

  await page.setViewport({ width: 1920, height: 1080 });
  await page.screenshot({
    path: 'screens/desktop-lg.jpg',
    type: 'jpeg',
    fullPage: true,
  });

  await page.setViewport({ width: 1366, height: 768 });
  await page.screenshot({
    path: 'screens/desktop-md.jpg',
    type: 'jpeg',
    fullPage: true,
  });

  await page.emulate(pixel);
  await page.screenshot({
    path: 'screens/android.jpg',
    type: 'jpeg',
    fullPage: true,
  });

  await page.emulate(iPhone);
  await page.screenshot({
    path: 'screens/iOS.jpg',
    type: 'jpeg',
    fullPage: true,
  });

  await browser.close();
})();