var Jimp = require('jimp');

const good = Jimp.read('https://poopoo-api.vercel.app/images/api/goodMatch.png') // pre define these so that they dont take upspace on the blit
const bad = Jimp.read('https://poopoo-api.vercel.app/images/api/badMatch.png') // and also should hopfully speed it up so it doesnt time out so much

function isValidUrl(string) {
    try {
        new URL(string);
    } catch (_) {
        return false;  
    }

    return true;
}

export default async (req, res) => {
    try {
        let p1 = req.query.image1
        let p2 = req.query.image2
        const mat = req.query.good == 'true' || req.query.good == 'TRUE'
        if((p1==null || p2==null) || (p1==undefined || p2==undefined)) return res.status(200).setHeader('Content-Type', 'application/json').send(JSON.stringify({error: "provide two images", example: "/ship?image1=https://poopoo-api.vercel.app/images/api/goodMatch.png&image2=https://poopoo-api.vercel.app/images/api/badMatch.png&good=false"}, null, 4));
        if(!(isValidUrl(p1) && isValidUrl(p2))) return res.status(200).setHeader('Content-Type', 'application/json').send(JSON.stringify({error: "provide a valid url for image1 and image2", example: "/ship?image1=https://poopoo-api.vercel.app/images/api/goodMatch.png&image2=https://poopoo-api.vercel.app/images/api/badMatch.png&good=false"}, null, 4));
        p1 = Jimp.read(p1)
        p2 = Jimp.read(p2)
        Jimp.read('https://poopoo-api.vercel.app/images/api/shipBase.png', async (err, ship) => {
            if (err) {
                res.send(JSON.stringify({"error": err}))
                return
            }
            Jimp.blit(p1, 0, 0)
            Jimp.blit(p2, 168, 0)
            Jimp.blit(mat ? good : bad, 112, 32)
            ship.getBuffer(Jimp.MIME_PNG, function(err, buffer){
                res.setHeader("Content-Type", 'image/png');
                res.send(buffer);
            });
        })
    } catch (err) {
        res.send(JSON.stringify({"error": err}))
    }
}