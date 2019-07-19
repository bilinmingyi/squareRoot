import axios from 'axios'

try {
  axios.defaults.baseURL = '/yzshis';
} catch (e) {
  console.log(e)
}

function fetch(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params).then(
      response => {
        resolve(response.data)
      }
    ).catch(error => {
      console.log(error)
      reject(error)
    })
  })
}

const cancelOrder = params => fetch('/doctreat/treatorder/cancel', params);

//left

const getTreatOrderDetail = params => fetch('/doctreat/treatorder/detail', params);

const updatePatientData = params => fetch('/treatmng/patient/update', JSON.stringify(params));

const getPatientInfo = params => fetch('treatmng/patient/detail', params);

const updatePatientInfo = params => fetch('treatmng/patient/update', params);

const getHistoryRecipes = params => fetch('/doctreat/treatorder/history', params);

const getCaseHistory = () => fetch('/doctreat/casehistory/detail');

const setCaseHistory = params => fetch('/doctreat/casehistory/save', params);

const getDiseaseList = (params, type) => {
  if (type === "diagnosis") {
    return fetch('/doctreat/treatorder/zyDisease/list', params);
  } else if (type === "diagnosis_xy") {
    return fetch('/doctreat/treatorder/ybDisease/list', params);
  }
}

const checkIsMatch = (params, type, cloud) => {
  switch (type) {
    case 1:
      return (Number(cloud) == 1)
        ? fetch('/stockmng/dyHerbal/list', params)
        : fetch('/stockmng/medicine/herbalList', params)
      break;
    case 2:
      return (Number(cloud) == 1)
        ? fetch('/stockmng/dyWestern/list', params)
        : fetch('/stockmng/medicine/westernList', params)
      break;
    case 3:
      return (Number(cloud) == 1)
        ? fetch('/stockmng/dyProduct/list', params)
        : fetch('/stockmng/medicine/productList', params)
      break;
    case 4:
      return fetch('/clinicmng/therapy/list', params);
      break;
    case 5:
      return fetch('/clinicmng/extraFee/list', params);
      break;
    case 6:
      return fetch('/stockmng/medicine/materialList', params);
      break;
  }
}

const addRecordTpl = params => fetch('/doctreat/tpl/casehistory/add', params);

//middle
const fetchClinic = params => fetch('/clinic/info', params)

const getDoctorInfor = params => fetch('/clinicmng/user/doctorInfo', params);

const searchDiagnosis = (params) => fetch('/treatmng/dytreatorder/fjbDisease', params);

const searchFJB = (params) => axios({
  method: 'post',
  url: 'http://47.112.12.132/medicalstock/api/services/app/fjData/SearchFJInfo',
  headers: {
    'Authorization': 'Bearer Internal'
  },
  data: params
});

const getJJInfo = (params) => axios({
  method: 'post',
  url: 'http://47.112.12.132/medicalstock/api/services/app/fjData/PostJJInfo',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Authorization': 'Bearer Internal'
  },
  params: params
});

const getFJDrugList = (params) => axios({
  method: 'post',
  url: 'http://47.112.12.132/medicalstock/api/services/app/fjData/GetFJDrugList',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Authorization': 'Bearer Internal'
  },
  data: params,
  transformRequest: [function (data) {
    let ret = ''
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret.slice(0, -1)
  }],
});
// const getFJDrugListByName=(params)=>axios({
//   method:'post',
//   url:'http://47.112.12.132/medicalstock/api/services/app/fjData/SearchFJInfo',
//   headers: {
//     'Authorization':'Bearer Internal'
//   },
//   data: params
// })

const auditrecipe = (params) => fetch('/doctreat/auditrecipe', params)


const getFJByName = (params) => fetch('/treatmng/dytreatorder/fjbDisease', params);

const getHerbalList = (params, isCloud) => {
  if (isCloud == 1) {
    return fetch('/stockmng/dyHerbal/list', params);
  } else {
    return fetch('/stockmng/medicine/herbalList', params);
  }
}

const saveDraft = (params) => fetch('/doctreat/treatorder/save', params);

const loadDraft = (params) => fetch('/doctreat/treatorder/getDraft', params);

const submitOrder = (params) => fetch('/doctreat/treatorder/submitOrder', params);

const canRecipeHelp = (params) => fetch('/doctreat/recipeHelp/enbaled', params);

const pointCount = (params) => fetch('/doctreat/treat/help', params)

const waitingPage = '/yzshis/doctreat/waiting/listPage';

const addReportImg = (params) => fetch('/doctreat/report/imgUpload', params)

const addReport = (params) => fetch('/doctreat/report/add', params)

const updataReport = (params) => fetch('/doctreat/report/update', params)

const deleteReport = (params) => fetch('/doctreat/report/delete', params)

//right
const searchRecentMed = (params, type, isCloud) => {
  if (type === 1) {
    return isCloud == 1 ? fetch('/doctreat/dyherbal/recent', params) : fetch('/doctreat/herbal/recent', params)
  } else if (type === 2) {
    return isCloud == 1 ? fetch('/doctreat/dywestern/recent', params) : fetch('/doctreat/western/recent', params)
  } else if (type == 3) {
    return isCloud == 1 ? fetch('/doctreat/dyproduct/recent', params) : fetch('/doctreat/product/recent', params)
  } else if (type === 4) {
    return fetch('/doctreat/therapy/recent', params);
  } else if (type === 6) {
    return fetch('/doctreat/material/recent', params);
  }
}
const searchMed = (params, type, isCloud) => {
  if (type === 1) {
    return isCloud == 1 ? fetch('/stockmng/dyHerbal/list', params) : fetch('/stockmng/medicine/herbalList', params)
  } else if (type === 2) {
    return isCloud == 1 ? fetch('/stockmng/dyWestern/list', params) : fetch('/stockmng/medicine/westernList', params)
  } else if (type === 3) {
    return isCloud == 1 ? fetch('/stockmng/dyProduct/list', params) : fetch('/stockmng/medicine/productList', params)
  } else if (type === 4) {
    return fetch('/clinicmng/therapy/list', params);
  } else if (type === 6) {
    return fetch('/stockmng/medicine/materialList', params);
  }
}
const searchTpl = (params, type) => {
  if (type === 1) {
    return fetch('/doctreat/tpl/herbal/list', params);
  } else if (type === 2) {
    return fetch('/doctreat/tpl/western/list', params);
  } else if (type === 3) {
    // return fetch('/doctreat/tpl/western/list', params); // 产品模板列表接口
  } else if (type === 4) {
    return fetch('/doctreat/tpl/therapy/list', params);
  } else if (type === 0) {
    return fetch('/doctreat/tpl/casehistory/list', params);
  }
}
const updateTpl = (params, type) => {
  if (type === 1) {
    return fetch('/doctreat/tpl/herbal/update', params);
  } else if (type === 2) {
    return fetch('/doctreat/tpl/western/update', params);
  } else if (type === 3) {
    // return fetch('/doctreat/tpl/western/update', params); // 产品模板更新接口
  } else if (type === 4) {
    return fetch('/doctreat/tpl/therapy/update', params);
  }
}
const delTpl = (id, params, type) => {
  if (type === 1) {
    return fetch('/doctreat/tpl/herbal/delete?tplId=' + id, params);
  } else if (type === 2) {
    return fetch('/doctreat/tpl/western/delete?tplId=' + id, params);
  } else if (type === 4) {
    return fetch('/doctreat/tpl/therapy/delete?tplId=' + id, params);
  } else if (type === 0) {
    return fetch('/doctreat/tpl/casehistory/delete?tplId=' + id, params);
  }
}

const saveMedTpl = (params, type) => {
  if (type === 1) {
    return fetch('/doctreat/tpl/herbal/add', params);
  } else if (type === 2) {
    return fetch('/doctreat/tpl/western/add', params);
  } else if (type === 4) {
    return fetch('/doctreat/tpl/therapy/add', params);
  }
}

const wisdomyb = params => fetch('https://localhost:9000/wisdomyb/audit', params)

const queryClassic = (params) => fetch('/doctreat/traditionrecipe/list', params);

const fetchOptionConfig = params => fetch('/clinic/optionConfig', params);

const fetchMedshopList = params => fetch('/clinicmng/medshopList', params)

const fetchQuestionList = params =>fetch('clinicmng/question/list', params)

const fetchQuestion = params => fetch('/clinicmng/question/content?questionId=' + params)

const addTreatAnswer = params => fetch('/doctreat/treatAnswer/add', params)

const updateTreatAnswer = params => fetch('/doctreat/treatAnswer/update', params)

export {
  fetch,
  cancelOrder,
  getTreatOrderDetail,
  updatePatientData,
  getPatientInfo,
  updatePatientInfo,
  getHistoryRecipes,
  getCaseHistory,
  setCaseHistory,
  getDiseaseList,
  checkIsMatch,
  addRecordTpl,

  // middle
  getDoctorInfor,
  saveMedTpl,
  searchDiagnosis,
  getJJInfo,
  getFJDrugList,
  getHerbalList,
  saveDraft,
  loadDraft,
  submitOrder,
  waitingPage,
  canRecipeHelp,
  pointCount,
  getFJByName,
  wisdomyb,
  fetchOptionConfig,
  fetchMedshopList,
  auditrecipe,
  fetchClinic,
  addReportImg,
  addReport,
  updataReport,
  deleteReport,

  //right
  searchRecentMed,
  searchMed,
  searchTpl,
  updateTpl,
  delTpl,
  searchFJB,
  fetchQuestionList,
  fetchQuestion,
  addTreatAnswer,
  updateTreatAnswer,
  queryClassic
}
