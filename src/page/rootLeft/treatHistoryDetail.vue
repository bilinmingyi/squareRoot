<template>
  <div class="treat-history-detail">
    <div class="t-h-d-scroll-box">
      <div class="pt10 pl10 pr10">
        <div class="history-back" @click="historyDetailsBack()">返回</div>
      </div>
      <div class="history-title display-flex">
        <div class="flex-1">
          <span class="font-bold">就诊时间：{{selectedOrder.create_time | dateFormat('yyyy-MM-dd')}}</span>
        </div>
        <div>
          <span
            v-if="currRecipe == -1"
            class="t-h-d-active-import"
            @click.stop="importHistoryRecord(selectedOrder)"
          >导入</span>
          <span class="t-h-d-disable-import" v-else>导入</span>
        </div>
      </div>
      <div class="pb10 pl15 pr15 font-15">
        <div class="history-line-s">
          <div class="display-flex">
            <div class="history-line-key">主诉</div>
            <div class="flex-1">{{selectedOrder.chief_complaint}}</div>
          </div>
        </div>
        <div class="history-line-s">
          <div class="display-flex">
            <div class="history-line-key">检查</div>
            <div class="flex-1">
              <span
                v-if="examinationInfo.bloodpressure_num1 || examinationInfo.bloodpressure_num2"
              >血压{{examinationInfo.bloodpressure_num1}}/{{examinationInfo.bloodpressure_num2}}mmHg，</span>
              <span v-if="examinationInfo.bloodglucose">血糖{{examinationInfo.bloodglucose}}mg/ml，</span>
              <span v-if="examinationInfo.trioxypurine">尿酸{{examinationInfo.trioxypurine}}umol/L，</span>
              <span v-if="examinationInfo.heartrate">心率{{examinationInfo.heartrate}}次/分，</span>
              <span v-if="examinationInfo.breathe">呼吸{{examinationInfo.breathe}}次/分，</span>
              <span v-if="examinationInfo.animalheat">体温{{examinationInfo.animalheat}}℃，</span>
              <span v-if="examinationInfo.weight">体重{{examinationInfo.weight}}kg，</span>
              {{examinationInfo.info}}
            </div>
          </div>
        </div>
        <div class="history-line-s">
          <div class="display-flex">
            <div class="history-line-key">病史</div>
            <div class="flex-1">{{selectedOrder.present_illness}}</div>
          </div>
        </div>
        <div class="history-line-s">
          <div class="display-flex">
            <div class="history-line-key">西医诊断</div>
            <div class="flex-1">{{selectedOrder.diagnosis_xy}}</div>
          </div>
        </div>
        <div class="history-line-s">
          <div class="display-flex">
            <div class="history-line-key">中医诊断</div>
            <div class="flex-1">{{selectedOrder.diagnosis}}</div>
          </div>
        </div>
      </div>
      <div v-for="recipe in selectedOrder.recipe_list">
        <section v-if="recipe.recipe_type==1">
          <div class="history-title">
            <span class="font-bold flex-1">
              中药处方
              <span class="font-13">
                （
                <span v-if="recipe.category==1">饮片</span>
                <span v-if="recipe.category==2">颗粒</span>
                ）
                ：总共{{recipe.dosage}}剂 {{recipe.usage}}
              </span>
            </span>
            <span
              v-if="currRecipe != -1 && reciptType == 1"
              class="t-h-d-active-import"
              @click="impHistory(recipe)"
            >导入</span>
            <span class="t-h-d-disable-import" v-else>导入</span>
          </div>
          <div class="t-h-d-drug-row font-bold mb5" v-if="recipe.is_cloud==0">诊所药房</div>
          <div class="t-h-d-drug-row font-bold mb5" v-if="recipe.is_cloud==1">云药房</div>
          <div class="t-h-d-drug-row">
            <div
              class="t-h-d-drug-item"
              v-for="med in recipe.herbal_list"
            >{{med.name}}：{{med.num}}{{med.unit}}/{{med.usage}}</div>
          </div>
        </section>
        <section v-if="recipe.recipe_type==2">
          <div class="history-title">
            <span class="font-bold flex-1">中成药西药</span>
            <span
              class="t-h-d-active-import"
              v-if="currRecipe != -1 && reciptType == 2"
              @click="impHistory(recipe)"
            >导入</span>
            <span class="t-h-d-disable-import" v-else>导入</span>
          </div>
          <div class="t-h-d-drug-row">
            <div
              class="t-h-d-drug-item"
              v-for="med in recipe.western_list"
            >{{med.name}}：{{med.num}}{{med.unit}}|{{med.usage}}|{{med.days}}天</div>
          </div>
        </section>
        <section v-if="recipe.recipe_type==3">
          <div class="history-title">
            <span class="font-bold flex-1">产品处方</span>
            <span
              class="t-h-d-active-import"
              v-if="currRecipe != -1 && reciptType == 3"
              @click="impHistory(recipe)"
            >导入</span>
            <span class="t-h-d-disable-import" v-else>导入</span>
          </div>
          <div class="t-h-d-drug-row mb5 font-bold" v-if="recipe.is_cloud==0">诊所药房</div>
          <div class="t-h-d-drug-row mb5 font-bold" v-if="recipe.is_cloud==1">云药房</div>
          <div
            class="t-h-d-drug-row"
            v-for="med in recipe.product_list"
          >{{med.name}}： {{med.num}}{{med.unit}}|{{med.usage}}|{{med.days}}天</div>
        </section>
        <section v-if="recipe.recipe_type==4">
          <div class="history-title">
            <span class="font-bold flex-1">项目处方</span>
            <span
              class="t-h-d-active-import"
              v-if="currRecipe != -1 && reciptType == 4"
              @click="impHistory(recipe)"
            >导入</span>
            <span class="t-h-d-disable-import" v-else>导入</span>
          </div>
          <div class="t-h-d-drug-row">
            <div class="t-h-d-drug-row" v-for="med in recipe.therapy_list">{{med.name}}：{{med.num}}次</div>
          </div>
        </section>
        <!-- <section v-if="recipe.recipe_type==5">
        <div class="history-title">
          <span class="font-bold flex-1">附加服务</span>
          <span
            class="t-h-d-active-import"
            v-if="currRecipe != -1 && reciptType == 5"
            @click="impHistory(recipe)"
          >导入</span>
          <span class="t-h-d-disable-import" v-else>导入</span>
        </div>
        <div class="t-h-d-drug-row" v-for="med in recipe.extra_list">
          <span>{{med.name}}</span>
          <span class="pl10">{{med.num}}{{med.unit}}</span>
        </div>
        </section>-->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  props: ['selectedOrderProp', 'reciptTypeProp', 'examinationInfoProp'],
  data() {
    return {
    };
  },
  computed: {
    ...mapState({
      currRecipe: state => state.currRecipe,
    }),
    selectedOrder() {
      return this.selectedOrderProp;
    },
    reciptType() {
      return this.reciptTypeProp;
    },
    examinationInfo() {
      return this.examinationInfoProp;
    }
  },
  methods: {
    ...mapActions(["set_state_prop"]),
    historyDetailsBack() {
      this.set_state_prop({ key: "showHistoryDetail", val: false });
    },
    importHistoryRecord() {}
  }
};
</script>

<style scoped>
.treat-history-detail {
  background: #fff;
  flex: 1;
}
.t-h-d-scroll-box {
  height: calc(100vh - 10.7875rem);
  overflow: auto;
}
.t-h-d-scroll-box::-webkit-scrollbar-track {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
}
.t-h-d-scroll-box::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
}
.t-h-d-scroll-box::-webkit-scrollbar {
  width: 16px;
  height: 16px;
}
.t-h-d-scroll-box::-webkit-scrollbar-track,
.t-h-d-scroll-box::-webkit-scrollbar-thumb {
  border-radius: 999px;
  border: 5px solid transparent;
}
.t-h-d-scroll-box::-webkit-scrollbar-track {
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2) inset;
}
.t-h-d-scroll-box::-webkit-scrollbar-thumb {
  min-height: 20px;
  background-clip: content-box;
  box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.2) inset;
}
.t-h-d-scroll-box::-webkit-scrollbar-corner {
  background: transparent;
}
.history-back {
  border-radius: 0.25rem;
  margin: 0.625rem auto;
  color: #5096e0;
  width: 95%;
  height: 1.875rem;
  border: #5096e0 solid 1px;
  line-height: 1.875rem;
  text-align: center;
  font-size: 0.9375rem;
}
.history-title {
  width: 100%;
  min-height: 1.875rem;
  background: #f6fbfe;
  line-height: 1.875rem;
  padding: 0 0.9375rem;
  margin: 0.3125rem 0;
  font-size: 1rem;
  display: flex;
}
.t-h-d-active-import {
  cursor: pointer;
  color: #5096e0;
  font-weight: bold;
  padding-left: 1rem;
}
.t-h-d-disable-import {
  cursor: no-drop;
  color: #ccc;
  font-weight: bold;
  padding-left: 1rem;
}
.t-h-d-drug-row {
  width: 100%;
  flex: 1;
  padding: 0 0.9375rem;
  font-size: 0.875rem;
  color: #4c4c4c;
}
.t-h-d-drug-item {
  display: inline-block;
  padding-right: 1rem;
}
.history-line-s {
  border-bottom: #ccc solid 1px;
  height: auto;
  width: 100%;
  padding: 10px 0px;
}
.history-line-key {
  width: 2.75rem;
}
.display-flex {
  display: flex;
  word-wrap: break-word;
}
.flex-1 {
  flex: 1;
}
.flex-5 {
  flex: 5;
}
.font-bold {
  font-weight: bold;
}
.cursor-pointer {
  cursor: pointer;
}
.cursor-no-drop {
  cursor: no-drop;
}
.text-gray {
  color: #ccc;
}
.text-blue {
  color: #5096e0;
}
</style>