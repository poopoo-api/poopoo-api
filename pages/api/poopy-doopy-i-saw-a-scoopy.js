import fetch from 'node-fetch';
export default async(req, res) => {
  const object = req.body
  
  if(object["poopycode"] == process.env['poopydoopy']) { 
    let options = object["options"] || {};
    const response = await fetch(object["url"], JSON.parse(options));
    const data = await response.json();
     res.send(JSON.stringify(data, null, 4))
  } else {
    res.send(JSON.stringify({"response": "No poopy?"}, null, 4))
  }
}
