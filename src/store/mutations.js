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
      state.recipeList.splice(state.currRecipe,1);
      state.currRecipe--;
    }

    //right
  }
;
export default mutations
