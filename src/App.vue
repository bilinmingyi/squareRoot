<template>
  <div id="app">
    <div class="page_content" v-if="initFinish">
      <!--      <router-view style="flex: 1;"></router-view>-->
      <router-view class="left" name="Left"/>
      <div class="right_block">
        <router-view name="Header"></router-view>
        <div class="displayFlex" style="min-height: calc(100vh - 8.35rem);">
          <router-view class="middle" name="Middle"/>
          <router-view class="right" name="Right"/>
        </div>
      </div>
    </div>
    <f-loader v-show="showLoader"></f-loader>
  </div>
</template>

<script>

import {
  getTreatOrderDetail,
  loadDraft,
  searchMed,
  getDoctorInfor,
  fetchOptionConfig,
  fetchMedshopList,
  fetchClinic
} from "@/fetch/api.js";
import fLoader from "@/components/fLoader";
import {mapState, mapActions} from "vuex";

export default {
  name: "App",
  components: {
    fLoader
  },
  data() {
    return {
      showLoader: false,
      initFinish: false
    };
  },
  computed: {
    ...mapState({
      patientData: state => state.patientData,
      clinicType: state => state.clinicType
    })
  },
  created() {
    this.init();
    this.getClinicData()
    this.getMedShop();
    this.loadDraftData();
  },
  methods: {
    ...mapActions(['set_patient_info', 'set_order_seqno', 'init_recipe', 'init_recode', 'set_state_prop', 'set_recipe_help', 'change_curr_tab', 'set_cloud_shop', 'add_new_recipt']),
    init() {
      let params = {order_seqno: this.getOrderSeqno('orderSeqno')};
      this.showLoader = true;
      this.set_order_seqno(this.getOrderSeqno('orderSeqno'));
      getTreatOrderDetail(params).then(res => {
        if (res.code === 1000) {
          let data = res.data;
          let patientData = this.patientData;
          //获取医生科室
          this.getDoctorData(data.doctor_id);

          Object.keys(patientData).forEach((item) => {
            let val = data['patient_' + item]
            if (val != null) {
              this.set_patient_info({key: item, val})
            }
          })
          this.set_state_prop({key: 'isFirst', val: data.is_first});
          this.set_state_prop({key: 'treatPrice', val: data.treat_price});
          this.set_state_prop({key: 'doctorName', val: data.doctor_name});
          this.set_state_prop({key: 'isYB', val: data.pay_category});
          this.set_state_prop({key: 'ybCardNo', val: data.yb_card_no});
          this.set_state_prop({key: 'appointOrderSeqno', val: data.appoint_order_seqno})
          this.set_state_prop({key: 'clinicId', val: data.clinic_id})
          this.set_state_prop({key: 'doctorId', val: data.doctor_id})
          this.initFinish = true;
        } else {
          console.log(res.msg);
        }

        // this.showLoader = false;
      });
    },
    getOrderSeqno(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return decodeURIComponent(r[2]);
      return null;
    },
    loadDraftData() {
      loadDraft({
        "order_seqno": this.getOrderSeqno('orderSeqno')
      }).then(data => {
        if (data.code === 1000) {
          if (data.data == '') {
            if (this.clinicType === 6) {
              this.addNewRecipt(3);
              this.addNewRecipt(4);
            } else {
              this.addNewRecipt(1, 1);
              this.addNewRecipt(1, 2);
              this.addNewRecipt(2);
              this.addNewRecipt(4);
            }
            this.change_curr_tab(-1)
            return
          }
          let result = JSON.parse(data.data);

          try {
            if (result.recipeList && result.recordData) {
              this.checkOrder(result.recipeList);
              this.init_recipe(JSON.parse(JSON.stringify(result.recipeList)));
              this.init_recode(JSON.parse(JSON.stringify(result.recordData)));
            } else if (result.patientData && result.caseData && result.recipeData) {
              // 兼容老数据
              let recipeList = this.compatOldRecipeList(result.recipeData.recipeList);
              let recordData = Object.assign(result.caseData, {
                personal_history: result.patientData.personal_history,
                allergic_history: result.patientData.allergic_history
              })
              this.checkOrder(recipeList);
              this.init_recipe(JSON.parse(JSON.stringify(recipeList)));
              this.init_recode(JSON.parse(JSON.stringify(recordData)));
            }
            this.change_curr_tab(result.currRecipe !== undefined ? result.currRecipe : -1);
          } catch (e) {
            console.log(e);
          }
        } else {
          this.$Message.info(data.msg)
        }
      }).then(() => {
        this.showLoader = false;
      })
    },
    // 兼容老数据的recipeList
    compatOldRecipeList(data) {
      let recipeList = [];
      let list = [];
      let money = 0;
      data.forEach((item) => {
        switch (item.recipe_type) {
          case 1: // 中药处方
            list = [];
            money = 0;
            item.items.forEach((med) => {
              let obj = {
                "cloud_item_id": med.item_id,
                "item_id": med.item_id,
                "name": med.clinic_alias_name != '' && med.clinic_alias_name != null ? med.clinic_alias_name : med.name,
                "num": med.num || 0,
                "price": item.is_cloud === 1 ? med.default_sale_price : med.sale_price,
                "unit": med.unit || med.unit_stock,
                "default_sale_price": med.default_sale_price,
                "sale_price": med.sale_price,
                "spec": med.spec,
                "unit_stock": med.unit_stock,
                "unit_sale": med.unit_sale || med.unit_stock,
                "usage": med.usage || '',
                "stock": med.stock,
                "stock_sale_ratio": med.stock_sale_ratio || 1,
                "is_match": med.status == 1 ? 1 : 0,
                "remark": med.remark || '',
                "explain": [],
                "types": 1
              }
              list.push(obj)
              money += Number(obj.num) * Number(obj.price)
            })
            if (item.extra_feetype !== '' && item.extra_feetype != undefined) {
              money = money * Number(item.dosage) + Number(item.extra_price);
            } else {
              money = money * Number(item.dosage);
            }
            recipeList.push({
              type: 1,
              money: money,
              data: {
                is_cloud: item.is_cloud,
                category: item.allcategory,
                doctor_remark: item.doctor_remark,
                dosage: item.dosage,
                usage: item.usage,
                frequency: item.frequency,
                extra_num: item.extra_num,
                extra_feetype: item.extra_feetype,
                extra_price: item.extra_price,
                eachDose: item.dose_once_volume,
                items: list,
              }
            })
            break;
          case 2: // 中成药处方
            list = [];
            money = 0;
            item.items.forEach((med) => {
              let obj = {
                "item_id": med.item_id,
                "name": med.clinic_alias_name != '' && med.clinic_alias_name != null ? med.clinic_alias_name : med.name,
                "num": Number(med.num) || 0,
                "unit": med.unit === med.unit_stock ? med.unit_stock : (med.unit === med.unit_sale ? med.unit_sale : med.unit_stock),
                "sale_price": med.sale_price,
                "spec": med.spec,
                "unit_stock": med.unit_stock,
                "unit_sale": med.unit_sale,
                "unit_dose": med.unit_dose,
                "stock_sale_ratio": med.stock_sale_ratio,
                "sale_dose_ratio": med.sale_dose_ratio,
                "usage": med.usage || '',
                "days": Number(med.days) || 0,
                "frequency": med.frequency || '',
                "dose_once": Number(med.dose_once) || '',
                "stock": med.stock,
                "is_match": med.status == 1 ? 1 : 0,
                "cloud_item_id": med.item_id,
                "types": 2
              }
              list.push(obj)
              if (obj.unit === obj.unit_stock) {
                money += Number(obj.sale_price) * Number(obj.num);
              } else if (obj.unit === obj.unit_sale) {
                money += Number(obj.sale_price * 1.0 / obj.stock_sale_ratio) * Number(obj.num);
              } else {
                money += Number(obj.sale_price) * Number(obj.num);
              }
            })
            recipeList.push({
              type: 2,
              money: money,
              data: {
                doctor_remark: item.doctor_remark,
                items: list
              }
            })
            break;
          case 3: // 产品处方
            money = 0;
            // TODO: computed money
            recipeList.push({
              type: 3,
              money: money,
              data: {
                is_cloud: 0,
                doctor_remark: item.doctor_remark,
                items: item.items
              }
            })
            break;
          case 4: // 项目处方
            list = [];
            money = 0;
            item.items.forEach((med) => {
              list.push({
                "unit": med.unit,
                "remark": med.remark || '',
                "item_id": med.item_id,
                "name": med.alias_name != '' && med.alias_name != null ? med.alias_name : med.name,
                "num": Number(med.num) || 0,
                "price": med.price,
                "type": med.type,
                "usage": med.usage || '',
                "types": 4,
                "is_match": med.is_match == 1 ? 1 : 0
              })
              money += Number(med.price) * Number(med.num)
            })
            recipeList.push({
              type: 4,
              money: money,
              data: {
                doctor_remark: item.doctor_remark || '',
                items: list
              }
            })
            break;
          case 5: // 附加服务
            // money = 0;
            // recipeList.push({
            //   type: 5,
            //   money: money,
            //   data: {
            //     doctor_remark: item.doctor_remark,
            //     items: item.items
            //   }
            // })
            break;
          case 6: // 材料处方
            list = [];
            money = 0;
            item.items.forEach((med) => {
              list.push({
                "remark": med.remark || '',
                "item_id": med.item_id,
                "name": med.clinic_alias_name != '' && med.clinic_alias_name != null ? med.clinic_alias_name : med.name,
                "num": Number(med.num) || 0,
                "stock": med.stock,
                "price": med.price,
                "stock_sale_ratio": med.stock_sale_ratio,
                "unit": med.unit,
                "spec": med.spec,
                "is_match": med.is_match == 1 ? 1 : 0,
                "types": 6
              })
              money += Number(med.price) * Number(med.num)
            })
            recipeList.push({
              type: 6,
              money: money,
              data: {
                doctor_remark: item.doctor_remark || '',
                items: list
              }
            })
            break;
        }
      })
      return recipeList;
    },
    // 检查草稿箱
    checkOrder(recipeList) {
      recipeList.forEach(recipe => {
        if (recipe.data.items.length === 0) {
          return
        }
        let is_cloud = Number(recipe.data.is_cloud)
        let ids = recipe.data.items.map(med => {
          if (is_cloud === 1) {
            return med.cloud_item_id
          } else {
            return med.item_id
          }
        });
        switch (recipe.type) {
          case 1:
            searchMed({
              ids: ids,
              category: recipe.data.category,
              status: 1
            }, 1, is_cloud).then(data => {
              let recipeItems = recipe.data.items, responeItems = data.data;
              if (data.code === 1000) {
                if (is_cloud === 1) {
                  for (var i = 0; i < recipeItems.length; i++) {
                    for (var j = 0; j < responeItems.length; j++) {
                      if (recipeItems[i].cloud_item_id == responeItems[j].id) {
                        break;
                      }
                    }
                    if (j == responeItems.length) {
                      recipeItems[i].is_match = 0;
                    } else {
                      recipeItems[i].is_match = 1;
                    }
                  }
                } else {
                  for (var i = 0; i < recipeItems.length; i++) {
                    for (var j = 0; j < responeItems.length; j++) {
                      if (recipeItems[i].item_id == responeItems[j].id) {
                        recipeItems[i].stock = responeItems[j].stock;
                        break;
                      }
                    }
                    if (j == responeItems.length) {
                      recipeItems[i].is_match = 0;
                    } else {
                      recipeItems[i].is_match = 1;
                    }
                  }
                }

                this.init_recipe(JSON.parse(JSON.stringify(recipeList)));
              } else {
                this.$Message.info(res.msg)
              }
            });
            break;
          case 2:
            searchMed({
              ids: ids,
              status: 1
            }, 2, is_cloud).then(data => {

              let recipeItems = recipe.data.items, responeItems = data.data;
              if (data.code === 1000) {
                if (is_cloud === 1) {
                  for (var i = 0; i < recipeItems.length; i++) {
                    for (var j = 0; j < responeItems.length; j++) {
                      if (recipeItems[i].cloud_item_id == responeItems[j].id) {
                        break;
                      }
                    }
                    if (j == responeItems.length) {
                      recipeItems[i].is_match = 0;
                    } else {
                      recipeItems[i].is_match = 1;
                    }
                  }
                } else {
                  for (var i = 0; i < recipeItems.length; i++) {
                    for (var j = 0; j < responeItems.length; j++) {
                      if (recipeItems[i].item_id == responeItems[j].id) {
                        recipeItems[i].stock = responeItems[j].stock;
                        break;
                      }
                    }
                    if (j == responeItems.length) {
                      recipeItems[i].is_match = 0;
                    } else {
                      recipeItems[i].is_match = 1;
                    }
                  }
                }
                this.init_recipe(JSON.parse(JSON.stringify(recipeList)));
              } else {
                this.$Message.info(res.msg)
              }
            });
            break;
          case 3:
            searchMed({
              ids: ids,
              status: 1
            }, 3, is_cloud).then(data => {

              let recipeItems = recipe.data.items, responeItems = data.data;
              if (data.code === 1000) {
                if (is_cloud === 1) {
                  for (var i = 0; i < recipeItems.length; i++) {
                    for (var j = 0; j < responeItems.length; j++) {
                      if (recipeItems[i].cloud_item_id == responeItems[j].id) {
                        break;
                      }
                    }
                    if (j == responeItems.length) {
                      recipeItems[i].is_match = 0;
                    } else {
                      recipeItems[i].is_match = 1;
                    }
                  }
                } else {
                  for (var i = 0; i < recipeItems.length; i++) {
                    for (var j = 0; j < responeItems.length; j++) {
                      if (recipeItems[i].item_id == responeItems[j].id) {
                        recipeItems[i].stock = responeItems[j].stock;
                        break;
                      }
                    }
                    if (j == responeItems.length) {
                      recipeItems[i].is_match = 0;
                    } else {
                      recipeItems[i].is_match = 1;
                    }
                  }
                }

                this.init_recipe(JSON.parse(JSON.stringify(recipeList)));
              } else {
                this.$Message.info(res.msg)
              }
            });
            break;
          case 4:
            searchMed({
              ids: ids,
              status: 1
            }, 4).then(data => {
              let recipeItems = recipe.data.items, responeItems = data.data;
              if (data.code === 1000) {
                for (var i = 0; i < recipeItems.length; i++) {
                  for (var j = 0; j < responeItems.length; j++) {
                    if (recipeItems[i].item_id == responeItems[j].id) {
                      // 更新type字段
                      recipeItems[i].type = responeItems[j].type;
                      break;
                    }
                  }
                  if (j == responeItems.length) {
                    recipeItems[i].is_match = 0;
                  } else {
                    recipeItems[i].is_match = 1;
                  }
                }
                this.init_recipe(JSON.parse(JSON.stringify(recipeList)));
              } else {
                this.$Message.info(res.msg)
              }
            });
            break;
          case 6:
            searchMed({
              ids: ids,
              status: 1
            }, 6).then(data => {
              let recipeItems = recipe.data.items, responeItems = data.data;
              if (data.code === 1000) {
                for (var i = 0; i < recipeItems.length; i++) {
                  for (var j = 0; j < responeItems.length; j++) {
                    if (recipeItems[i].item_id == responeItems[j].id) {
                      recipeItems[i].stock = responeItems[j].stock;
                      break;
                    }
                  }
                  if (j == responeItems.length) {
                    recipeItems[i].is_match = 0;
                  } else {
                    recipeItems[i].is_match = 1;
                  }
                }
                this.init_recipe(JSON.parse(JSON.stringify(recipeList)));
              } else {
                this.$Message.info(res.msg)
              }
            });
            break;
        }
      });
    },
    getDoctorData(id) {
      getDoctorInfor({
        id: id
      }).then(res => {
        let data = res.data;
        if (res.code == 1000) {
          this.set_state_prop({key: 'department', val: data ? data.department : ''});
          this.set_state_prop({key: 'departmentCode', val: data ? data.department_code : ''})
        } else {
          this.$Message.info(res.msg)
        }
      })
    },
    getMedShop() {
      Promise.all([fetchOptionConfig({}), fetchMedshopList({})]).then(res => {
        let list = []
        if (res[0].code === 1000 && res[1].code === 1000) {
          let keys = Object.keys(res[0].data)
          keys.forEach(key => {
            if (key != 'goods_order_deliver_price') {
              if (res[0].data[key]) {
                let items = res[1].data.filter((shop) => {
                  return shop.id == res[0].data[key]
                })
                switch (key) {
                  case 'yp_medshop_id':
                    items.length > 0 ? list.push({type: 1, name: items[0].name, category: 1}) : list.push({
                      type: 1,
                      name: '',
                      category: 1
                    })
                    break
                  case 'kl_medshop_id':
                    items.length > 0 ? list.push({type: 1, name: items[0].name, category: 2}) : list.push({
                      type: 1,
                      name: '',
                      category: 2
                    })
                    break
                  case 'xy_medshop_id':
                    items.length > 0 ? list.push({type: 2, name: items[0].name}) : list.push({type: 2, name: ''})
                    break
                  case 'cp_medshop_id':
                    items.length > 0 ? list.push({type: 3, name: items[0].name}) : list.push({type: 3, name: ''})
                    break
                }
              } else {
                switch (key) {
                  case 'yp_medshop_id':
                    list.push({type: 1, name: '', category: 1})
                    break
                  case 'kl_medshop_id':
                    list.push({type: 1, name: '', category: 2})
                    break
                  case 'xy_medshop_id':
                    list.push({type: 2, name: ''})
                    break
                  case 'cp_medshop_id':
                    list.push({type: 3, name: ''})
                    break
                }
              }
            }
          })
          this.set_cloud_shop(list)
        } else {
          if (res[0].code !== 1000) {
            this.$Message.info(res[0].msg)
          } else {
            this.$Message.info(res[1].msg)
          }
        }
      })
    },
    getClinicData() {
      fetchClinic().then(
        res => {
          if (res.code === 1000) {
            this.set_state_prop({key: 'clinicType', val: res.data.service_type ? res.data.service_type : 0});
          } else {
            this.$Message.info(res.msg)
          }
        }
      ).catch(error => {
        console.log(error)
      })
    },
    addNewRecipt(type, category) {
      this.add_new_recipt({type, category})
    }
  }
};
</script>

<style>
  @import "assets/css/reset.css";

  #app {
    color: #2c3e50;
    margin-top: 3.75rem;
    padding: 0 1.25rem;
    /*background: #F5F5F5;*/
  }

  .page_content {
    display: flex;
    min-height: calc(100vh - 3.8rem);
  }

  .hidden {
    visibility: hidden;
  }

  .left {
    flex: 18;
    margin-right: 0.5rem;
    padding-right: 0.5rem;
    padding-top: 1.25rem;
    border-right: 1px solid #CCCCCC;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .right_block {
    flex: 82;
    padding-top: 1.25rem;
  }

  .middle {
    flex: 60;
    margin-right: 1rem;
    background: #ffffff;
    /*min-width: 46.25rem;*/
  }

  .right {
    flex: 22;
    background: white;
  }
</style>
