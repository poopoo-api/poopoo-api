const Canvas = require("@napi-rs/canvas")

const wrapText = (res, txt, c, canvas, x, y, font, fontSize) => {
	if(txt.length > 49) {
		return res.status(200).setHeader("Content-Type", "application/json").send(JSON.stringify({
			error: "Text cannot be of length 45 or above.",
			info: "nah, yah", 
			example: "/drake?upperText=hello&lowerText=hallo"
		}))
	} else {
		c.font = `${fontSize}px ${font}`
	}
	
	const lineheight = 80;
	const lines = txt.split('\n');

	for (let i = 0; i<lines.length; i++) {
		c.fillText(lines[i], x, y + (i*lineheight) );
	}
}

const getText = (str) => {
	var parts = str.match(/.{1,9}/g);
	var newValue = parts.join("\n");
	return newValue
}

export default async (req, res) => {

  if(!req.query.upperText) res.status(200).setHeader('Content-Type', 'application/json').send(JSON.stringify({error: "Pleave provide upper and lower texts.", info: "nah, yah", example: "/drake?upperText=hello&lowerText=hallo"}))
  if(!req.query.lowerText) res.status(200).setHeader('Content-Type', 'application/json').send(JSON.stringify({error: "Pleave provide upper and lower texts.", info: "nah, yah", example: "/drake?upperText=hello&lowerText=hallo"}))
  
  const upperText = req.query.upperText
  const lowerText = req.query.lowerText
  
  const canvas = Canvas.createCanvas(1920, 1080)
  const context = canvas.getContext("2d")
  const backgroundImg = await Canvas.loadImage("https://poopoo-api.vercel.app/images/api/drake.png");
  context.drawImage(backgroundImg, 0, 0)
  
  //upper text
  context.fillStyle = "black"
  wrapText(res, getText(upperText), context, canvas, 875, 150, "open-sans", 100)

  //lower text
  context.fillStyle = "black"
  wrapText(res, getText(lowerText), context, canvas, 875, 655, "open-sans", 100)
	
  const {data} = JSON.parse(JSON.stringify(await canvas.encode("png")))
  const buffer = Buffer.from(data, "base64")
  res.setHeader("Content-Type", "image/png")
  res.send(buffer)
}

