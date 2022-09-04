const Canvas = require("@napi-rs/canvas")

const applyText = (canvas, text, fontSize, font = "open-sans") => {
  const context = canvas.getContext("2d");

  fontSize += 10;

  do {
    context.font = `${(fontSize -= 10)}px ${font}`;
  } while (context.measureText(text).width > canvas.width - 300);

  return context.font;
};


export default async (req, res) => {

  if(!req.query.upperText) res.status(200).setHeader('Content-Type', 'application/json').send(JSON.stringify({error: "Pleave provide upper and lower texts.", info: "nah, yah", example: "/drake?upperText=hello&lowerText=hallo"}))
  if(!req.query.lowerText) res.status(200).setHeader('Content-Type', 'application/json').send(JSON.stringify({error: "Pleave provide upper and lower texts.", info: "nah, yah", example: "/drake?upperText=hello&lowerText=hallo"}))
  
  const upperText = req.query.upperText
  const lowerText = req.query.lowerText
  
  const canvas = Canvas.createCanvas(1920, 1080)
  const context = canvas.getContext("2d")
  const backgroundImg = await Canvas.loadImage("https://api2.frostzzone.repl.co/images/api/drake.png");
  context.drawImage(backgroundImg, 0, 0)
  
  //upper text
  context.font = "100px open-sans"
  context.fillStyle = "black"
  context.fillText(upperText, 875, 150)

  //lower text
  context.font = "100px open-sans"
  context.fillStyle = "black"
  context.fillText(lowerText, 875, 655)
  const {data} = JSON.parse(JSON.stringify(await canvas.encode("png")))
  //console.log(ahem)
  
  const buffer = Buffer.from(data, "base64")
  res.setHeader("Content-Type", "image/png")
  res.send(buffer)
  
}

