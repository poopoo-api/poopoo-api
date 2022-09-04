// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const func = require("/codesave/functions.js")
export default (req, res) => {
    const object = new Object();
    object['roast'] = func.roast();
    res.setHeader("Content-Type", 'application/json');
    res.send(JSON.stringify(object, null, 4));
}