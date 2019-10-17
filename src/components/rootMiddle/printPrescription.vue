<template>
  <div>
    <f-loader v-if="showLoading"></f-loader>
  </div>
</template>
<script>
import { mapGetters, mapState, mapActions } from "vuex";
import { clinicName } from '@/assets/js/mapType.js'
import fLoader from '@/components/fLoader.vue'
import axios from 'axios'
import filter from "@/assets/js/filters.js"
import { printRendering } from '@/assets/js/printRendering.js'
import clodopToggle from '@/assets/js/clodop_toggle.js'
export default {
  name: "printPrescription",
  components: {
    fLoader
  },
  data() {
    return {
      showLoading: false,
      clinicName: clinicName,
      sexOptions: [
        { code: 1, name: '男' },
        { code: 2, name: '女' }
      ],
      clinicAddress: '',
      customerPhone: '',
      HeightStyle: {
        fontSize: '12px',
        minHeight: '375px',
        position: 'relative',
        bottom: '0'
      },
      HeightStyle2: {
        fontSize: '12px',
        minHeight: '385px',
        position: 'static',
        bottom: '0'
      },
      bottomStyle: {
        position: 'static',
        bottom: '2px',
        left: '0px',
        width: '100%'
      }
    }
  },
  computed: {
    ...mapGetters(["currRecipeData"]),
    ...mapState(["patientData", "recordData", "printPre", "printIndex", 'orderSeqno', 'doctorName', "isYB", "department", "ybCardNo", 'clinicType', 'clinic', 'print_createTime']),
    recipeType: function () {
      console.log(this.currRecipeData)
      return this.currRecipeData === undefined ? 0 : this.currRecipeData.type;
    },
    category: function () {
      return this.currRecipeData === undefined
        ? 1
        : this.currRecipeData.data.category;
    },
    getCurrDate: function () {
      var d = new Date();
      return d.getFullYear() + "-" + (d.getMonth() + 1) + '-' + d.getDate();
    },
    prescriptionNum: function () {
      var tempNum = this.orderSeqno.slice(-6)
      return tempNum.length < 7 ? ('000000' + tempNum).slice(-6) : tempNum
    },
    therapyType: function () {
      var type = this.currRecipeData === undefined ? 0 : this.currRecipeData.type
      return type == 4 ? this.currRecipeData.data.type : 0
    },
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
    printPre: function () {
      this.printPrescription()
    }
  },
  methods: {
    ...mapActions(['change_print_index',]),
    getTreatName: function (val) {
      console.log(val)
      switch (val.type) {
        case 1:
          return '申请单'
        case 2:
          return '检验申请单'
        case 3:
          return val.name + '申请单'
        default:
          return '申请单'
      }
    },
    printPrescription: function () {
      var self = this
      self.showLoading = true
      var printType = ''
      var recipe = self.currRecipeData.data
      var fn = function (htmlStr, width, height, margin) {
        self.showLoading = false
        var printParams = {
          pageHeight: height,
          pageWidth: width,
          printMargin: margin
        }

        clodopToggle(htmlStr, printParams)
      }
      var vue = axios
      var filterExam = JSON.stringify(self.examination)
      var commonVar = {
        '$机构名称': self.clinic.name || '',
        '$机构地址': self.clinic.city_name + '市' + self.clinic.county_name + '区' + self.clinic.address,
        '$服务热线': self.clinic.customer_phone || '',
        '$打印时间': filter.dateFormat(new Date(), 'yyyy-MM-dd hh:mm'),
        '$年': filter.dateFormat(self.print_createTime, 'yyyy'),
        '$月': filter.dateFormat(self.print_createTime, 'MM'),
        '$日': filter.dateFormat(self.print_createTime, 'dd'),
        '$时': filter.dateFormat(self.print_createTime, 'hh'),
        '$分': filter.dateFormat(self.print_createTime, 'mm'),
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
        '$就诊时间': filter.dateFormat(self.print_createTime, 'yyyy-MM-dd'),
        '$处方订单号':
          filter.dateFormat(self.print_createTime, 'yyyyMMdd') +
          self.orderSeqno.slice(-6),
        '$处方金额': self.currRecipeData.money || '',
        '$医嘱': self.currRecipeData.data.doctor_remark || ''
      }

      switch (self.currRecipeData.type) {
        case 0:
          return new printRendering(
            'herbalRecipe',
            Object.assign({}, commonVar, {
              '$中药列表': recipe.items,
              '$中药类型': recipe.category == 1 ? '饮片' : '颗粒',
              '$中药剂数': recipe.dosage,
              '$中药频次': recipe.frequency,
              '$中药用法': recipe.usage,
              '$中药用量': recipe.dose_once || self.currRecipeData.data.eachDose,
            }),
            vue,
            fn);
          break;
        case 1:
          return new printRendering(
            'herbalRecipe',
            Object.assign({}, commonVar, {
              '$中药列表': recipe.items,
              '$中药类型': recipe.category == 1 ? '饮片' : '颗粒',
              '$中药剂数': recipe.dosage,
              '$中药频次': recipe.frequency,
              '$中药用法': recipe.usage,
              '$中药用量': recipe.dose_once || self.currRecipeData.data.eachDose,
            }),
            vue,
            fn);
          break;
        case 2:
          return new printRendering(
            'westernRecipe',
            Object.assign({}, commonVar, {
              '$成药列表': recipe.items,
            }),
            vue,
            fn);
          break;
        case 6:
          return new printRendering(
            'materialRecipe',
            Object.assign({}, commonVar, {
              '$材料列表': recipe.items,
            }),
            vue,
            fn);
          break;
        case 3:
          return new printRendering(
            'westernRecipe',
            Object.assign({}, commonVar, {
              '$产品列表': recipe.items,
            }),
            vue,
            fn);
          break;
        case 4:
          switch (recipe.type) {
            case 1:
              if (self.printIndex !== undefined && self.printIndex !== null) {
                return new printRendering(
                  'treatApply',
                  Object.assign({}, commonVar, {
                    '$项目名称': recipe.items[self.printIndex].name,
                    '$执行次数': recipe.items[self.printIndex].num,
                    '$备注': recipe.items[self.printIndex].remark,
                    '$处方金额': (
                      recipe.items[self.printIndex].price *
                      recipe.items[self.printIndex].num
                    ).toFixed(2)
                  }),
                  vue,
                  fn
                )
              } else {
                return new printRendering(
                  'treatRecipe',
                  Object.assign({}, commonVar, {
                    '$治疗项目列表': recipe.items
                  }),
                  vue,
                  fn
                )
              }
              break
            case 2:
              if (self.printIndex !== undefined && self.printIndex !== null) {
                return new printRendering(
                  'textApply',
                  Object.assign({}, commonVar, {
                    '$项目名称': recipe.items[self.printIndex].name,
                    '$标本': recipe.items[self.printIndex].sample,
                    '$备注': recipe.items[self.printIndex].remark,
                    '$处方金额': (
                      recipe.items[self.printIndex].price *
                      recipe.items[self.printIndex].num
                    ).toFixed(2)
                  }),
                  vue,
                  fn
                )
              } else {
                return new printRendering(
                  'textRecipe',
                  Object.assign({}, commonVar, {
                    '$检验项目列表': recipe.items
                  }),
                  vue,
                  fn
                )
              }
              break
            case 3:
              if (self.printIndex !== undefined && self.printIndex !== null) {
                return new printRendering(
                  'examineApply',
                  Object.assign({}, commonVar, {
                    '$项目名称': recipe.items[self.printIndex].name,
                    '$部位': recipe.items[self.printIndex].position,
                    '$检查目的': recipe.items[self.printIndex].remark,
                    '$处方金额': (
                      recipe.items[self.printIndex].price *
                      recipe.items[self.printIndex].num
                    ).toFixed(2)
                  }),
                  vue,
                  fn
                )
              } else {
                return new printRendering(
                  'examineRecipe',
                  Object.assign({}, commonVar, {
                    '$检查项目列表': recipe.items
                  }),
                  vue,
                  fn
                )
              }
              break
          }
          break
      }
    }
  }
};
</script>

<style scoped>
</style>
