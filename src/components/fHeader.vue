<template>
  <div class="content">
    <div class="title">患者接诊</div>
    <div>
      <Button type="primary" shape="circle" class="btn-time" @click.stop="saveDraftData(1)">临时保存</Button>
      <Button type="primary" shape="circle" class="btn-cancel" @click.stop="confirmCancel">取消就诊</Button>
      <Button type="primary" shape="circle" class="btn-done" @click.stop="saveData">完成就诊</Button>
    </div>
    <preview-recipe v-if="previewOrder" @hidePreview="hidePreview"></preview-recipe>
  </div>
</template>

<script>
  import {Button} from 'iview'
  import {mapState, mapActions} from 'vuex'
  import previewRecipe from '@/components/rootMiddle/previewRecipe.vue'
  import {saveDraft, cancelOrder, waitingPage} from '@/fetch/api.js'

  export default {
    name: "fHeader",
    components: {
      Button,
      previewRecipe
    },
    data() {
      return {
        cancelOrderModal: false,
        previewOrder: false
      }
    },
    computed: {
      ...mapState({
        'recordData': state => state.recordData,
        'recipeList': state => state.recipeList,
        'patientData': state => state.patientData,
        'orderSeqno': state => state.orderSeqno,
        'currRecipe': state=> state.currRecipe
      })
    },
    methods: {
      ...mapActions([
        'change_curr_tab',
        'save_draft_data'
      ]),
      saveDraftData(canReturn) {
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
      }
    }
  }
</script>

<style scoped>
  .content {
    display: flex;
  }

  .title {
    font-size: 1.06rem;
    font-weight: 600;
    color: rgba(76, 76, 76, 1);
    line-height: 1.5rem;
    flex: 1;
    align-self: center;
  }

  .btn-time {
    background: #5096e0;
    border: none;
    font-size: 1rem;
  }

  .btn-cancel {
    background: #FC3B3B;
    border: none;
    font-size: 1rem;
  }

  .btn-done {
    background: #4DBC89;
    border: none;
    font-size: 1rem;
  }
</style>
