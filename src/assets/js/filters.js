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
  recipeType
}
