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
  if(isValidUrl(url) !== true || url.includes("<" || ">" || "<script>" || "</script>") || encodeURIComponent(url).includes("%3C" || "%3E" || "%20")) return res.status(200).setHeader('Content-Type', 'application/json').send(JSON.stringify({error: "provide valid url", info:'Wow look an ad', example: "/ad?url=https://poopoo-api.vercel.app/images/example.png"}, null, 4));
  
//new Jimp(984, 984, '#FFFFFF', (err, img) => {
Jimp.read(url, (err, ad) => {
  if (err) return res.setHeader('Content-Type',  'application/json').send(JSON.stringify({error: "Make sure the url is an image"}, null, 4));
  Jimp.read('https://poopoo-api.vercel.app/images/api/ad.png', (err, img) => {
      if (err) return res.setHeader('Content-Type',  'application/json').send(JSON.stringify({error: "Make sure the url is an image"}, null, 4));
      ad.resize(230, 230)
      img.blit(ava, 150, 75)
    img.getBuffer(Jimp.MIME_PNG, function(err, buffer){
             res.setHeader("Content-Type", 'image/png');
             res.send(buffer);
         });
})
})

}