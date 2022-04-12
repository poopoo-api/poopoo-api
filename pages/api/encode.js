export default (req, res) => {
    const text = req.query.text;
    if (text !== undefined) {
        const object = new Object();
        object['binary'] = text.split('').map((char) => '00'.concat(char.charCodeAt(0).toString(2)).slice(-8)).join(' ')
        res.setHeader("Content-Type", 'application/json');
        res.send(JSON.stringify(object, null, 4));
    } else {
        res.setHeader("Content-Type", 'application/json');
        res.send(JSON.stringify({
            error: 'No text provided'
        }, null, 4))
    }
}