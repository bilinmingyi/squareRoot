<template>
  <div class="prescription_tab_bg">
    <div
      class="prescription_tab"
    >
      <div class="mb20">
        <div class="alert-title">添加处方模板</div>
      </div>
      <section>
        <div class="displayFlex">
          <div class="displayFlex align-item mb10 flexOne">
            <span class="input_label pr16">模板名称</span>
            <Input class="width-200" placeholder="请输入名称(必填)" v-model="tplName"/>
          </div>
          <div class="displayFlex align-item mb15 flexOne">
            <span class="input_label pr16">模板范围</span>
            <RadioGroup class="flexOne" v-model="tplType">
              <Radio label="1">个人</Radio>
              <Radio class="ml30" label="0">本诊所</Radio>
            </RadioGroup>
          </div>
        </div>
        <div class="displayFlex">
          <div class="displayFlex align-item mb10 flexOne">
            <span class="input_label pr16">中医诊断</span>
            <Input class="width-200" placeholder="选填" v-model="diagnosis"/>
          </div>
          <div class="displayFlex align-item mb10 flexOne">
            <span class="input_label pr16">西医诊断</span>
            <Input class="width-200" placeholder="选填" v-model="diagnosisXy"/>
          </div>
        </div>
        <div class="displayFlex" v-if="currentData.type === 1">
          <div class="displayFlex align-item mb10 flexOne">
            <span class="input_label pr16">中医辩证</span>
            <Input class="width-200" placeholder="选填" v-model="dialectic"/>
          </div>
          <div class="displayFlex align-item mb10 flexOne">
            <span class="input_label pr16">治疗方法</span>
            <Select class="width-200" v-model="treatMethod">
              <Option v-for="item in herbalRpUsages" :value="item.name" :key="item.id">{{ item.name }}</Option>
            </Select>
          </div>
        </div>
        <div>
          <div class="displayFlex mb10 flexOne">
            <span class="input_label pr16">主治症状</span>
            <Input style="width: 525px" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="选填" v-model="symptom"/>
          </div>
        </div>
      </section>
      <div class="tc mt16">
        <button class="saveBtn mr20" @click.stop="saveData">确定</button>
        <button class="saveBtn cancelBtn" @click.stop="hideTpl()">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
import {saveMedTpl} from '@/fetch/api.js'
import {Input, RadioGroup, Radio, Select, Option} from 'iview'
import {mapState, mapActions} from "vuex";
import {herbalRpUsages} from '@/assets/js/mapType'

export default {
  name: "saveTpl",
  data() {
    return {
      tplName: '',
      tplType: '1',
      diagnosisXy: "",
      diagnosis: "",
      dialectic: "",
      treatMethod: "",
      symptom: ""
    }
  },
  computed: {
    ...mapState({
      tplChange: state => state.tplChange,
      recordData: state => state.recordData,
    }),
    currentData: function () {
      return JSON.parse(JSON.stringify(this.$store.getters.currRecipeData))
    },
    herbalRpUsages: function () {
      return herbalRpUsages.filter(item => {
        return item.status === 1
      })
    },
  },
  mounted () {
    this.diagnosisXy = this.recordData.diagnosis_xy
    this.diagnosis = this.recordData.diagnosis
    this.treatMethod = this.currentData.data.usage
  },
  components: {
    RadioGroup,
    Radio,
    Input,
    Select,
    Option
  },
  methods: {
    ...mapActions(['set_state_prop']),
    saveData() {
      if (this.tplName === '') {
        this.$Message.info('请先填写模板名称！');
        return
      }
      if (this.tplName.length > 32) {
        this.$Message.info("模板名称过长，请修改");
        return;
      }
      if (this.tplType === '') {
        this.$Message.info("请先选择模板类型！");
        return
      }
      let params = {}
      switch (this.currentData.type) {
        case 1:
          params = {
            name: this.tplName,
            scope: Number(this.tplType),
            component: JSON.stringify(this.formatData(this.currentData.data.items, 1, this.currentData.data.is_cloud)),
            doctor_remark: this.currentData.data.doctor_remark,
            dosage: this.currentData.data.dosage,
            category: this.currentData.data.category,
            is_cloud: this.currentData.data.is_cloud,
            diagnosis: this.diagnosis,
            diagnosis_xy: this.diagnosisXy,
            dialectic: this.dialectic,
            treat_method: this.treatMethod,
            symptom: this.symptom
          }
          break;
        case 2:
          params = {
            name: this.tplName,
            scope: Number(this.tplType),
            component: JSON.stringify(this.formatData(this.currentData.data.items, 2, this.currentData.data.is_cloud)),
            doctor_remark: this.currentData.data.doctor_remark,
            is_cloud: this.currentData.data.is_cloud,
            diagnosis: this.diagnosis,
            diagnosis_xy: this.diagnosisXy,
            symptom: this.symptom
          }
          break;
        case 4:
          params = {
            name: this.tplName,
            scope: Number(this.tplType),
            component: JSON.stringify(this.formatData(this.currentData.data.items, 4)),
            doctor_remark: this.currentData.data.doctor_remark,
            diagnosis: this.diagnosis,
            diagnosis_xy: this.diagnosisXy,
            symptom: this.symptom
          }
          break;
      }
      saveMedTpl(params, this.currentData.type).then(data => {
        if (data.code === 1000) {
          this.$Message.info("保存成功！");
          this.set_state_prop({key: 'tplChange', val: !this.tplChange});
          this.hideTpl();
        } else {
          this.$Message.info(data.msg)
        }
      })
    },
    hideTpl() {
      this.$emit('hideTpl')
    },
    formatData (list, type, isCloud) {
      let resultList = []
      switch (type) {
        case 1:
          resultList = list.map(item => {
            return {
              'id': isCloud == 1 ? item.cloud_item_id : item.item_id,
              'name': item.name,
              'unit': item.unit_sale,
              'adult_num': Number(item.num * item.stock_sale_ratio),
              'kids_num': Number(item.num * item.stock_sale_ratio),
              'usage': item.usage
            }
          })
          break
        case 2:
          resultList = list.map(item => {
            return {
              'id': isCloud == 1 ? item.cloud_item_id : item.item_id,
              'name': item.name,
              'spec': item.spec,
              'num': item.num,
              'frequency': item.frequency,
              'usage': item.usage,
              'dose_once': item.dose_once,
              'unit': item.unit,
              'days': item.days
            }
          })
          break
        case 4:
          resultList = list.map(item => {
            return {
              'id': item.item_id,
              'name': item.name,
              'num': item.num,
              'remark': item.remark
            }
          })
          break
      }
      return resultList
    }
  }
}
</script>

<style scoped>
  .prescription_tab_bg {
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.5);
    z-index: 500;
    position: fixed;
    top: 0;
    left: 0;
  }

  .prescription_tab {
    z-index: 998;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    left: 50%;
    width: 48rem;
    height: auto;
    background: #fff;
    padding: 1.5rem 3.75rem 2rem;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  .alert-title {
    text-align: center;
    font-weight: 900;
    font-size: 1rem;
    color: #5f95da;
  }

  .saveBtn {
    font-size: 0.875rem;
    color: #ffffff;
    font-weight: bold;
    width: 7.5rem;
    text-align: center;
    padding: 0.375rem 0;
    background: #5096e0;
    border-radius: 6.25rem;
    border: none;
  }

  .cancelBtn {
    background: #ffffff;
    border: 0.0625rem solid #5096e0;
    color: #5096e0;
  }

  .align-item {
    align-items: center;
  }
</style>
