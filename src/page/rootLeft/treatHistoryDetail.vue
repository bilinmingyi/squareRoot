<template>
  <div class="treat-history-detail">
    <div class="t-h-d-scroll-box">
      <div class="pt10 pl10 pr10">
        <div class="history-back" @click="historyDetailsBack()">返回</div>
      </div>
      <div class="history-title display-flex">
        <div class="flex-1">
          <span class="font-bold">{{clinicType == 6 ? '咨询' : '就诊'}}时间：{{selectedOrder.create_time | dateFormat('yyyy-MM-dd')}}</span>
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
      <div class="pb10 pl15 pr15 font-14">
        <div class="history-line-s" v-for="item in recordData" :key="item.code" v-if="item.val">
          <div>
            <span class="font-bold">{{item.code}}：</span>
            <span class="multiline-text-box">{{item.val}}</span>
          </div>
        </div>
      </div>
      <div v-if="treatReportList.length > 0">
        <div class="history-title">
          <div class="flex-1">
            <span class="font-bold">检查报告</span>
          </div>
        </div>
        <div class="t-h-d-drug-row">
          <div
            class="t-h-d-drug-item a_blue_text"
            v-for="report in treatReportList"
            @click.stop="showReadReportAlert(report)"
          >{{report.name}}
          </div>
        </div>
      </div>
      <div v-if="treatAnswerList.length > 0">
        <div class="history-title">
          <div class="flex-1">
            <span class="font-bold">问诊表</span>
          </div>
        </div>
        <div class="t-h-d-drug-row">
          <div
            class="t-h-d-drug-item a_blue_text"
            v-for="answer in treatAnswerList"
            @click.stop="showReadQuestionAlert(answer)"
          >{{answer.name}}
          </div>
        </div>
      </div>

      <div v-for="(recipe, index) in selectedOrder.recipe_list">
        <section v-if="recipe.recipe_type==1">
          <div class="history-title">
            <span class="font-bold font-14 flex-1">
              中药处方

                (
                <span v-if="recipe.category==1">饮片</span>
                <span v-if="recipe.category==2">颗粒</span>
                )
                ：总共{{recipe.dosage}}剂 {{recipe.usage}}
            </span>
            <span
              v-if="currRecipe != -1 && reciptType == 1 && recipe.category == recipeList[currRecipe].data.category"
              class="t-h-d-active-import"
              @click="impHistory(recipe, index)"
            >导入</span>
            <span class="t-h-d-disable-import" v-else>导入</span>
          </div>
          <div class="t-h-d-drug-row font-bold mb5" v-if="recipe.is_cloud==0">诊所药房</div>
          <div class="t-h-d-drug-row font-bold mb5" v-if="recipe.is_cloud==1">云药房</div>
          <div class="t-h-d-drug-row">
            <div
              class="t-h-d-drug-item"
              v-for="med in recipe.herbal_list"
            >{{med.name}}：{{med.num}}{{med.unit}}/{{med.usage}}
            </div>
          </div>
        </section>
        <section v-if="recipe.recipe_type==2">
          <div class="history-title">
            <span class="font-bold flex-1">中成药西药</span>
            <span
              class="t-h-d-active-import"
              v-if="currRecipe != -1 && reciptType == 2 "
              @click="impHistory(recipe, index)"
            >导入</span>
            <span class="t-h-d-disable-import" v-else>导入</span>
          </div>
          <div class="t-h-d-drug-row mb5 font-bold" v-if="recipe.is_cloud==0">诊所药房</div>
          <div class="t-h-d-drug-row mb5 font-bold" v-if="recipe.is_cloud==1">云药房</div>
          <div class="t-h-d-drug-row">
            <div
              class="t-h-d-drug-item"
              v-for="med in recipe.western_list"
            >{{med.name}}：{{med.num}}{{med.unit}}|{{med.usage}}|{{med.days}}天
            </div>
          </div>
        </section>
        <section v-if="recipe.recipe_type==3">
          <div class="history-title">
            <span class="font-bold flex-1">{{clinicType == 6 ? '营养处方' : '产品处方'}}</span>
            <span
              class="t-h-d-active-import"
              v-if="currRecipe != -1 && reciptType == 3"
              @click="impHistory(recipe, index)"
            >导入</span>
            <span class="t-h-d-disable-import" v-else>导入</span>
          </div>
          <div class="t-h-d-drug-row mb5 font-bold" v-if="recipe.is_cloud==0">诊所药房</div>
          <div class="t-h-d-drug-row mb5 font-bold" v-if="recipe.is_cloud==1">云药房</div>
          <div
            class="t-h-d-drug-row"
            v-for="med in recipe.product_list"
          >{{med.name}}： {{med.num}}{{med.unit}}|{{med.usage}}|{{med.days}}天
          </div>
        </section>
        <section v-if="recipe.recipe_type==4">
          <div class="history-title">
            <span class="font-bold flex-1">诊疗项目</span>
            <span
              class="t-h-d-active-import"
              v-if="currRecipe != -1 && reciptType == 4"
              @click="impHistory(recipe, index)"
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
            @click="impHistory(recipe, index)"
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
    <f-loader v-if="showLoader" :fixed="false"></f-loader>

    <history-result
      v-if="historyResultShow"
      :recipeDataProp="formatedRecipe"
      :map="listMap"
      @close="historyResultShow = false"
    ></history-result>
    <read-questions v-if="showReadQuestion" @close="showReadQuestion = false" :answer="currAnswer"></read-questions>
    <read-reports v-if="showReadReport" @close="showReadReport = false" :report="currReport"></read-reports>
  </div>
</template>

<script>
import {mapState, mapActions} from "vuex";
import historyResult from "@/page/rootLeft/historyResult";
import {checkIsMatch} from "@/fetch/api.js";
import readQuestions from "@/components/readQuestions";
import readReports from "@/components/readReports";
import fLoader from "@/components/fLoader";

export default {
  components: {
    historyResult,
    fLoader,
    readQuestions,
    readReports
  },
  props: ["selectedOrderProp", "reciptTypeProp", "examinationInfoProp", "recipeClinicId"],
  data() {
    return {
      recordTemplate: [
        {code: "主诉", key: "chief_complaint"},
        {code: "现病史", key: "present_illness"},
        {code: "月经生育史", key: "childbearing_history"},
        {code: "体格检查", key: "examination"},
        {code: "辅助检查", key: "auxiliary_examination"},
        {code: "中医诊断", key: "diagnosis"},
        {code: "初步诊断", key: "diagnosis_xy"},
        {code: "治疗处理", key: "treat_advice"},
        {code: "运动建议", key: "sport_advice"},
        {code: "膳食建议", key: "dietary_advice"}
      ],
      historyResultShow: false,
      listMap: [
        "",
        "herbal_list",
        "western_list",
        "product_list",
        "therapy_list",
        "extra_list"
      ],
      formatedRecipe: {},
      showLoader: false,
      showReadQuestion: false,
      showReadReport: false,
      currAnswer: {},
      currReport: {}
    };
  },
  computed: {
    ...mapState({
      currRecipe: state => state.currRecipe,
      clinicType: state => state.clinicType,
      recipeList: state => state.recipeList,
      clinicId: state => state.clinicId
    }),
    selectedOrder() {
      return this.selectedOrderProp;
    },
    treatAnswerList() {
      return this.selectedOrder.treat_answer_data ? JSON.parse(this.selectedOrder.treat_answer_data) : []
    },
    treatReportList() {
      return this.selectedOrder.treat_report_data ? JSON.parse(this.selectedOrder.treat_report_data) : []
    },
    reciptType() {
      return this.reciptTypeProp;
    },
    examinationInfo() {
      return this.examinationInfoProp;
    },
    examination() {
      // 计算检查结果
      var examination = this.examinationInfo;
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
      examination.info && (ret += (ret ? "\n" : "") + examination.info);
      return ret;
    },
    recordData() {
      let [selectedOrder, examination] = [this.selectedOrder, this.examination];
      let data = this.recordTemplate;
      return data.filter(item => {
        item.val =
          item.code !== "体格检查"
            ? selectedOrder[item.key]
            ? selectedOrder[item.key]
            : ""
            : examination;
        return item;
      });
    },
    recipe_list() {
      return this.selectedOrder.recipe_list;
    },
    checkMatch() {
      return (
        Boolean(this.formatedRecipes) &&
        Boolean(this.formatedRecipes[this.formatedRecipesIndex]) &&
        Boolean(this.formatedRecipes[this.formatedRecipesIndex].checkMatch)
      );
    }
  },
  methods: {
    ...mapActions(["set_state_prop", "set_record_prop"]),
    showReadQuestionAlert(item) {
      this.showReadQuestion = true
      this.currAnswer = item
    },

    showReadReportAlert(item) {
      this.showReadReport = true
      this.currReport = item
    },

    historyDetailsBack() {
      this.set_state_prop({key: "showHistoryDetail", val: false});
    },
    // && recipe.is_cloud==0
    importHistoryRecord(order) {
      let data = JSON.parse(JSON.stringify(this.recordData));
      data.forEach(item => {
        switch (item.key) {
          case "examination":
            item.val = this.examinationInfo;
            break;
          case "diagnosis":
            data.push(
              {
                code: "中医诊断输入框",
                key: "diagnosis_input",
                val: item.val ? item.val + ";" : ""
              },
              {code: "中医诊断标签", key: "diagnosis_labels", val: []}
            );
            break;
          case "diagnosis_xy":
            data.push(
              {
                code: "西医诊断输入框",
                key: "diagnosis_xy_input",
                val: item.val ? item.val + ";" : ""
              },
              {code: "西医诊断标签", key: "diagnosis_xy_labels", val: []}
            );
            break;
        }
      });
      let list = ['allergic_history', 'family_history', 'diagnosis', 'personal_history', 'prophylactic_history', 'sport_advice', 'past_history', 'examination', 'auxiliary_examination', 'dietary_advice', 'childbearing_history']
      let record_list = []

      list.forEach(item => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].key == item && data[i].val && JSON.stringify(data[i].val) != '{}') {
            record_list.push(item)
            break
          }
        }
      })
      this.set_record_prop({key: 'recordList', val: record_list})


      data.forEach(item => {
        this.set_record_prop({
          key: item.key,
          val: item.val
        });
      });
    },
    async impHistory(recipe) {
      this.showLoader = true;
      let recipeObj = JSON.parse(JSON.stringify(recipe));
      let type = recipe.recipe_type;
      let map = this.listMap;
      let ids = [];
      let names = []
      this.formatedRecipe = recipeObj;
      if (!map[type]) return;
      if (recipeObj.is_cloud == 1) {
        recipeObj[map[type]].forEach(list => {
          list.is_match = 0;
          ids.push(list.cloud_item_id);
          names.push(list.name)
        });
      } else {
        recipeObj[map[type]].forEach(list => {
          list.is_match = 0;
          ids.push(list.item_id);
          names.push(list.name)
        });
      }

      if (ids.length == 0) return;

      let params;
      if (recipeObj.is_cloud == 1) {
        params = {status: 1, names}
      } else {
        if (this.recipeClinicId == this.clinicId) {
          params = {status: 1, ids}
        } else {
          params = {status: 1, names}
        }

      }
      if (recipeObj.recipe_type === 1) {
        params = Object.assign(params, {category: recipeObj.category})
      }

      if (recipeObj.recipe_type === 4) {
        params = Object.assign(params, {type: recipeObj.therapy_type})
      }

      let res = await checkIsMatch(
        params,
        type,
        recipeObj.is_cloud ? recipeObj.is_cloud : 0
      );
      if (res.code == 1000) {
        let data = res.data;
        let arr = recipeObj[map[type]];
        if (recipeObj.is_cloud == 1) {
          for (let i = 0, len = arr.length; i < len; i++) {
            let findData = data.find(dataItem => dataItem.name == arr[i].name || dataItem.alias_name == arr[i].name);
            if (findData) {
              arr[i] = Object.assign(arr[i], findData, {is_match: 1});
            }
          }
        } else {
          if (this.recipeClinicId == this.clinicId) {
            for (let i = 0, len = arr.length; i < len; i++) {
              let findData = data.find(dataItem => dataItem.id == arr[i].item_id);
              if (findData) {
                arr[i] = Object.assign(arr[i], findData, {is_match: 1});
              }
            }
          } else {
            for (let i = 0, len = arr.length; i < len; i++) {
              let findData = data.find(dataItem => dataItem.name == arr[i].name || dataItem.clinic_alias_name == arr[i].name);
              if (findData) {
                arr[i] = Object.assign(arr[i], findData, {is_match: 1});
              }
            }
          }
        }
        this.showLoader = false;
        this.historyResultShow = true;
      } else {
        console.log(res.msg);
      }
    }
  }
};
</script>

<style scoped>
  .a_blue_text {
    color: #5096e0;
    text-decoration: underline;
    font-weight: bold;
    cursor: pointer;
  }

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
    font-size: 0.9375rem;
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
    padding-right: 2rem;
  }

  .history-line-s {
    border-bottom: #ccc solid 1px;
    height: auto;
    width: 100%;
    padding: 10px 0px;
  }

  .history-line-key {
    width: 5rem;
    text-align: justify;
    text-align-last: justify;
  }

  .multiline-text-box {
    white-space: pre-wrap;
    margin: 0;
    font-family: "microsoft yahei";
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
