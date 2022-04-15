function romanToInt(str1) {
if(str1 == null) return -1;
var num = char_to_int(str1.charAt(0));
var pre, curr;

for(var i = 1; i < str1.length; i++){
curr = char_to_int(str1.charAt(i));
pre = char_to_int(str1.charAt(i-1));
if(curr <= pre){
num += curr;
} else {
num = num - pre*2 + curr;
}
}

return num;
}

function char_to_int(c){
switch (c){
case 'I': return 1;
case 'V': return 5;
case 'X': return 10;
case 'L': return 50;
case 'C': return 100;
case 'D': return 500;
case 'M': return 1000;
default: return 0;
}
}

function initToRoman(num) {
  var roman = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1
  };
  var str = '';

  for (var i of Object.keys(roman)) {
    var q = Math.floor(num / roman[i]);
    num -= q * roman[i];
    str += i.repeat(q);
  }
  console.log(str)
  return str;
}

export default async (req, res) => {
  let input = req.query.input
  if ((input == null) || (input == undefined)) return res.send(JSON.stringify({error: "Provide roman numerals or numbers", example: {input:"/roman?input=xvii", output: 17}, example2:{input:"/roman?input=17",output: "XVII"},possibleNumerals: {I: 1, V: 5, X: 10, L:50, C:100, D: 500, M: 1000, other: 0}, ideaBy:"LaserCat#5807"}, null, 4))
  if (!Number(input)) return res.send(JSON.stringify({output: romanToInt(input.toUpperCase())}, null, 4))
  res.send(JSON.stringify({output: initToRoman(Number(input))}, null, 4))
}