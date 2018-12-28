import axios from 'axios'

try {
  axios.defaults.baseURL = '/dyyzs';
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

const getHistoryRecipes = params => fetch('/treatmng/patient/history/list', params);

const getCaseHistory = () => fetch('/doctreat/casehistory/detail');

const setCaseHistory = params => fetch('/doctreat/casehistory/save', params);

const getDiseaseList = (params, type) => {
  if (type === "diagnosis") {
    return fetch('/doctreat/treatorder/zyDisease/list', params);
  } else if (type === "diagnosis_xy") {
    return fetch('/doctreat/treatorder/ybDisease/list', params);
  }
}

const checkIsMatch = (params, type, recipe) => {
  switch (type) {
    case 1:
      return (recipe.is_cloud == 1)
        ? fetch('/stockmng/dyHerbal/list', params)
        : fetch('/stockmng/medicine/herbalList', params)
      break;
    case 2:
      return fetch('/stockmng/medicine/westernList', params);
      break;
    case 3:
      return fetch('/stockmng/dyProduct/list', params);
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
const saveMedTpl = (params, type) => {
  if (type === 1) {
    return fetch('/doctreat/tpl/herbal/add', params);
  } else if (type === 2) {
    return fetch('/doctreat/tpl/western/add', params);
  } else if (type === 4) {
    return fetch('/doctreat/tpl/therapy/add', params);
  }
}
const searchDiagnosis = (params) => fetch('/treatmng/dytreatorder/fjbDisease', params);

const searchFJB = (params) => fetch('http://123.207.90.226:8088/api/services/app/fjData/SearchFJInfo', params);

const getJJInfo = (params) => axios({
  method: 'post',
  url: 'http://123.207.90.226:8088/api/services/app/fjData/PostJJInfo',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  },
  params: params
});
const getFJDrugList = (params) => axios({
  method: 'post',
  url: 'http://123.207.90.226:8088/api/services/app/fjData/GetFJDrugList',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
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

const getHerbalList = (params) => fetch('/stockmng/medicine/herbalList', params);

const saveDraft = (params) => fetch('/doctreat/treatorder/save', params);

const loadDraft = (params) => fetch('/doctreat/treatorder/getDraft', params);

const submitOrder =(params) =>fetch('/doctreat/treatorder/submitOrder',params);

const canRecipeHelp =(params) => fetch('/doctreat/recipeHelp/enbaled', params);

const waitingPage='/dyyzs/doctreat/waiting/listPage';

//right
const searchRecentMed = (params, type) => {
  if (type === 1) {
    return fetch('/doctreat/herbal/recent', params);
  } else if (type === 2) {
    return fetch('/doctreat/western/recent', params);
  } else if (type === 4) {
    return fetch('/doctreat/therapy/recent', params);
  } else if (type === 6) {
    return fetch('/doctreat/material/recent', params);
  }
}
const searchMed = (params, type) => {
  if (type === 1) {
    return fetch('/stockmng/medicine/herbalList', params);
  } else if (type === 2) {
    return fetch('/stockmng/medicine/westernList', params);
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

  //right
  searchRecentMed,
  searchMed,
  searchTpl,
  updateTpl,
  delTpl,
  searchFJB
}
