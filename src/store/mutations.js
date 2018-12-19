import mutationTypes from '@/store/mutationTypes.js'

const mutations = {
    // left
    [mutationTypes.SET_PATIENT_INFO](state, {key, val}) {
      state.patientData[key] = val;
    },
    [mutationTypes.SET_STATE_PROP](state, {key, val}) {
      state[key] = val;
    },

    [mutationTypes.ADD_NEW_RECIPT](state, item) {
      state.recipeList.push(item);
    },
    [mutationTypes.CHANGE_CURR_TAB](state, index) {
      state.currRecipe=index;
    }
  }
;
export default mutations
