export default (req, res) => {
    const object = new Object();
    let list = req.query.list
    if ((list == null) || (list == undefined)){
      object['flat'] = ['Flatten lists from [0, 1, [2, [3, 4]]] to [0, 1, 2, 3, 4]', '/flat?list=[0,1,2,[3,[4]]]'];
      res.setHeader("Content-Type", 'application/json');
      res.send(JSON.stringify(object, null, 4));
    } else {
      let list = JSON.parse(list)
      if (!(Array.isArray(list)) && list !== undefined){
        object['flat'] = ['Item is not a list']
        res.setHeader("Content-Type", 'application/json');
        res.send(JSON.stringify(object, null, 4));
      }else{
        object['flat'] = list.flat()
        res.setHeader("Content-Type", 'application/json');
        res.send(JSON.stringify(object, null, 4));
      }
    }
}