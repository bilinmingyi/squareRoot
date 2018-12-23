<template>
  <!-- 患者病历 -->
  <div class="mid-box-content">
    <div class="mid-title-btn-box mb10 pr10 pt10">
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
            <tag
              closable
              v-for="(tag, index) in recordData.diagnosis_xy_labels"
              @on-close="deleteDiagnosisLabel('diagnosis_xy', index)"
              :key="tag.code"
            >{{tag.name}}</tag>
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
              :class="{cur: recordData.diagnosisDataIndex == (index + 1)}"
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
            <tag
              closable
              v-for="(tag, index) in recordData.diagnosis_labels"
              @on-close="deleteDiagnosisLabel('diagnosis', index)"
              :key="tag.code"
            >{{tag.name}}</tag>
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
              :class="{cur: recordData.diagnosisDataIndex == (index + 1)}"
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
          v-model="recordData.treat_advice"
        ></Input>
      </div>
    </div>
    <patient-alert 
      v-show="showPatientAlert" 
      :diagnosisTypeProp="diagnosisType"
      @close="closePatientAlert"></patient-alert>
  </div>
  <!-- 患者病历 -->
</template>

<script>
import { mapState, mapActions } from "vuex";
import { Input } from "iview";
import patientAlert from "./patientAlert";
export default {
  name: "patientrRcord",
  components: {
    Input,
    patientAlert
  },
  data() {
    return {
      showPatientAlert: false,
      diagnosisType: 0
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
      examination.info && (ret += examination.info);
      return ret;
    }
  },
  methods: {
    clinicRecord(type) {
      this.diagnosisType = type;
      this.showPatientAlert = true;
    },

    closePatientAlert() {
      this.showPatientAlert = false;
    },

    printPrescription() {
      // 打印病历
    },

    showSaveTemplate() {
      // 存为模板
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
}
.diagnosis-input:focus {
  outline-color: transparent;
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
