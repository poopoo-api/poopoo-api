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
  let text = req.query.text
  if((text==null) || (text==undefined)) return res.status(200).setHeader('Content-Type', 'application/json').send(JSON.stringify({error: "provide some text", example: "/pikachu?text=macncheese"}, null, 4));
  
  Jimp.read('https://poopoo-api.vercel.app/images/api/pikachu.png', (err, pika) => {
    Jimp.loadFont('https://poopoo-api.vercel.app/fonts/font.fnt').then(font => {
      pika.print(font, 20, 10, {
                                text: text,
                            }, pika.bitmap.width, pika.bitmap.height);
  pika.getBuffer(Jimp.MIME_PNG, function(err, buffer){
             res.setHeader("Content-Type", 'image/png');
             res.send(buffer);
         });
    })
  })
}