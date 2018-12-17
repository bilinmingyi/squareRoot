const fullTime = val => {
  var dateObj = new Date(Number(val));
  var year = dateObj.getFullYear();
  var month =
    dateObj.getMonth() + 1 > 9
      ? (dateObj.getMonth() + 1).toString()
      : "0" + (dateObj.getMonth() + 1).toString();
  var date =
    dateObj.getDate() > 9
      ? dateObj.getDate().toString()
      : "0" + dateObj.getDate().toString();
  var hour =
    dateObj.getHours() > 9
      ? dateObj.getHours().toString()
      : "0" + dateObj.getHours().toString();
  var minutes =
    dateObj.getMinutes() > 9
      ? dateObj.getMinutes().toString()
      : "0" + dateObj.getMinutes().toString();

  return year + "/" + month + "/" + date + "  " + hour + ":" + minutes;
};

/* 计算年龄 */
const calcAge = (t) => {
  var today = new Date();
  var born = new Date(t);

  if (born > today.getTime()) {
      return -1;
  }
  var age = today.getFullYear() - born.getFullYear();
  if ((today.getMonth() * 100 + today.getDate()) - (born.getMonth() * 100 + born.getDate()) < 0) {
      age -= 1;
      if (age < 0) {
          age = 0;
      }
  }
  return age;
}

/**
 * @desc 字典查询函数
 * 
 * @param {Array} dict    // {code: CODE, name: NAME}
 * @param {String | Number} code
 * @return {ALL} name
 * 
 * @example
 * codeToName([{code: a, name: 'this is a'}], 'a')    // 'this is a'
 */ 

const codeToName = (dict, code) => {
  var dict = dict || [];
  for (var i = 0, len = dict.length; i < len; i++) {
    if (dict[i].code === code) {
      return dict[i].name;
    }
  }
  return null;
}

/* 解析性别 */
const parseSex = (sexVal) => {
  var dict = [
    {code: 0, name: '保密'},
    {code: 1, name: '男'},
    {code: 2, name: '女'},
  ];
  return codeToName(dict, sexVal);
}

/**
 * @desc： Format price.
 * @param {String} price
 * @param {String} currency
 * @param {Number} decimals
 * @return {String}
 *
 * @example priceFormat('12345.67890', '$', 3)    // '$12,345.679'
 */
const priceFormat = (price, currency, decimals) => {
  price = parseFloat(price);
  if ((!price && price !== 0) || !isFinite(price)) return "";
  currency = currency != null ? currency : "￥";
  decimals = decimals != null ? decimals : 2;
  var sign = price < 0 ? "-" : "";
  var str = Math.abs(price).toFixed(decimals);
  var _int = decimals ? str.slice(0, -1 - decimals) : "";
  var _float = decimals ? str.slice(-1 - decimals) : "";
  var i = _int.length % 3;
  var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? "," : "") : "";
  var mid = _int.slice(i).replace(/(\d{3})(?=\d)/g, "$1,");
  return sign + currency + head + mid + _float;
};

const recipeType = val => {
  var typeList=[
    {code:1,name:"中药"},
    {code:2,name:"成药"},
    {code:3,name:"产品"},
    {code:4,name:"项目"},
    {code:5,name:"附加服务"},
    {code:6,name:"材料"},
    {code:7,name:"检验"}
  ];
  var result=typeList.filter(item => {
    return item.code===val
  });
  return result[0].name;
}

module.exports = {
  fullTime,
  recipeType,
  calcAge,
  parseSex,
  priceFormat
}