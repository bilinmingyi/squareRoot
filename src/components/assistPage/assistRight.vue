<template>
  <div>
    <section class="displayFlex">
      <div class="root-left-title">
        中药处方详情
      </div>
      <div class="root-right"></div>
      <div class="root-right-btn">
        <button class="btn-cancel" @click="historyBack()">关闭</button>
      </div>
    </section>
    <section>
      <div class="recipe_name">
        <span v-if="fjbRecipe.fjName!='' && fjbRecipe.fjName!=null && fjbRecipe.fjName!=undefined">{{fjbRecipe.fjName}}{{fjbRecipe.sourceContent}}</span>
        <span v-else>请在左侧输入患者主诉</span>

      </div>
      <div class="recipe_desc" v-if="fjbRecipe.symptom!=undefined">
        <div>
          {{fjbRecipe.symptom!=undefined?fjbRecipe.symptom[0]:''}}
        </div>
        <div class="mt15">
          <CheckboxGroup v-model="symptomValList">
            <Checkbox v-for="item in symptomList" :label="item.id" :key="item.id">
              <span class="checkbox_label">{{item.jjName}}</span>
            </Checkbox>
          </CheckboxGroup>
        </div>
      </div>
      <div class="recipe_list">
        <table class="recipe_table">
          <thead>
          <tr>
            <th style="width: 10%;">序号</th>
            <th>药名</th>
            <th style="width: 10%;">药量</th>
            <th>常用量</th>
            <th style="width: 35%">注意事项</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in currentFjList">
            <td style="width: 10%;">{{index+1}}</td>
            <td>{{item.drugName.replace(/his.*/,'')}}</td>
            <td style="width: 10%;">{{item.number}}{{item.unit}}</td>
            <td>{{item.dosageRange}}{{item.unit}}</td>
            <td  style="width: 35%">{{item.remark}}</td>
          </tr>
          </tbody>
        </table>
      </div>

      <Button class="use_recipe_btn" type="primary" shape="circle" v-if="currentFjList.length!=0" @click.stop="importRecipe">导入该处方</Button>

    </section>
  </div>
</template>

<script>
  import fRadio from '@/components/fRadio.vue'
  import {Button, CheckboxGroup , Checkbox} from 'iview'
  import {mapActions, mapState} from 'vuex'
  import {getJJInfo, getFJDrugList, getHerbalList, pointCount} from '@/fetch/api.js'
  import {clinicName, clinicId} from '@/assets/js/mapType.js'

  export default {
    name: "assistRight",
    data(){
      return{
        symptomList:[],
        symptomValList:[],
        currentFjList:[],
      }
    },
    components: {
      fRadio,
      Button,
      CheckboxGroup,
      Checkbox
    },
    computed:{
      ...mapState({
        'fjbRecipe':state=>state.fjbRecipe,
        'orderSeqno':state=>state.orderSeqno,
        'patientData':state=>state.patientData
      }),
      currentData: function () {
        return JSON.parse(JSON.stringify(this.$store.getters.currRecipeData))
      },
    },
    watch:{
      fjbRecipe:{
        handler(newVal,oldVal){
          if(newVal.toString()!=='{}'){
            this.PostJJInfo();
            this.getFJDrug()
          }
        }
      },
      symptomValList:{
        deep:true,
        handler(newVal,oldVal){
          this.getFJDrug()
        }
      }
    },
    methods:{
      ...mapActions([
        'clean_recipe',
        'add_new_medicine'
      ]),
      PostJJInfo(){
        this.symptomList=[];
        this.symptomValList=[];
        getJJInfo({
          fjCode:this.fjbRecipe.fjCode
        }).then(data=>{
          if(data.data.success){
            this.symptomList=data.data.result;
          }else {
            this.$Message.info(data.data.error)
          }
        }).catch(error=>{
          console.log(error)
        })
      },
      getFJDrug(){
        let jjcode=this.symptomValList.join(',');
        let birthDay=new Date(this.patientData.birthday);
        let year=birthDay.getFullYear();
        let month=(birthDay.getMonth()+1)>9?(birthDay.getMonth()+1):"0"+(birthDay.getMonth()+1);
        let day=birthDay.getDate()>9?birthDay.getDate():"0"+birthDay.getDate();
        getFJDrugList({
          fjCode:this.fjbRecipe.fjCode,
          jjCode:jjcode,
          isGravidity:1,
          organizationId:'通用机构',
          sex:this.patientData.sex,
          birthday:year+'-'+month+'-'+day,
          fjType: 0
        }).then(data=>{
          if(data.data.success){
            this.currentFjList=data.data.result;
          }else {
            this.$Message.info(data.data.error)
          }
        }).catch(error=>{
          console.log(error)
        })
      },
      importRecipe(){
        if(this.currentData.data.items.length===0){
          this.findMedByName()
          this.pointEnd()
        }else {
          this.$Modal.confirm({
            title: '提示',
            content: '<p>导入药品将清空已选的药，确认要导入?</p>',
            onOk: ()=>{
              this.findMedByName();
              this.pointEnd();
            },
            onCancel: ()=>{

            }
          })
        }
      },
      findMedByName(){
        let nameList=[];
        this.currentFjList.forEach(item =>{
          nameList.push(item.drugName.replace(/his.*/, ''))
        });
        getHerbalList({
          "category":2,
          "names":nameList
        }).then(data=>{
          if(data.code===1000){
            this.clean_recipe();
            this.currentFjList.forEach(item =>{
              var existence={};
              for(var i=0;i<data.data.length;i++){
                if (item.drugName.replace(/his.*/, '') == data.data[i].name) {
                  existence = data.data[i];
                  break
                }
              }

              if(i===data.data.length){
                this.add_new_medicine(
                  {
                    item:{
                      "id": '',
                      "clinic_alias_name":'',
                      "name": item.drugName.replace(/his.*/, ''),
                      "num": '',
                      "price": '',
                      "unit": '',
                      "default_sale_price": '',
                      "sale_price": '',
                      "spec": '',
                      "unit_stock": '',
                      "unit_sale":'',
                      "usage": '',
                      "stock": '',
                      "stock_sale_ratio": '',
                      "status": 0,
                      "remark": item.number+ item.unit+(item.dosageRange==''?'':'('+item.dosageRange + item.unit+')')
                    },
                    type:1
                  }
                )
              }else {
                this.add_new_medicine(
                  {
                    item:{
                      "id": existence.id,
                      "clinic_alias_name":existence.clinic_alias_name,
                      "name": existence.name,
                      "num": item.unit == '克' ? existence.unit_stock != '克' ? Math.ceil(item.number / existence.stock_sale_ratio) : item.number : 0,
                      "unit": existence.unit_stock,
                      "default_sale_price": existence.sale_price,
                      "sale_price": existence.sale_price,
                      "spec": existence.spec,
                      "unit_stock": existence.unit_stock,
                      "unit_sale":existence.unit_sale,
                      "usage": '',
                      "stock": existence.stock,
                      "stock_sale_ratio": existence.stock_sale_ratio,
                      "status": 1,
                      "remark": item.number+''+item.unit+''+(item.dosageRange==''?'':'('+item.dosageRange + item.unit+')')
                    },
                    type:1
                  }
                )
              }
            })
            this.$router.go(-1);
          }else {
            this.$Message.info(data.msg)
          }
        })
      },
      historyBack(){
        this.$router.go(-1)
      },
      pointEnd(){
        pointCount({
          "platform":"pc",
          "action":"end",
          "end_params":{
            "order_seqno":this.orderSeqno,
            "clinic_name":clinicName,
            "clinic_id":clinicId,
            "patient_id":this.patientData.id,
            "patient_mobile":this.patientData.mobile,
            "is_chosen":1,
            "chosen_recipe":this.fjbRecipe.fjName
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
    flex: 36;
  }

  .root-right {
    flex: 64;
    background: #f5f5f5;
  }

  .recipe_name {
    font-weight: 600;
    font-size: 1rem;
    color: #4C4C4C;
    padding: 1rem;
  }

  .recipe_desc {
    background: rgba(242, 242, 242, 1);
    border-radius: 0.25rem;
    font-size: 1rem;
    color: #4C4C4C;
    line-height: 1.38rem;
    padding: 1rem;
    margin: 0 4rem 1rem 1rem;
  }

  .recipe_list {
    margin-right: 4rem;
  }

  .use_recipe_btn {
    margin: 1rem;
    background: #EEAE1D;
    border-color: #EEAE1D;
    width: 8rem;
  }
  .checkbox_label{
    font-size:0.875rem;
    font-weight:600;
    color: #4C4C4C;
    line-height:1.38rem;
  }
  .root-right-btn{


    background: #f5f5f5;

  }
  .btn-cancel{
    background: #ffffff;
    border: 1px solid #FC3B3B;
    font-size: 1rem;
    width: 8rem;
    color: #FC3B3B;
    border-radius: 1.25rem;
    line-height: 1.75rem;
  }
</style>
