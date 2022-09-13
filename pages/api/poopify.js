var Jimp = require('jimp');
function isValidUrl(string) {
  try {
    new URL(string);
  } catch (_) {
    return false;
  }

  return true;
}

export default async (req, res) => {
  let url = req.query.url;
  if (isValidUrl(url) !== true || url.includes("<" || ">" || "<script>" || "</script>") || encodeURIComponent(url).includes("%3C" || "%3E" || "%20")) {
    return res.status(200).setHeader('Content-Type', 'application/json').send(JSON.stringify({
      error: "provide valid url",
      info: "Add a gun to an image",
      example: "/gun?url=https://poopoo-api.vercel.app/images/example.png"
    }, null, 4));
  }


  Jimp.read('https://poopoo-api.vercel.app/images/api/poopBase.png', (err, first) => {
    Jimp.read(url, (err, second) => {
      if (err) return res.setHeader('Content-Type', 'application/json').send(JSON.stringify({ error: "Make sure the url is an image" }, null, 4));
      first.resize(984, 984)
      second.resize(784, 784)
      first.blit(second, 100, 100);
      first.resize(256, 256)
      first.getBuffer(Jimp.MIME_PNG, function (err, buffer) {
        res.setHeader("Content-Type", 'image/png');
        res.send(buffer);
      });
    })
  })

}