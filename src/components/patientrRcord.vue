<template>
  <!-- 患者病历 -->
  <div class="mid-box-content">
    <div class="mid-title-btn-box mb10 pr10">
      <button class="prescriptionBtn mr5" @click.stop="printPrescription('printCase')">打印病历</button>
      <button class="prescriptionBtn" @click.stop="showSaveTemplate()">存为模板</button>
    </div>
    <hr class="mid-hr">
    <div class="mt10 mid-record-item">
      <div class="text-justify mid-record-item-key">
        <span>主&nbsp;&nbsp;&nbsp;述：</span>
      </div>
      <div class="mid-record-item-val" @click.stop="clinicRecord(2)">
        <Input
          class="patient-record-input"
          type="textarea"
          :autosize="{minRows: 2,maxRows: 5}"
          placeholder="点此输入"
          :rows="2"
          v-model="recordData.chief_complaint"
          readonly
        ></Input>
      </div>
    </div>
    <div class="mt10 mid-record-item">
      <div class="text-justify mid-record-item-key">
        <span>病&nbsp;&nbsp;&nbsp;史：</span>
      </div>
      <div class="mid-record-item-val" @click.stop="clinicRecord(4)">
        <Input
          class="patient-record-input"
          type="textarea"
          :autosize="{minRows: 2,maxRows: 5}"
          placeholder="点此输入"
          :rows="2"
          v-model="recordData.present_illness"
          readonly
        ></Input>
      </div>
    </div>
    <div class="mt10 mid-record-item">
      <div class="text-justify mid-record-item-key">
        <span>过敏史：</span>
      </div>
      <div class="mid-record-item-val" @click.stop="clinicRecord(1)">
        <Input
          class="patient-record-input"
          type="textarea"
          :autosize="{minRows: 1,maxRows: 5}"
          placeholder="点此输入"
          :rows="1"
          v-model="recordData.allergic_history"
          readonly
        ></Input>
      </div>
    </div>
    <div class="mt10 mid-record-item">
      <div class="text-justify mid-record-item-key">
        <span>既往史：</span>
      </div>
      <div class="mid-record-item-val" @click.stop="clinicRecord(0)">
        <Input
          class="patient-record-input"
          type="textarea"
          :autosize="{minRows: 1,maxRows: 5}"
          placeholder="点此输入"
          :rows="1"
          v-model="recordData.personal_history"
          readonly
        ></Input>
      </div>
    </div>
    <div class="mt10 mid-record-item">
      <div class="text-justify mid-record-item-key">
        <span>检&nbsp;&nbsp;&nbsp;查：</span>
      </div>
      <div class="mid-record-item-val" @click.stop="clinicRecord(3)">
        <Input
          class="patient-record-input"
          type="textarea"
          :autosize="{minRows: 1,maxRows: 5}"
          placeholder="点此输入"
          :rows="1"
          v-model="examination"
          readonly
        ></Input>
      </div>
    </div>
    <div class="mt10 mid-record-item">
      <div class="text-justify mid-record-item-key">
        <span>西医诊断：</span>
      </div>
      <div class="mid-record-item-val">
        <div class="diagnosis-input-box" @click.stop="$refs.diagnosis_xy_input.focus()">
          <div class="label-box" v-show="recordData.diagnosis_xy_labels.length > 0">
            <Tag
              closable
              v-for="(tag, index) in recordData.diagnosis_xy_labels"
              @on-close="deleteDiagnosisLabel('diagnosis_xy', index)"
              :key="tag.code"
            >{{tag.name}}</Tag>
          </div>
          <input
            class="diagnosis-input"
            type="text"
            v-model="recordData.diagnosis_xy_input"
            @blur="handleComma('diagnosis_xy')"
            @input="searchDiagnosis('diagnosis_xy')"
            ref="diagnosis_xy_input"
            @keydown="listenerKey($event, 'diagnosis_xy')"
          >
        </div>
        <div
          class="mid-record-item-drop-down-box"
          v-show="recordData.diagnosis_xy_search_data.length > 0"
        >
          <div class="drop-down-mask" @click="clearDiagnosisSearchData('diagnosis_xy')"></div>
          <ul class="drop-down" ref="diagnosis_xy_drop_down">
            <li
              v-for="(item, index) in recordData.diagnosis_xy_search_data"
              @click="chooseDiagnosisLabel('diagnosis_xy', index)"
              :class="{cur: diagnosisDataIndex == (index + 1)}"
              :id="'diagnosis_xy_drop_down_li_' + (index + 1)"
            >{{item.name}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="mt10 mid-record-item" @click.stop="$refs.diagnosis_input.focus()">
      <div class="text-justify mid-record-item-key">
        <span>中医诊断：</span>
      </div>
      <div class="mid-record-item-val">
        <div class="diagnosis-input-box">
          <div class="label-box" v-show="recordData.diagnosis_labels.length > 0">
            <Tag
              closable
              v-for="(tag, index) in recordData.diagnosis_labels"
              @on-close="deleteDiagnosisLabel('diagnosis', index)"
              :key="tag.code"
            >{{tag.name}}</Tag>
          </div>
          <input
            class="diagnosis-input"
            type="text"
            v-model="recordData.diagnosis_input"
            @blur="handleComma('diagnosis')"
            @input="searchDiagnosis('diagnosis')"
            ref="diagnosis_input"
            @keydown="listenerKey($event, 'diagnosis')"
          >
        </div>
        <div
          class="mid-record-item-drop-down-box"
          v-show="recordData.diagnosis_search_data.length > 0"
        >
          <div class="drop-down-mask" @click="clearDiagnosisSearchData('diagnosis')"></div>
          <ul class="drop-down" ref="diagnosis_drop_down">
            <li
              v-for="(item, index) in recordData.diagnosis_search_data"
              @click="chooseDiagnosisLabel('diagnosis', index)"
              :class="{cur: diagnosisDataIndex == (index + 1)}"
            >{{item.name}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="mt10 mid-record-item">
      <div class="text-justify mid-record-item-key">
        <span>处理意见：</span>
      </div>
      <div class="mid-record-item-val">
        <Input
          type="textarea"
          :autosize="{minRows: 2,maxRows: 5}"
          :rows="2"
          :value="recordData.treat_advice"
          @on-change="set_record_prop({key: 'treat_advice', val: $event.target.value})"
        ></Input>
      </div>
    </div>
    <patient-alert
      v-show="recordCaseHistoryFinish && showPatientAlert"
      :caseHistoryProp="recordCaseHistory"
      :diagnosisTypeProp="diagnosisType"
      @close="closePatientAlert"
      :timeStamp="Date.now()"
    ></patient-alert>
    <save-record-tpl
      v-show="showSaveRecordTpl"
      @close="showSaveRecordTpl = false"
    ></save-record-tpl>
    <print-record
      v-show="showPrintRecord"
      @close="showPrintRecord = false"
      :printFlag="printFlag"
      @reset="printFlag = false"
    ></print-record>
  </div>
  <!-- 患者病历 -->
</template>

<script>
import { mapState, mapActions } from "vuex";
import { Input, Tag } from "iview";
import patientAlert from "./patientAlert";
import { getCaseHistory, getDiseaseList } from "@/fetch/api.js";
import saveRecordTpl from '@/components/saveRecordTpl';
import printRecord from '@/components/printRecord';
export default {
  name: "patientrRcord",
  components: {
    Input,
    Tag,
    patientAlert,
    saveRecordTpl,
    printRecord
  },
  data() {
    return {
      showPatientAlert: false,
      showSaveRecordTpl: false,
      showPrintRecord: false,
      diagnosisType: 0,
      recordCaseHistoryFinish: false,
      recordCaseHistory: {},

      diagnosisTimer: null,
      diagnosisDataIndex: 0,  // 诊断下拉数组当前选中索引
      printFlag: false, // 打印病历
    };
  },
  computed: {
    ...mapState({
      recordData: state => state.recordData
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
    },

    // 诊断查询字符串
    recordQueryDiagnosis: function() {
      var str = this.recordData.diagnosis_input;
      return this.handleQueryDiagnosisStr(str);
    },
    recordQueryDiagnosisXy: function() {
      var str = this.recordData.diagnosis_xy_input;
      return this.handleQueryDiagnosisStr(str);
    }
  },
  watch: {
    "recordData.diagnosis_input": function(curVal, oldVal) {
      this.set_record_prop({
        key: "diagnosis_input",
        val: curVal.replace(/([；])/g, ";")
      });
      this.set_record_prop({
        key: "diagnosis",
        val: this.joinDiagnosis("diagnosis")
      });
    },
    "recordData.diagnosis_xy_input": function(curVal, oldVal) {
      this.set_record_prop({
        key: "diagnosis_xy_input",
        val: curVal.replace(/([；])/g, ";")
      });
      this.set_record_prop({
        key: "diagnosis_xy",
        val: this.joinDiagnosis("diagnosis_xy")
      });
    }
  },
  created() {
    getCaseHistory().then(res => {
      if (res.code == 1000) {
        this.recordCaseHistory = res.data;
        this.recordCaseHistoryFinish = true;
      } else {
        console.log(res.msg);
      }
    });
  },
  methods: {
    ...mapActions(["set_record_prop"]),
    clinicRecord(type) {
      this.diagnosisType = type;
      this.showPatientAlert = true;
    },

    closePatientAlert() {
      this.showPatientAlert = false;
    },

    printPrescription() {
      // 打印病历
      // this.showPrintRecord = true;
      this.printFlag = true;
    },

    showSaveTemplate() {
      // 存为模板
      this.showSaveRecordTpl = true;
    },

    /* 中西医诊断 */
    // 处理字符串中的逗号
    handleCommaCore: function(str) {
      str = str.replace(/([；])/g, ";");
      var arr = str
        .split(";")
        .map(function(item) {
          return item.trim();
        })
        .filter(function(item) {
          return item != "";
        });
      str = arr.join(";");
      return str ? str + ";" : "";
    },
    handleComma: function(type) {
      if (type !== "diagnosis" && type !== "diagnosis_xy") return;
      this.set_record_prop({
        key: type + "_input",
        val: this.handleCommaCore(this.recordData[type + "_input"])
      });
      setTimeout(() => {
        this.set_record_prop({ key: type + "_search_data", val: [] });
        this.diagnosisDataIndex = 0;
      }, 200);
    },

    // 从诊断字符串中获取查询参数
    handleQueryDiagnosisStr: function(str) {
      var arr = str.split(";");
      var lastStr = "";
      while (arr.length && lastStr == "") {
        lastStr = arr.pop().trim();
      }
      return lastStr;
    },

    // 诊断查询
    searchDiagnosis: function(type) {
      var url = "";
      var params = {
        page: 1,
        page_size: 100
      };
      clearTimeout(this.diagnosisTimer);
      switch (type) {
        case "diagnosis":
          // url = this.appRoot + "/doctreat/treatorder/zyDisease/list";
          params.query = this.recordQueryDiagnosis;
          if (params.query == "") {
            this.clearDiagnosisSearchData("diagnosis");
            return;
          }
          break;

        case "diagnosis_xy":
          // url = this.appRoot + "/doctreat/treatorder/ybDisease/list";
          params.query = this.recordQueryDiagnosisXy;
          if (params.query == "") {
            this.clearDiagnosisSearchData("diagnosis_xy");
            return;
          }
          break;

        default:
          return;
      }
      if (params.query == "") return;
      this.diagnosisTimer = setTimeout(() => {
        getDiseaseList(params, type).then(res => {
          // let res = { code: 1000 };
          // res.data = JSON.parse(
          //   '[{"code":"Y55.500","name":"抗感冒药有害效应"},{"code":"T48.500","name":"抗感冒药中毒"},{"code":"J11.800","name":"流行性感冒伴特指表现"},{"code":"J11.102","name":"流行性感冒伴胸膜渗漏"},{"code":"J11.101","name":"流行性感冒"},{"code":"J11.100","name":"流行性感冒伴特指呼吸道表现"},{"code":"J11.000","name":"流行性感冒伴肺炎"},{"code":"J10.802+I41.1*","name":"甲型H1N1型流行性感冒性心肌炎"},{"code":"J10.800","name":"特指流感病毒流行性感冒伴特指表现"},{"code":"J10.101","name":"甲型H1N1流行性感冒"},{"code":"J10.100","name":"特指流感病毒流行性感冒伴特指呼吸道表现"},{"code":"J10.001","name":"甲型H1N1流行性感冒性肺炎"},{"code":"J10.000","name":"流行性感冒伴肺炎，特指流感病毒"},{"code":"J10","name":"甲型H1N1型流行性感冒性脑病"}]'
          // );
          if (res.code == 1000) {
            switch (type) {
              case "diagnosis":
                this.set_record_prop({
                  key: "diagnosis_search_data",
                  val: res.data
                });
                break;

              case "diagnosis_xy":
                this.set_record_prop({
                  key: "diagnosis_xy_search_data",
                  val: res.data
                });
                break;
            }
          } else {
            console.log(res.msg);
          }
        });
      }, 300);
    },

    // 清空查询的诊断结果,并重新聚焦回输入框
    clearDiagnosisSearchData: function(type) {
      if (type === "diagnosis") {
        this.set_record_prop({ key: "diagnosis_search_data", val: [] });
        this.$refs.diagnosis_input.focus();
      } else if (type === "diagnosis_xy") {
        this.set_record_prop({ key: "diagnosis_xy_search_data", val: [] });
        this.$refs.diagnosis_xy_input.focus();
      }
      this.diagnosisDataIndex = 0;
    },

    // 组合诊断结果
    joinDiagnosis: function(type) {
      var inputStr = "";
      var labelStr = "";
      var arr = [];
      var ret;
      if (type === "diagnosis") {
        inputStr = this.recordData.diagnosis_input;
        arr = this.recordData.diagnosis_labels;
      } else if (type === "diagnosis_xy") {
        inputStr = this.recordData.diagnosis_xy_input;
        arr = this.recordData.diagnosis_xy_labels;
      }

      arr.forEach(function(item) {
        labelStr += item.name + ";";
      });
      inputStr =
        inputStr && inputStr[inputStr.length - 1] === ";"
          ? inputStr.slice(0, -1)
          : inputStr;
      ret = inputStr ? labelStr + inputStr : labelStr.slice(0, -1);

      return ret;
    },

    // 删除诊断标签
    deleteDiagnosisLabel: function(type, index) {
      let labels = this.recordData[type + "_labels"];
      labels.splice(index, 1);
      this.set_record_prop({
        key: this.recordData[type + "_labels"],
        val: labels
      });
      this.joinDiagnosis(type);
    },

    // 选中诊断标签
    chooseDiagnosisLabel: function(type, index) {
      let labels = this.recordData[type + "_labels"];
      labels.push(this.recordData[type + "_search_data"][index]);
      this.set_record_prop({ key: type + "_labels", val: labels });
      this.deleteQueryDiagnosisStr(type);
      this.handleComma(type);
      this.clearDiagnosisSearchData(type);
    },

    // 删除诊断字符串中查询后选择的字符串
    deleteQueryDiagnosisStr: function(type) {
      if (type !== "diagnosis" && type !== "diagnosis_xy") return;
      var str = this.recordData[type + "_input"];
      str = str.replace(/([；])/g, ";");
      var arr = str
        .split(";")
        .map(function(item) {
          return item.trim();
        })
        .filter(function(item) {
          return item != "";
        });
      var lastStr = arr[arr.length - 1];
      while (arr.length && lastStr == "") {
        lastStr = arr.pop().trim();
      }
      arr.pop();
      str = arr.join(";");
      this.set_record_prop({ key: type + "_input", val: str });
    },

    // 诊断监听按钮
    listenerKey: function(event, type) {
      var keyCode = event.keyCode;
      var index = this.diagnosisDataIndex;
      var data = this.recordData[type + "_search_data"];
      var dropDownUl = this.$refs[type + "_drop_down"];
      if (!data || !dropDownUl) return;
      var input = this.$refs[type + "_input"];
      switch (keyCode) {
        case 13:
          index !== 0 && this.chooseDiagnosisLabel(type, index - 1);
          break;
        case 38:
          if (--index < 0) {
            index = data.length;
          } else if (index == 0) {
            input.focus();
          }
          break;
        case 40:
          if (++index > data.length) {
            index = 0;
            input.focus();
          }
          break;
        default:
          return;
      }
      setTimeout(() => {
        if (data.length > 0) {
          input.selectionStart = this.recordData[type + "_input"].length;
        }
      });
      this.diagnosisDataIndex = index;
      dropDownUl.scrollTop = index > 6 ? (index - 6) * 30 : 0;
    }
  }
};
</script>

<style scoped>
.mid-box-content {
  background: #fff;
  padding-bottom: 180px;
}
.mid-title-btn-box {
  display: flex;
  justify-content: flex-end;
}
.mid-hr {
  border: none;
  height: 1px;
  background-color: #ccc;
}
.mid-record-item {
  display: flex;
}
.mid-record-item-key {
  padding-left: 1.5rem;
  min-width: 6.1875rem;
  height: 2.25rem;
  font-size: 0.9375rem;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(76, 76, 76, 1);
}
.mid-record-item-val {
  flex: 1;
  padding: 0 1.5rem 0 0.3125rem;
  position: relative;
}
.prescriptionBtn {
  border: 1px solid #5096e0;
  border-radius: 1.875rem;
  font-size: 1rem;
  color: #5096e0;
  background: none;
  padding: 0 0.5rem;
  line-height: 1.875rem;
}
.diagnosis-input-box {
  margin-bottom: 0.3125rem;
  width: 100%;
  min-height: 2.375rem;
  line-height: 1.5rem;
  padding: 0.25rem 0.5rem;
  font-size: 1rem;
  border: 1px solid #5096e0;
  border-radius: 0.25rem;
  color: #515a6e;
  background-color: #f6fbfe;
  background-image: none;
  position: relative;
  cursor: text;
  transition: border 0.2s ease-in-out, background 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
}
.diagnosis-input {
  flex: 1;
  border: none;
  width: 100%;
  min-width: 10.9375rem;
  height: 1.75rem;
  color: #515a6e;
  background: #f6fbfe;
  font-size: 0.9375rem;
  outline: none;
}
.diagnosis-input:focus {
  outline-color: transparent;
}

.mid-record-item-drop-down-box {
  position: relative;
  width: 100%;
  height: 0;
  padding: 0 10px;
}

.drop-down-mask {
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.mid-record-item-drop-down-box .drop-down {
  position: absolute;
  top: -6px;
  left: 10px;
  width: 95%;
  height: 180px;
  border: 1px solid #ccc;
  border-top: none;
  background: #fff;
  z-index: 10;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  overflow: auto;
}
.drop-down li {
  height: 30px;
  line-height: 30px;
  padding: 0 18px;
  font-size: 14px;
  vertical-align: middle;
  opacity: 1;
  overflow: hidden;
  cursor: pointer;
  border-bottom: 1px solid #ccc;
}
.drop-down li:nth-last-child(1) {
  border-bottom: none;
}
.drop-down li:hover {
  opacity: 0.8;
}
.drop-down li:active {
  opacity: 0.5;
}
.drop-down .cur {
  background: #5096e0;
  color: #fff;
}

.pointer {
  cursor: pointer;
}
.display-flex {
  display: flex;
}
.text-justify {
  text-align: justify;
}
.text-justify::after {
  content: "";
  overflow: hidden;
  width: 100%;
  height: 0;
  display: inline-block;
}
</style>
