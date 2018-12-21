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
  set_record_prop: ({commit}, {key, val}) => {
    commit(mutationTypes.SET_RECORD_PROP, {key, val});
  },

  //middle
  add_new_recipt: ({commit, state}, type) => {
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
            dosage: 1,
            usage: "",
            frequency: "",
            extra_num: 0,
            extra_feetype: "",
            eachDose:"",
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
    commit(mutationTypes.ADD_NEW_RECIPT, item);
    commit(mutationTypes.CHANGE_CURR_TAB, state.recipeList.length - 1);
  },
  change_curr_tab: ({commit}, index) => {
    commit(mutationTypes.CHANGE_CURR_TAB, index)
  },
  cancel_recipe: ({commit}) => {
    commit(mutationTypes.CANCEL_RECIPE)
  },
  add_new_medicine: ({commit,state},{item ,type})=>{
    let result={};


    if(type===1){
      result={
        "item_id": item.id,
        "name": item.clinic_alias_name != '' ? item.clinic_alias_name : item.name,
        "num": !item.num ? 0 : item.num,
        "price": state.recipeList[state.currRecipe].data.is_cloud===1?item.default_sale_price:item.sale_price,
        "unit": item.unit_stock,
        "default_sale_price": item.default_sale_price,
        "sale_price": item.sale_price,
        "spec": item.spec,
        "unit_stock": item.unit_stock,
        "usage": !item.usage ? '' : item.usage,
        "stock": item.stock,
        "stock_sale_ratio":item.stock_sale_ratio,
        "is_match":item.status == 1 ? 1 : 0,
        "remark":!item.remark ? '': item.remark
      }
    }else if(type===2){

    }else if(type===3){

    }else if(type===4){

    }else if(type===5){

    }else if(type==6){

    }

    commit(mutationTypes.ADD_NEW_MEDICINE,result)
  },
  modify_medicine:({commit},{key,val,index})=>{
    commit(mutationTypes.MODIFY_MEDICINE,{key,val,index})
  },
  cancel_medicine:({commit},index)=>{
    commit(mutationTypes.CANCEL_MEDICINE,index)
  },
  modify_recipe:({commit},{key,val})=>{
    commit(mutationTypes.MODIFY_RECIPE,{key,val})
  },
  modify_recipe_detail:({commit}, {key,val})=>{
    commit(mutationTypes.MODIFY_RECIPE_DETAIL,{key,val})
  }


  //right
};

export default actions
