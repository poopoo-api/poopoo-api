import chromium from 'chrome-aws-lambda';

function isValidUrl(string) {
    try {
      new URL(string);
    } catch (_) {
      return false;  
    }

    return true;
  }

export default async function handler(req, res) {
  let url = req.query.url
  if(isValidUrl(url) !== true || url.includes("<" || ">" || "<script>" || "</script>") || encodeURIComponent(url).includes("%3C" || "%3E" || "%20")) return res.status(200).setHeader('Content-Type', 'application/json').send(JSON.stringify({error: "provide valid url", example: "/image?url=https://google.com"}, null, 4));
  const browser = await chromium.puppeteer.launch({
    executablePath: await chromium.executablePath,
    args: chromium.args,
    headless: chromium.headless,
    defaultViewport: null
  });

  const page = await browser.newPage();
  await page.goto(url, {waitUntil: [
    'domcontentloaded', 'load'
  ]});
  const image = await page.screenshot({
    type: 'png'
  });

  await browser.close();

  var img = await Buffer.from(image, 'base64');

  res.status(200)
    res.setHeader('Content-Type', 'image/png')
res.send(img);
}