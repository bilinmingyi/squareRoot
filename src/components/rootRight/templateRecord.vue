<template>
  <div>
    <div class="prescription_detail_btn" @click.stop="cancel">返回</div>
    <div class="search-result-title">
      <span>测试</span>
    </div>
    <div class="search-result-line"></div>
    <div class="ml10 mb20 tpl-content">
      <div v-if="tplData.chief_complaint" class="tpl-case-div">
        <span class="case-label">主述</span>
        <span>{{tplData.chief_complaint}}</span>
      </div>
      <div v-if="tplData.present_illness" class="tpl-case-div">
        <span class="case-label">现病史</span>
        <span>{{tplData.present_illness}}</span>
      </div>
      <div v-if="tplData.allergic_history" class="tpl-case-div">
        <span class="case-label">过敏史</span>
        <span>{{tplData.allergic_history}}</span>
      </div>
      <div v-if="tplData.personal_history" class="tpl-case-div">
        <span class="case-label">个人史</span>
        <span>{{tplData.personal_history}}</span>
      </div>
      <div v-if="tplData.past_history" class="tpl-case-div">
        <span class="case-label">既往史</span>
        <span>{{tplData.past_history}}</span>
      </div>
      <div v-if="tplData.family_history" class="tpl-case-div">
        <span class="case-label">家族史</span>
        <span>{{tplData.family_history}}</span>
      </div>
      <div v-if="tplData.prophylactic_history" class="tpl-case-div">
        <span class="case-label">预防接种史</span>
        <span>{{tplData.prophylactic_history}}</span>
      </div>
      <div v-if="tplData.examination" class="tpl-case-div displayFlex" style="padding-bottom: 0">
        <span class="case-label" style="width: 4.25rem;">基础检查</span>
        <div
          style="white-space:pre-wrap; flex:1;"
        >{{tplExamination}}
        </div>
      </div>

      <div v-if="tplData.diagnosis" class="tpl-case-div">
        <span class="case-label">中医诊断</span>
        <span>{{tplData.diagnosis}}</span>
      </div>
      <div v-if="tplData.diagnosis_xy" class="tpl-case-div">
        <span class="case-label">诊断结果</span>
        <span>{{tplData.diagnosis_xy}}</span>
      </div>
      <div v-if="tplData.treat_advice" class="tpl-case-div">
        <span class="case-label">处理意见</span>
        <span>{{tplData.treat_advice}}</span>
      </div>
      <div v-if="tplData.sport_advice" class="tpl-case-div">
        <span class="case-label">运动建议</span>
        <span>{{tplData.sport_advice}}</span>
      </div>
      <div v-if="tplData.dietary_advice" class="tpl-case-div">
        <span class="case-label">膳食建议</span>
        <span>{{tplData.dietary_advice}}</span>
      </div>
    </div>
    <div class="pb10">
      <button class="prescription_detail_save mr2">引用模板</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "templateRecord",
  data () {
    return {
      tplData: {
        category: 0,
        clinic_id: 0,
        creator_name: "",
        creator_id: "",
        id: 0,
        tplName: "",
        scope: 0,
        items: [],
        dosage: 0,
        doctor_remark: "",

        chief_complaint: "", //主诉
        present_illness: "", //病史
        allergic_history: "", //过敏史
        personal_history: "", // 个人史
        past_history: "", //既往史
        family_history: "", // 家族史
        prophylactic_history: "", // 预防接种史
        examination: "", //检查
        diagnosis: "", //中医诊断
        diagnosis_xy: "", //西医诊断
        treat_advice: "", //处理意见
        sport_advice: "", // 运动建议
        dietary_advice: "" // 膳食建议
      },
    }
  },
  computed: {
    tplExamination: function () {
      return ''
    }
  },
  methods: {
    cancel () {
      this.$emit('close')
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
