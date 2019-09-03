<template>
  <div class="prescription_tab_bg">
    <div class="prescription_tab">
      <div class="alert-title mb20">项目设置</div>
      <section class="displayFlex">
        <div class="label_text">项目类型</div>
        <div class="check_box">
          <CheckboxGroup v-model="recordList">
            <Checkbox label="allergic_history">过敏史</Checkbox>
            <Checkbox label="personal_history">个人史</Checkbox>
            <Checkbox label="past_history">既往史</Checkbox>
            <br>
            <Checkbox label="family_history">家族史</Checkbox>
            <Checkbox label="prophylactic_history">预防接种史</Checkbox>
            <Checkbox label="examination">体格检查</Checkbox>
            <br>
            <Checkbox label="diagnosis">中医诊断</Checkbox>
            <Checkbox label="sport_advice">运动建议</Checkbox>
            <Checkbox label="dietary_advice">膳食建议</Checkbox>
            <br>
            <Checkbox label="auxiliary_examination">辅助检查</Checkbox>
          </CheckboxGroup>
        </div>
      </section>
      <div class="tc mt15">
        <button class="saveBtn mr20" @click.stop="submitData">提交</button>
        <button class="saveBtn cancelBtn" @click.stop="cancel">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
import {Checkbox, CheckboxGroup} from "iview";
import {mapState, mapActions} from "vuex";

export default {
  name: "recordSet",
  components: {
    Checkbox,
    CheckboxGroup
  },
  data() {
    return {
      recordList: []
    }
  },
  created () {
    this.recordList = this.$store.state.recordData.recordList
  },
  methods: {
    ...mapActions(['set_record_prop']),
    submitData () {
      this.set_record_prop({ key: 'recordList', val: this.recordList});
      this.$emit('close')
    },
    cancel () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
  .prescription_tab_bg {
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.5);
    z-index: 500;
    position: fixed;
    top: 0;
    left: 0;
  }

  .prescription_tab {
    z-index: 998;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    left: 50%;
    width: 556px;
    height: auto;
    background: #fff;
    padding: 1.5rem 4.5rem 2rem;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  .alert-title {
    text-align: center;
    font-weight: 900;
    font-size: 1rem;
    color: #5f95da;
  }

  .label_text {
    font-size: 0.9375rem;
    font-weight: bold;
    margin-right: 1.25rem;
  }

  .check_box .ivu-checkbox-wrapper {
    font-size: 0.875rem;
    width: 6.25rem;
    margin-right: 0;
    margin-bottom: 0.9375rem;
  }

  .saveBtn {
    font-size: 0.875rem;
    color: #ffffff;
    font-weight: bold;
    width: 7.5rem;
    text-align: center;
    padding: 0.375rem 0;
    background: #5096e0;
    border-radius: 6.25rem;
    border: none;
  }

  .cancelBtn {
    background: #ffffff;
    border: 0.0625rem solid #5096e0;
    color: #5096e0;
  }
</style>
