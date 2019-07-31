<template>
  <div>
    <div class="prescription_detail_btn" @click.stop="cancel">返回</div>
    <div class="search-result-title">
      <span>{{tpl.name}}</span>
      <span v-if="tpl.source">({{tpl.source}})</span>
    </div>
    <div class="search-result-line"></div>
    <div class="ml10 mb20 tpl-content">
      <div v-if="tpl.chief_complaint" class="tpl-case-div">
        <span class="case-label">主述</span>
        <span>{{tpl.chief_complaint}}</span>
      </div>
      <div v-if="tpl.present_illness" class="tpl-case-div">
        <span class="case-label">现病史</span>
        <span>{{tpl.present_illness}}</span>
      </div>
      <div v-if="tpl.allergic_history" class="tpl-case-div">
        <span class="case-label">过敏史</span>
        <span>{{tpl.allergic_history}}</span>
      </div>
      <div v-if="tpl.personal_history" class="tpl-case-div">
        <span class="case-label">个人史</span>
        <span>{{tpl.personal_history}}</span>
      </div>
      <div v-if="tpl.past_history" class="tpl-case-div">
        <span class="case-label">既往史</span>
        <span>{{tpl.past_history}}</span>
      </div>
      <div v-if="tpl.family_history" class="tpl-case-div">
        <span class="case-label">家族史</span>
        <span>{{tpl.family_history}}</span>
      </div>
      <div v-if="tpl.prophylactic_history" class="tpl-case-div">
        <span class="case-label">预防接种史</span>
        <span>{{tpl.prophylactic_history}}</span>
      </div>
      <div v-if="tpl.examination" class="tpl-case-div displayFlex" style="padding-bottom: 0">
        <span class="case-label" style="width: 4.25rem;">基础检查</span>
        <div
          style="white-space:pre-wrap; flex:1;"
        >{{tpl.examination}}
        </div>
      </div>

      <div v-if="tpl.diagnosis" class="tpl-case-div">
        <span class="case-label">中医诊断</span>
        <span>{{tpl.diagnosis}}</span>
      </div>
      <div v-if="tpl.diagnosis_xy" class="tpl-case-div">
        <span class="case-label">诊断结果</span>
        <span>{{tpl.diagnosis_xy}}</span>
      </div>
      <div v-if="tpl.treat_advice" class="tpl-case-div">
        <span class="case-label">处理意见</span>
        <span>{{tpl.treat_advice}}</span>
      </div>
    </div>
    <div class="pb10">
      <button class="prescription_detail_save mr2" @click.stop="useTpl">引用模板</button>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";
export default {
  name: "templateRecord",
  props: ['tpl'],
  data() {
    return {}
  },
  methods: {
    ...mapActions(["set_record_prop"]),
    cancel() {
      this.$emit('close')
    },
    useTpl () {
      let self = this
      let tplData = JSON.parse(JSON.stringify(self.tpl))
      tplData.examination = {info: tplData.examination}
      let list = ['allergic_history', 'family_history', 'diagnosis', 'personal_history', 'prophylactic_history', 'sport_advice', 'past_history', 'examination', 'dietary_advice']
      let record_list = []
      list.forEach(item => {
        if (tplData[item] && JSON.stringify(tplData[item]) != '{}') {
          record_list.push(item)
        }
      })
      self.set_record_prop({key: 'recordList', val: record_list})
      Object.keys(tplData).forEach(function (k) {
        self.set_record_prop({
          key: k,
          val: tplData[k]
        });
      });
    }
  }
}
</script>

<style scoped>
  .prescription_detail_btn {
    width: 100%;
    height: 1.875rem;
    line-height: 1.875rem;
    font-size: 0.9375rem;
    text-align: center;
    border-radius: 0.25rem;
    color: #fff;
    background: #eeae1d;
    cursor: pointer;
  }

  .search-result-title {
    color: #4c4c4c;
    font-size: 0.9375rem;
    font-weight: bold;
    margin-left: 0.875rem;
    padding: 1rem 0 0.375rem;
  }

  .search-result-line {
    padding-bottom: 0.5625rem;
    border-bottom: 0.0625rem solid #CCCCCC;
  }

  .tpl-content {
    max-height: calc(100vh - 21rem);
    overflow-y: scroll;
    font-size: 0.875rem;
  }

  .tpl-case-div {
    margin-right: 0.5rem;
    padding: 0.5rem 0;
    border-bottom: 0.0625rem solid #c1c1c1;
    border-top: 0.0625rem transparent;
  }

  .case-label {
    font-weight: bold;
    min-width: 4rem;
    display: inline-block;
  }

  .prescription_detail_save {
    margin-left: 2%;
    width: 30%;
    height: 2rem;
    border: #5096e0 solid 0.0625rem;
    border-radius: 1.875rem;
    text-align: center;
    color: #5096e0;
    float: left;
    background-color: transparent;
  }
</style>
