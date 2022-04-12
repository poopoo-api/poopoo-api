export default (req, res) => {
    res.setHeader("Content-Type", 'application/json');
    res.send(JSON.stringify({
        types: [{
            "Get youtube channel info": '/youtube/channel?search=hello',
            "Get youtube video info": '/youtube/video?search=hello'
        }]
    }, null, 4))
}