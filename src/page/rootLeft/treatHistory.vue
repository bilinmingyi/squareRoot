<template>
  <div class="treat-history">
    <div v-show="!showHistoryDetail" class="treat-history-lists">
      <ul class="t-h-lists" v-if="historyData.treatOrderList.length!=0">
        <li
          class="t-h-item"
          v-for="historyItem in historyData.treatOrderList"
          @click="selectOrder(historyItem)"
        >
          <div class="font-bold">{{ historyItem.create_time | dateFormat('yyyy-MM-dd')}}</div>
          <div>医生：{{historyItem.doctor_name}}</div>
          <div class="display-flex">
            <span>西医诊断：</span>
            <span class="flex-1">{{historyItem.diagnosis_xy}}</span>
          </div>
          <div class="display-flex">
            <span>中医诊断：</span>
            <span class="flex-1">{{historyItem.diagnosis}}</span>
          </div>
        </li>
      </ul>
      <div v-else class="t-h-tips">暂无就诊记录</div>
      <div class="t-h-btn-group" v-if="historyData.treatOrderList.length!=0">
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
import { getHistoryRecipes } from "@/fetch/api.js";
export default {
  components: {
    treatHistoryDetail
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
        treatOrderList: [
          {
            id: 881,
            appoint_order_seqno: "",
            clinic_id: 5,
            order_seqno: "T0282477172002",
            yb_serial_seqno: "",
            recipe_data: [
              { recipe_type: 1, id: 665 },
              { recipe_type: 2, id: 86 },
              { recipe_type: 5, id: 304 },
              { recipe_type: 1, id: 666 }
            ],
            creator_type: "0",
            doctor_id: 2,
            doctor_name: "demo",
            patient_id: 22,
            patient_name: "A5",
            patient_age: 14,
            patient_sex: 0,
            patient_marital_status: 0,
            patient_weight: 55,
            patient_mobile: "13728089836",
            member_type_id: 0,
            member_type: "",
            present_illness: "高血压",
            chief_complaint: "流鼻涕，发热",
            examination: "{}",
            diagnosis: "鼻炎",
            diagnosis_xy: "过敏性鼻炎伴哮喘",
            treat_advice: "111",
            status: "UNPAID",
            submit_time: 1544754509817,
            charge_time: 0,
            dispensing_time: 0,
            price: 75.9,
            treat_price: 2,
            discount: 0,
            amount_receivable: 75.9,
            amount_receipts: 0,
            amount_arrears: 0,
            amount_yb: 0,
            pay_type: 0,
            memo: "",
            dispensing_memo: "",
            dispensing_operator: "",
            create_time: 1544752372492,
            is_first: 1,
            recipe_list: [
              {
                recipe_id: 665,
                recipe_type: 1,
                is_cloud: 0,
                cloud_price: 0,
                category: 1,
                dosage: 2,
                frequency: "每天两次",
                usage: "煎服",
                dose_once: "100ml",
                extra_name: "代煎",
                extra_num: 2,
                extra_price: 10,
                price: 15.3,
                doctor_remark: "222",
                herbal_list: [
                  {
                    id: 4222,
                    category: 1,
                    item_id: 13789,
                    cloud_item_id: 0,
                    base_id: 6057,
                    name: "绵马贯众",
                    spec: "1g/g",
                    num: 1,
                    unit: "g",
                    stock_cost: 1,
                    sale_price: 0.08,
                    usage: "包煎",
                    yb_cata_code: "06134510500103418",
                    yb_cata_name: "绵马贯众炭",
                    yb_standard_code: "06134510500103418"
                  },
                  {
                    id: 4223,
                    category: 1,
                    item_id: 13788,
                    cloud_item_id: 0,
                    base_id: 5983,
                    name: "龙血竭",
                    spec: "1g/g",
                    num: 2,
                    unit: "g",
                    stock_cost: 2,
                    sale_price: 0.76,
                    usage: "包煎",
                    yb_cata_code: "",
                    yb_cata_name: "",
                    yb_standard_code: ""
                  },
                  {
                    id: 4224,
                    category: 1,
                    item_id: 13790,
                    cloud_item_id: 0,
                    base_id: 5611,
                    name: "防己",
                    spec: "1g/g",
                    num: 3,
                    unit: "g",
                    stock_cost: 3,
                    sale_price: 0.35,
                    usage: "包煎",
                    yb_cata_code: "06154010100103008",
                    yb_cata_name: "防己",
                    yb_standard_code: "06154010100103008"
                  }
                ]
              },
              {
                recipe_id: 86,
                recipe_type: 2,
                is_cloud: 0,
                cloud_price: 0,
                price: 37,
                doctor_remark: "444",
                western_list: [
                  {
                    id: 108,
                    category: 1,
                    item_id: 5107,
                    cloud_item_id: 0,
                    base_id: 189353,
                    name: "蓝芩口服液",
                    form: "合剂",
                    spec: "10ml/12支/盒",
                    num: 1,
                    unit: "盒",
                    stock_cost: 1,
                    sale_price: 37,
                    frequency: "每天一次",
                    days: 3,
                    dose_once: "",
                    usage: "口服",
                    yb_cata_code: "86901749001573",
                    yb_cata_name: "蓝芩口服液",
                    yb_standard_code: "86901749001573"
                  }
                ]
              },
              { recipe_type: 5, price: 0, doctor_remark: "", extra_list: [] },
              {
                recipe_id: 666,
                recipe_type: 1,
                is_cloud: 0,
                cloud_price: 0,
                category: 2,
                dosage: 3,
                frequency: "每天三次",
                usage: "温水助服",
                dose_once: "3g",
                extra_name: "打粉",
                extra_num: 3,
                extra_price: 15,
                price: 21.6,
                doctor_remark: "333",
                herbal_list: [
                  {
                    id: 4225,
                    category: 2,
                    item_id: 11480,
                    cloud_item_id: 0,
                    base_id: 3767,
                    name: "甘草",
                    spec: "1g/g",
                    num: 4,
                    unit: "g",
                    stock_cost: 4,
                    sale_price: 0.2,
                    usage: "冲服",
                    yb_cata_code: "",
                    yb_cata_name: "",
                    yb_standard_code: ""
                  },
                  {
                    id: 4226,
                    category: 2,
                    item_id: 8525,
                    cloud_item_id: 0,
                    base_id: 4908,
                    name: "辛夷",
                    spec: "1g/g",
                    num: 5,
                    unit: "g",
                    stock_cost: 5,
                    sale_price: 0.28,
                    usage: "冲服",
                    yb_cata_code: "",
                    yb_cata_name: "",
                    yb_standard_code: ""
                  }
                ]
              }
            ],
            draft: {
              patientData: {
                id: "22",
                name: "A5",
                mobile: "13728089836",
                birthday: 1083513600000,
                sex: 0,
                weight: 55,
                marital_status: 0,
                personal_history: "过敏性鼻炎；",
                family_history: "",
                allergic_history: "磺胺类；链霉素；",
                age: 14
              },
              caseData: {
                chief_complaint: "流鼻涕，发热",
                present_illness: "高血压",
                examination: {},
                diagnosis: "鼻炎",
                diagnosis_input: "鼻炎",
                diagnosis_labels: [],
                diagnosis_search_data: [],
                diagnosis_xy: "过敏性鼻炎伴哮喘",
                diagnosis_xy_input: "过敏性鼻炎伴哮喘",
                diagnosis_xy_labels: [],
                diagnosis_xy_search_data: [],
                treat_advice: "111"
              },
              recipeData: {
                recipeList: [
                  {
                    category: 1,
                    dosage: 2,
                    extra_price: 10,
                    extra_tmp_price: 5,
                    extra_feetype: "代煎",
                    extra_unit: "剂",
                    extra_num: 2,
                    iscloudextraid: 0,
                    items: [
                      {
                        item_id: 13789,
                        name: "绵马贯众",
                        num: 1,
                        price: 0.08,
                        unit: "g",
                        sale_price: 0.08,
                        spec: "1g/g",
                        unit_stock: "g",
                        usage: "包煎",
                        stock: 157,
                        is_match: 1
                      },
                      {
                        item_id: 13788,
                        name: "龙血竭",
                        num: 2,
                        price: 0.76,
                        unit: "g",
                        sale_price: 0.76,
                        spec: "1g/g",
                        unit_stock: "g",
                        usage: "包煎",
                        stock: 261,
                        is_match: 1
                      },
                      {
                        item_id: 13790,
                        name: "防己",
                        num: 3,
                        price: 0.35,
                        unit: "g",
                        sale_price: 0.35,
                        spec: "1g/g",
                        unit_stock: "g",
                        usage: "包煎",
                        stock: 65,
                        is_match: 1
                      }
                    ],
                    is_cloud: 0,
                    allcategory: 1,
                    tplsearchList: [],
                    dose_once: "100ml",
                    dose_once_volume: 100,
                    dose_once_unit: "ml",
                    recipe_type: 1,
                    name: "中药处方",
                    doctor_remark: "222",
                    usage: "煎服",
                    extra_feetype_id: 9,
                    extra_name: "代煎",
                    frequency: "每天两次"
                  },
                  {
                    items: [
                      {
                        item_id: 5107,
                        name: "蓝芩口服液",
                        num: "1",
                        price: 37,
                        unit: "盒",
                        sale_price: 37,
                        spec: "10ml/12支/盒",
                        unit_stock: "盒",
                        unit_sale: "支",
                        unit_dose: "ml",
                        stock_sale_ratio: 12,
                        sale_dose_ratio: 10,
                        usage: "口服",
                        days: "3",
                        frequency: "每天一次",
                        dose_once: "",
                        stock: 97.916,
                        is_match: 1
                      }
                    ],
                    recipe_type: 2,
                    name: "中成药西药",
                    doctor_remark: "444"
                  },
                  { items: [], recipe_type: 4, name: "项目处方" },
                  { items: [], recipe_type: 5, name: "附加服务" },
                  {
                    category: 2,
                    dosage: 3,
                    extra_price: 15,
                    extra_tmp_price: 5,
                    extra_feetype: "打粉",
                    extra_unit: "剂",
                    extra_num: 3,
                    iscloudextraid: 0,
                    items: [
                      {
                        item_id: 11480,
                        name: "甘草",
                        num: 4,
                        price: 0.2,
                        unit: "g",
                        sale_price: 0.2,
                        spec: "1g/g",
                        unit_stock: "g",
                        usage: "冲服",
                        stock: 540,
                        is_match: 1
                      },
                      {
                        item_id: 8525,
                        name: "辛夷",
                        num: 5,
                        price: 0.28,
                        unit: "g",
                        sale_price: 0.28,
                        spec: "1g/g",
                        unit_stock: "g",
                        usage: "冲服",
                        stock: 928,
                        is_match: 1
                      }
                    ],
                    is_cloud: 0,
                    allcategory: 2,
                    tplsearchList: [],
                    dose_once: "3g",
                    dose_once_volume: 3,
                    dose_once_unit: "g",
                    recipe_type: 1,
                    name: "中药处方",
                    usage: "温水助服",
                    frequency: "每天三次",
                    extra_feetype_id: 6,
                    extra_name: "打粉",
                    doctor_remark: "333"
                  }
                ]
              }
            },
            yb_card_no: "",
            start_time: "",
            end_time: "",
            room_code: "",
            sign_time: 0,
            appoint_period: 0,
            pay_category: 0,
            yb_medical_category: "",
            yb_upload: 0
          },
          {
            id: 881,
            appoint_order_seqno: "",
            clinic_id: 5,
            order_seqno: "T0282477172002",
            yb_serial_seqno: "",
            recipe_data: [
              { recipe_type: 1, id: 665 },
              { recipe_type: 2, id: 86 },
              { recipe_type: 5, id: 304 },
              { recipe_type: 1, id: 666 }
            ],
            creator_type: "0",
            doctor_id: 2,
            doctor_name: "demo",
            patient_id: 22,
            patient_name: "A5",
            patient_age: 14,
            patient_sex: 0,
            patient_marital_status: 0,
            patient_weight: 55,
            patient_mobile: "13728089836",
            member_type_id: 0,
            member_type: "",
            present_illness: "高血压",
            chief_complaint: "流鼻涕，发热",
            examination: "{}",
            diagnosis: "鼻炎",
            diagnosis_xy: "过敏性鼻炎伴哮喘",
            treat_advice: "111",
            status: "UNPAID",
            submit_time: 1544754509817,
            charge_time: 0,
            dispensing_time: 0,
            price: 75.9,
            treat_price: 2,
            discount: 0,
            amount_receivable: 75.9,
            amount_receipts: 0,
            amount_arrears: 0,
            amount_yb: 0,
            pay_type: 0,
            memo: "",
            dispensing_memo: "",
            dispensing_operator: "",
            create_time: 1544752372492,
            is_first: 1,
            recipe_list: [
              {
                recipe_id: 665,
                recipe_type: 1,
                is_cloud: 0,
                cloud_price: 0,
                category: 1,
                dosage: 2,
                frequency: "每天两次",
                usage: "煎服",
                dose_once: "100ml",
                extra_name: "代煎",
                extra_num: 2,
                extra_price: 10,
                price: 15.3,
                doctor_remark: "222",
                herbal_list: [
                  {
                    id: 4222,
                    category: 1,
                    item_id: 13789,
                    cloud_item_id: 0,
                    base_id: 6057,
                    name: "绵马贯众",
                    spec: "1g/g",
                    num: 1,
                    unit: "g",
                    stock_cost: 1,
                    sale_price: 0.08,
                    usage: "包煎",
                    yb_cata_code: "06134510500103418",
                    yb_cata_name: "绵马贯众炭",
                    yb_standard_code: "06134510500103418"
                  },
                  {
                    id: 4223,
                    category: 1,
                    item_id: 13788,
                    cloud_item_id: 0,
                    base_id: 5983,
                    name: "龙血竭",
                    spec: "1g/g",
                    num: 2,
                    unit: "g",
                    stock_cost: 2,
                    sale_price: 0.76,
                    usage: "包煎",
                    yb_cata_code: "",
                    yb_cata_name: "",
                    yb_standard_code: ""
                  },
                  {
                    id: 4224,
                    category: 1,
                    item_id: 13790,
                    cloud_item_id: 0,
                    base_id: 5611,
                    name: "防己",
                    spec: "1g/g",
                    num: 3,
                    unit: "g",
                    stock_cost: 3,
                    sale_price: 0.35,
                    usage: "包煎",
                    yb_cata_code: "06154010100103008",
                    yb_cata_name: "防己",
                    yb_standard_code: "06154010100103008"
                  }
                ]
              },
              {
                recipe_id: 86,
                recipe_type: 2,
                is_cloud: 0,
                cloud_price: 0,
                price: 37,
                doctor_remark: "444",
                western_list: [
                  {
                    id: 108,
                    category: 1,
                    item_id: 5107,
                    cloud_item_id: 0,
                    base_id: 189353,
                    name: "蓝芩口服液",
                    form: "合剂",
                    spec: "10ml/12支/盒",
                    num: 1,
                    unit: "盒",
                    stock_cost: 1,
                    sale_price: 37,
                    frequency: "每天一次",
                    days: 3,
                    dose_once: "",
                    usage: "口服",
                    yb_cata_code: "86901749001573",
                    yb_cata_name: "蓝芩口服液",
                    yb_standard_code: "86901749001573"
                  }
                ]
              },
              { recipe_type: 5, price: 0, doctor_remark: "", extra_list: [] },
              {
                recipe_id: 666,
                recipe_type: 1,
                is_cloud: 0,
                cloud_price: 0,
                category: 2,
                dosage: 3,
                frequency: "每天三次",
                usage: "温水助服",
                dose_once: "3g",
                extra_name: "打粉",
                extra_num: 3,
                extra_price: 15,
                price: 21.6,
                doctor_remark: "333",
                herbal_list: [
                  {
                    id: 4225,
                    category: 2,
                    item_id: 11480,
                    cloud_item_id: 0,
                    base_id: 3767,
                    name: "甘草",
                    spec: "1g/g",
                    num: 4,
                    unit: "g",
                    stock_cost: 4,
                    sale_price: 0.2,
                    usage: "冲服",
                    yb_cata_code: "",
                    yb_cata_name: "",
                    yb_standard_code: ""
                  },
                  {
                    id: 4226,
                    category: 2,
                    item_id: 8525,
                    cloud_item_id: 0,
                    base_id: 4908,
                    name: "辛夷",
                    spec: "1g/g",
                    num: 5,
                    unit: "g",
                    stock_cost: 5,
                    sale_price: 0.28,
                    usage: "冲服",
                    yb_cata_code: "",
                    yb_cata_name: "",
                    yb_standard_code: ""
                  }
                ]
              }
            ],
            draft: {
              patientData: {
                id: "22",
                name: "A5",
                mobile: "13728089836",
                birthday: 1083513600000,
                sex: 0,
                weight: 55,
                marital_status: 0,
                personal_history: "过敏性鼻炎；",
                family_history: "",
                allergic_history: "磺胺类；链霉素；",
                age: 14
              },
              caseData: {
                chief_complaint: "流鼻涕，发热",
                present_illness: "高血压",
                examination: {},
                diagnosis: "鼻炎",
                diagnosis_input: "鼻炎",
                diagnosis_labels: [],
                diagnosis_search_data: [],
                diagnosis_xy: "过敏性鼻炎伴哮喘",
                diagnosis_xy_input: "过敏性鼻炎伴哮喘",
                diagnosis_xy_labels: [],
                diagnosis_xy_search_data: [],
                treat_advice: "111"
              },
              recipeData: {
                recipeList: [
                  {
                    category: 1,
                    dosage: 2,
                    extra_price: 10,
                    extra_tmp_price: 5,
                    extra_feetype: "代煎",
                    extra_unit: "剂",
                    extra_num: 2,
                    iscloudextraid: 0,
                    items: [
                      {
                        item_id: 13789,
                        name: "绵马贯众",
                        num: 1,
                        price: 0.08,
                        unit: "g",
                        sale_price: 0.08,
                        spec: "1g/g",
                        unit_stock: "g",
                        usage: "包煎",
                        stock: 157,
                        is_match: 1
                      },
                      {
                        item_id: 13788,
                        name: "龙血竭",
                        num: 2,
                        price: 0.76,
                        unit: "g",
                        sale_price: 0.76,
                        spec: "1g/g",
                        unit_stock: "g",
                        usage: "包煎",
                        stock: 261,
                        is_match: 1
                      },
                      {
                        item_id: 13790,
                        name: "防己",
                        num: 3,
                        price: 0.35,
                        unit: "g",
                        sale_price: 0.35,
                        spec: "1g/g",
                        unit_stock: "g",
                        usage: "包煎",
                        stock: 65,
                        is_match: 1
                      }
                    ],
                    is_cloud: 0,
                    allcategory: 1,
                    tplsearchList: [],
                    dose_once: "100ml",
                    dose_once_volume: 100,
                    dose_once_unit: "ml",
                    recipe_type: 1,
                    name: "中药处方",
                    doctor_remark: "222",
                    usage: "煎服",
                    extra_feetype_id: 9,
                    extra_name: "代煎",
                    frequency: "每天两次"
                  },
                  {
                    items: [
                      {
                        item_id: 5107,
                        name: "蓝芩口服液",
                        num: "1",
                        price: 37,
                        unit: "盒",
                        sale_price: 37,
                        spec: "10ml/12支/盒",
                        unit_stock: "盒",
                        unit_sale: "支",
                        unit_dose: "ml",
                        stock_sale_ratio: 12,
                        sale_dose_ratio: 10,
                        usage: "口服",
                        days: "3",
                        frequency: "每天一次",
                        dose_once: "",
                        stock: 97.916,
                        is_match: 1
                      }
                    ],
                    recipe_type: 2,
                    name: "中成药西药",
                    doctor_remark: "444"
                  },
                  { items: [], recipe_type: 4, name: "项目处方" },
                  { items: [], recipe_type: 5, name: "附加服务" },
                  {
                    category: 2,
                    dosage: 3,
                    extra_price: 15,
                    extra_tmp_price: 5,
                    extra_feetype: "打粉",
                    extra_unit: "剂",
                    extra_num: 3,
                    iscloudextraid: 0,
                    items: [
                      {
                        item_id: 11480,
                        name: "甘草",
                        num: 4,
                        price: 0.2,
                        unit: "g",
                        sale_price: 0.2,
                        spec: "1g/g",
                        unit_stock: "g",
                        usage: "冲服",
                        stock: 540,
                        is_match: 1
                      },
                      {
                        item_id: 8525,
                        name: "辛夷",
                        num: 5,
                        price: 0.28,
                        unit: "g",
                        sale_price: 0.28,
                        spec: "1g/g",
                        unit_stock: "g",
                        usage: "冲服",
                        stock: 928,
                        is_match: 1
                      }
                    ],
                    is_cloud: 0,
                    allcategory: 2,
                    tplsearchList: [],
                    dose_once: "3g",
                    dose_once_volume: 3,
                    dose_once_unit: "g",
                    recipe_type: 1,
                    name: "中药处方",
                    usage: "温水助服",
                    frequency: "每天三次",
                    extra_feetype_id: 6,
                    extra_name: "打粉",
                    doctor_remark: "333"
                  }
                ]
              }
            },
            yb_card_no: "",
            start_time: "",
            end_time: "",
            room_code: "",
            sign_time: 0,
            appoint_period: 0,
            pay_category: 0,
            yb_medical_category: "",
            yb_upload: 0
          },
          {
            id: 881,
            appoint_order_seqno: "",
            clinic_id: 5,
            order_seqno: "T0282477172002",
            yb_serial_seqno: "",
            recipe_data: [
              { recipe_type: 1, id: 665 },
              { recipe_type: 2, id: 86 },
              { recipe_type: 5, id: 304 },
              { recipe_type: 1, id: 666 }
            ],
            creator_type: "0",
            doctor_id: 2,
            doctor_name: "demo",
            patient_id: 22,
            patient_name: "A5",
            patient_age: 14,
            patient_sex: 0,
            patient_marital_status: 0,
            patient_weight: 55,
            patient_mobile: "13728089836",
            member_type_id: 0,
            member_type: "",
            present_illness: "高血压",
            chief_complaint: "流鼻涕，发热",
            examination: "{}",
            diagnosis: "鼻炎",
            diagnosis_xy: "过敏性鼻炎伴哮喘",
            treat_advice: "111",
            status: "UNPAID",
            submit_time: 1544754509817,
            charge_time: 0,
            dispensing_time: 0,
            price: 75.9,
            treat_price: 2,
            discount: 0,
            amount_receivable: 75.9,
            amount_receipts: 0,
            amount_arrears: 0,
            amount_yb: 0,
            pay_type: 0,
            memo: "",
            dispensing_memo: "",
            dispensing_operator: "",
            create_time: 1544752372492,
            is_first: 1,
            recipe_list: [
              {
                recipe_id: 665,
                recipe_type: 1,
                is_cloud: 0,
                cloud_price: 0,
                category: 1,
                dosage: 2,
                frequency: "每天两次",
                usage: "煎服",
                dose_once: "100ml",
                extra_name: "代煎",
                extra_num: 2,
                extra_price: 10,
                price: 15.3,
                doctor_remark: "222",
                herbal_list: [
                  {
                    id: 4222,
                    category: 1,
                    item_id: 13789,
                    cloud_item_id: 0,
                    base_id: 6057,
                    name: "绵马贯众",
                    spec: "1g/g",
                    num: 1,
                    unit: "g",
                    stock_cost: 1,
                    sale_price: 0.08,
                    usage: "包煎",
                    yb_cata_code: "06134510500103418",
                    yb_cata_name: "绵马贯众炭",
                    yb_standard_code: "06134510500103418"
                  },
                  {
                    id: 4223,
                    category: 1,
                    item_id: 13788,
                    cloud_item_id: 0,
                    base_id: 5983,
                    name: "龙血竭",
                    spec: "1g/g",
                    num: 2,
                    unit: "g",
                    stock_cost: 2,
                    sale_price: 0.76,
                    usage: "包煎",
                    yb_cata_code: "",
                    yb_cata_name: "",
                    yb_standard_code: ""
                  },
                  {
                    id: 4224,
                    category: 1,
                    item_id: 13790,
                    cloud_item_id: 0,
                    base_id: 5611,
                    name: "防己",
                    spec: "1g/g",
                    num: 3,
                    unit: "g",
                    stock_cost: 3,
                    sale_price: 0.35,
                    usage: "包煎",
                    yb_cata_code: "06154010100103008",
                    yb_cata_name: "防己",
                    yb_standard_code: "06154010100103008"
                  }
                ]
              },
              {
                recipe_id: 86,
                recipe_type: 2,
                is_cloud: 0,
                cloud_price: 0,
                price: 37,
                doctor_remark: "444",
                western_list: [
                  {
                    id: 108,
                    category: 1,
                    item_id: 5107,
                    cloud_item_id: 0,
                    base_id: 189353,
                    name: "蓝芩口服液",
                    form: "合剂",
                    spec: "10ml/12支/盒",
                    num: 1,
                    unit: "盒",
                    stock_cost: 1,
                    sale_price: 37,
                    frequency: "每天一次",
                    days: 3,
                    dose_once: "",
                    usage: "口服",
                    yb_cata_code: "86901749001573",
                    yb_cata_name: "蓝芩口服液",
                    yb_standard_code: "86901749001573"
                  }
                ]
              },
              { recipe_type: 5, price: 0, doctor_remark: "", extra_list: [] },
              {
                recipe_id: 666,
                recipe_type: 1,
                is_cloud: 0,
                cloud_price: 0,
                category: 2,
                dosage: 3,
                frequency: "每天三次",
                usage: "温水助服",
                dose_once: "3g",
                extra_name: "打粉",
                extra_num: 3,
                extra_price: 15,
                price: 21.6,
                doctor_remark: "333",
                herbal_list: [
                  {
                    id: 4225,
                    category: 2,
                    item_id: 11480,
                    cloud_item_id: 0,
                    base_id: 3767,
                    name: "甘草",
                    spec: "1g/g",
                    num: 4,
                    unit: "g",
                    stock_cost: 4,
                    sale_price: 0.2,
                    usage: "冲服",
                    yb_cata_code: "",
                    yb_cata_name: "",
                    yb_standard_code: ""
                  },
                  {
                    id: 4226,
                    category: 2,
                    item_id: 8525,
                    cloud_item_id: 0,
                    base_id: 4908,
                    name: "辛夷",
                    spec: "1g/g",
                    num: 5,
                    unit: "g",
                    stock_cost: 5,
                    sale_price: 0.28,
                    usage: "冲服",
                    yb_cata_code: "",
                    yb_cata_name: "",
                    yb_standard_code: ""
                  }
                ]
              }
            ],
            draft: {
              patientData: {
                id: "22",
                name: "A5",
                mobile: "13728089836",
                birthday: 1083513600000,
                sex: 0,
                weight: 55,
                marital_status: 0,
                personal_history: "过敏性鼻炎；",
                family_history: "",
                allergic_history: "磺胺类；链霉素；",
                age: 14
              },
              caseData: {
                chief_complaint: "流鼻涕，发热",
                present_illness: "高血压",
                examination: {},
                diagnosis: "鼻炎",
                diagnosis_input: "鼻炎",
                diagnosis_labels: [],
                diagnosis_search_data: [],
                diagnosis_xy: "过敏性鼻炎伴哮喘",
                diagnosis_xy_input: "过敏性鼻炎伴哮喘",
                diagnosis_xy_labels: [],
                diagnosis_xy_search_data: [],
                treat_advice: "111"
              },
              recipeData: {
                recipeList: [
                  {
                    category: 1,
                    dosage: 2,
                    extra_price: 10,
                    extra_tmp_price: 5,
                    extra_feetype: "代煎",
                    extra_unit: "剂",
                    extra_num: 2,
                    iscloudextraid: 0,
                    items: [
                      {
                        item_id: 13789,
                        name: "绵马贯众",
                        num: 1,
                        price: 0.08,
                        unit: "g",
                        sale_price: 0.08,
                        spec: "1g/g",
                        unit_stock: "g",
                        usage: "包煎",
                        stock: 157,
                        is_match: 1
                      },
                      {
                        item_id: 13788,
                        name: "龙血竭",
                        num: 2,
                        price: 0.76,
                        unit: "g",
                        sale_price: 0.76,
                        spec: "1g/g",
                        unit_stock: "g",
                        usage: "包煎",
                        stock: 261,
                        is_match: 1
                      },
                      {
                        item_id: 13790,
                        name: "防己",
                        num: 3,
                        price: 0.35,
                        unit: "g",
                        sale_price: 0.35,
                        spec: "1g/g",
                        unit_stock: "g",
                        usage: "包煎",
                        stock: 65,
                        is_match: 1
                      }
                    ],
                    is_cloud: 0,
                    allcategory: 1,
                    tplsearchList: [],
                    dose_once: "100ml",
                    dose_once_volume: 100,
                    dose_once_unit: "ml",
                    recipe_type: 1,
                    name: "中药处方",
                    doctor_remark: "222",
                    usage: "煎服",
                    extra_feetype_id: 9,
                    extra_name: "代煎",
                    frequency: "每天两次"
                  },
                  {
                    items: [
                      {
                        item_id: 5107,
                        name: "蓝芩口服液",
                        num: "1",
                        price: 37,
                        unit: "盒",
                        sale_price: 37,
                        spec: "10ml/12支/盒",
                        unit_stock: "盒",
                        unit_sale: "支",
                        unit_dose: "ml",
                        stock_sale_ratio: 12,
                        sale_dose_ratio: 10,
                        usage: "口服",
                        days: "3",
                        frequency: "每天一次",
                        dose_once: "",
                        stock: 97.916,
                        is_match: 1
                      }
                    ],
                    recipe_type: 2,
                    name: "中成药西药",
                    doctor_remark: "444"
                  },
                  { items: [], recipe_type: 4, name: "项目处方" },
                  { items: [], recipe_type: 5, name: "附加服务" },
                  {
                    category: 2,
                    dosage: 3,
                    extra_price: 15,
                    extra_tmp_price: 5,
                    extra_feetype: "打粉",
                    extra_unit: "剂",
                    extra_num: 3,
                    iscloudextraid: 0,
                    items: [
                      {
                        item_id: 11480,
                        name: "甘草",
                        num: 4,
                        price: 0.2,
                        unit: "g",
                        sale_price: 0.2,
                        spec: "1g/g",
                        unit_stock: "g",
                        usage: "冲服",
                        stock: 540,
                        is_match: 1
                      },
                      {
                        item_id: 8525,
                        name: "辛夷",
                        num: 5,
                        price: 0.28,
                        unit: "g",
                        sale_price: 0.28,
                        spec: "1g/g",
                        unit_stock: "g",
                        usage: "冲服",
                        stock: 928,
                        is_match: 1
                      }
                    ],
                    is_cloud: 0,
                    allcategory: 2,
                    tplsearchList: [],
                    dose_once: "3g",
                    dose_once_volume: 3,
                    dose_once_unit: "g",
                    recipe_type: 1,
                    name: "中药处方",
                    usage: "温水助服",
                    frequency: "每天三次",
                    extra_feetype_id: 6,
                    extra_name: "打粉",
                    doctor_remark: "333"
                  }
                ]
              }
            },
            yb_card_no: "",
            start_time: "",
            end_time: "",
            room_code: "",
            sign_time: 0,
            appoint_period: 0,
            pay_category: 0,
            yb_medical_category: "",
            yb_upload: 0
          }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      showHistoryDetail: state => state.showHistoryDetail,
      currRecipe: state => state.currRecipe,
      recipeList: state => state.recipeList,
      patientData: state => state.patientData
    })
  },
  watch: {
    currRecipe(newVal) {
      this.historyData.reciptType =
        this.currRecipe > -1
          ? this.recipeList[this.currRecipe].type
          : this.currRecipe;
    }
  },
  methods: {
    ...mapActions(["set_state_prop", "set_examination_info"]),
    getData() {
      let params = {
        patient_id: this.patientData.id,
        page_size: this.historyData.pageSize,
        page: this.historyData.page
      };
      getHistoryRecipes(params);
    },
    selectOrder(item) {
      this.historyData.selectedOrder = item;

      this.historyData.examinationInfo = item.examination
        ? JSON.parse(item.examination)
        : {};

      this.set_state_prop({ key: "showHistoryDetail", val: true });
    },
    changeHistoryRecipesPage(type) {
      if (type == 1) {
        this.historyData.page--;
      } else if (type == 2) {
        this.historyData.page++;
      }
      this.loadHistoryRecipes(this.historyData.page);
    },
    loadHistoryRecipes(page) {
      this.historyData.page = page;
      console.log(this.historyData.page);

      // TODO: load history recipes
    }
  }
};
</script>

<style scoped>
.treat-history {
  display: flex;
  height: 100%;
}
.treat-history-lists {
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