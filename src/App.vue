<template>
  <div id="app" :style="{'background':$route.fullPath == '/root'?'':'#f5f5f5','padding-top':$route.fullPath == '/root'?'':'1.25rem'}">
    <div class="page_content" v-if="initFinish">
      <router-view style="flex: 1;"></router-view>
      <router-view class="left" name="Left"/>
      <div class="right_block" v-if="$route.fullPath == '/root'">
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

  import {getTreatOrderDetail, loadDraft, searchMed, canRecipeHelp} from "@/fetch/api.js";
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
        initFinish: false,
      };
    },
    computed: {
      ...mapState({
        patientData: state => state.patientData,
      })
    },
    created() {
      this.init();
      this.loadDraftData();
      this.getRecipeHelp();
    },
    // watch:{
    //   $route:{
    //     deep:true,
    //     handler:function (newVal, oldVal) {
    //       console.log(newVal)
    //
    //     }
    //   }
    // },
    methods: {
      ...mapActions(['set_patient_info', 'set_order_seqno', 'init_recipe', 'init_recode', 'set_state_prop', 'set_recipe_help', 'change_curr_tab']),
      init() {
        let params = {order_seqno: this.getOrderSeqno('orderSeqno')};
        this.showLoader = true;
        this.set_order_seqno(this.getOrderSeqno('orderSeqno'));
        getTreatOrderDetail(params).then(res => {
          if (res.code === 1000) {
            let data = res.data;
            let patientData = this.patientData;
            Object.keys(patientData).forEach((item) => {
              let val = data['patient_' + item]
              if (val != null) {
                this.set_patient_info({key: item, val})
              }
            })
            this.set_state_prop({key: 'isFirst', val: data.is_first});
            this.set_state_prop({key: 'treatPrice', val: data.treat_price});
            this.set_state_prop({key: 'doctorName', val: data.doctor_name});
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
              this.showLoader = false;
              return
            }
            ;
            let result = JSON.parse(data.data);
            try {
              this.checkOrder(result.recipeList);
              this.showLoader = false;
              this.change_curr_tab(result.currRecipe !== undefined ? result.currRecipe : -1);
              this.init_recode(JSON.parse(JSON.stringify(result.recordData)));
            } catch (e) {
              console.log(e)
            }

          } else {
            this.$Message.info(data.msg)
          }
        })
      },
      //检查草稿箱
      checkOrder(recipeList) {
        recipeList.forEach(recipe => {
          if (recipe.data.items.length === 0) {
            return
          }
          let ids = recipe.data.items.map(med => {
            return med.item_id
          });
          switch (recipe.type) {
            case 1:
              searchMed({
                ids: ids,
                category: recipe.data.category,
                status: 1
              }, 1).then(data => {
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
            case 2:
              searchMed({
                ids: ids,
                status: 1
              }, 2).then(data => {

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
            case 4:
              searchMed({
                ids:ids,
                status: 1
              }, 4).then(data => {
                let recipeItems = recipe.data.items, responeItems = data.data;
                if (data.code === 1000) {
                  for (var i = 0; i < recipeItems.length; i++) {
                    for (var j = 0; j < responeItems.length; j++) {
                      if (recipeItems[i].item_id == responeItems[j].id) {
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
              })
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
      getRecipeHelp() {
        canRecipeHelp({}).then(
          data => {
            this.set_recipe_help(data.data)
          }
        )
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
    min-height: calc(100vh - 5rem);
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
