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
  const list = [
    "Are you happy about yourself?",
    "Do you like playing video games? If yes, then what is your favorite game genre?",
    "What was your favorite hobby as a kid?",
    "Has your life been rough recently?",
    "Why did you choose your usernames? What is the story behind them?",
    "If you have a chance to change the past, what would you change?",
    "Have you ever been bullied at school/work? What did you do to stop the bullying?",
    "Do you know any coding languages?",
    "Is there anything that you about yourself that you find weird?",
    "What continents are you from? (Asia/Africa/North America/South America/Antarctica/Europe/Australia)",
    "[Troll Question] Do you like hamburger with pinapples?",
    "Would you rather to eat at KFC or McDonalds?",
    "Have you broken any rules in a Discord server?",
    "Do you have a job? If yes, then what is it?",
    "What is your favorite season? (Spring/Summer/Autumn/Winter)",
    "What do you do during freetimes?",
    "Would you consider yourself a nerd?",
    "If you have a choice to choose your nationality, what country would you want to be in?",
    "What chatting app do you use the most? (Discord, Skype, Twitter DM, Messenger, Slack, etc)",
    "Does Children's Online Privacy Protection Rule (\"COPPA\") actually protects children or is it blocking kids from seeing the reality?",
    "Do you have enough money to afford Minecraft?",
    "If you have a chance to change your past, what would you change?",
    "Have you ever been hacked? If yes, how did you try to get your accounts back?",
    "What can you do to calm yourself down when you are mad?"
  ]
  return listsGetRandomItem(list, false);
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
  git: git,
  emoji: emoji,
  yt: require('./youtube.js')
};