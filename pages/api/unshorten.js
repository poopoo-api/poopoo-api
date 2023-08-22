const https = require('https');
const http = require('http');

async function unshorten(url){
  return new Promise((resolve, reject) => {
    try {
      const tracer = (urls, protocol = https) => {
        if (urls.slice(0, 5) === 'http:') {
          protocol = http;
        }

        protocol
          .get(urls, {}, ({ statusCode, headers: { location }, socket: {_host: host} }) => {
            if ([301, 302, 303, 307, 308].includes(statusCode)) {
              if (location) {
                if (location.startsWith('/')) {
                  location = `https://${host}${location}`;
                }

                tracer(location);
                return;
              }
            }
            resolve(urls);
          })
          .on('error', (err) => reject(err));
      };

      tracer(url);
    } catch (err) {
      reject(err);
    }
  });
};

export default async(req, res) => {
  if(!req.query.url){
    res.setHeader("Content-Type", 'application/json');
    res.send(JSON.stringify({
      error: 'No url provided: ?url='
    }, null, 4))
    return
          }
  let url = req.query.url;
  if(!/https:\/\/|http:\/\//g.test(url)){
    url = `https://${url}`;
  }
  try {
  let unshort = await unshorten(url)
  res.setHeader("Content-Type", 'application/json');
    return res.send(JSON.stringify({
      url: unshort
    }, null, 4))
    } catch (err) {
    res.setHeader("Content-Type", 'application/json');
    res.send(JSON.stringify({
      error: 'Unknown error',
      msg: `${err}`
    }, null, 4))
  }
}