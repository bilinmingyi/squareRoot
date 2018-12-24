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

//left

const getTreatOrderDetail = params => fetch('/doctreat/treatorder/detail', params);

const updatePatientData = params => fetch('/treatmng/patient/update', JSON.stringify(params));

const getPatientInfo = params => fetch('treatmng/patient/detail', params);

const updatePatientInfo = params => fetch('treatmng/patient/update', params);

const getHistoryRecipes = params => fetch('/treatmng/patient/history/list', params);

const getCaseHistory = () => fetch('/doctreat/casehistory/detail');

const setCaseHistory = params => fetch('/doctreat/casehistory/save', params);

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
    return fetch('/doctreat/tpl/casehistory/list',params);
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
    return fetch('/doctreat/tpl/herbal/delete?tplId='+id, params);
  } else if (type === 2) {
    return fetch('/doctreat/tpl/western/delete?tplId='+id, params);
  } else if (type === 4) {
    return fetch('/doctreat/tpl/therapy/delete?tplId='+id, params);
  } else if (type === 0) {
    return fetch('/doctreat/tpl/casehistory/delete?tplId='+id, params);
  }
}

export {
  fetch,
  getTreatOrderDetail,
  updatePatientData,
  getPatientInfo,
  updatePatientInfo,
  getHistoryRecipes,
  getCaseHistory,
  setCaseHistory,
  // middle
  saveMedTpl,
  //right
  searchRecentMed,
  searchMed,
  searchTpl,
  updateTpl,
  delTpl,

}
