import mutationTypes from '@/store/mutationTypes.js'

const mutations = {
    [mutationTypes.ADD_NEW_RECIPT](state, obj) {
      state.recipeList.push(obj)
    },
    [mutationTypes.CHANGE_CURR_TAB](state, index) {
      state.currRecipe=index;
    }
  }
;
export default mutations
