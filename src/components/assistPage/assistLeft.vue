<template>
  <div>
    <div class="root-left-title">
      患者资料
    </div>
    <patient-detail :canShowMoney="false"></patient-detail>
    <section class="diagnosis">
      <div class="diagnosisItem">
        <label class="labelText">西医诊断</label>
        <Select filterable class="flexOne" placeholder="" v-model="XYPatientId" remote :remote-method="findXYDiagnosis"
                :loading="XYLoading" clearable @on-clear="clearXY" @click.native="automaticXY()">
          <Option v-for="item in XYList" :value="item.parent_id" :key="item.parent_id">{{item.xy_name}}</Option>
        </Select>
      </div>
      <div class="diagnosisItem">
        <label class="labelText">中医诊断</label>
        <Select filterable class="flexOne" placeholder="" v-model="ZYPatientId" remote :remote-method="findZYDiagnosis"
                :loading="ZYLoading" clearable @on-clear="clearZY" @click.native="automaticZY()">
          <Option v-for="item in ZYList" :value="item.parent_id" :key="item.parent_id">{{item.zy_name}}</Option>
        </Select>
      </div>
      <div class="diagnosisItem">
        <label class="labelText">中医辨证</label>
        <Select filterable class="flexOne" placeholder="" v-model="ZYdiscriminate" remote
                :remote-method="findZYdiscriminate" clearable  @on-clear="clearZYD"  @click.native="automaticZYD()">
          <Option v-for="item in ZYDList" :value="item.bz_name" :key="item.bz_name">{{item.bz_name}}</Option>

        </Select>
      </div>
      <div class="diagnosisFind">
        <Button type="primary" ghost shape="circle" style="width: 80%;" @click.stop="searchFj">处方查询</Button>
      </div>
    </section>
    <section>
      <div class="recipe_item recipe_item_active" v-for="item in fjList">
        <div class="recipe_item_title">
          {{item.fjName}}{{item.sourceContent}}
        </div>
        <div class="recipe_item_content">
          {{item.symptom[0]}}
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import patientDetail from "@/page/rootLeft/patientDetail";
  import {Option, Select, Button} from 'iview'
  import {searchDiagnosis,searchFJB} from '@/fetch/api.js'

  export default {
    name: "assistLeft",
    components: {
      patientDetail,
      Option,
      Select,
      Button
    },
    data() {
      return {
        XYdiagnosis: '',
        XYList: [],
        XYPatientId: '',
        XYLoading: false,

        ZYdiagnosis: '',
        ZYList: [],
        ZYPatientId: '',
        ZYLoading: false,

        ZYdiscriminate: '',
        ZYDList: [],
        ZYDLoading:false,

        searchTime: '',
        fjList:[]
      }
    },
    methods: {
      findXYDiagnosis(query) {
        if (this.ZYdiagnosis.replace(/\s*/g, '') === '') {
          this.ZYPatientId = ''
        }
        clearTimeout(this.searchTime)
        this.XYdiagnosis = query;
        this.searchTime = setTimeout(() => {
          if ((this.ZYPatientId === '' || this.ZYPatientId === undefined) && query.replace(/\s*/g, '') === '' && this.ZYdiscriminate.replace(/\s*/g, '') === '') {
            return
          }
          this.XYLoading = true;
          searchDiagnosis({
            "xy_name": query,
            "type": "XY",
            "parent_id": this.ZYPatientId,
            "bz_name": this.ZYdiscriminate
          }).then(data => {
            if (data.code === 1000) {
              this.XYLoading = false;
              this.XYList = data.data;
            } else {
              this.$Message.info(data.msg)
            }
          })
        }, 300)
      },
      findZYDiagnosis(query) {
        if (this.XYdiagnosis.replace(/\s*/g, '') === '') {
          this.XYPatientId = ''
        }
        clearTimeout(this.searchTime)
        this.ZYdiagnosis = query;
        this.searchTime = setTimeout(() => {
          if ((this.XYPatientId === '' || this.XYPatientId === undefined) && query.replace(/\s*/g, '') === '' && this.ZYdiscriminate.replace(/\s*/g, '') === '') {
            return
          }
          this.ZYLoading=true;
          searchDiagnosis({
            "zy_name":query,
            "type":"ZY",
            "parent_id":this.XYPatientId,
            "bz_name":this.ZYdiscriminate
          }).then(data =>{
            if(data.code===1000){
              this.ZYLoading=false;
              this.ZYList=data.data;
            }else {
              this.$Message.info(data.msg)
            }
          })
        }, 300)
      },
      findZYdiscriminate(query) {
        clearTimeout(this.searchTime)

        this.searchTime = setTimeout(() => {
          if( this.XYdiagnosis.replace(/\s*/g, '') === '' && this.ZYdiagnosis.replace(/\s*/g, '') === '' &&  this.query.replace(/\s*/g, '') === ''){
            return
          }
          this.ZYDLoading=true;
          searchDiagnosis({
            "zy_name":this.ZYdiagnosis,
            "type":"BZ",
            "xy_name":this.XYdiagnosis,
            "bz_name":query
          }).then(data =>{
            if(data.code===1000){
              this.ZYDLoading=false;
              this.ZYDList=data.data;
            }else {
              this.$Message.info(data.msg)
            }
          })
        }, 300)
      },
      clearXY() {
        this.XYdiagnosis = '';
        this.XYList = [];
        this.XYPatientId = '';
      },
      clearZY() {
        this.ZYdiagnosis = '';
        this.ZYList = [];
        this.ZYPatientId = '';
      },
      clearZYD(){
        this.ZYdiscriminate="";
        this.ZYDList=[];
      },
      automaticXY(){
        if(this.XYdiagnosis.replace(/\s*/g, '')!=='' || this.ZYPatientId!=='' || this.ZYdiscriminate!==''){
          this.findXYDiagnosis(this.XYdiagnosis);
        }
      },
      automaticZY(){
        if(this.ZYdiagnosis.replace(/\s*/g, '')!=='' || this.XYPatientId!=='' || this.ZYdiscriminate!==''){
          this.findZYDiagnosis(this.ZYdiagnosis);
        }
      },
      automaticZYD(){
        if(this.XYdiagnosis.replace(/\s*/g, '')!=='' || this.ZYdiagnosis.replace(/\s*/g, '')!=='' || this.ZYdiscriminate.replace(/\s*/g, '')!==''){
          this.findZYdiscriminate(this.ZYdiscriminate);
        }
      },
      searchFj(){
        if(this.XYdiagnosis.replace(/\s*/g, '') === '' && this.ZYdiagnosis.replace(/\s*/g, '') === '' && this.ZYdiscriminate.replace(/\s*/g, '') === ''){
          this.$Message.info("请先输入诊断情况");
          return
        }

        searchFJB({
          bzName:this.ZYdiscriminate,
          symptoms:"",
          zdNameC:this.ZYdiagnosis,
          zdNameW:this.XYdiagnosis
        }).then(data=>{
          if(data.success){
            this.fjList=data.result;
          }else {
            this.$Message.info(data.error)
          }
        })
      }
    }
  }
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

  .diagnosis {
    background: #ffffff;
    padding: 0 1rem;
  }

  .labelText {
    height: 1.31rem;
    font-size: 0.94rem;
    font-weight: 600;
    color: rgba(76, 76, 76, 1);
    align-self: center;
  }

  .diagnosis >>> .ivu-select-selection {
    border: none;
    box-shadow: none;
  }

  .diagnosisItem {
    display: flex;
    padding: 0.3125rem 0.125rem;
    border-bottom: 0.06rem solid #CCCCCC;
  }

  .diagnosisFind {
    text-align: center;
    padding: 1rem;
  }

  .recipe_item {
    background: #ffffff;
    padding: 0 1rem;
    margin-top: 1rem;
  }

  .recipe_item_active {
    box-shadow: 0rem 0.13rem 0.25rem 0rem rgba(80, 150, 224, 0.2);
  }

  .recipe_item_title {
    font-size: 0.94rem;
    font-weight: 600;
    color: #4C4C4C;
    padding: 0.75rem 0;
    border-bottom: 0.06rem solid #CCCCCC;
  }

  .recipe_item_active .recipe_item_title {
    color: #4DBC89;
  }

  .recipe_item_content {
    padding: 0.5rem 0;
    font-size: 0.88rem;
    color: #4C4C4C;
    line-height: 1.25rem;
  }
</style>

