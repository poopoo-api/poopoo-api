function textReplace(haystack, needle, replacement) {
    needle = needle.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1")
        .replace(/\x08/g, "\\x08");
    return haystack.replace(new RegExp(needle, 'g'), replacement);
}
export default (req, res) => {
  let text = req.query.text;
    if (text !== undefined) {
        text = textReplace(text, '', '||||')
        const object = new Object();
        object['text'] = text.slice(2, text.length - 2);
        res.setHeader("Content-Type", 'application/json');
        res.send(JSON.stringify(object, null, 4));
    } else {
        res.setHeader("Content-Type", 'application/json');
        res.send(JSON.stringify({
            error: 'No text provided'
        }, null, 4))
    }
}