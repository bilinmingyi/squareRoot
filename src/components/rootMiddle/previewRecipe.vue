<template>
  <div class="prescription_tab_bg">
    <section class="content">
      <div class="content_left">
        <div class="content_left_block">
          <div class="preview_title">处方信息确认</div>
          <div class="preview_order_seqno">
            订单编号：{{orderSeqno}}
          </div>
          <div class="preview_patient">
            <div class="flexOne"><span class="preview_label">姓名：</span>{{patientData.name}}</div>
            <div class="flexOne"><span class="preview_label">性别：</span>{{patientData.sex|parseSex}}</div>
            <div class="flexOne"><span class="preview_label">年龄：</span>{{patientData.age}}</div>
            <div><span class="preview_label">电话：</span>{{patientData.mobile}}</div>
          </div>
          <div class="preview_recode">
            <div class="displayFlex mt5 mb5">
              <div class="preview_label">主诉：</div>
              <div class="flexOne">{{recordData.chief_complaint}}</div>
            </div>
            <div class="displayFlex mt5 mb5">
              <div class="preview_label">初步诊断：</div>
              <div class="flexOne">{{recordData.diagnosis_xy}}</div>
            </div>
            <div class="displayFlex mt5 mb5" v-if="clinicType != 6">
              <div class="preview_label">中医诊断：</div>
              <div class="flexOne">{{recordData.diagnosis}}</div>
            </div>
          </div>
          <section v-for="item in recipeList" class="preview_recipe">
            <div class="preview_recipe_title">
              <span v-if="item.type!=4">
                {{item.type|recipeType(item.data.category, clinicType)}}
              </span>
              <span v-else>
                {{item.data.type|therapyType}}处方
              </span>

              <!--              <i v-if="item.type===1">({{item.data.category===1?'饮片':'颗粒'}})</i>-->
            </div>
            <section class="preview_recipe_content">
              <div v-if="item.type===1">
                <div class="herbal_item" v-for="med in item.data.items">
                  <span class="pr4">{{med.name}}</span>
                  <span class="pr4">{{med.num}}{{med.unit}}</span>
                  <span class="pr4">{{med.usage}}</span>
                  <span v-if="med.stock<=0" style="color: red">无库存</span>
                </div>
                <div style="clear: both"></div>
                <div class="preview_label">
                  总共{{item.data.dosage}}剂（每剂{{item.data.items.length}}味）
                  <span v-if="item.data.eachDose!=''">每次用量{{item.data.eachDose}}ml</span>
                  <span v-if="item.data.usage!=''">，{{item.data.usage}}</span>
                </div>
              </div>
              <div v-if="item.type===2">
                <div v-for="med in item.data.items">
                  <span class="pr5">{{med.name}}</span>
                  <span class="pr5">{{med.spec}}</span>
                  <span class="pr5">{{med.num}}{{med.unit}}</span>
                  <span class="pr5" v-if="med.usage!=''">用法：{{med.usage}}</span>
                  <span class="pr5">{{med.frequency}}</span>
                  <span class="pr5" v-if="med.days!=''">{{med.days}}天</span>
                  <span class="pr5" v-if="med.dose_once!=''">每次{{med.dose_once}}{{med.unit_dose}}</span>
                  <span v-if="med.stock<=0" style="color: red">无库存</span>
                </div>
              </div>
              <div v-if="item.type===3">
                <div v-for="med in item.data.items">
                  <span class="pr5">{{med.name}}</span>
                  <span class="pr5">{{med.spec}}</span>
                  <span class="pr5">{{med.num}}{{med.unit}}</span>
                  <span class="pr5">{{med.remark}}</span>
                  <span v-if="med.stock<=0" style="color: red">无库存</span>
                </div>
              </div>
              <div v-if="item.type===4">
                <div v-for="med in item.data.items">
                  <span class="pr5">{{med.name}}</span>
                  <span class="pr5" v-if="item.data.type == 1">{{med.num}}{{med.unit}}</span>
                  <span class="pr5" v-if="item.data.type == 2">{{med.sample}}</span>
                  <span class="pr5" v-if="item.data.type == 3">{{med.position}}</span>
                  <span class="pr5">{{med.remark}}</span>
                </div>
              </div>
              <div v-if="item.type===6">
                <div v-for="med in item.data.items">
                  <span class="pr5">{{med.name}}</span>
                  <span class="pr5">{{med.num}}{{med.unit}}</span>
                  <span class="pr5">{{med.spec}}</span>
                  <span class="pr5">{{med.remark}}</span>
                  <span v-if="med.stock<=0" style="color: red">无库存</span>
                </div>
              </div>
            </section>
          </section>
          <section class="recipe_money">处方总金额：{{allPrice}}元</section>
        </div>
      </div>
      <div class="content_right">
        <div class="content_right_first">
          <div class="content_right_item mr20">
            <Button size="large" @click.stop="submitOrders">确定无误</Button>
          </div>
          <div class="content_right_item">
            <Button size="large" @click="returnToModify">返回修改</Button>
          </div>
        </div>
        <div class="content_right_second">
          <f-loader v-if="auditLoading" :fixed="false"></f-loader>
          <div v-if="resultList.length!==0">
            <p>处方审核信息</p>
            <div class="trial_block">
              <div v-for="(item, index) in resultList">
                <div class="font-bold">{{index+1}}、{{item.name}}</div>
                <div>{{item.result.auditResult}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <f-loader v-if="showLoading"></f-loader>
  </div>
</template>

<script>
import { Button } from 'iview'
import { mapState } from 'vuex'
import { submitOrder, waitingPage, auditrecipe } from '@/fetch/api.js'
import fLoader from '@/components/fLoader.vue'

export default {
  name: "previewRecipe",
  data() {
    return {
      allPrice: 0,
      showLoading: false,
      auditLoading: false,
      resultList: []
    }
  },
  components: {
    Button,
    fLoader
  },
  computed: {
    ...mapState({
      "orderSeqno": state => state.orderSeqno,
      "patientData": state => state.patientData,
      "recordData": state => state.recordData,
      "recipeList": state => state.recipeList.filter(item => {
        return item.data.items.length !== 0
      }),
      "draftData": state => state.draftData,
      "treatPrice": state => state.treatPrice,

      "department": state => state.department,
      "departmentCode": state => state.departmentCode,
      "doctorName": state => state.doctorName,
      "clinicType": state => state.clinicType
    })
  },
  watch: {
    recipeList: {
      deep: true,
      immediate: true,
      handler(newVal, oldVal) {
        var allMoney = 0;
        newVal.forEach(item => {
          allMoney += Number(item.money);
        });
        this.allPrice = Number(allMoney).toFixed(2);
      }
    }
  },
  created() {
    let promiseList = []
    this.auditLoading = true
    this.recipeList.forEach(item => {
      if (item.type == 2) {
        let list = item.data.items.map(med => {
          return {
            'pres_no': item.pres_no,
            'dept_code': this.departmentCode,
            'dept_name': this.department,
            'doctor_name': this.doctorName,
            'diagnosis': this.recordData.diagnosis_xy,
            'patient_code': this.patientData.id,
            'patient_name': this.patientData.name,
            'patient_sex': this.patientData.sex == 1 ? '男' : '女',
            'patient_age': this.patientData.age,
            'drug_code': med.yb_standard_code || med.national_num || med.code,
            'drug_name': med.name,
            'drug_specs': med.spec,
            'drug_dosage': med.sale_dose_ratio,
            'drug_dosage_unit_name': med.unit_dose,
            'drug_qty': med.num,
            'drug_unit': med.unit,
            'drug_usage_name': med.usage,
            'drug_per_dos': med.dose_once,
            'dosage_unit': med.unit_dose,
            'frequency_code': med.frequency ? this.findInFre(med.frequency) : 'qd',
            'pres_act_days': med.days
          }
        })
        promiseList.push(auditrecipe({
          "audit_items": list
        }))
      }
    })
    Promise.all(promiseList).then(res => {
      this.auditLoading = false
      let numList = ['一', '二', '三', '四', '五']
      res.forEach((re, index) => {
        if (re.code == 1000) {
          this.resultList.push({
            'name': '中成药西药处方(' + numList[index] + ')',
            'result': {
              auditLevel: re.data.auditLevel,
              auditResult: re.data.auditResult,
              auditStatus: re.data.auditStatus,
              auditStatusCode: re.data.auditStatusCode
            }
          })
        } else {
          this.resultList.push({
            'name': '中成药西药处方(' + numList[index] + ')',
            'result': {
              auditLevel: '',
              auditResult: '调用审方接口失败',
              auditStatus: '',
              auditStatusCode: ''
            }
          })
        }
      })
      console.log(res)
    })
  },
  methods: {
    returnToModify() {
      this.$emit('hidePreview')
    },
    submitOrders() {
      let recipeList = JSON.parse(JSON.stringify(this.recipeList)), resultList = [];
      this.showLoading = true;
      recipeList.forEach(item => {
        switch (item.type) {
          case 1:
            if (item.data.is_cloud == 1) {
              item.data.items.map(med => {
                med.item_id = 0
              })
            }
            resultList.push({
              'recipe_type': item.type,
              'is_cloud': item.data.is_cloud,
              'dose_once': item.data.eachDose,
              'extra_name': item.data.extra_feetype,
              'extra_num': item.data.extra_num,
              'extra_price': Number(item.data.extra_price) * Number(item.data.extra_num),
              'category': item.data.category,
              'dosage': item.data.dosage,
              'frequency': item.data.frequency,
              'usage': item.data.usage,
              'doctor_remark': item.data.doctor_remark,
              'herbal_list': item.data.items
            })
            break;
          case 2:
            // 合并每次用量的数值与单位
            let westernList = JSON.parse(JSON.stringify(item.data.items));
            westernList.forEach((med) => {
              if (med.dose_once && med.unit_dose && !/[^\d]/.test(med.dose_once)) {
                med.dose_once += med.unit_dose;
              }
              if (item.data.is_cloud == 1) {
                med.item_id = 0
              }
            })

            resultList.push({
              'recipe_type': item.type,
              'is_cloud': item.data.is_cloud,
              'doctor_remark': item.data.doctor_remark,
              'western_list': westernList
            })
            break;
          case 3:
            if (item.data.is_cloud == 1) {
              item.data.items.map(med => {
                med.item_id = 0
              })
            }

            resultList.push({
              'recipe_type': item.type,
              'is_cloud': item.data.is_cloud,
              'doctor_remark': item.data.doctor_remark,
              'product_list': item.data.items
            })
            break;
          case 4:
            resultList.push({
              'recipe_type': item.type,
              'therapy_type': item.data.type,
              'doctor_remark': item.data.doctor_remark,
              "therapy_list": item.data.items
            })
            break;
          case 6:
            resultList.push({
              'recipe_type': item.type,
              'doctor_remark': item.data.doctor_remark,
              "material_list": item.data.items
            })
            break;
        }
      });
      resultList.push({
        'recipe_type': 5,
        'doctor_remark': '',
        "extra_list": []
      })
      let check_report_data = this.recordData.inspection_report.map(item => {
        return {
          "check_report_id": item.check_report_id,
          "name": item.name
        }
      })
      let answer_data = this.recordData.outpatient_table.map(item => {
        return {
          "patient_answer_id": item.patient_answer_id,
          "name": item.name
        }
      })

      submitOrder({
        "order_seqno": this.orderSeqno,
        "chief_complaint": this.recordData.chief_complaint,
        "examination": this.recordData.recordList.indexOf('examination') >= 0 ? JSON.stringify(this.recordData.examination) : null,
        "auxiliary_examination": this.recordData.recordList.indexOf('auxiliary_examination') >= 0 ? this.recordData.auxiliary_examination : null,
        "diagnosis": this.recordData.recordList.indexOf('diagnosis') >= 0 ? this.recordData.diagnosis : null,
        "sport_advice": this.recordData.recordList.indexOf('sport_advice') >= 0 ? this.recordData.sport_advice : null,
        "dietary_advice": this.recordData.recordList.indexOf('dietary_advice') >= 0 ? this.recordData.dietary_advice : null,
        "treat_advice": this.recordData.treat_advice,
        "diagnosis_xy": this.recordData.diagnosis_xy,
        "present_illness": this.recordData.present_illness,
        "recipe_list": resultList,
        "draft": this.draftData,
        "check_report_data": check_report_data,
        "answer_data": answer_data,
        "treat_price": this.treatPrice
      }).then(data => {
        if (data.code === 1000) {
          try {
            window.location.href = waitingPage
          } catch (e) {
            this.$router.go(-1);
          }
        } else if (data.code === 500011) {
          this.showLoading = false;
          this.$Message.info("药品不存在！");
          return
        } else {
          this.showLoading = false;
          this.$Message.info("提交失败--" + data.msg)
        }
      }).catch(error => {
        this.showLoading = false;
      })
    },
    findInFre(val) {
      let list = [
        { code: 'qd', name: '每天一次', ratio: 1 },
        { code: 'bid', name: '每天两次', ratio: 2 },
        { code: 'tid', name: '每天三次', ratio: 3 },
        { code: 'qid', name: '每天四次', ratio: 4 },
        { code: 'qod', name: '两天一次', ratio: 0.5 },
        { code: 'qw', name: '每周一次', ratio: 1 / 7 },
        { code: '', name: '饭前', ratio: 3 },
        { code: '', name: '饭后', ratio: 3 },
        { code: 'hs', name: '睡前', ratio: 1 },
        { code: 'OTH', name: '医嘱', ratio: 1 }
      ]
      for (let i = 0, len = list.length; i < len; i++) {
        if (list[i].name == val) {
          return list[i].code
        }
      }
      return 'qd'
    },
  }
}
</script>

<style scoped>
.content {
  background: #525659;
  height: 95vh;
  width: 70vw;
  margin: 1.5vh auto 3.5vh;
  display: flex;
  border: 1px solid #b6b6b6;
  border-radius: 0.25rem;
  box-shadow: 0 0.125rem 0.375rem 0 rgba(0, 0, 0, 0.5);
}

.content_left {
  flex: 3;
  display: flex;
  justify-content: center;
}

.content_right {
  flex: 1;
  background: #fbfbfb;
  padding-top: 12vh;
}

.content_right_first {
  display: flex;
  justify-content: center;
}

.content_right_second {
  padding: 2rem 1rem;
  position: relative;
  min-height: 300px;
}

.content_right_second p {
  font-size: 1rem;
  font-weight: bold;
}

.trial_block {
  border: 1px solid #cccccc;
  border-radius: 4px;
  padding: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5rem;
  margin: 0.6rem 0;
}

.content_right_item {
  display: inline-block;
}

.content_left_block {
  width: 70%;
  height: 100%;
  overflow-y: scroll;
  background: #ffffff;
  padding: 2rem;
  font-size: 0.875rem;
}

.preview_title {
  font-weight: bold;
  font-size: 1.5rem;
  color: #000;
  text-align: center;
  margin: 1rem 0 1rem;
}

.preview_order_seqno {
  border-bottom: 0.125rem solid #000;
}

.preview_patient {
  display: flex;
  padding-top: 0.5rem;
}

.preview_label {
  font-weight: bold;
}

.preview_recode {
  padding-bottom: 0.5rem;
  border-bottom: 0.125rem solid #000;
}

.preview_recipe_title {
  font-weight: bold;
  margin: 0.25rem 0;
}

.preview_recipe {
  padding-bottom: 0.5rem;
  border-bottom: 0.125rem solid #000;
}

.preview_recipe_content {
  font-size: 0.75rem;
}

.herbal_item {
  float: left;
  width: 33.3%;
}

.recipe_money {
  margin: 0.5rem 0;
  font-size: 0.9375rem;
  font-weight: bold;
}
</style>
