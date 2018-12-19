import mutationTypes from '@/store/mutationTypes.js'
import mutations from './mutations';

const actions = {
  // left
  set_patient_info: ({commit}, {key, val}) => {
    commit(mutationTypes.SET_PATIENT_INFO, {key, val});
  },
  set_state_prop: ({commit}, {key, val}) => {
    commit(mutationTypes.SET_STATE_PROP, {key, val});
  },

  add_new_recipt:({commit,state}, type)=>{
    let item = {};
    switch (type) {
      case 1://重要处方
        item = {
          type: 1,
          money: 0,
          data: {
            is_cloud: 0,
            category: "1",
            doctor_remark: "",
            dosage: 0,
            usage: "",
            frequency: "",
            extra_price: 0,
            extra_num: 0,
            extra_feetype_id: "",
            items: []
          }
        };
        break;
      case 2://中成药处方
        item = {
          type: 2,
          money: 0,
          data: {
            doctor_remark: "",
            items: []
          }
        };
        break;
      case 3://产品处方
        item = {
          type: 3,
          money: 0,
          data: {
            is_cloud: 0,
            doctor_remark: "",
            items: []
          }
        }
        break;
      case 4://项目处方
        item = {
          type: 4,
          money: 0,
          data: {
            doctor_remark: "",
            items: []
          }
        }
        break;
      case 5://附加服务
        item = {
          type: 5,
          money: 0,
          data: {
            doctor_remark: "",
            items: []
          }
        }
        break;
      case 6://材料处方
        item = {
          type: 6,
          money: 0,
          data: {
            doctor_remark: "",
            items: []
          }
        }
    }
    commit(mutationTypes.ADD_NEW_RECIPT,item);
    commit(mutationTypes.CHANGE_CURR_TAB,state.recipeList.length-1);
  },
  change_curr_tab:({commit},index)=>{
    commit(mutationTypes.CHANGE_CURR_TAB,index)
  }
};

export default actions
