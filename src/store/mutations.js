import mutationTypes from '@/store/mutationTypes.js'

const mutations = {
    // left
    [mutationTypes.SET_PATIENT_INFO](state, {key, val}) {
      state.patientData[key] = val;
    },
    [mutationTypes.SET_STATE_PROP](state, {key, val}) {
      state[key] = val;
    },
    [mutationTypes.SET_HISTORY_DATA](state, {key, val}) {
      state.historyData[key] = val;
    },
    [mutationTypes.SET_RECORD_PROP](state, {key, val}) {
      state.recordData[key] = val;
    },

    //middle
    [mutationTypes.ADD_NEW_RECIPT](state, item) {
      state.recipeList.push(item);
    },
    [mutationTypes.CHANGE_CURR_TAB](state, index) {
      state.currRecipe = index;
    },
    [mutationTypes.CANCEL_RECIPE](state) {
      state.recipeList.splice(state.currRecipe, 1);
      state.currRecipe--;
    },
    [mutationTypes.ADD_NEW_MEDICINE](state, item) {
      state.recipeList[state.currRecipe].data.items.push(item);
    },
    [mutationTypes.MODIFY_MEDICINE](state, {key, val, index}) {
      state.recipeList[state.currRecipe].data.items[index][key] = val;
    },
    [mutationTypes.MODIFY_RECIPE](state, {key, val}) {
      state.recipeList[state.currRecipe][key] = val;
    },
    [mutationTypes.MODIFY_RECIPE_DETAIL](state, {key, val}) {
      state.recipeList[state.currRecipe].data[key]=val;
    },
    [mutationTypes.CANCEL_MEDICINE](state, index) {
      state.recipeList[state.currRecipe].data.items.splice(index, 1)
    }


    //right
  }
;
export default mutations
