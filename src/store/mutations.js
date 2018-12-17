import mutationTypes from '@/store/mutationTypes.js'

const mutations = {
    [mutationTypes.ADD_NEW_RECIPT](state, item) {
      state.recipeList.push(item)
    },
    [mutationTypes.CHANGE_CURR_TAB](state, index) {
      state.currRecipe=index;
    }
  }
;
export default mutations
