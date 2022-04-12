const func = require("/codesave/functions.js")

export default async (req, res) => {
    let search = req.query.search
    let type = "video"
    if (search == undefined || !search.length) {
        res.setHeader("Content-Type", 'application/json');
        res.send({
            err: "search cant be blank"
        });
    } else {
        await func.yt(search, type, res)
    }
}