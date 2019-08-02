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
      <div v-if="examination" class="tpl-case-div">
        <span class="case-label">基础检查</span>
        <span>{{examination}}</span>
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
      <button class="prescription_detail_save mr2" @click.stop="useTplShow">引用模板</button>
    </div>
    <div v-if="showUseTpl" class="alert-back">
      <div class="use-tpl">
        <div class="alert-title">确定使用[{{tpl.name}}]模板？</div>
        <div class="mt20 mb10">
          使用模板将覆盖已编辑之信息
        </div>
        <div class="use-list mt10">
          <div class="record-content">
            <div class="mb10" v-if="tpl.chief_complaint">
              <span class="case-label">主述</span>
              <span>{{tpl.chief_complaint}}</span>
            </div>
            <div class="mb10" v-if="tpl.present_illness">
              <span class="case-label">现病史</span>
              <span>{{tpl.present_illness}}</span>
            </div>
            <div class="mb10" v-if="tpl.allergic_history">
              <span class="case-label">过敏史</span>
              <span>{{tpl.allergic_history}}</span>
            </div>
            <div class="mb10" v-if="tpl.personal_history">
              <span class="case-label">个人史</span>
              <span>{{tpl.personal_history}}</span>
            </div>
            <div class="mb10" v-if="tpl.past_history">
              <span class="case-label">既往史</span>
              <span>{{tpl.past_history}}</span>
            </div>
            <div class="mb10" v-if="tpl.family_history">
              <span class="case-label">家族史</span>
              <span>{{tpl.family_history}}</span>
            </div>
            <div class="mb10" v-if="tpl.prophylactic_history">
              <span class="case-label">预防接种史</span>
              <span>{{tpl.prophylactic_history}}</span>
            </div>
            <div class="mb10" v-if="examination">
              <span class="case-label">基础检查</span>
              <span>{{examination}}</span>
            </div>
            <div class="mb10" v-if="tpl.diagnosis">
              <span class="case-label">中医诊断</span>
              <span>{{tpl.diagnosis}}</span>
            </div>
            <div class="mb10" v-if="tpl.diagnosis_xy">
              <span class="case-label">诊断结果</span>
              <span>{{tpl.diagnosis_xy}}</span>
            </div>
            <div class="mb10" v-if="tpl.treat_advice">
              <span class="case-label">处理意见</span>
              <span>{{tpl.treat_advice}}</span>
            </div>
            <div class="mb10" v-if="tpl.sport_advice">
              <span class="case-label">运动建议</span>
              <span>{{tpl.sport_advice}}</span>
            </div>
            <div class="mb10" v-if="tpl.dietary_advice">
              <span class="case-label">膳食建议</span>
              <span>{{tpl.dietary_advice}}</span>
            </div>
          </div>
        </div>
        <div class=" tc mt30">
          <button class="saveBtn mr20" @click.stop="useTpl()">确认</button>
          <button class="saveBtn cancelBtn" @click.stop="useTplHide()">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";
export default {
  name: "templateRecord",
  props: ['tpl'],
  data() {
    return {
      showUseTpl: false
    }
  },
  computed: {
    examination() {
      // 计算检查结果
      var examination = JSON.parse(this.tpl.examination)
      var ret = "";
      (examination.bloodpressure_num1 || examination.bloodpressure_num2) &&
      (ret +=
        "血压" +
        examination.bloodpressure_num1 +
        "/" +
        examination.bloodpressure_num2 +
        "mmHg，");
      examination.bloodglucose &&
      (ret += "血糖" + examination.bloodglucose + "mg/ml，");
      examination.trioxypurine &&
      (ret += "尿酸" + examination.trioxypurine + "umol/L，");
      examination.heartrate &&
      (ret += "心率" + examination.heartrate + "次/分，");
      examination.breathe && (ret += "呼吸" + examination.breathe + "次/分，");
      examination.animalheat &&
      (ret += "体温" + examination.animalheat + "℃，");
      examination.weight && (ret += "体重" + examination.weight + "kg，");
      examination.info && (ret += (ret ? '\n' : '') + examination.info);
      return ret;
    },
  },
  methods: {
    ...mapActions(["set_record_prop"]),
    cancel() {
      this.$emit('close')
    },
    useTplShow () {
      this.showUseTpl = true
    },
    useTplHide () {
      this.showUseTpl = false
    },
    useTpl () {
      let self = this
      let tplData = JSON.parse(JSON.stringify(self.tpl))

      let list = ['allergic_history', 'family_history', 'diagnosis', 'personal_history', 'prophylactic_history', 'sport_advice', 'past_history', 'examination', 'dietary_advice']
      let record_list = []
      list.forEach(item => {
        if (tplData[item] && JSON.stringify(tplData[item]) != '{}') {
          if(item !== 'examination') {
            record_list.push(item)
          } else {
            let examination = JSON.parse(tplData.examination)
            try {
              Object.keys(examination).forEach(key => {
                if (examination[key] !== ''){
                  throw new Error('存在检查')
                }
              })
            }catch (e) {
              record_list.push('examination')
            }
          }
        }
      })
      self.set_record_prop({key: 'recordList', val: record_list})
      tplData.examination = JSON.parse(tplData.examination)
      console.log(tplData)
      Object.keys(tplData).forEach(function (k) {
        if (k == 'diagnosis') {
          self.set_record_prop({
            key: 'diagnosis_input',
            val: tplData['diagnosis']
          });
        } else if (k == 'diagnosis_xy') {
          self.set_record_prop({
            key: 'diagnosis_xy_input',
            val: tplData['diagnosis_xy']
          });
        }
        self.set_record_prop({
          key: k,
          val: tplData[k]
        });
      });
      self.useTplHide()
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
    overflow-y: auto;
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

  .alert-back {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 1000;
    background: rgba(255, 255, 255, 0.5);
  }

  .alert-back .use-tpl {
    background: #ffffff;
    box-shadow: 0 0.25rem 1rem 0.25rem rgba(0, 0, 0, 0.2);
    border-radius: 0.25rem;
    z-index: 1050;
    position: relative;
    top: 50%;
    left: 50%;
    width: 50rem;
    padding: 1.25rem 3.125rem;
    max-height: 50rem;
    font-size: 0.875rem;
    overflow: auto;
    font-weight: bold;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
  .alert-title {
    text-align: center;
    font-weight: 900;
    font-size: 1rem;
    color: #5f95da;
  }

  .use-tpl .use-list {
    display: flex;
    flex-wrap: wrap;
  }

  .use-tpl .use-list .use-list-li {
    width: 33.3%;
    font-size: 0.875rem;
  }
  .saveBtn {
    font-size: 0.875rem;
    color: #ffffff;
    font-weight: bold;
    width: 8.75rem;
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
  .record-content {
    width: 100%;
    font-weight: normal;
    max-height: 50vh;
    overflow-y: auto;
  }
</style>
