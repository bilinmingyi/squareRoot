import mutationTypes from '@/store/mutationTypes.js'

const actions = {
  add_new_recipt:({commit}, obj)=>{
    commit(mutationTypes.ADD_NEW_RECIPT,obj)
  }
};

export default actions
