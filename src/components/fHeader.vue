<template>
  <div class="content">
    <div class="titleLeft">
      <ul class="recipe_tab">
        <li :class="['tab_li',{'currentLi': -1 === currRecipe}]" @click.stop="change_curr_tab(-1)">
          {{clinicType == 6 ? '健康档案' : '患者病历'}}
          <div class="green_line" v-show="-1 === currRecipe"></div>
        </li>
        <li v-for="(recipe,index) in recipeList" :class="['tab_li',{'currentLi':index === currRecipe}]"
            @click.stop="change_curr_tab(index)">
          {{recipe.type|recipeType(recipe.data.category, clinicType)}}
          <div class="green_line" v-show="index === currRecipe"></div>
        </li>
      </ul>
    </div>
    <div class="titleRight">
      <div class="add_btn">
        <Dropdown>
          <div style="display:flex;align-items: center">
            <img class="add_btn_icon" src="../assets/img/tj@2x.png">添加处方
          </div>
          <DropdownMenu slot="list">
            <DropdownItem @click.stop.native="addNewRecipt(1, 1)" v-if="clinicType!=6">中药饮片</DropdownItem>
            <DropdownItem @click.stop.native="addNewRecipt(1, 2)" v-if="clinicType!=6">配方颗粒</DropdownItem>
            <DropdownItem @click.stop.native="addNewRecipt(2)" v-if="clinicType!=6">中成药西药</DropdownItem>
            <DropdownItem @click.stop.native="addNewRecipt(4)">诊疗项目</DropdownItem>
            <DropdownItem @click.stop.native="addNewRecipt(3)">{{clinicType== 6 ? '营养处方' : '产品处方'}}</DropdownItem>
            <DropdownItem @click.stop.native="addNewRecipt(6)" v-if="clinicType!=6">材料处方</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div class="add_btn" @click.stop="saveDraftData(1)">
        <img class="add_btn_icon" src="../assets/img/ls@2x.png">
        临时保存
      </div>
      <div class="add_btn" @click.stop="saveData">
        <img class="add_btn_icon" src="../assets/img/wc@2x.png">
        完成就诊
      </div>
    </div>
    <preview-recipe v-if="previewOrder" @hidePreview="hidePreview"></preview-recipe>
    <f-loader v-if="showLoading"></f-loader>
  </div>
</template>

<script>
  import {Button, Dropdown, DropdownMenu, DropdownItem} from 'iview'
  import {mapState, mapActions} from 'vuex'
  import previewRecipe from '@/components/rootMiddle/previewRecipe.vue'
  import {saveDraft, cancelOrder, waitingPage} from '@/fetch/api.js'
  import fLoader from '@/components/fLoader.vue'

  export default {
    name: "fHeader",
    components: {
      Button,
      previewRecipe,
      Dropdown,
      DropdownMenu,
      DropdownItem,
      fLoader
    },
    data() {
      return {
        cancelOrderModal: false,
        previewOrder: false,
        showLoading: false
      }
    },
    computed: {
      ...mapState({
        'recordData': state => state.recordData,
        'recipeList': state => state.recipeList,
        'patientData': state => state.patientData,
        'orderSeqno': state => state.orderSeqno,
        'currRecipe': state => state.currRecipe,
        'clinicType': state => state.clinicType
      })
    },
    methods: {
      ...mapActions([
        'change_curr_tab',
        'save_draft_data',
        'add_new_recipt',
      ]),
      saveDraftData(canReturn) {
        if (canReturn === 1) {
          this.showLoading = true;
        }
        let draftData = {
          recipeList: this.recipeList,
          recordData: this.recordData,
          currRecipe: this.currRecipe
        }
        this.save_draft_data(JSON.stringify(draftData));
        saveDraft({
          "patient_name": this.patientData.name,
          "patient_mobile": this.patientData.mobile,
          "patient_sex": this.patientData.sex,
          "patient_marital_status": this.patientData.marital_status,
          "patient_birthday": this.patientData.birthday,
          "order_seqno": this.orderSeqno,
          "draft": JSON.stringify(draftData),
        }).then(data => {
          if (data.code === 1000) {
            if (canReturn === 1) {
              try {
                window.location.href = waitingPage
              } catch (e) {
                this.$router.go(-1)
              }

            }
          } else {
            this.showLoading = false;
            this.$Message.info("保存失败");
          }
        })
      },
      confirmCancel() {
        this.$Modal.confirm({
          title: '操作',
          content: '<p style="font-size: 1rem;">确定要取消就诊？</p>',
          onOk: () => {
            this.cancelOrderFn();
          },
          onCancel: () => {

          }
        });
      },
      cancelOrderFn() {
        cancelOrder({
          order_seqno: this.orderSeqno
        }).then(res => {
          if (res.code == 1000) {
            this.$router.go(-1);
          } else {
            this.$Message.error(res.msg);
          }
        })
      },
      saveData() {
        let resultList = this.recipeList.filter(item => {
          return item.data.items.length !== 0
        });
        if (resultList.length === 0) {
          this.$Message.info("至少添加一个完整的处方！");
          return
        }
        try {
          this.recipeList.forEach((item, index) => {
              item.data.items.forEach(med => {
                if (med.is_match !== 1) {
                  this.change_curr_tab(index)
                  throw new Error("药品名不匹配:请删除[" + med.name + "]")
                }
                if (med.num <= 0) {
                  this.change_curr_tab(index)
                  throw new Error("请重新填写[" + med.name + "]的数量！")
                }
                if (med.unit == '' && item.type === 2) {
                  this.change_curr_tab(index)
                  throw new Error("请重新选择[" + med.name + "]的单位！")
                }
              })

              if (item.data.dosage <= 0 && item.type === 1) {
                this.change_curr_tab(index)
                throw new Error("请填写处方的剂数！")
              }
            }
          )
        } catch (e) {
          this.$Message.info(e.message)
          return
        }
        this.previewOrder = true;
        this.saveDraftData();
      },
      hidePreview() {
        this.previewOrder = false
      },
      addNewRecipt(type, category) {
        this.add_new_recipt({type, category})
      }
    }
  }
</script>

<style scoped>
  .content {
    display: flex;
    border-bottom: 2px solid #CCCCCC;
    margin-bottom: 1rem;
  }

  .titleLeft {
    flex: 60;
  }

  .titleRight {
    flex: 22;
    display: flex;
  }

  .recipe_tab {
    display: flex;
    flex-wrap: wrap;
  }

  .recipe_tab .tab_li {

    width: 7.5rem;
    height: 2.19rem;
    font-size: 1rem;
    font-weight: 400;
    color: #8C8C8C;
    line-height: 2.19rem;
    text-align: center;
    cursor: pointer;
  }

  .recipe_tab .currentLi {
    color: rgba(77, 188, 137, 1);
    font-weight: 600;
  }

  .recipe_add {
    width: 3.75rem;
    height: 2.19rem;
    line-height: 2.19rem;
    background: rgba(225, 225, 225, 1);
    border-radius: 0.5rem 0.5rem 0rem 0rem;
    color: rgba(140, 140, 140, 1);
    font-weight: bold;
    font-size: 1.6rem;
    border: none;
  }

  .green_line {
    height: 0.25rem;
    width: 100%;
    background: rgba(77, 188, 137, 1);
    -webkit-transform: translateY(-0.0625rem);
    -moz-transform: translateY(-0.0625rem);
    -ms-transform: translateY(-0.0625rem);
    -o-transform: translateY(-0.0625rem);
    transform: translateY(-0.0625rem);
  }

  .add_btn {
    flex: 1;
    font-size: 1rem;
    color: #8C8C8C;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-self: center;
    line-height: 2.19rem;
    height: 2.19rem;
    cursor: pointer;
  }

  .add_btn_icon {
    width: 1rem;
    height: 1rem;
    display: inline-block;
    align-self: center;
    margin-right: 0.1875rem;
  }
</style>
