const Canvas = require("@napi-rs/canvas")

const wrapText = (res, txt, c, canvas, x, y, font, fontSize) => {
	if(txt.length > 1000) {
		return res.status(200).setHeader("Content-Type", "application/json").send(JSON.stringify({
			error: "Text cannot be of length 60 or above.",
			info: "nah, yah", 
			example: "/drake?upperText=hello&lowerText=hallo"
		}))
	} else {
		c.font = `${fontSize}px ${font}`
	}
	txt = txt.replace(/%20/g, " ")
	const lineheight = 140;
	const lines = txt.split('\n');

	for (let i = 0; i<lines.length; i++) {
		c.fillText(lines[i], x, y + (i*lineheight) );
	}
}

const getText = (str) => {
	const parts = str.match(/.{1,15}/g);
	
	let newValue = parts.join("\n");
	return newValue
}

export default async (req, res) => {
	if(!req.query.text) res.status(200).setHeader('Content-Type', 'application/json').send(JSON.stringify({error: "Pleave provide valid text", info: "Big Brain Guy", example: "/bigBrainGuy?text=poopoo api"}))

	const text = req.query.text;
	const canvas = Canvas.createCanvas(1920, 1920)
	const context = canvas.getContext("2d")
	const bgImg = await Canvas.loadImage("https://api2.frostzzone.repl.co/images/api/bigBrainGuy.png")

	context.drawImage(bgImg, 0, 0)

	// Add text
	context.fillStyle = "black"
	wrapText(res, getText(text), context, canvas, 10, 150, "sans-serif", 150)


	const {data} = JSON.parse(JSON.stringify(await canvas.encode("png")))
	const buffer = Buffer.from(data, "base64")
	res.setHeader("Content-Type", "image/png")
	res.send(buffer)
}