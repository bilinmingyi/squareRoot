import mutationTypes from '@/store/mutationTypes.js'

const mutations = {
  [mutationTypes.ADD_NEW_RECIPT](state,obj){
    state.recipeList.push(obj)
  }
};
export default mutations
