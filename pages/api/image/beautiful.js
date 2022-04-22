var Jimp = require('jimp');
var url
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
  if(isValidUrl(url) !== true || url.includes("<" || ">" || "<script>" || "</script>") || encodeURIComponent(url).includes("%3C" || "%3E" || "%20")) return res.status(200).setHeader('Content-Type', 'application/json').send(JSON.stringify({error: "provide valid url", info:"Now this... this is beautiful", example: "/beautiful?url=https://poopoo-api.vercel.app/images/example.png"}, null, 4));
  
//new Jimp(984, 984, '#FFFFFF', (err, img) => {
Jimp.read(url, (err, art) => {
  if (err) return res.setHeader('Content-Type',  'application/json').send(JSON.stringify({error: "Make sure the url is an image"}, null, 4));
  Jimp.read('https://poopoo-api.vercel.app/images/api/beautiful.png', (err, img) => {
      img.resize(376, 400);
      art.resize(84, 95);
      img.composite(art, 258, 28);
      img.composite(art, 258, 229);
    img.getBuffer(Jimp.MIME_PNG, function(err, buffer){
             res.setHeader("Content-Type", 'image/png');
             res.send(buffer);
         });
})
})

}