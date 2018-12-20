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
  patientData: {
    // TODO: id
    id: 22,
    name: "A5",
    mobile: "13728089836",
    age: 14,
    birthday: 1083513600000,
    sex: 1,
    weight: 55,
    marital_status: 0,
    personal_history: "过敏性鼻炎；",
    family_history: "",
    allergic_history: "头孢类；",
    blood_abo: 0,
    blood_rh: 0
  },
  

  recipeList:[],
  currRecipe:0,
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
