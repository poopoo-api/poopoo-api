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
  let url = req.query.url
  let strength = req.query.strength
  if(isValidUrl(url) !== true || url.includes("<" || ">" || "<script>" || "</script>") || encodeURIComponent(url).includes("%3C" || "%3E" || "%20")) return res.status(200).setHeader('Content-Type', 'application/json').send(JSON.stringify({error: "provide valid url", example: "/pixel?strength=10&url=https://poopoo-api.vercel.app/images/example.png"}, null, 4));

  if ((strength == null) || (strength == undefined)) {strength = 10} else {
  if (!(typeof((Number(strength))) == "number")) return res.status(200).setHeader('Content-Type', 'application/json').send(JSON.stringify({error: "provide valid strength", example: "/pixel?strength=10&url=https://poopoo-api.vercel.app/images/example.png"}, null, 4));
  }
    Jimp.read(url, (err, image) => {
  if (err) return res.setHeader('Content-Type',  'application/json').send(JSON.stringify({error: "Make sure the url is an image"}, null, 4));
  image.pixelate(Number(strength))
    image.getBuffer(Jimp.MIME_PNG, function(err, buffer){
             res.setHeader("Content-Type", 'image/png');
             res.send(buffer);
         });
});
}