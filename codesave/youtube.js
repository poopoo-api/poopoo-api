const
{
	Client
} = require("youtubei");
const youtube = new Client();
module.exports = async function (search, type, res){
  let videos = await youtube.search(search,
	{
		type: type, // video | playlist | channel | all
	});
	const object = new Object();
	const object1 = new Object();
	let list = []
let i = 0
  let item = ''
	for (i = 0; i <= videos.length; i++)
	{
		item = videos[i]
		object1[i] = item
	}

	for (i = 0; i < videos.length; i++)
	{
		let thumbs = []
    let t = 0
		for (t = 0; t < (object1[i]["thumbnails"]).length; t++)
		{
			thumbs.push(object1[i]["thumbnails"][t])
		}
try{
		list.push(
		{
			id: object1[i]["id"],
			link: ("https://www.youtube.com/watch?v=" + object1[i]["id"]),
			title: object1[i]["title"],
			description: object1[i]["description"],
			length: object1[i]["duration"],
			views: object1[i]["viewCount"],
			uploaded: object1[i]["uploadDate"],
      by: object1[i]["channel"]["name"],
      creatorId: object1[i]["channel"]["id"],
			live: object1[i]["isLive"],
			thumbnails: thumbs
		})
} catch (err){
  try{
    list.push(
		{
			id: object1[i]["id"],
			link: ("https://www.youtube.com/channel/" + object1[i]["id"]),
			user: object1[i]["name"],
      videoCount: object1[i]["videoCount"],
			thumbnails: thumbs
		})
  } catch (err){
      list.push({err: true})
  }
}
	}

	object["search"] = search;
	object["type"] = type;
	object["results"] = list;

		res.setHeader("Content-Type", 'application/json');
		res.send(JSON.stringify(object, null, 4));
}