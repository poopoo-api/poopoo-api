export default (req, res) => {
    const binary = req.query.binary;
    if (binary !== undefined) {
        var string = '';
        binary.split(' ').map(function(bin) {
            string += String.fromCharCode(parseInt(bin, 2));
        });
        const object = new Object();
        object['text'] = string
        res.setHeader("Content-Type", 'application/json');
        res.send(JSON.stringify(object, null, 4));
    } else {
        res.setHeader("Content-Type", 'application/json');
        res.send(JSON.stringify({
            error: 'No binary provided'
        }, null, 4))
    }
}