const data = require("./data.json")
/* Random item from list */
function listsGetRandomItem(list, remove) {
        var x = Math.floor(Math.random() * list.length);
        if (remove) {
            return list.splice(x, 1)[0];
        } else {
            return list[x];
        }
    }

function listsGetSortCompare(type, direction) {
        var compareFuncs = {
            "NUMERIC": function(a, b) {
                return Number(a) - Number(b);
            },
            "TEXT": function(a, b) {
                return a.toString() > b.toString() ? 1 : -1;
            },
            "IGNORE_CASE": function(a, b) {
                return a.toString().toLowerCase() > b.toString().toLowerCase() ? 1 : -1;
            },
        };
        var compare = compareFuncs[type];
        return function(a, b) {
            return compare(a, b) * direction;
        }
    }

/* Question of the day endpoint */
const question = function () {
  const list = data["qotd"]
  return listsGetRandomItem(list, false);
}

const roast = function () {
  const list = data["roasts"]
  return listsGetRandomItem(list, false);
}

const emojify = function (inpu) {
  const alph = data["alpha"]
  const unicodealph = data["unicodeAlpha"]
  var output = [],
    object = new Object(),
  input = inpu.toLowerCase();
        var i_end = input.length;
        var i_inc = 1;
        var i
        if (1 > i_end) {
            i_inc = -i_inc;
        }
        for (i = 1; i_inc >= 0 ? i <= i_end : i >= i_end; i += i_inc) {
           if (alph.includes(input.charAt((i - 1)))) {output.push((unicodealph[((alph.indexOf(input.charAt((i - 1))) + 1) - 1)]));
          } else {
             output.push(input.charAt((i - 1)))
          }
        }
  object['output'] = output.join(" ");
  object['length'] = output.join(" ").length;
  return object;
}

/* Github info endpoint */
const git = function(data) {
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
  return object;
}

/* :troll: */
const emoji = async function(text, type, res, fetch){
  const object = new Object();
  if (type !== undefined){
  if(type == "emoji"){
    if(text !== undefined){
  object['text']= await text.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');
    } else {
      const response = await fetch('https://frostzzone.repl.co/emoji.json');
  const data = await response.json();
  object['emojis'] = data.emojis
    }
  } else if(type == "text"){
    object['text'] = await text.replace(/[^\w\s]/gi, '');
  } else {
    object['err'] = "Invalid type, valid types: emoji, text"
  }
  } else {
    object['message'] = "valid types"
    object['types'] = {"/remove?type=emoji&text=text": "removes all emojis from text", "/remove?type=emoji": "give a list of emojis","/remove?type=text&text=text": "removes every character except letters and numbers"}
  }
  res.setHeader("Content-Type", 'application/json');
  res.send(JSON.stringify(object, null, 4));
}

module.exports = {
  question: question,
  roast: roast,
  git: git,
  emoji: emoji,
  emojify: emojify,
  yt: require('./youtube.js')
};