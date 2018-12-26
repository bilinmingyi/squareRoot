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
              <div class="preview_label">西医诊断：</div>
              <div class="flexOne">{{recordData.diagnosis_xy}}</div>
            </div>
            <div class="displayFlex mt5 mb5">
              <div class="preview_label">中医诊断：</div>
              <div class="flexOne">{{recordData.diagnosis}}</div>
            </div>
          </div>
          <section v-for="item in recipeList" class="preview_recipe">
            <div class="preview_recipe_title">{{item.type|recipeType}}处方
              <i v-if="item.type===1">({{item.data.category===1?'饮片':'颗粒'}})</i>
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
                  总共{{item.data.dosage}}剂（每剂{{item.data.items.length}}味）<span v-if="item.data.eachDose!=''">每次用量{{item.data.eachDose}}ml</span><span v-if="item.data.usage!=''">，{{item.data.usage}}</span>
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
              <div v-if="item.type===4">
                <div v-for="med in item.data.items">
                  <span class="pr5">{{med.name}}</span>
                  <span class="pr5">{{med.num}}{{med.unit}}</span>
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
        <div class="content_right_item mr20">
          <Button size="large" @click.stop="submitOrder">确定无误</Button>
        </div>
        <div class="content_right_item">
          <Button size="large" @click="returnToModify">返回修改</Button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import {Button} from 'iview'
  import {mapState} from 'vuex'
  import {submitOrder} from '@/fetch/api.js'
  export default {
    name: "previewRecipe",
    data(){
      return{
        allPrice:0
      }
    },
    components: {
      Button
    },
    computed:{
      ...mapState({
        "orderSeqno":state=>state.orderSeqno,
        "patientData":state=>state.patientData,
        "recordData":state=>state.recordData,
        "recipeList": state=>state.recipeList.filter(item=>{
          return item.data.items.length !== 0
        }),
        "draftData": state=>state.draftData,
        "treatPrice": state=> state.treatPrice
      })
    },
    watch:{
      recipeList:{
        deep:true,
        immediate:true,
        handler(newVal,oldVal) {
          var allMoney=0;
          newVal.forEach(item =>{
            allMoney+=Number(item.money);
          });
          this.allPrice=allMoney;
        }
      }
    },
    methods:{
      returnToModify(){
        this.$emit('hidePreview')
      },
      submitOrder(){
        let recipeList=JSON.parse(JSON.stringify(this.recipeList)),resultList=[];
        recipeList.forEach(item=>{
          switch (item.type) {
            case 1:
              resultList.push({
                'recipe_type':item.type,
                'is_cloud':item.data.is_cloud,
                'dose_once':item.data.eachDose,
                'extra_name':item.data.extra_feetype,
                'extra_num':item.data.extra_num,
                'extra_price':Number(item.data.extra_price)*Number(item.data.extra_num),
                'category':item.data.category,
                'dosage':item.data.dosage,
                'frequency':item.data.frequency,
                'usage':item.data.usage,
                'doctor_remark':item.data.doctor_remark,
                'herbal_list':item.data.items
              })
              break;
            case 2:
              resultList.push({
                'recipe_type':item.type,
                'is_cloud':0,
                'doctor_remark':item.data.doctor_remark,
                'western_list':item.data.items
              })
              break;
            case 4:
              resultList.push({
                'recipe_type':item.type,
                'doctor_remark':item.data.doctor_remark,
                "therapy_list":item.data.items
              })
              break;
            case 6:
              resultList.push({
                'recipe_type':item.type,
                'doctor_remark':item.data.doctor_remark,
                "material_list":item.data.items
              })
              break;
          }
        });
        resultList.push({
          'recipe_type':5,
          'doctor_remark':'',
          "extra_list":[]
        })

        submitOrder({
          "order_seqno":this.orderSeqno,
          "chief_complaint":this.recordData.chief_complaint,
          "examination":JSON.stringify(this.recordData.examination),
          "diagnosis":this.recordData.diagnosis,
          "diagnosis_xy":this.recordData.diagnosis_xy,
          "present_illness":this.recordData.present_illness,
          "recipe_list":resultList,
          "draft":this.draftData,
          "treat_price":this.treatPrice
        }).then(data=>{
          if(data.code===1000){
            this.$router.go(-1);
          }else if(data.code===500011){
            this.$Message.info("药品不存在！");
            return
          }
          else {
            this.$Message.info("提交失败--"+data.msg)
          }
        })
      }
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
    box-shadow: 0 0.125rem 0.375rem 0 rgba(0, 0, 0, 0.50);
  }

  .content_left {
    flex: 3;
    display: flex;
    justify-content: center;
  }

  .content_right {
    flex: 1;
    background: #fbfbfb;
    text-align: center;
    padding-top: 12vh;
    display: flex;
    justify-content: center;
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
  .preview_order_seqno{

    border-bottom: 0.125rem solid #000;
  }
  .preview_patient{
    display: flex;
    padding-top: 0.5rem;
  }
  .preview_label{
    font-weight: bold;
  }
  .preview_recode{
    padding-bottom: 0.5rem;
    border-bottom: 0.125rem solid #000;
  }
  .preview_recipe_title{
    font-weight: bold;
    margin: 0.25rem 0;
  }
  .preview_recipe{
    padding-bottom: 0.5rem;
    border-bottom: 0.125rem solid #000;
  }
  .preview_recipe_content{
    font-size: 0.75rem;
  }
  .herbal_item{
    float: left;
    width: 33.3%;
  }
  .recipe_money{
    margin: 0.5rem 0;
    font-size: 0.9375rem;
    font-weight: bold;
  }
</style>
