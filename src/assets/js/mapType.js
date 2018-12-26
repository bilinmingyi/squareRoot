var herbalRpUsages=[],herbalMedUsages=[],westernMedUsages=[],extraFeeTypes=[],clinicName='';
try{
  clinicName=window.baseInfo.clinicName;
}catch (e) {
  clinicName='大医联帮云诊所'
}
try {
  herbalRpUsages=window.baseInfo.herbalRpUsages;
}catch (e) {
  herbalRpUsages = [
    {
      "id": 15,
      "clinic_id": 0,
      "dict_code": "USAGE_RP_HERBAL",
      "name": "泡水",
      "code": "",
      "status": 1,
      "creator_id": 0,
      "creator": "sys"
    }]; // 中药处方用法
}

try {
  herbalMedUsages=window.baseInfo.herbalMedUsages
}catch (e) {
  herbalMedUsages = [
    {
      "id": 7,
      "clinic_id": 0,
      "dict_code": "USAGE_HERBAL",
      "name": "包煎",
      "code": "",
      "status": 1,
      "creator_id": 0,
      "creator": "sys"
    }]; // 中药用法
}
try{
  westernMedUsages=window.baseInfo.westernMedUsages;
}catch (e) {
  westernMedUsages = [
    {
      "id": 104,
      "clinic_id": 5,
      "dict_code": "USAGE_WESTERN",
      "name": "静脉注射",
      "code": "",
      "status": 1,
      "creator_id": 2,
      "creator": "demo"
    }]; // 成药用法
}
try {
  extraFeeTypes=window.baseInfo.extraFeeTypes
}catch (e) {
  extraFeeTypes = [
    {
      "id": 15,
      "clinic_id": 5,
      "recipe_type": 1,
      "name": "打包",
      "code": "",
      "name_pinyin_head": "db",
      "price": 0.01,
      "unit": "次",
      "status": 1
    }]; // 附加项目类型
}

var medFrequency = [{"name": "每天一次"}, {"name": "每天两次"}, {"name": "每天三次"}, {"name": "每天四次"}, {"name": "两天一次"}, {"name": "每周一次"}, {"name": "饭前"}, {"name": "饭后"}, {"name": "睡前"}, {"name": "医嘱"}];

module.exports= {
  herbalMedUsages,
  herbalRpUsages,
  westernMedUsages,
  extraFeeTypes,
  medFrequency
}
