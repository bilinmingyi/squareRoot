<template>
  <!--打印病历-->
  <div id="printCase" style="display: none;position: relative;">
    <section style="color: #000000;" v-if="clinic.id == 30">
      <div style="min-height: 690px;">
        <section style="width: 100%;height: 60px;position: relative;border-bottom: 1px solid #000;">
          <div style="width: 100%;height: 32px;text-align: center;line-height: 32px;font-weight: bold;font-size: 20px;">
            {{clinicName}}
          </div>
          <div style="width: 100%;text-align: center;font-size: 16px;font-weight: bold">门诊病历</div>
        </section>
        <section style="font-size: 12px;margin: 5px 0;">
          <div style="display: flex;width: 100%;margin-bottom: 12px;">
            <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">姓名：{{patientData.name}}</div>
            <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">性别：{{patientData.sex | parseSex}}</div>
          </div>
          <div style="display: flex;width: 100%;margin-bottom: 12px;">
            <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">年龄：{{patientData.birthday | calcAge}}岁</div>
            <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">病历号：{{orderSeqno}}</div>
          </div>
          <div style="display: flex;width: 100%;margin-bottom: 12px;">
            <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">科别：{{department}}</div>
            <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">电话：{{patientData.mobile}}</div>
          </div>
          <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">
            就诊时间：{{print_createTime|dateFormat('yyyy-MM-dd hh:mm')}}</div>
        </section>
        <section style="padding-top: 5px;font-size: 12px;letter-spacing: 1px">
          <div style="margin-bottom: 10px;margin-top: 10px;display: flex">
            <div style="width: 80px;text-align: justify;text-align-last: justify;">[主诉]：</div>
            <div style="flex: 1">{{recordData.chief_complaint}}</div>
          </div>
          <div style="margin-bottom: 10px;margin-top: 10px;display: flex">
            <div style="width: 80px;text-align: justify;text-align-last: justify;">[现病史]：</div>
            <div style="flex: 1">{{recordData.present_illness}}</div>
          </div>
          <div style="margin-bottom: 10px;margin-top: 10px;display: flex" v-if="checkRecord('childbearing_history')">
            <div style="width: 80px;text-align: justify;text-align-last: justify;">[月经生育史]：</div>
            <div style="flex: 1">{{recordData.childbearing_history}}</div>
          </div>
          <div style="margin-bottom: 10px;margin-top: 10px;display: flex" v-if="checkRecord('past_history')">
            <div style="width: 80px;text-align: justify;text-align-last: justify;">[既往史]：</div>
            <div style="flex: 1">{{recordData.past_history}}</div>
          </div>
          <div style="margin-bottom: 10px;margin-top: 10px;display: flex" v-if="checkRecord('allergic_history')">
            <div style="width: 80px;text-align: justify;text-align-last: justify;">[过敏史]：</div>
            <div style="flex: 1">{{recordData.allergic_history}}</div>
          </div>
          <div style="margin-bottom: 10px;margin-top: 10px;display: flex" v-if="checkRecord('personal_history')">
            <div style="width: 80px;text-align: justify;text-align-last: justify;">[个人史]：</div>
            <div style="flex: 1">{{recordData.personal_history}}</div>
          </div>
          <div style="margin-bottom: 10px;margin-top: 10px;display: flex" v-if="checkRecord('family_history')">
            <div style="width: 80px;text-align: justify;text-align-last: justify;">[家族史]：</div>
            <div style="flex: 1">{{recordData.family_history}}</div>
          </div>
          <div style="margin-bottom: 10px;margin-top: 10px;display: flex" v-if="checkRecord('prophylactic_history')">
            <div style="width: 80px;text-align: justify;text-align-last: justify;">[预防接种史]：</div>
            <div style="flex: 1">{{recordData.prophylactic_history}}</div>
          </div>
          <div style="margin-bottom: 10px;margin-top: 10px;display: flex">
            <div style="width: 80px;text-align: justify;text-align-last: justify;">[体格检查]：</div>
            <div style="flex: 1;">
              <div class="menu_big_input">
                <div class="menu_big_input1" style="width: auto">
                  <pre style="white-space:pre-wrap; margin: 0; font-family: 'microsoft yahei';">{{examination}}</pre>
                </div>
              </div>
            </div>
          </div>
          <div style="margin-bottom: 10px;margin-top: 10px;display: flex">
            <div style="width: 80px;text-align: justify;text-align-last: justify;">[辅助检查]：</div>
            <div style="flex: 1">{{recordData.auxiliary_examination}}</div>
          </div>
          <div style="margin-bottom: 10px;margin-top: 10px;display: flex" v-if="checkRecord('diagnosis')">
            <div style="width: 80px;text-align: justify;text-align-last: justify;">[中医诊断]：</div>
            <div style="flex: 1">{{recordData.diagnosis}}</div>
          </div>

          <div style="margin-bottom: 10px;margin-top: 10px;display: flex">
            <div style="width: 80px;text-align: justify;text-align-last: justify;">[初步诊断]：</div>
            <div style="flex: 1">{{recordData.diagnosis_xy}}</div>
          </div>
          <div style="margin-bottom: 10px;margin-top: 10px;display: flex">
            <div style="width: 80px;text-align: justify;text-align-last: justify;">[治疗处理]：</div>
            <div style="flex: 1">{{recordData.treat_advice}}</div>
          </div>
          <div style="margin-bottom: 10px;margin-top: 10px;display: flex" v-if="checkRecord('sport_advice')">
            <div style="width: 80px;text-align: justify;text-align-last: justify;">[运动建议]：</div>
            <div style="flex: 1">{{recordData.sport_advice}}</div>
          </div>
          <div style="margin-bottom: 10px;margin-top: 10px;display: flex" v-if="checkRecord('dietary_advice')">
            <div style="width: 80px;text-align: justify;text-align-last: justify;">[饮食建议]：</div>
            <div style="flex: 1">{{recordData.dietary_advice}}</div>
          </div>
        </section>
        <section style="font-size: 12px;display: flex;margin-top: 20px">
          <div style="flex: 1;"></div>
          <div style="width: 150px">
            <span>{{clinicType == 6 ? '营养师' : '医生'}}签名：</span>
          </div>
        </section>
        <section style="font-size: 12px;display: flex;margin-top: 5px;">
          <div style="flex: 1;"></div>
          <div style="width: 150px">
            <span>日期：{{new Date() | dateFormat('yyyy-MM-dd')}}</span>
          </div>
        </section>
      </div>
      <section style="font-size: 12px;padding-top: 3px;border-top: 1px solid #000000;width: 100vw;text-align: center;">
        <span style="padding-right: 5px">地址：{{clinic.city_name}}市{{clinic.county_name}}区{{clinic.address}}</span>
        <span>服务热线：{{clinic.customer_phone}}</span>
      </section>
    </section>
    <section style="color: #000000;" v-else>
      <div style="width: 100%;height: 35px;text-align: center;line-height: 35px;font-weight: bold;font-size: 20px;margin-bottom: 20px">{{clinicName}}病历
      </div>
      <section style="border-bottom: #000000 solid 2px;border-top: #000000 solid 2px;padding: 10px 0px;font-size: 12px;">
        <div style="width: 100%;height: auto;margin-bottom: 5px; display: flex;">
          <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">
            <span style="font-weight: bolder">姓名：</span>
            {{patientData.name}}
          </div>
          <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">
            <span style="font-weight: bolder">性别：</span>
            {{patientData.sex | parseSex}}
          </div>
          <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">
            <span style="font-weight: bolder">年龄：</span>
            {{patientData.birthday | calcAge}}岁
          </div>
        </div>
        <div style="width: 100%;height: auto;margin-bottom: 5px; display: flex;">
          <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">
            <span style="font-weight: bolder">科室：{{department}}</span>
          </div>
          <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">
            <span style="font-weight: bolder">日期：</span>
            {{new Date() | dateFormat('yyyy-MM-dd')}}
          </div>
          <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">
            <span style="font-weight: bolder">费别：{{isYB==0?'自费':'医保'}}</span>
          </div>
        </div>

        <div style="width: 100%;height: auto;margin-bottom: 5px; display: flex;">
          <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">
            <span style="font-weight: bolder">病历号：</span>
            {{orderSeqno}}
          </div>
          <div style="flex: 2;-webkit-flex: 2;-ms-flex: 2;">
            <span style="font-weight: bolder">
              家庭住址：
            </span>
            {{patientData.province_name}}{{patientData.city_name}}{{patientData.county_name}}{{patientData.address}}
          </div>
        </div>
      </section>
      <section style="padding: 10px 0;font-size: 12px;letter-spacing: 1px">
        <div style="margin-bottom: 10px;margin-top: 10px;display: flex">
          <div style="width: 80px;text-align: right;padding-right: 6px">主诉：</div>
          <div style="flex: 1">{{recordData.chief_complaint}}</div>
        </div>
        <div style="margin-bottom: 10px;margin-top: 10px;display: flex">
          <div style="width: 80px;text-align: right;padding-right: 6px">现病史：</div>
          <div style="flex: 1">{{recordData.present_illness}}</div>
        </div>
        <div style="margin-bottom: 10px;margin-top: 10px;display: flex" v-if="checkRecord('childbearing_history')">
          <div style="width: 80px;text-align: justify;text-align-last: justify;">月经生育史：</div>
          <div style="flex: 1">{{recordData.childbearing_history}}</div>
        </div>
        <div style="margin-bottom: 10px;margin-top: 10px;display: flex" v-if="checkRecord('past_history')">
          <div style="width: 80px;text-align: right;padding-right: 6px">既往史：</div>
          <div style="flex: 1">{{recordData.past_history}}</div>
        </div>
        <div style="margin-bottom: 10px;margin-top: 10px;display: flex" v-if="checkRecord('allergic_history')">
          <div style="width: 80px;text-align: right;padding-right: 6px">过敏史：</div>
          <div style="flex: 1">{{recordData.allergic_history}}</div>
        </div>
        <div style="margin-bottom: 10px;margin-top: 10px;display: flex" v-if="checkRecord('personal_history')">
          <div style="width: 80px;text-align: right;padding-right: 6px">个人史：</div>
          <div style="flex: 1">{{recordData.personal_history}}</div>
        </div>
        <div style="margin-bottom: 10px;margin-top: 10px;display: flex" v-if="checkRecord('family_history')">
          <div style="width: 80px;text-align: right;padding-right: 6px">家族史：</div>
          <div style="flex: 1">{{recordData.family_history}}</div>
        </div>
        <div style="margin-bottom: 10px;margin-top: 10px;display: flex" v-if="checkRecord('prophylactic_history')">
          <div style="width: 80px;text-align: right;padding-right: 6px">预防接种史：</div>
          <div style="flex: 1">{{recordData.prophylactic_history}}</div>
        </div>
        <div style="margin-bottom: 10px;margin-top: 10px;display: flex" v-if="checkRecord('examination')">
          <div style="width: 80px;text-align: right;padding-right: 6px">体格检查：</div>
          <div style="flex: 1;">
            <div class="menu_big_input">
              <div class="menu_big_input1" style="width: auto">
                <pre style="white-space:pre-wrap; margin: 0; font-family: 'microsoft yahei';">{{examination}}</pre>
              </div>
            </div>
          </div>
        </div>
        <div style="margin-bottom: 10px;margin-top: 10px;display: flex" v-if="checkRecord('auxiliary_examination')">
          <div style="width: 80px;text-align: right;padding-right: 6px">辅助检查：</div>
          <div style="flex: 1">{{recordData.auxiliary_examination}}</div>
        </div>
        <div style="margin-bottom: 10px;margin-top: 10px;display: flex" v-if="checkRecord('diagnosis')">
          <div style="width: 80px;text-align: right;padding-right: 6px">中医诊断：</div>
          <div style="flex: 1">{{recordData.diagnosis}}</div>
        </div>

        <div style="margin-bottom: 10px;margin-top: 10px;display: flex">
          <div style="width: 80px;text-align: right;padding-right: 6px">初步诊断：</div>
          <div style="flex: 1">{{recordData.diagnosis_xy}}</div>
        </div>
        <div style="margin-bottom: 10px;margin-top: 10px;display: flex">
          <div style="width: 80px;text-align: right;padding-right: 6px">治疗处理：</div>
          <div style="flex: 1">{{recordData.treat_advice}}</div>
        </div>
        <div style="margin-bottom: 10px;margin-top: 10px;display: flex" v-if="checkRecord('sport_advice')">
          <div style="width: 80px;text-align: right;padding-right: 6px">运动建议：</div>
          <div style="flex: 1">{{recordData.sport_advice}}</div>
        </div>
        <div style="margin-bottom: 10px;margin-top: 10px;display: flex" v-if="checkRecord('dietary_advice')">
          <div style="width: 80px;text-align: right;padding-right: 6px">饮食建议：</div>
          <div style="flex: 1">{{recordData.dietary_advice}}</div>
        </div>
      </section>
      <section style="font-size: 12px;display: flex;margin-top: 20px">
        <div style="flex: 1;"></div>
        <div style="padding-right: 50px">
          <span>{{clinicType == 6 ? '营养师' : '医生'}}名称：{{doctorName}}</span>
        </div>
      </section>

    </section>
    <f-loader v-if="showLoading"></f-loader>
  </div>
  <!--打印病历-->
</template>

<script>
import { mapState, mapActions } from "vuex";
import { clinicName } from '@/assets/js/mapType.js'
import fLoader from '@/components/fLoader.vue'
import axios from 'axios'
import filter from "@/assets/js/filters.js"
import { printRendering } from '@/assets/js/printRendering.js'
import clodopToggle from '@/assets/js/clodop_toggle.js'
export default {
  props: ["printFlag"],
  components: {
    fLoader
  },
  data() {
    return {
      clinicName: clinicName,
      showLoading: false
    };
  },
  computed: {
    ...mapState({
      patientData: state => state.patientData,
      recordData: state => state.recordData,
      orderSeqno: state => state.orderSeqno,
      doctorName: state => state.doctorName,
      isYB: state => state.isYB,
      department: state => state.department,
      clinicType: state => state.clinicType,
      clinic: state => state.clinic,
      print_createTime: state => state.print_createTime
    }),
    examination() {
      // 计算检查结果
      var examination = this.recordData.examination;
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
    }
  },
  watch: {
    printFlag(newVal) {
      if (newVal) {
        this.printPrescription('printCase');
      }
    }
  },
  methods: {
    checkRecord(type) {
      var self = this
      return self.recordData.recordList.indexOf(type) >= 0
    },
    printPrescription: function (id_str) {
      var self = this
      self.showLoading = true
      var printType = ''
      var fn = function (htmlStr, width, height) {
        var printParams = {
          pageHeight: height,
          pageWidth: width
        }
        self.showLoading = false
        clodopToggle(htmlStr, printParams)
      }
      var vue = axios
      var commonVar = {
        '$机构名称': self.clinic.name || '',
        '$机构地址': self.clinic.city_name + '市' + self.clinic.county_name + '区' + self.clinic.address,
        '$服务热线': self.clinic.customer_phone || '',
        '$打印时间': filter.dateFormat(new Date(), 'yyyy-MM-dd hh:mm'),
        '$年': filter.dateFormat(new Date(), 'yyyy'),
        '$月': filter.dateFormat(new Date(), 'MM'),
        '$日': filter.dateFormat(new Date(), 'dd'),
        '$时': filter.dateFormat(new Date(), 'hh'),
        '$分': filter.dateFormat(new Date(), 'mm'),
        '$医保卡号': self.ybCardNo,
        '$就诊订单号': self.orderSeqno,
        '$费别': self.isYB == 0 ? '自费' : '医保',
        '$患者姓名': self.patientData.name || '',
        '$患者年龄': self.patientData.age || '',
        '$患者性别': self.patientData.sex == 0 ? '未知' : (self.patientData.sex == 1 ? '男' : '女'),
        '$患者电话': self.patientData.mobile || '',
        '$患者地址': self.patientData.province_name +
          '省' +
          self.patientData.city_name +
          '市' +
          self.patientData.county_name +
          '区' +
          self.patientData.address,
        '$医生姓名': self.doctorName || '',
        '$医生科室': self.department || '',
        '$主诉': self.recordData.chief_complaint || '',
        '$现病史': self.recordData.present_illness || '',
        '$既往史': self.recordData.past_history || '',
        '$过敏史': self.recordData.allergic_history || '',
        '$个人史': self.recordData.personal_history || '',
        '$家族史': self.recordData.family_history || '',
        '$预防接种史': self.recordData.prophylactic_history || '',
        '$体格检查': JSON.stringify(self.recordData.examination) || '',
        '$辅助检查': self.recordData.auxiliary_examination || '',
        '$中医诊断': self.recordData.diagnosis || '',
        '$初步诊断': self.recordData.diagnosis_xy || '',
        '$治疗处理': self.recordData.treat_advice || '',
        '$运动建议': self.recordData.sport_advice || '',
        '$膳食建议': self.recordData.dietary_advice || '',
        '$病历号': self.orderSeqno,
        '$处方订单号':
          filter.dateFormat(new Date(), 'yyyyMMdd') +
          self.orderSeqno.slice(-6),
      }
      return new printRendering('patientHistory', commonVar, vue, fn)



      //   setTimeout(() => {
      //     var el = document.getElementById(id_str);
      //     var iframe = document.createElement("IFRAME");
      //     var doc = null;
      //     iframe.setAttribute(
      //       "style",
      //       "position:absolute;width:0px;height:0px;left:-500px;top:-500px;"
      //     );
      //     document.body.appendChild(iframe);
      //     doc = iframe.contentWindow.document;
      //     doc.write("<LINK rel='stylesheet' type='text/css'>");
      //     doc.write("<div>" + el.innerHTML + "</div>");
      //     doc.close();
      //     iframe.contentWindow.focus();
      //     iframe.contentWindow.print();
      //     if (navigator.userAgent.indexOf("MSIE") > 0) {
      //       document.body.removeChild(iframe);
      //     }
      //     this.$emit('reset')
      //   }, 30);
      // }
    }
  }
};
</script>

<style scoped>
</style>
