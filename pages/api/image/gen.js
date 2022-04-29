export default async (req, res) => {
  const info = new Object();
  info['/image'] = ["Screenshot pages","/image?url=https://google.com"]
  info['/image/gen'] = ["This page","Gives info about the other pages here","No actual use except to give info"]
  info['/image/ad'] = ["Ooooooo an ad","/ad?url=https://poopoo-api.vercel.app/images/example.png"]
  info['/image/beautiful'] = ["Now this... this is beautiful","/beautiful?url=https://poopoo-api.vercel.app/images/example.png"]
  info['/image/boboross'] = ["Now this is art","/bobross?url=https://poopoo-api.vercel.app/images/example.png"]
  info['/image/qr'] = ["Generate a qrcode from an input","/qr?input=Hello"]
  
  res.setHeader("Content-Type", "application/json")
  res.send(JSON.stringify({
    info: info
  }, null, 4))
}