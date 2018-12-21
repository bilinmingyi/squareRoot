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

let getHerbalList = (params) => {
  return fetch('/doctreat/tpl/herbal/list',params);
}

const getTreatOrderDetail = params => fetch('/doctreat/treatorder/detail', params);

const updatePatientData = params => fetch('/treatmng/patient/update', JSON.stringify(params));

const getPatientInfo = params => fetch('treatmng/patient/detail', params);

const getHistoryRecipes = params => fetch('/treatmng/patient/history/list', params);

export {
  getHerbalList,
  getTreatOrderDetail,
  updatePatientData,
  getPatientInfo,
  getHistoryRecipes
}
