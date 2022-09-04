const func = require("/codesave/functions.js")
  
export default (req, res) => {
    const text = req.query.text;
    if (text !== undefined) {
        const object = new Object();
        
        res.setHeader("Content-Type", 'application/json');
        res.send(JSON.stringify(func.emojify(text), null, 4));
    } else {
        res.setHeader("Content-Type", 'application/json');
       const object = new Object();
      object['emojify'] = ['Emojify text for discord', '/emojify?text=Hello'];
      object["error"] = 'No text provided'
        res.send(JSON.stringify(object, null, 4))
    }
}