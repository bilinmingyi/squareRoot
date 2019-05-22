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
  add_new_recipt: ({commit, state}, {type, category}) => {
    let item = {};
    switch (type) {
      case 1://重要处方
        item = {
          type: 1,
          money: 0,
          data: {
            is_cloud: 0,
            category: category ? category.toString() : '1',
            doctor_remark: "",
            dosage: 1,
            usage: "",
            frequency: "",
            extra_num: 0,
            extra_feetype: "",
            extra_price: 0,
            eachDose: 0,
            items: []
          }
        };
        break;
      case 2://中成药处方
        item = {
          type: 2,
          money: 0,
          data: {
            is_cloud: 0,
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
  add_new_medicine: ({commit, state}, {item, type}) => {

    let result = {};
    switch (type) {
      case 1:
        result = {
          "yb_code": item.yb_cata_code ? item.yb_cata_code : '',
          "cloud_item_id": item.id,
          "item_id": item.id,
          "name": Number(state.recipeList[state.currRecipe].data.is_cloud) === 1 ? (item.alias_name ? item.alias_name : item.name) : (item.clinic_alias_name ? item.clinic_alias_name : item.name),
          "num": !item.num ? 0 : item.num,
          "price": Number(state.recipeList[state.currRecipe].data.is_cloud) === 1 ? item.default_sale_price : item.sale_price,
          "unit": item.unit_stock,
          "default_sale_price": item.default_sale_price,
          "sale_price": item.sale_price,
          "spec": item.spec,
          "unit_stock": item.unit_stock,
          "unit_sale": item.unit_sale,
          "usage": !item.usage ? '' : item.usage,
          "stock": item.stock,
          "stock_sale_ratio": item.stock_sale_ratio,
          "is_match":  Number(state.recipeList[state.currRecipe].data.is_cloud) === 1 ? (item.status !== undefined ? item.status : 1) : item.status == 1 ? 1 : 0,
          "remark": !item.remark ? '' : item.remark,
          "explain": [],
          "types": 1
        };
        break;
      case 2:
        result = {
          "yb_code": item.yb_cata_code ? item.yb_cata_code : '',
          "item_id": item.id,
          "name": Number(state.recipeList[state.currRecipe].data.is_cloud) === 1 ? (item.alias_name ? item.alias_name : item.name) : (item.clinic_alias_name ? item.clinic_alias_name : item.name),
          "num": !item.num ? 0 : item.num,
          "unit": item.unit === item.unit_stock ? item.unit_stock : (item.unit === item.unit_sale ? item.unit_sale : item.unit_stock),
          "sale_price": Number(state.recipeList[state.currRecipe].data.is_cloud) === 1 ? item.default_sale_price : item.sale_price,
          "spec": item.spec,
          "unit_stock": item.unit_stock,
          "unit_sale": item.unit_sale,
          "unit_dose": item.unit_dose,
          "stock_sale_ratio": item.stock_sale_ratio,
          "sale_dose_ratio": item.sale_dose_ratio,
          "usage": !item.usage ? '' : item.usage,
          "days": !item.days ? 0 : item.days,
          "frequency": !item.frequency ? '' : item.frequency,
          "dose_once": !item.dose_once ? '' : item.dose_once,
          "stock": item.stock,
          "is_match":  Number(state.recipeList[state.currRecipe].data.is_cloud) === 1 ? 1 : item.status == 1 ? 1 : 0,
          "cloud_item_id": item.id,
          "types": 2
        };
        break;
      case 3:
        result = {
          "item_id": item.id,
          "name": Number(state.recipeList[state.currRecipe].data.is_cloud) === 1 ? (item.alias_name ? item.alias_name : item.name) : (item.clinic_alias_name ? item.clinic_alias_name : item.name),
          "num": !item.num ? 0 : item.num,
          "unit": item.unit === item.unit_stock ? item.unit_stock : (item.unit === item.unit_sale ? item.unit_sale : item.unit_stock),
          "sale_price": Number(state.recipeList[state.currRecipe].data.is_cloud) === 1 ? item.default_sale_price : item.sale_price,
          "spec": item.spec,
          "category": item.category,
          "unit_stock": item.unit_stock,
          "unit_sale": item.unit_sale,
          "unit_dose": item.unit_dose,
          "stock_sale_ratio": item.stock_sale_ratio,
          "sale_dose_ratio": item.sale_dose_ratio,
          // "usage": !item.usage ? '' : item.usage,
          // "days": !item.days ? 0 : item.days,
          // "frequency": !item.frequency ? '' : item.frequency,
          // "dose_once": !item.dose_once ? '' : item.dose_once,
          "stock": item.stock,
          "is_match": Number(state.recipeList[state.currRecipe].data.is_cloud) === 1 ? 1 : item.status == 1 ? 1 : 0,
          "cloud_item_id": item.id,
          "remark": !item.remark ? '' : item.remark,
          "types": 3
        }
        break;
      case 4:
        result = {
          "unit": item.unit,
          "remark": !item.remark ? '' : item.remark,
          "item_id": item.id,
          "name": item.alias_name != '' && item.alias_name != null ? item.alias_name : item.name,
          "num": !item.num ? 0 : item.num,
          "price": item.price,
          "type": item.type,
          "usage": !item.usage ? '' : item.usage,
          "types": 4,
          "is_match": item.status == 1 ? 1 : 0
        };
        break;
      case 5:

        break;
      case 6:
        result = {
          "remark": !item.remark ? '' : item.remark,
          "item_id": item.id,
          "name": item.clinic_alias_name != '' && item.clinic_alias_name != null ? item.clinic_alias_name : item.name,
          "num": !item.num ? 0 : item.num,
          "stock": item.stock,
          "price": item.sale_price / item.stock_sale_ratio,
          "stock_sale_ratio": item.stock_sale_ratio,
          "unit": item.unit_sale,
          "spec": item.spec,
          "is_match": item.status == 1 ? 1 : 0,
          "types": 6
        };
        break;
    }
    commit(mutationTypes.ADD_NEW_MEDICINE, result)
  },
  modify_medicine: ({commit}, {key, val, index}) => {
    commit(mutationTypes.MODIFY_MEDICINE, {key, val, index})
  },
  cancel_medicine: ({commit}, index) => {
    commit(mutationTypes.CANCEL_MEDICINE, index)
  },
  modify_recipe: ({commit}, {key, val}) => {
    commit(mutationTypes.MODIFY_RECIPE, {key, val})
  },
  modify_recipe_detail: ({commit}, {key, val}) => {
    commit(mutationTypes.MODIFY_RECIPE_DETAIL, {key, val})
  },
  clean_recipe: ({commit}) => {
    commit(mutationTypes.CLEAN_RECIPE)
  },
  select_fjb_recipe: ({commit}, obj) => {
    commit(mutationTypes.SELECT_FJB_RECIPE, obj)
  },
  set_order_seqno: ({commit}, val) => {
    commit(mutationTypes.SET_ORDER_SEQNO, val)
  },
  change_print_pre: ({commit, state}) => {
    commit(mutationTypes.CHANGE_PRINT_PRE);
  },
  init_recipe: ({commit}, list) => {
    commit(mutationTypes.INIT_RECIPE, list)
  },
  init_recode: ({commit}, obj) => {
    commit(mutationTypes.INIT_RECODE, obj)
  },
  save_draft_data: ({commit}, str) => {
    commit(mutationTypes.SAVE_DRAFT_DATA, str)
  },
  set_recipe_help: ({commit}, val) => {
    commit(mutationTypes.SET_RECIPE_HELP, val)
  },
  set_fj_list: ({commit}, arr) => {
    commit(mutationTypes.SET_FJ_LIST, arr)
  },
  set_cloud_shop: ({commit}, arr) => {
    commit(mutationTypes.SET_CLOUD_SHOP, arr)
  }
  //right
};

export default actions
