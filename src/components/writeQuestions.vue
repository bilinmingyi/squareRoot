<template>
  <div class="prescription_tab_bg">
    <div class="prescription_tab">
      <div class="alert-title">
        <div class="outpatient-name">{{currQuestions.name}}</div>
        <div class="outpatient-patient">{{patientData.name}}/{{patientData.sex|parseSex}}/{{patientData.age}}岁</div>
        <div>
          <button class="save-btn mr10" @click.stop="saveData()">保存</button>
          <button class="save-btn mr10 print-btn" @click.stop="printPrescription()">打印</button>
          <button class="save-btn delete-btn" @click.stop="cancel(0)">返回</button>
        </div>
      </div>
      <div class="question-content">
        <div v-for="(item, index) in contentList" :key="item.id">
          <section v-if="item.type === 'radio'">
            <div class="question-item-text">{{index+1}}、{{item.question}}(单选题)</div>
            <div class="mt16 mb16 align-item">
              <RadioGroup v-model="item.answer">
                <Radio v-for="opt in item.options" :label="opt" class="mr30" :key="item.id + opt"></Radio>
                <Radio v-if="item.has_comment == 1" label="其他"></Radio>
                <div v-if="item.has_comment == 1" style="display: inline-block">
                  (<input class="other-input" v-model="item.comment"/>)
                </div>
              </RadioGroup>
            </div>
          </section>
          <section v-if="item.type === 'checkbox'">
            <div class="question-item-text">{{index+1}}、{{item.question}}(多选题)</div>
            <div class="mt16 mb16 align-item">
              <CheckboxGroup v-model="item.answer">
                <Checkbox v-for="opt in item.options" :label="opt" class="mr30" :key="item.id + opt"></Checkbox>
                <Checkbox v-if="item.has_comment == 1" label="其他"></Checkbox>
                <div v-if="item.has_comment == 1" style="display: inline-block">
                  (<input class="other-input" v-model="item.comment"/>)
                </div>
              </CheckboxGroup>
            </div>
          </section>
          <section v-if="item.type === 'input'">
            <div class="question-item-text">{{index+1}}、{{item.question}}</div>
            <div class="mt16 mb16 align-item" style="width: 30.25rem">
              <Input :autosize="{minRows: 2,maxRows: 5}" type="textarea" placeholder="请填写回答"
                     v-model="item.answer"></Input>
            </div>
          </section>
        </div>
      </div>
    </div>
    <f-loader v-if="showLoading"></f-loader>
    <div id="printQuestion" style="display: none">
      <section style="color: #000000;">
        <div
          style="width: 100%;height: 35px;text-align: center;line-height: 35px;font-weight: bold;font-size: 32px;margin-bottom: 10px"
        >{{clinicName}}
        </div>
        <div
          style="width: 100%;height: 35px;text-align: center;line-height: 35px;font-size: 20px;font-weight: bold;margin-bottom: 24px;letter-spacing: 5px;">
          问诊表
        </div>
        <div>
          <div style="border: 5px double #000;font-size: 16px;padding: 10px;margin-bottom: 20px">
            <div style="display: flex;margin-bottom: 10px">
              <div style="flex: 1;display: flex;">
                <div style="width: 70px;text-align: justify;text-align-last:justify;margin-right: 16px;">姓名</div>
                <div>{{patientData.name}}</div>
              </div>
              <div style="flex: 1;display: flex;">
                <div style="width: 70px;text-align: justify;text-align-last:justify;margin-right: 16px;">性别</div>
                <div>{{patientData.sex|parseSex}}</div>
              </div>
              <div style="flex: 1;display: flex;">
                <div style="width: 70px;text-align: justify;text-align-last:justify;margin-right: 16px;">出生日期</div>
                <div>{{patientData.birthday|dateFormat('yyyy-MM-dd')}}</div>
              </div>
            </div>
            <div style="display: flex">
              <div style="flex: 1;display: flex;">
                <div style="width: 70px;text-align: justify;text-align-last:justify;margin-right: 16px;">婚姻</div>
                <div>
                  <span v-if="patientData.marital_status == 0">保密</span>
                  <span v-if="patientData.marital_status == 1">已婚</span>
                  <span v-if="patientData.marital_status == 2">未婚</span>
                </div>
              </div>
              <div style="flex: 1;display: flex;">
                <div style="width: 70px;text-align: justify;text-align-last:justify;margin-right: 16px;">体重</div>
                <div>{{patientData.weight}}KG</div>
              </div>
              <div style="flex: 1;display: flex;">
                <div style="width: 70px;text-align: justify;text-align-last:justify;margin-right: 16px;">联系电话</div>
                <div>{{patientData.mobile}}</div>
              </div>
            </div>
          </div>
        </div>
        <div style="font-size: 14px;column-count: 2;column-rule: 1px solid #CCCCCC">
          <div v-for="(item, index) in contentList" :key="item.id">
            <section v-if="item.type === 'radio'" style="margin-bottom: 10px">
              <div style="font-weight: bold">{{index+1}}、{{item.question}}(单选题)</div>
              <div style="margin-top: 10px">
                <span v-for="opt in item.options">
                  <span v-if="item.answer == opt">
                    <input checked type="radio" :name="item.id" :key="item.id + opt" :value="opt">

                    {{opt}}
                  </span>
                  <span v-else>
                    <input type="radio" :name="item.id" :key="item.id + opt" :value="opt">
                    {{opt}}
                  </span>

                </span>
                <span v-if="item.has_comment == 1">
                  <span v-if="item.answer == '其他'">
                    <input type="radio" :name="item.id" value="其他" checked>其他
                  </span>
                   <span v-else>
                    <input type="radio" :name="item.id" value="其他">其他
                  </span>
                   (<div style="display: inline-block;">
                     <div
                       style="display: flex;align-items: center;justify-content: center;border-bottom: 1px solid #000000;min-width: 120px;text-align: center;height: 22px">{{item.comment}}</div>
                   </div>)
                </span>
              </div>
            </section>
            <section v-if="item.type === 'checkbox'" style="margin-bottom: 10px">
              <div style="font-weight: bold">{{index+1}}、{{item.question}}(多选题)</div>
              <div style="margin-top: 10px">
                <span v-for="opt in item.options">
                  <span v-if="item.answer.indexOf(opt)>=0">
                    <input checked type="checkbox" :name="item.id" :value="opt"
                           :key="item.id + opt"/>{{opt}}
                  </span>
                  <span v-else>
                    <input type="checkbox" :name="item.id" :value="opt"
                           :key="item.id + opt"/>{{opt}}
                  </span>

                </span>
                <span v-if="item.has_comment == 1">
                  <span v-if="item.answer.indexOf('其他')>=0">
                    <input type="checkbox" checked :name="item.id" value="其他"/>其他
                  </span>
                  <span v-else>
                    <input type="checkbox" :name="item.id" value="其他"/>其他
                  </span>
                  (<div style="display: inline-block;">
                     <div
                       style="display: flex;align-items: center;justify-content: center;border-bottom: 1px solid #000000;min-width: 120px;text-align: center;height: 22px">{{item.comment}}</div>
                   </div>)
                </span>
              </div>
            </section>
            <section v-if="item.type === 'input'" style="margin-bottom: 10px">
              <div>{{index+1}}、{{item.question}}</div>
              <div style="margin-top: 10px;margin-bottom: 10px">
                <textarea style="width: 300px;padding: 10px;resize: none;border-radius: 4px"
                          rows="2">{{item.answer}}</textarea>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from "vuex";
import {Input, Radio, RadioGroup, CheckboxGroup, Checkbox} from 'iview'
import {updateTreatAnswer} from "@/fetch/api.js";
import fLoader from '@/components/fLoader.vue'
import {clinicName} from '@/assets/js/mapType.js'

export default {
  name: "writeQuestions",
  props: {
    currIndex: {
      type: Number,
      default: 0
    }
  },
  components: {
    Input,
    Radio,
    RadioGroup,
    CheckboxGroup,
    Checkbox,
    fLoader
  },
  data() {
    return {
      outpatientList: [],
      currQuestions: {},
      contentList: [],
      showLoading: false,
      clinicName: clinicName
    }
  },
  computed: {
    ...mapState({
      'patientData': state => state.patientData
    })
  },
  created() {
    this.outpatientList = this.$store.state.recordData.outpatient_table
    this.currQuestions = this.outpatientList[this.currIndex]
    this.contentList = JSON.parse(this.currQuestions.content)
  },
  methods: {
    ...mapActions([
      'set_record_prop',
    ]),
    saveData() {
      this.showLoading = true
      updateTreatAnswer({
        'id': this.currQuestions.patient_answer_id,
        'content': JSON.stringify(this.contentList)
      })
        .then(res => {
          this.showLoading = false
          if (res.code === 1000) {
            this.outpatientList[this.currIndex].content = JSON.stringify(this.contentList)
            this.set_record_prop({key: 'outpatient_table', val: this.outpatientList})
            this.cancel(1)
          } else {
            this.$Message.info(res.msg)
          }
        }).catch(e => {
        this.showLoading = false
        console.log(e)
      })
    },
    printPrescription: function () {
      var el = document.getElementById('printQuestion');
      var iframe = document.createElement("IFRAME");
      var doc = null;
      iframe.setAttribute(
        "style",
        "position:absolute;width:0px;height:0px;left:-500px;top:-500px;"
      );
      document.body.appendChild(iframe);
      doc = iframe.contentWindow.document;
      doc.write("<LINK rel='stylesheet' type='text/css'>");
      doc.write("<div>" + el.innerHTML + "</div>");
      doc.close();
      setTimeout(() => {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
      }, 300)
      if (navigator.userAgent.indexOf("MSIE") > 0) {
        document.body.removeChild(iframe);
      }
      this.$emit('reset')
    },
    cancel(canSave) {
      this.$emit('close', canSave)
    },
  }
}
</script>

<style scoped>

  .align-item {
    display: flex;
    align-items: center;
  }

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
    width: 50rem;
    height: auto;
    background: #fff;
    padding: 0 2.5rem;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
    border-radius: 0.25rem;
  }

  .alert-title {
    display: flex;
    align-items: center;
    padding: 1.5rem 0 1.25rem;
  }

  .alert-title .outpatient-name {
    color: #5096E0;
    margin-right: 1.25rem;
    font-size: 1rem;
    font-weight: bold;
  }

  .alert-title .outpatient-patient {
    color: #4C4C4C;
    font-size: 1rem;
    font-weight: bold;
    flex: 1;
  }

  .alert-title .save-btn {
    font-size: 0.875rem;
    line-height: 1.875rem;
    width: 5.625rem;
    text-align: center;
    background: #5096E0;
    border-radius: 0.9375rem;
    border: none;
    color: #fff
  }

  .alert-title .print-btn {
    background: #4DBC89;
  }

  .alert-title .delete-btn {
    background: #fc3b3b;
  }

  .question-content {
    border-radius: 0.5rem;
    border: 1px solid rgba(80, 150, 224, 1);
    max-height: 70vh;
    overflow-y: scroll;
    padding: 1.25rem 1.25rem 0;
    margin-bottom: 2.5rem;
    font-size: 0.875rem;
  }

  .question-item-text {
    color: #4C4C4C;
    font-weight: bold;
  }

  .other-input {
    border: none;
    border-bottom: 1px solid #CCCCCC;
    outline: none;
    padding: 0 0.25rem;
    text-align: center;
  }
</style>
