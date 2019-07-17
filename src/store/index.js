import Vue from 'vue'
import Vuex from 'vuex'

import actions from '@/store/actions.js'
import getters from '@/store/getters.js'
import mutations from '@/store/mutations.js'

Vue.use(Vuex)
const state = {
  // left
  isFirst: "1", // 是否初诊
  treatPrice: 0, // 诊金
  showHistoryDetail: false, // 显示就诊历史
  orderSeqno: '',
  isYB: 0,
  department: '',
  departmentCode: '',
  ybCardNo: '',
  clinicName: '',
  clinicType: 0,
  doctorName: '',
  clinicId: '',
  doctorId: '',
  appointOrderSeqno: '',
  patientData: {
    id: null,
    name: "",
    mobile: "",
    age: 0,
    birthday: null,
    sex: 0,
    weight: 0,
    marital_status: 0,
    personal_history: "",
    family_history: "",
    allergic_history: "",
    blood_abo: 0,
    blood_rh: 0
  },

  recordData: {
    // 患者病历
    chief_complaint: '',    // 主述
    present_illness: '',    // 现病史
    allergic_history: '',   // 过敏史
    personal_history: '',   // 个人史
    past_history: '', // 既往史
    family_history: '', // 家族史
    prophylactic_history: '', // 预防接种史


    examination: {},    // 检查
    diagnosis_xy: '',   // 西医诊断
    diagnosis: '',    // 中医诊断
    diagnosis_xy_input: '',  // 西医诊断输入框
    diagnosis_xy_labels: [],  // 西医诊断标签
    diagnosis_xy_search_data: [],  // 西医诊断搜索结果
    diagnosis_input: '',  // 中医诊断输入框
    diagnosis_labels: [],  // 中医诊断标签
    diagnosis_search_data: [],  // 中医诊断搜索结果
    treat_advice: '',   // 处理意见
    sport_advice: '', // 运动建议
    dietary_advice: '' // 饮食建议
  },

  //middle
  recipeList: [],
  currRecipe: -1,
  fjbRecipe: {},
  printPre: false,
  draftData: '',
  canGetRecipeHelp: 0,
  fjList: [],
  cloudShopList: [],

  // right
  tplChange: false,
};
if (module.hot) {
  // 使 action 和 mutation 成为可热重载模块
  module.hot.accept(['./mutations'], () => {
    // 获取更新后的模块
    // 因为 babel 6 的模块编译格式问题，这里需要加上 `.default`
    const newMutations = require('./mutations').default;
    // 加载新模块
    store.hotUpdate({
      mutations: newMutations,
    })
  })
}
export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
