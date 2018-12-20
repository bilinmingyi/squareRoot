<template>
  <div>
    <div class="root-left-title">
      <span>患者资料</span>
    </div>
    <patient-detail v-show="!showHistoryDetail"></patient-detail>
    <treat-history :historyDataProp="historyData" @changePage="changePage"></treat-history>
  </div>
</template>

<script>
import { getHerbalList } from "@/fetch/api.js";
import patientDetail from "./patientDetail";
import treatHistory from "./treatHistory";
import { mapState, mapActions } from "vuex";
import { getPatientInfo, getHistoryRecipes } from "@/fetch/api.js";
export default {
  name: "rootPage",
  components: {
    patientDetail,
    treatHistory
  },
  data() {
    return {
      // TODO: 获取患者id
      patientId: 46,
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
        pageSize: 2,
        reciptType: "",
        completeFirst: false,
        treatOrderList: [],   // 就诊历史列表
      }
    };
  },
  computed: {
    ...mapState({
      showHistoryDetail: state => state.showHistoryDetail
    })
  },
  created() {
    this.getData("patientInfo");
    this.getData("historyRecipes");
  },
  methods: {
    ...mapActions(["set_state_prop"]),
    getData(type) {
      switch (type) {
        case "patientInfo":
          let patientInfoParams = new FormData();
          patientInfoParams.append("patientId", this.patientId);
          getPatientInfo(patientInfoParams).then(res => {
            if (res.code == 1000) {
              this.set_state_prop({ key: "patientData", val: res.data });
            }
          });
          break;

        case "historyRecipes":
          getHistoryRecipes({
            patient_name: 'WEY',
            patient_mobile: "13965329874",
            page_size: this.historyData.pageSize,
            page: this.historyData.page
          }).then(res => {
            this.historyData.treatOrderList = res.data;
            this.historyData.totalPageNum = Math.ceil(
              res.total_num / this.historyData.pageSize
            );
            this.historyData.completeFirst = true;
          });
          break;
      }
    },
    changePage(page) {
      this.historyData.page = page;
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
}
</style>
