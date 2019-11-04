var herbalRpUsages = [], herbalMedUsages = [], westernMedUsages = [], extraFeeTypes = [], clinicName = '',
  clinicId = '', medFrequency = [], userId = '', userName = '';

try {
  userId = window.baseInfo.userId
} catch (e) {
  userId = '2'
}

try {
  userName = window.baseInfo.userName
} catch (e) {
  userName = 'demo2'
}

try {
  clinicName = window.baseInfo.clinicName;
} catch (e) {
  clinicName = '大医联帮云诊所'
}

try {
  clinicId = window.baseInfo.clinicId;
} catch (e) {
  clinicId = "5"
}

try {
  herbalRpUsages = window.baseInfo.herbalRpUsages;
} catch (e) {
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
  herbalMedUsages = window.baseInfo.herbalMedUsages
} catch (e) {
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
try {
  westernMedUsages = window.baseInfo.westernMedUsages;
} catch (e) {
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
  extraFeeTypes = window.baseInfo.extraFeeTypes
} catch (e) {
  extraFeeTypes = [
    {
      "id": 15,
      "clinic_id": 5,
      "recipe_type": 1,
      "name": "打包",
      "code": "",
      "name_pinyin_head": "db",
      "price": 5,
      "unit": "次",
      "status": 1
    }]; // 附加项目类型
}
try {
  medFrequency = window.baseInfo.medFrequency;
} catch (e) {
  medFrequency = [
    {"name": "每天一次", "ratio": 1},
    {"name": "每天两次", "ratio": 2},
    {"name": "每天三次", "ratio": 3},
    {"name": "每晚一次", "ratio": 1},
    {"name": "隔天一次", "ratio": 1 / 2},
    {"name": "必要时", "ratio": 0},
    {"name": "立即", "ratio": 1},
    {"name": "每天四次", "ratio": 4},
    {"name": "每日五次", "ratio": 5},
    {"name": "每小时一次", "ratio": 24},
    {"name": "每两小时一次", "ratio": 12},
    {"name": "每三小时一次", "ratio": 8},
    {"name": "每四小时一次", "ratio": 6},
    {"name": "每五小时一次", "ratio": 24 / 5},
    {"name": "每六小时一次", "ratio": 4},
    {"name": "每七小时一次", "ratio": 24 / 7},
    {"name": "每八小时一次", "ratio": 3},
    {"name": "每十二小时一次", "ratio": 2},
    {"name": "每隔两天一次", "ratio": 1 / 3},
    {"name": "每隔三天一次", "ratio": 1 / 4},
    {"name": "每隔四天一次", "ratio": 1 / 5},
    {"name": "每周一次", "ratio": 1 / 7},
    {"name": "隔周1次", "ratio": 1 / 14},
    {"name": "每早1次", "ratio": 1}
  ];
}


module.exports = {
  userName,
  userId,
  herbalMedUsages,
  herbalRpUsages,
  westernMedUsages,
  extraFeeTypes,
  medFrequency,
  clinicName,
  clinicId
}
