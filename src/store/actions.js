import mutationTypes from '@/store/mutationTypes.js'

const actions = {
  add_new_recipt:({commit}, obj)=>{
    commit(mutationTypes.ADD_NEW_RECIPT,obj)
  },
  change_curr_tab:({commit},index)=>{
    commit(mutationTypes.CHANGE_CURR_TAB,index)
  }
};

export default actions
