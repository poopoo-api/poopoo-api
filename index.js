/*console.clear();*/
//this is a mess
const generatePassword = require('./passwordgenerate.js')
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
var path = require('path');
var validUrl = require('valid-url');
const Jimp = require('jimp')
const fetch = (...args) => import('node-fetch').then(({
    default: fetch
}) => fetch(...args))
const func = require("./files/functions.js")
const Database = require('easy-json-database');
const db = new Database("./db.json", {
    snapshots: {
        enabled: true,
        interval: 24 * 60 * 60 * 1000,
        folder: './backups/'
    }
});

const app = express();
const port = 8080;
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function textReplace(haystack, needle, replacement) {
    needle = needle.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1")
        .replace(/\x08/g, "\\x08");
    return haystack.replace(new RegExp(needle, 'g'), replacement);
}

app.use(cors());

// body parser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.set('json spaces', 2)
app.use('/images', express.static(path.join(__dirname, 'files/images')))
//main api
app.get('/add', async function(req, res) {
    res.sendFile(path.join(__dirname, '/files/new-item.html'));
});
app.get('/', async function(req, res) {
    res.sendFile(path.join(__dirname, '/files/index.html'));
})
app.get('/png/last', async function(req, res) {
    res.sendFile(path.join(__dirname, '/files/images/example.png'))
})
app.get('/png', async function(req, res) {
    let url = (req.query.url);
    if (url !== undefined) {
        if (validUrl.isUri(url)) {
            await Jimp.read(url).then(png => {
                return png.write('./files/images/example.png');
            }).catch(err => {
                console.error(err);
            });
            await delay(Number(1) * 100);
            await res.sendFile(path.join(__dirname, 'files/images/example.png'));
        } else {
            res.send(`Url is invalid '${url}'`)
        }
    } else {
        res.send('/png?url=exampleurl')
    }
})

app.get('/qotd', async function(req, res) {
    const object = new Object();
    object['question'] = func.question();
    res.header("Content-Type", 'application/json');
    res.send(JSON.stringify(object, null, 4));
})

app.get('/github/:name', async function(req, res) {
    let user = req.params.name
    const response = await fetch('https://api.github.com/users/' + user);
    const data = await response.json();
    res.header("Content-Type", 'application/json');
    res.send(JSON.stringify(func.git(data), null, 4));
})

app.post('/item', async function(req, res) {
    const body = req.body;
    const body2 = JSON.stringify(body)
    /*console.log(body);*/
    if (body.key == "key" || body.key == "Key" || body.key == "err" || body.key == "all" || body.key == "All") {
        err = "can't set key: " + body.key
        errr = true
        json = {
            err: true,
            error: err
        }
        res.header("Content-Type", 'application/json');
        res.send(JSON.stringify(json, null, 4));
    } else {
        db.set(body.key, body.value);
        json = {
            err: false,
            key: body.key,
            value: body.value
        }
        res.header("Content-Type", 'application/json');
        res.send(JSON.stringify(json, null, 4));
    }
})
app.get('/item', async function(req, res) {
    const body = req.query.key;
    if (body == "all") {
        json = db.all();
        res.header("Content-Type", 'application/json');
        res.send(JSON.stringify(json, null, 4));
    } else {
        try {
            const body2 = textReplace(body, ' ', '');
            if (!textReplace(body, ' ', '').length) {
                res.send(`Post: {"key":"key","value":"value"}, Get: ?key=key`)
            } else {
                if (db.has(String(body))) {
                    json = {
                        value: db.get(String(body))
                    }
                    res.header("Content-Type", 'application/json');
                    res.send(JSON.stringify(json, null, 4));
                } else {
                    json = {
                        value: null
                    }
                    res.header("Content-Type", 'application/json');
                    res.send(JSON.stringify(json, null, 4));
                }
            }
        } catch (err) {
            res.json({
                post: {
                    key: "key",
                    value: "value"
                },
                get: {
                    getkey: "/item?key=key",
                    getall: "/item?key=all"
                }
            })
        }
    }
})

app.get('/encode', async function(req, res) {
    const text = req.query.text;
    if (text !== undefined) {
        const object = new Object();
        object['binary'] = text.split('').map((char) => '00'.concat(char.charCodeAt(0).toString(2)).slice(-8)).join(' ')
        res.header("Content-Type", 'application/json');
        res.send(JSON.stringify(object, null, 4));
    } else {
        res.header("Content-Type", 'application/json');
        res.send(JSON.stringify({
            error: 'No text provided'
        }, null, 4))
    }
})

app.get('/decode', async function(req, res) {
    const binary = req.query.binary;
    if (binary !== undefined) {
        var string = '';
        binary.split(' ').map(function(bin) {
            string += String.fromCharCode(parseInt(bin, 2));
        });
        const object = new Object();
        object['text'] = string
        res.header("Content-Type", 'application/json');
        res.send(JSON.stringify(object, null, 4));
    } else {
        res.header("Content-Type", 'application/json');
        res.send(JSON.stringify({
            error: 'No binary provided'
        }, null, 4))
    }
})

app.get('/spoil', async function(req, res) {
    let text = req.query.text;
    if (text !== undefined) {
        text = textReplace(text, '', '||||')
        const object = new Object();
        object['text'] = text.slice(2, text.length - 2);
        res.header("Content-Type", 'application/json');
        res.send(JSON.stringify(object, null, 4));
    } else {
        res.header("Content-Type", 'application/json');
        res.send(JSON.stringify({
            error: 'No text provided'
        }, null, 4))
    }
})

app.get('/remove', async function(req, res){
  const text = req.query.text;
  try {
    const type = req.query.type;
    await func.emoji(text, type, res, fetch);
  } catch (error) {
    const type = undefined;
    await func.emoji(text, type, res, fetch);
  }
});

app.get('/password', async (req, res) => {
    var outcome = []
    generatePassword.loopPassword(outcome)
    var password = outcome.join('')
    var recoverCode = []
    generatePassword.loopRecover(recoverCode)
    res.header("Content-Type", 'application/json');
    res.send(JSON.stringify({
        password: String(password),
        recoverCode: String(recoverCode.join(''))
    }, null, 4))
})

// 404 page
app.get('*', async function(req, res) {
    res.sendFile(path.join(__dirname, '/files/404.html'))
})

//hosted app
try {
  app.listen(port, () => console.log(`Listening on port ${port}`));
} catch (error) {
  app.listen(port, () => console.log(`Listening on port 8081`));
}