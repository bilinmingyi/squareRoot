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
  saveMedTpl
}
