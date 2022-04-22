const qr = require('qrcode')
var regex = /^data:.+\/(.+);base64,(.*)$/;

export default async (req, res) => {
  let input = req.query.input;
  try {
  qr.toDataURL(input, function (err, code) {
    if(err){
       res.setHeader("Content-Type", 'application/json');
      res.send(JSON.stringify({error: "An error occured", err:String(err)}, null, 4))
      return}
    var matches = code.match(regex);
var ext = matches[1];
var data = matches[2];
var buffer = Buffer.from(data, 'base64');
    res.setHeader("Content-Type", 'image/png');
    res.send(buffer)
})
  } catch (err) {
    res.setHeader("Content-Type", 'application/json');
      res.send(JSON.stringify({err: "An error occured", info:"Generate a qrcode from an input", example:"/qr?input=Hello", ideaBy: "Number1#4325"}, null, 4))
  }
}