/*console.clear();*/
//this is a mess
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
var path = require('path');
var validUrl = require('valid-url');
const Jimp = require('jimp')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))
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

//main api
app.get('/add', async function(req, res) {
    res.sendFile(path.join(__dirname, '/files/new-item.html'));
});
app.get('/', async function(req, res) {
    res.sendFile(path.join(__dirname, '/files/index.html'));
})
app.get('/example.png', async function(req, res) {
    res.sendFile(path.join(__dirname, '/files/images/png.png'))
})
app.get('/the-very-original-image.ico', async function(req, res) {
    res.sendFile(path.join(__dirname, '/favicon.ico'))
})
app.get('/png/last', async function(req, res) {
    res.sendFile(path.join(__dirname, '/files/images/yes.png'))
})
app.get('/png', async function(req, res) {
    let url = (req.query.url);
    if (url !== undefined) {
        if (validUrl.isUri(url)) {
            await Jimp.read(url).then(png => {
                return png.write('./files/images/yes.png');
            }).catch(err => {
                console.error(err);
            });
            await delay(Number(1) * 100);
            await res.sendFile(path.join(__dirname, 'files/images/yes.png'));
        } else {
            res.send(`Url is invalid '${url}'`)
        }
    } else {
        res.send('/png?url=exampleurl')
    }
})

app.get('/morse', async function(req,res){
  let text = req.query.text;
  res.send()
})
app.get('/github/:name', async function(req, res) {
  let user = req.params.name
  const response = await fetch('https://api.github.com/users/'+user);
  const data = await response.json();
  const object = new Object();
  object['url'] = data.url;
  object['avatar'] = data.avatar_url;
  object['account_type'] = data.type;
  object['name'] = data.login;
  if(data.company == null){object['company']="None"}else{object['company']=data.company;}
  if(data.blog == null){object['blog']="None"}else{object['blog']=data.blog;}
  if(data.location == null){object['location']="Not set"}else{object['location']=data.location;}
  if(data.email == null){object['email']="None"}else{object['email']=data.email;}
  if(data.bio == null){object['bio']="No Bio"}else{object['bio']=data.bio;}
  if(data.twitter_username == null){object['twitter']="Not Set";} else {object['twitter']=data.twitter_username;}
  object['public_repos']=data.public_repos;
  object['public_gists']=data.public_gists;
  object['followers']=data.followers;
  object['following']=data.following;
  object['created_at']=data.created_at;
  object['updated_at']=data.updated_at;
  res.header("Content-Type",'application/json');
        res.send(JSON.stringify(object, null, 4));
})

app.post('/item', async function(req, res) {
    const body = req.body;
    const body2 = JSON.stringify(body)
    /*console.log(body);*/
    if (body.key == "key" || body.key == "err") {
        err = "can't set key: " + body.key
        errr = true
        json = {
            err: true,
            error: err
        }
      res.header("Content-Type",'application/json');
        res.send(JSON.stringify(json, null, 4));
    } else {
        db.set(body.key, body.value);
        json = {
            err: false,
            key: body.key,
            value: body.value
        }
      res.header("Content-Type",'application/json');
        res.send(JSON.stringify(json, null, 4));
    }
})
app.get('/item', async function(req, res) {
    const body = req.query.key;
    if (body == "all") {
        json = db.all();
      res.header("Content-Type",'application/json');
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
                  res.header("Content-Type",'application/json');
        res.send(JSON.stringify(json, null, 4));
                } else {
                    json = {
                        value: null
                    }
                  res.header("Content-Type",'application/json');
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

// 404 page
app.get('*', async function(req, res) {
    res.send('Error found')
})
//hosted app
app.listen(port, () => console.log(`Listening on port ${port}`));