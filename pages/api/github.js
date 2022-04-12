const func = require("/codesave/functions.js")

export default async (req, res) => {
    let user = req.query.name
    const response = await fetch('https://api.github.com/users/' + user);
    const data = await response.json();
    res.setHeader("Content-Type", 'application/json');
    res.send(JSON.stringify(func.git(data), null, 4));
}