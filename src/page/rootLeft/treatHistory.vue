<template>
  <div class="treat-history">
    <div v-show="!showHistoryDetail" class="treat-history-lists">
      <ul class="t-h-lists" v-if="isHistoryFinish && historyData.treatOrderList.length!=0 && historyData.completeFirst">
        <li
          class="t-h-item"
          v-for="historyItem in historyData.treatOrderList"
          @click="selectOrder(historyItem)"
        >
          <div class="displayFlex mb5">
            <div class="flexOne">{{clinicType == 6 ? '客户' : '患者'}}：{{historyItem.patient_name}}</div>
            <div class="font-bold">{{ historyItem.create_time | dateFormat('yyyy-MM-dd')}}</div>
          </div>
          <div class="flexOne mb5">医生：{{historyItem.doctor_name}}</div>
          <div class="display-flex">
            <span>诊断：</span>
            <span class="flex-1">{{historyItem.diagnosis_xy}}{{historyItem.diagnosis_xy!='' && historyItem.diagnosis!='' ? '，':''}}{{historyItem.diagnosis}}</span>
          </div>
        </li>
      </ul>
      <div v-else-if="isHistoryFinish" class="t-h-tips">暂无就诊记录</div>
      <div class="t-h-btn-group" v-if="isHistoryFinish && historyData.treatOrderList.length!=0">
        <button
          class="t-h-btn t-h-btn-active"
          @click.stop="changeHistoryRecipesPage(1)"
          v-if="historyData.page>1"
        >上一页</button>
        <button class="t-h-btn t-h-btn-disable" v-else>上一页</button>
        <button
          class="t-h-btn t-h-btn-active"
          @click.stop="changeHistoryRecipesPage(2)"
          v-if="historyData.page<historyData.totalPageNum"
        >下一页</button>
        <button class="t-h-btn t-h-btn-disable" v-else>下一页</button>
      </div>
    </div>
    <treat-history-detail
      v-show="showHistoryDetail"
      :selectedOrderProp="historyData.selectedOrder"
      :reciptTypeProp="historyData.reciptType"
      :examinationInfoProp="historyData.examinationInfo"
    ></treat-history-detail>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import treatHistoryDetail from "./treatHistoryDetail";
export default {
  components: {
    treatHistoryDetail
  },
  props: ['historyDataProp', 'historyFinish'],
  data() {
    return {
    };
  },
  computed: {
    ...mapState({
      showHistoryDetail: state => state.showHistoryDetail,
      currRecipe: state => state.currRecipe,
      recipeList: state => state.recipeList,
      patientData: state => state.patientData,
      clinicType: state => state.clinicType
    }),
    historyData() {
      return this.historyDataProp;
    },
    isHistoryFinish() {
      return this.historyFinish;
    }
  },
  watch: {
    currRecipe: {
      handler(newVal) {
        this.historyData.reciptType =
        this.currRecipe > -1
          ? this.recipeList[this.currRecipe].type
          : this.currRecipe;
      },
    }
  },
  methods: {
    ...mapActions(["set_state_prop", "set_examination_info"]),
    selectOrder(item) {
      this.historyData.selectedOrder = item;

      this.historyData.examinationInfo = item.examination
        ? JSON.parse(item.examination)
        : {};

      this.set_state_prop({ key: "showHistoryDetail", val: true });
    },
    changeHistoryRecipesPage(type) {
      if (type == 1) {
        this.$emit('changePage', this.historyData.page - 1)
      } else if (type == 2) {
        this.$emit('changePage', this.historyData.page + 1)
      }
    },
  }
};
</script>

<style scoped>
.treat-history {
  display: flex;
  height: 100%;
}
.treat-history-lists {
  min-width: 13.75rem;
  padding: 0.625rem;
  font-size: 1rem;
  background: #fff;
  overflow: auto;
  flex: 1;
}
.t-h-lists {
  font-size: 0.9375rem;
}
.t-h-item {
  border: #5096e0 solid 1px;
  width: 100%;
  height: auto;
  padding: 0.625rem;
  margin-bottom: 0.625rem;
}
.t-h-tips {
  width: 100%;
  text-align: center;
  line-height: 1.5rem;
  height: 1.5rem;
}
.t-h-btn-group {
  display: flex;
  justify-content: space-around;
}
.t-h-btn {
  width: 6.25rem;
  height: 1.875rem;
  line-height: 1.875rem;
  text-align: center;
  border-radius: 1.875rem;
}
.t-h-btn-disable {
  color: #6c6c6c;
  background: #f2f2f2;
  border: none;
  cursor: no-drop;
}
.t-h-btn-active {
  border: #5096e0 solid 1px;
  color: #5096e0;
  background: #ffffff;
  cursor: pointer;
}
.display-flex {
  display: flex;
}
.flex-1 {
  flex: 1;
}
</style>
