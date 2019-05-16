<template>
  <div>
    <div class="root-left-title">
      <span>患者资料</span>
    </div>
    <patient-detail v-show="!showHistoryDetail"></patient-detail>
    <div class="root-left-history">
      <treat-history
        :historyFinish="historyFinish"
        :historyDataProp="historyData"
        @changePage="changePage"
      ></treat-history>
      <f-loader v-show="showLoader" :fixed="false"></f-loader>
    </div>
  </div>
</template>

<script>
import patientDetail from "./patientDetail";
import treatHistory from "./treatHistory";
import { mapState, mapActions } from "vuex";
import { getPatientInfo, getHistoryRecipes } from "@/fetch/api.js";
import fLoader from "@/components/fLoader";
export default {
  name: "rootPage",
  components: {
    patientDetail,
    treatHistory,
    fLoader
  },
  data() {
    return {
      historyData: {
        type: 0, // -1: 就诊病历, 处方类型
        category: -1, // 中药类型
        is_cloud: -1, //是否云药房
        typeName: "",
        showImportHistory: false,
        selectedOrder: {},
        examinationInfo: "",
        importIdx: -999, // 导入索引, -1: 就诊病历, 0: 第一个处方, 1: 第二个处方,...
        totalPageNum: 0,
        page: 1,
        pageSize: 4,
        reciptType: "",
        completeFirst: false,
        treatOrderList: [] // 就诊历史列表
      },

      showLoader: false,
      historyFinish: false
    };
  },
  computed: {
    ...mapState({
      showHistoryDetail: state => state.showHistoryDetail,
      patientData: state => state.patientData,
      recordData: state => state.recordData
    })
  },
  created() {
    this.getData("patientInfo");
    this.getData("historyRecipes");
  },
  methods: {
    ...mapActions(["set_state_prop", 'set_record_prop']),
    getData(type) {
      switch (type) {
        case "patientInfo":
          let patientInfoParams = new FormData();
          patientInfoParams.append("patientId", this.patientData.id);
          getPatientInfo(patientInfoParams).then(res => {
            if (res.code == 1000) {
              this.set_state_prop({ key: "patientData", val: res.data });
              !this.recordData.personal_history && this.set_record_prop({ key: 'personal_history', val: res.data.personal_history});
              !this.recordData.present_illness && this.set_record_prop({ key: 'present_illness', val: res.data.present_illness});
              !this.recordData.allergic_history && this.set_record_prop({ key: 'allergic_history', val: res.data.allergic_history});
            }
          });
          break;

        case "historyRecipes":
          this.historyFinish = false;
          getHistoryRecipes({
            patient_name: this.patientData.name,
            patient_mobile: this.patientData.mobile,
            page_size: this.historyData.pageSize,
            page: this.historyData.page
          }).then(res => {
            this.historyData.treatOrderList = res.data;
            this.historyData.totalPageNum = Math.ceil(
              res.total_num / this.historyData.pageSize
            );
            this.historyData.completeFirst = true;

            this.showLoader = false;
            this.historyFinish = true;
          });
          break;
      }
    },
    changePage(page) {
      this.historyData.page = page;
      this.showLoader = true;
      this.getData("historyRecipes");
    }
  }
};
</script>

<style scoped>
.root-left-title {
  background: #4dbc89;
  color: #ffffff;
  font-weight: bold;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  text-align: center;
  line-height: 2.1875rem;
  font-size: 1rem;
  height: auto;
}
.root-left-history {
  position: relative;
  display: flex;
  flex-direction: column;
}
</style>
