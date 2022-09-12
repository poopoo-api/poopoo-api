import {v4 as uuidv4} from 'uuid';

export default (req, res) => {
    let object = new Object();
    object['uuid'] = uuidv4();
    res.setHeader("Content-Type", 'application/json');
    res.send(JSON.stringify(object, null, 4));
}