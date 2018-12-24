<template>
  <div>
    <div class="root-left-title">
      患者资料
    </div>
    <patient-detail :canShowMoney="false"></patient-detail>
    <section class="diagnosis">
      <div class="diagnosisItem">
        <label class="labelText">西医诊断</label>
        <Select filterable class="flexOne" placeholder="">
          <Option value="aaa">aaa</Option>
          <Option value="bbb">bbb</Option>
        </Select>
      </div>
      <div class="diagnosisItem">
        <label class="labelText">中医诊断</label>
        <Select filterable class="flexOne" placeholder="">
          <Option value="aaa">aaa</Option>
          <Option value="bbb">bbb</Option>
        </Select>
      </div>
      <div class="diagnosisItem">
        <label class="labelText">中医辨证</label>
        <Select filterable class="flexOne" placeholder="">
          <Option value="aaa">aaa</Option>
          <Option value="bbb">bbb</Option>
        </Select>
      </div>
      <div class="diagnosisFind">
        <Button type="primary" ghost shape="circle" style="width: 80%;">处方查询</Button>
      </div>
    </section>
    <section>
      <div class="recipe_item recipe_item_active">
        <div class="recipe_item_title">
          丁香柿蒂汤《症因脉治》
        </div>
        <div class="recipe_item_content">
          主治胃气虚寒，失于和降，呃逆不已，胸脘痞闷，舌淡苔白，脉沉迟。
        </div>
      </div>
      <div class="recipe_item">
        <div class="recipe_item_title">
          丁香柿蒂汤《症因脉治》
        </div>
        <div class="recipe_item_content">
          主治胃气虚寒，失于和降，呃逆不已，胸脘痞闷，舌淡苔白，脉沉迟。
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import patientDetail from "@/page/rootLeft/patientDetail";
  import {Option, Select, Button} from 'iview'
  export default {
    name: "assistLeft",
    components: {
      patientDetail,
      Option,
      Select,
      Button
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
  .diagnosis{
    background: #ffffff;
    padding: 0 1rem;
  }
  .labelText{
    height:1.31rem;
    font-size:0.94rem;
    font-weight:600;
    color:rgba(76,76,76,1);
    align-self: center;
  }
  .diagnosis >>> .ivu-select-selection{
    border: none;
   box-shadow: none;
  }
  .diagnosisItem{
    display: flex;
    padding: 0.3125rem 0.125rem;
    border-bottom:0.06rem solid #CCCCCC;
  }
  .diagnosisFind{
    text-align: center;
    padding: 1rem;
  }
  .recipe_item{
    background: #ffffff;
    padding: 0 1rem;
    margin-top: 1rem;
  }
  .recipe_item_active{
    box-shadow:0rem 0.13rem 0.25rem 0rem rgba(80,150,224,0.2);
  }
  .recipe_item_title{
    font-size:0.94rem;
    font-weight:600;
    color:#4C4C4C;
    padding: 0.75rem 0;
    border-bottom:0.06rem solid #CCCCCC;
  }
  .recipe_item_active .recipe_item_title{
    color: #4DBC89;
  }
  .recipe_item_content{
    padding: 0.5rem 0;
    font-size:0.88rem;
    color: #4C4C4C;
    line-height:1.25rem;
  }
</style>

