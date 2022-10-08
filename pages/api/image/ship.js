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
    let p1 = req.query.image1
    let p2 = req.query.image2
    let mat = req.query.good == 'true' || req.query.good == 'TRUE'
    if((p1==null || p2==null) || (p1==undefined || p2==undefined)) return res.status(200).setHeader('Content-Type', 'application/json').send(JSON.stringify({error: "provide two images", example: "/ship?image1=https://poopoo-api.vercel.app/images/api/goodMatch.png&image2=https://poopoo-api.vercel.app/images/api/badMatch.png&good=false"}, null, 4));
    if(!(isValidUrl(p1) && isValidUrl(p2))) return res.status(200).setHeader('Content-Type', 'application/json').send(JSON.stringify({error: "provide a valid url for image1 and image2", example: "/ship?image1=https://poopoo-api.vercel.app/images/api/goodMatch.png&image2=https://poopoo-api.vercel.app/images/api/badMatch.png&good=false"}, null, 4));
    Jimp.read('https://poopoo-api.vercel.app/images/api/shipBase.png', (err, ship) => {
        Jimp.blit(jimp.read(p1), 0, 0)
        Jimp.blit(jimp.read(p2), 168, 0)
        Jimp.blit(jimp.read(mat ? 'https://poopoo-api.vercel.app/images/api/goodMatch.png' : 'https://poopoo-api.vercel.app/images/api/badMatch.png'), 112, 32)
        ship.getBuffer(Jimp.MIME_PNG, function(err, buffer){
            res.setHeader("Content-Type", 'image/png');
            res.send(buffer);
        });
    })
}