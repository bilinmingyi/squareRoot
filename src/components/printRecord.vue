<template>
  <!--打印病历-->
  <div id="printCase" style="display: none;">
    <section style="color: #000000;">
      <div
        style="width: 100%;height: 35px;text-align: center;line-height: 35px;font-weight: bold;font-size: 20px;margin-bottom: 20px"
      >{{clinicName}}病历</div>
      <section
        style="border-bottom: #000000 solid 2px;border-top: #000000 solid 2px;padding: 10px 0px;font-size: 12px;"
      >
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
            <span style="font-weight: bolder">科室：</span>
          </div>
          <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">
            <span style="font-weight: bolder">日期：</span>
            {{new Date() | dateFormat('yyyy-MM-dd')}}
          </div>
          <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">
            <span style="font-weight: bolder">费别：自费</span>
          </div>
        </div>

        <div style="width: 100%;height: auto;margin-bottom: 5px; display: flex;">
          <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">
            <span style="font-weight: bolder">病历号：</span>
            {{orderSeqno}}
          </div>
          <div style="flex: 2;-webkit-flex: 2;-ms-flex: 2;">
            <span
              style="font-weight: bolder"
            >家庭住址：{{patientData.province_name}}{{patientData.city_name}}{{patientData.county_name}}{{patientData.address}}</span>
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
        <div style="margin-bottom: 10px;margin-top: 10px;display: flex">
          <div style="width: 80px;text-align: right;padding-right: 6px">既往史：</div>
          <div style="flex: 1">{{recordData.personal_history}}</div>
        </div>
        <div style="margin-bottom: 10px;margin-top: 10px;display: flex">
          <div style="width: 80px;text-align: right;padding-right: 6px">过敏史：</div>
          <div style="flex: 1">{{recordData.allergic_history}}</div>
        </div>
        <div style="margin-bottom: 10px;margin-top: 10px;display: flex">
          <div style="width: 80px;text-align: right;padding-right: 6px">检查：</div>
          <div style="flex: 1;">
            <div class="menu_big_input" @click="clinicRecord(3)">
              <div class="menu_big_input1" style="width: auto">
                <pre style="margin: 0; font-family: 'microsoft yahei';">{{examination}}</pre>
              </div>
            </div>
          </div>
        </div>
        <div style="margin-bottom: 10px;margin-top: 10px;display: flex">
          <div style="width: 80px;text-align: right;padding-right: 6px">西医诊断：</div>
          <div style="flex: 1">{{recordData.diagnosis_xy}}</div>
        </div>
        <div style="margin-bottom: 10px;margin-top: 10px;display: flex">
          <div style="width: 80px;text-align: right;padding-right: 6px">中医诊断：</div>
          <div style="flex: 1">{{recordData.diagnosis}}</div>
        </div>
      </section>
      <section style="font-size: 12px;display: flex;margin-top: 20px">
        <div style="flex: 1;"></div>
        <div style="padding-right: 50px">
          <span>医生名称：{{doctorName}}</span>
        </div>
      </section>
    </section>
  </div>
  <!--打印病历-->
</template>

<script>
import { mapState, mapActions } from "vuex";
import {clinicName} from '@/assets/js/mapType.js'
export default {
  props: ["printFlag"],
  data() {
    return {
      clinicName:clinicName
    };
  },
  computed: {
    ...mapState({
      patientData: state => state.patientData,
      recordData: state => state.recordData,
      orderSeqno: state => state.orderSeqno,
      doctorName: state => state.doctorName
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
      examination.info && (ret += '\n' + examination.info);
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
    printPrescription: function(id_str) {
      setTimeout(() => {
        var el = document.getElementById(id_str);
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
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
        if (navigator.userAgent.indexOf("MSIE") > 0) {
          document.body.removeChild(iframe);
        }
        this.$emit('reset')
      }, 30);
    }
  }
};
</script>

<style scoped>
</style>
