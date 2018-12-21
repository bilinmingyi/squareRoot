<template>
  <div>
    <section class="herbal_head">
      <RadioGroup :value="currentData.data.category" class="herbal_head_left" @on-change="changeCategory($event)">
        <Radio label="1" size="large">
          <span>饮片</span>
        </Radio>
        <Radio label="2" size="large">
          <span>颗粒</span>
        </Radio>
      </RadioGroup>
      <div>
        <button class="btn btn_cancel" @click.stop="cancelRecipe">删除</button>
        <button class="btn">打印处方</button>
        <button class="btn btn_print">存为模板</button>
      </div>
    </section>
    <section>
      <table class="recipe_table">
        <thead>
        <tr>
          <th>序号</th>
          <th>药名</th>
          <th>规格</th>
          <th>药量</th>
          <th>常用量</th>
          <th>用法</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in currentData.data.items">
          <td>{{index+1}}</td>
          <td>{{item.name}}</td>
          <td>{{item.spec==='1克/克'?'1克':item.spec}}</td>
          <td>
            <Input style="width:2.5rem" type="text" :value="item.num"
                   @on-change="modify_medicine({key:'num',val:$event.target.value,index:index})"/>
            <span>{{item.unit}}</span>
          </td>
          <td>{{item.remark}}</td>
          <td>
            <Select style="width:4.25rem" :value="item.usage" @on-change="modify_medicine({key:'usage',val:$event,index:index})">
              <Option v-for="item in herbalMedUsages" :value="item.name" :key="item.id">{{ item.name }}</Option>
            </Select>
          </td>
          <td>
            <a @click.stop="cancel_medicine(index)">删除</a>
          </td>
        </tr>
        <tr v-if="currentData.data.items.length==0">
          <td colspan="7">右侧选择添加药品</td>
        </tr>
        </tbody>
      </table>
    </section>
    <section>
      <div class="pl10 pt20">
        <span class="input_label"> 处方金额：{{currentData.money}}元</span>
      </div>
      <div class="displayFlex pl10 pr10 pt10">
        <div class="width-240">
          <span class="input_label"> 剂数：</span>
          <Input type="text" class="input_120" :value="currentData.data.dosage" @on-change="modify_recipe_detail({key:'dosage',val:$event.target.value})"/>
          <span class="input_label">剂</span>
        </div>
        <div class="width-240">
          <span class="input_label">频次：</span>
          <Select class="input_120" :value="currentData.data.frequency" @on-change="modify_recipe_detail({key:'frequency',val:$event})">
            <Option v-for="item in medFrequency" :value="item.name" :key="item.name">{{ item.name }}</Option>
          </Select>
        </div>
        <div class="width-240">
          <span class="input_label"> 用法：</span>
          <Select class="input_120":value="currentData.data.usage" @on-change="modify_recipe_detail({key:'usage',val:$event})">
            <Option v-for="item in herbalRpUsages" :value="item.name" :key="item.id">{{ item.name }}</Option>
          </Select>
        </div>
      </div>
      <div class="displayFlex p10">
        <div class="width-240">
          <span class="input_label"> 附加：</span>
          <Select class="input_120" :value="currentData.data.extra_feetype" @on-change="modify_recipe_detail({key:'extra_feetype',val:$event})">
            <Option v-for="item in extraFeeTypes" :value="item.name" :key="item.id">{{ item.name }}</Option>
          </Select>
        </div>
        <div class="width-240">
          <span class="input_label">数量：</span>
          <Input type="text" class="input_120" :value="currentData.data.extra_num" @on-change="modify_recipe_detail({key:'extra_num',val:$event.target.value})"/>
        </div>
        <div class="width-240">
          <span class="input_label"> 用量：</span>
          <Input type="text" class="input_120" :value="currentData.data.eachDose" @on-change="modify_recipe_detail({key:'eachDose',val:$event.target.value})"/>
          <span class="input_label">ml</span>
        </div>
      </div>
      <div class="displayFlex pl10 pt10 width-620">
        <span class="input_label pr4">医嘱：</span>
        <Input class="flexOne" type="textarea" :autosize="{minRows: 3,maxRows: 3}" placeholder="医嘱提示"
               :value="currentData.data.doctor_remark" @on-change="modify_recipe_detail({key:'doctor_remark',val:$event.target.value})"/>
      </div>
    </section>
  </div>
</template>

<script>
  import {RadioGroup, Radio, Select, Option, Input} from 'iview'
  import {mapActions} from 'vuex'
  import {herbalMedUsages, herbalRpUsages, extraFeeTypes, medFrequency} from '@/assets/js/mapType'

  export default {
    name: "herbalRecipe",
    data() {
      return {
        medFrequency: medFrequency
      };
    },
    components: {
      RadioGroup,
      Radio,
      Select,
      Option,
      Input
    },
    computed: {
      currentData: function () {
        return JSON.parse(JSON.stringify(this.$store.getters.currRecipeData))
      },

      herbalMedUsages: function () {
        return herbalMedUsages.filter(item => {
          return item.status === 1
        })
      },
      herbalRpUsages: function () {
        return herbalRpUsages.filter(item => {
          return item.status === 1
        })
      },
      extraFeeTypes: function () {
        return extraFeeTypes.filter(item => {
          return item.status === 1
        })
      }
    },
    watch: {
      'currentData.data': {
        deep: true,
        handler:function(newVal,oldVal){
          var recipePrice=0,allPrice=0;
          newVal.items.map((item)=>{
            recipePrice+=Number(item.num)*Number(item.price)
          });
          if(newVal.extra_feetype!==''){
            let extraItem=this.extraFeeTypes.filter((typeOne)=>{
              return typeOne.name === newVal.extra_feetype;
            })
            allPrice=recipePrice*Number(newVal.dosage)+extraItem[0].price*newVal.extra_num;
          }else {
            allPrice=recipePrice*Number(newVal.dosage)
          }
          this.modify_recipe({key:'money',val:Number(allPrice).toFixed(2)})
        }
      }
    },
    methods: {
      ...mapActions([
        'cancel_recipe',
        'modify_medicine',
        'modify_recipe',
        'cancel_medicine',
        'modify_recipe_detail',
        'clean_recipe'
      ]),
      cancelRecipe() {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定删除该处方？</p>',
          onOk: () => {
            this.cancel_recipe();
          },
          onCancel: () => {

          }
        });
      },
      changeCategory(val){
        if(this.currentData.data.items.length===0){
          this.modify_recipe_detail({key:'category',val:val})
        }else {
          this.$Modal.confirm({
            title: '提示',
            content: '<p>切换药类型将清空已选的药，确认要切换?</p>',
            onOk: ()=>{
              this.modify_recipe_detail({key:'category',val:val})
              this.clean_recipe();
            },
            onCancel: ()=>{

            }
          })
        }


      }
    },

  }
</script>

<style scoped>
  .btn {
    border: 0.0625rem solid #5096E0;
    border-radius: 1.875rem;
    font-size: 1rem;
    color: #5096E0;
    background: none;
    line-height: 1.875rem;
    min-width: 5.125rem;
  }

  .btn_cancel {
    border-color: #FC3B3B;
    color: #FC3B3B;
  }

  .btn_print {
    border-color: #4DBC89;
    color: #4DBC89;
  }

  .herbal_head {
    display: flex;
    padding: 0.625rem;
  }

  .herbal_head_left {
    flex: 1;
    align-self: center;
  }
</style>
