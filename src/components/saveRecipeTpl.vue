<template>
  <div class="prescription_tab_bg">
    <section class="alertBolck">
      <div class="alertTitle mb16">
        保存模板
      </div>
      <div>
        <div class="mb10">
          <label class="label_text pr12">模板名称</label><Input size="large" style="width: 12rem;" type="text" v-model="tplName"></Input>
        </div>
        <div class="mb10">
          <label class="label_text pr8">模板类别</label>
          <Select style="width: 12rem;" size="large" v-model="tplType">
            <Option value="1">个人模板</Option>
            <Option value="0">共享模板</Option>
          </Select>
        </div>
        <div class="mt20">
          <Button type="primary" style="width: 6rem;margin-right: 1rem" shape="circle" size="large" @click="saveData">确定</Button>
          <Button type="primary" style="width: 6rem;margin-left: 1rem" shape="circle" size="large" ghost @click.stop="hideTpl">取消</Button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import {saveMedTpl} from '@/fetch/api.js'
  import {Select, Option, Input, Button} from 'iview'

  export default {
    name: "saveTpl",
    data() {
      return {
        tplName:'',
        tplType:''
      }
    },
    computed: {
      currentData: function () {
        return JSON.parse(JSON.stringify(this.$store.getters.currRecipeData))
      },
    },
    components: {
      Select,
      Option,
      Input,
      Button
    },
    methods: {
      saveData(){
        if(this.tplName===''){
          this.$Message.info('请先填写模板名称！');
          return
        }
        if(this.tplType===''){
          this.$Message.info("请先选择模板类型！");
          return
        }
        let params={}
        switch (this.currentData.type) {
          case 1:
            params={
              name:this.tplName,
              scope:this.tplType,
              items:this.currentData.data.items,
              doctor_remark:this.currentData.data.doctor_remark,
              dosage:this.currentData.data.dosage,
              category:this.currentData.data.category,
              is_cloud:this.currentData.data.is_cloud
            }
            break;
          case 2:
            params={
              name:this.tplName,
              scope:this.tplType,
              items:this.currentData.data.items,
              doctor_remark:this.currentData.data.doctor_remark,
            }
            break;
          case 4:
            params={
              name:this.tplName,
              scope:this.tplType,
              items:this.currentData.data.items,
              doctor_remark:this.currentData.data.doctor_remark,
            }
            break;
        }
        saveMedTpl(params,this.currentData.type).then(data=>{
          console.log(data)
        })
      },
      hideTpl(){
        this.$emit('hideTpl')
      }
    }
  }
</script>

<style scoped>
  .alertBolck {
    background: #FFFFFF;
    box-shadow: 0 0.25rem 1rem 0.25rem rgba(0, 0, 0, 0.20);
    border-radius: 0.25rem;
    z-index: 1050;
    margin: 0 auto;
    text-align: center;
    padding: 1.25rem;
    position: relative;
    top: 15%;
    width: 30rem;
  }

  .alertTitle {
    font-size: 1.125rem;
    font-weight: bold;
    color: #4C4C4C;
  }
  .label_text{
    font-size: 0.9375rem;
    font-weight: 600;
  }
</style>
