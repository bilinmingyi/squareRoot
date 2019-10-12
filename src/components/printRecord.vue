<template>
  <!--打印病历-->
  <div>
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
      showLoading: true
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
        this.showLoading = true
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
      this.$emit('reset')
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
