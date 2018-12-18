var herbalRpUsages = [{
  "id": 15,
  "clinic_id": 0,
  "dict_code": "USAGE_RP_HERBAL",
  "name": "泡水",
  "code": "",
  "status": 1,
  "creator_id": 0,
  "creator": "sys"
}, {
  "id": 14,
  "clinic_id": 0,
  "dict_code": "USAGE_RP_HERBAL",
  "name": "生吃",
  "code": "",
  "status": 1,
  "creator_id": 0,
  "creator": "sys"
}, {
  "id": 13,
  "clinic_id": 0,
  "dict_code": "USAGE_RP_HERBAL",
  "name": "直接服用",
  "code": "",
  "status": 1,
  "creator_id": 0,
  "creator": "sys"
}, {
  "id": 12,
  "clinic_id": 0,
  "dict_code": "USAGE_RP_HERBAL",
  "name": "温水助服",
  "code": "",
  "status": 1,
  "creator_id": 0,
  "creator": "sys"
}, {
  "id": 11,
  "clinic_id": 0,
  "dict_code": "USAGE_RP_HERBAL",
  "name": "外敷",
  "code": "",
  "status": 1,
  "creator_id": 0,
  "creator": "sys"
}, {
  "id": 10,
  "clinic_id": 0,
  "dict_code": "USAGE_RP_HERBAL",
  "name": "煎服",
  "code": "",
  "status": 1,
  "creator_id": 0,
  "creator": "sys"
}]; // 中药处方用法
var herbalMedUsages = [{
  "id": 7,
  "clinic_id": 0,
  "dict_code": "USAGE_HERBAL",
  "name": "包煎",
  "code": "",
  "status": 1,
  "creator_id": 0,
  "creator": "sys"
}, {
  "id": 6,
  "clinic_id": 0,
  "dict_code": "USAGE_HERBAL",
  "name": "冲服",
  "code": "",
  "status": 1,
  "creator_id": 0,
  "creator": "sys"
}, {
  "id": 5,
  "clinic_id": 0,
  "dict_code": "USAGE_HERBAL",
  "name": "烊化",
  "code": "",
  "status": 1,
  "creator_id": 0,
  "creator": "sys"
}, {
  "id": 4,
  "clinic_id": 0,
  "dict_code": "USAGE_HERBAL",
  "name": "后下",
  "code": "",
  "status": 1,
  "creator_id": 0,
  "creator": "sys"
}, {
  "id": 3,
  "clinic_id": 0,
  "dict_code": "USAGE_HERBAL",
  "name": "先煎",
  "code": "",
  "status": 1,
  "creator_id": 0,
  "creator": "sys"
}]; // 中药用法
var westernMedUsages = [{
  "id": 104,
  "clinic_id": 5,
  "dict_code": "USAGE_WESTERN",
  "name": "静脉注射",
  "code": "",
  "status": 1,
  "creator_id": 2,
  "creator": "demo"
}, {
  "id": 103,
  "clinic_id": 5,
  "dict_code": "USAGE_WESTERN",
  "name": "肌肉注射",
  "code": "",
  "status": 1,
  "creator_id": 2,
  "creator": "demo"
}, {
  "id": 9,
  "clinic_id": 0,
  "dict_code": "USAGE_WESTERN",
  "name": "外用",
  "code": "",
  "status": 1,
  "creator_id": 0,
  "creator": "sys"
}, {
  "id": 8,
  "clinic_id": 0,
  "dict_code": "USAGE_WESTERN",
  "name": "口服",
  "code": "",
  "status": 1,
  "creator_id": 0,
  "creator": "sys"
}]; // 成药用法
var productMedUsages = [{
  "id": 73,
  "clinic_id": 0,
  "dict_code": "USAGE_PRODUCT",
  "name": "外用",
  "code": "",
  "status": 1,
  "creator_id": 0,
  "creator": "sys"
}, {
  "id": 72,
  "clinic_id": 0,
  "dict_code": "USAGE_PRODUCT",
  "name": "口服",
  "code": "",
  "status": 1,
  "creator_id": 0,
  "creator": "sys"
}]; // 产品用法
var extraFeeTypes = [{
  "id": 15,
  "clinic_id": 5,
  "recipe_type": 1,
  "name": "打包",
  "code": "",
  "name_pinyin_head": "db",
  "price": 0.01,
  "unit": "次",
  "status": 1
}, {
  "id": 9,
  "clinic_id": 5,
  "recipe_type": 1,
  "name": "代煎",
  "code": "",
  "name_pinyin_head": "",
  "price": 5.00,
  "unit": "剂",
  "status": 1
}, {
  "id": 6,
  "clinic_id": 5,
  "recipe_type": 1,
  "name": "打粉",
  "code": "",
  "name_pinyin_head": "",
  "price": 5.00,
  "unit": "次",
  "status": 1
}]; // 附加项目类型
var medFrequency = [{"name": "每天一次"}, {"name": "每天两次"}, {"name": "每天三次"}, {"name": "每天四次"}, {"name": "两天一次"}, {"name": "每周一次"}, {"name": "饭前"}, {"name": "饭后"}, {"name": "睡前"}, {"name": "医嘱"}];

module.exports= {
  herbalMedUsages,
  herbalRpUsages,
  westernMedUsages,
  productMedUsages,
  extraFeeTypes,
  medFrequency
}
