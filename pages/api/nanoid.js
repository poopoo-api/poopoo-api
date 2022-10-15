import { nanoid } from 'nanoid'

export default (req, res) => {
    let object = new Object();
    object['nanoid'] = nanoid();
    res.setHeader("Content-Type", 'application/json');
    res.send(JSON.stringify(object, null, 4));
}