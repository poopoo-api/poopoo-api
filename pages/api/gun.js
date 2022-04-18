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
  if(isValidUrl(url) !== true || url.includes("<" || ">" || "<script>" || "</script>") || encodeURIComponent(url).includes("%3C" || "%3E" || "%20")) return res.status(200).setHeader('Content-Type', 'application/json').send(JSON.stringify({error: "provide valid url", info:"Add a gun to an image", example: "/gun?url=https://poopoo-api.vercel.app/images/example.png"}, null, 4));
  
//new Jimp(984, 984, '#FFFFFF', (err, img) => {
Jimp.read(url, (err, fir_img) => {
  if (err) return res.setHeader('Content-Type',  'application/json').send(JSON.stringify({error: "Make sure the url is an image"}, null, 4));
  Jimp.read('https://poopoo-api.vercel.app/images/gun.png', (err, sec_img) => {
    fir_img.resize(984, 984)
    sec_img.resize(sec_img.bitmap.width/1.5, sec_img.bitmap.height/1.5)
    //img.blit(fir_img, 0, 0)
    fir_img.blit(sec_img, 550, 500);
    fir_img.getBuffer(Jimp.MIME_PNG, function(err, buffer){
             res.setHeader("Content-Type", 'image/png');
             res.send(buffer);
         });
  })
})
//})

}