import { nanoid } from 'nanoid'

export default (req, res) => {
    let length = req.query.length || 10
    let object = new Object();
    object['nanoid'] = nanoid(length);
    res.setHeader("Content-Type", 'application/json');
    res.send(JSON.stringify(object, null, 4));
}