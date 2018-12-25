<template>
  <div class="content">
    <div class="title">患者接诊</div>
    <div>
      <Button type="primary" shape="circle" class="btn-time" @click.stop="saveDraft();">临时保存</Button>
      <Button type="primary" shape="circle" class="btn-cancel">取消就诊</Button>
      <Button type="primary" shape="circle" class="btn-done">完成就诊</Button>
    </div>
  </div>
</template>

<script>
  import {Button} from 'iview'
  import {mapState} from 'vuex'
  import {saveDraft} from '@/fetch/api.js'

  export default {
    name: "fHeader",
    components: {
      Button
    },
    computed: {
      ...mapState({
        'recordData': state => state.recordData,
        'recipeList': state => state.recipeList,
        'patientData': state => state.patientData,
        'orderSeqno': state => state.orderSeqno
      })
    },
    methods: {
      saveDraft() {
        let draftData = {
          recipeList: this.recipeList,
          recordData: this.recordData,
        }
        saveDraft({
          "patient_name": this.patientData.name,
          "patient_mobile":  this.patientData.mobile,
          "patient_sex":  this.patientData.sex,
          "patient_marital_status":  this.patientData.marital_status,
          "patient_birthday":  this.patientData.birthday,
          "order_seqno": this.orderSeqno,
          "draft": JSON.stringify(draftData),
        }).then(data => {
          console.log(data)
          if(data.code===1000){
            this.$router.go(-1)
          }else {
            this.$Message.info("保存失败");
          }
        })
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
