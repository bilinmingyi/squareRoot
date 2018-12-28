<template>
  <div>
    <section class="herbal_head">
      <div class="herbal_head_left">
        <f-radio value=1 :name="'herCate'" :currVal="currentData.data.category" @change="changeCategory($event)">饮片
        </f-radio>
        <f-radio value=2 :name="'herCate'" :currVal="currentData.data.category" @change="changeCategory($event)">颗粒
        </f-radio>
      </div>
      <div>
        <button class="btn btn_cancel" @click.stop="cancelRecipe">删除</button>
        <button class="btn" v-if="currentData.data.category==2" @click.stop="toAssist">
          辅助开方
        </button>
        <button class="btn" @click="print_pre()">打印处方</button>
        <button class="btn btn_print" @click.stop="saveTplData">存为模板</button>
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

          <template v-if="item.is_match===1">
            <td>{{item.spec==='1克/克'?'1克':item.spec}}</td>
            <td>
              <InputNumber style="width:3.2rem" :value="item.num"
                     @on-change="modify_medicine({key:'num',val:$event,index:index})"/>
              <span>{{item.unit}}</span>
              <span class="num_text" v-if="currentData.data.category==2">({{item.num*item.stock_sale_ratio}}{{item.unit_sale}})</span>
            </td>
          </template>
          <template v-else>
            <td style="color: red;" colspan="2">
              系统内搜索不到该药品
            </td>
          </template>
          <td>{{item.remark}}</td>
          <td>
            <Select style="width:4.25rem" :value="item.usage"
                    @on-change="modify_medicine({key:'usage',val:$event,index:index})">
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
    <section class="mb50">
      <div class="pl10 pt20">
        <span class="input_label"> 处方金额：{{currentData.money}}元</span>
      </div>
      <div class="displayFlex pl10 pr10 pt10">
        <div class="width-240">
          <span class="input_label"> 剂数：</span>
          <InputNumber class="input_120" :value="currentData.data.dosage"
                 @on-change="modify_recipe_detail({key:'dosage',val:$event})"/>
          <span class="input_label">剂</span>
        </div>
        <div class="width-240">
          <span class="input_label">频次：</span>
          <Select class="input_120" :value="currentData.data.frequency"
                  @on-change="modify_recipe_detail({key:'frequency',val:$event})">
            <Option v-for="item in medFrequency" :value="item.name" :key="item.name">{{ item.name }}</Option>
          </Select>
        </div>
        <div class="width-240">
          <span class="input_label"> 用法：</span>
          <Select class="input_120" :value="currentData.data.usage"
                  @on-change="modify_recipe_detail({key:'usage',val:$event})">
            <Option v-for="item in herbalRpUsages" :value="item.name" :key="item.id">{{ item.name }}</Option>
          </Select>
        </div>
      </div>
      <div class="displayFlex p10">
        <div class="width-240">
          <span class="input_label"> 附加：</span>
          <Select class="input_120" :value="currentData.data.extra_feetype" @on-change="change_extra($event)">
            <Option v-for="item in extraFeeTypes" :value="item.name" :key="item.id">{{ item.name }}</Option>
          </Select>
        </div>
        <div class="width-240">
          <span class="input_label">数量：</span>
          <InputNumber class="input_120" :value="currentData.data.extra_num"
                 @on-change="modify_recipe_detail({key:'extra_num',val:$event})"/>
        </div>
        <div class="width-240">
          <span class="input_label"> 用量：</span>
          <InputNumber class="input_120" :value="currentData.data.eachDose"
                 @on-change="modify_recipe_detail({key:'eachDose',val:$event})"/>
          <span class="input_label">ml</span>
        </div>
      </div>
      <div class="displayFlex pl10 pt10 width-620">
        <span class="input_label pr4">医嘱：</span>
        <Input class="flexOne" type="textarea" :autosize="{minRows: 3,maxRows: 3}" placeholder="医嘱提示"
               :value="currentData.data.doctor_remark"
               @on-change="modify_recipe_detail({key:'doctor_remark',val:$event.target.value})"/>
      </div>
    </section>
    <save-tpl v-if="showAddTpl" @hideTpl="hideTplShow"></save-tpl>
  </div>
</template>

<script>
  import {RadioGroup, Radio, Select, Option, Input, InputNumber} from 'iview'
  import fRadio from '@/components/fRadio.vue'
  import {mapActions} from 'vuex'
  import saveTpl from '@/components/rootMiddle/saveRecipeTpl'
  import {herbalMedUsages, herbalRpUsages, extraFeeTypes, medFrequency} from '@/assets/js/mapType'
  import Link from "iview/src/mixins/link";

  export default {
    name: "herbalRecipe",
    data() {
      return {
        medFrequency: medFrequency,
        showAddTpl: false
      };
    },
    components: {
      Link,
      RadioGroup,
      Radio,
      Select,
      Option,
      Input,
      InputNumber,
      saveTpl,
      fRadio
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
        immediate: true,
        handler: function (newVal, oldVal) {
          var recipePrice = 0, allPrice = 0;
          newVal.items.map((item) => {
            if (item.is_match === 1) {
              recipePrice += Number(item.num) * Number(item.price)
            }

          });
          if (newVal.extra_feetype !== '' && newVal.extra_feetype !== undefined && newVal.extra_feetype != null) {
            let extraItem = this.extraFeeTypes.filter((typeOne) => {
              return typeOne.name === newVal.extra_feetype;
            })
            allPrice = recipePrice * Number(newVal.dosage) + extraItem[0].price * newVal.extra_num;
          } else {
            allPrice = recipePrice * Number(newVal.dosage)
          }
          this.modify_recipe({key: 'money', val: Number(allPrice).toFixed(2)})
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
        'clean_recipe',
        'change_print_pre',
      ]),
      print_pre: function () {
        this.change_print_pre();
      },
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
      changeCategory(event) {
        if (this.currentData.data.items.length === 0) {
          this.modify_recipe_detail({key: 'category', val: event.target.value})
        } else {
          this.$Modal.confirm({
            title: '提示',
            content: '<p>切换药类型将清空已选的药，确认要切换?</p>',
            onOk: () => {
              this.modify_recipe_detail({key: 'category', val: event.target.value})
              this.clean_recipe();
            },
            onCancel: () => {
              this.$forceUpdate()
            }
          })
        }


      },
      saveTplData() {
        if (this.currentData.data.items.length === 0) {
          this.$Message.info("请先至少添加一个药品！");
          return
        }
        let itemList = this.currentData.data.items;
        for (var i = 0; i < itemList.length; i++) {
          if (itemList[i].num === '' || itemList[i].num === 0) {
            this.$Message.info("药品【" + itemList[i].name + "】的药量为空！")
            return
          }
        }
        if (this.currentData.data.dosage === '' || this.currentData.data.dosage === 0) {
          this.$Message.info("请先填写处方的剂数！")
          return
        }
        this.showAddTpl = true;
      },
      hideTplShow() {
        this.showAddTpl = false;
      },
      change_extra(val) {
        this.modify_recipe_detail({key: 'extra_feetype', val: val});
        let extraItem = this.extraFeeTypes.filter((typeOne) => {
          return typeOne.name === val;
        })
        if(extraItem[0]){
          this.modify_recipe_detail({key: 'extra_price', val: extraItem[0].price})
        }

      },
      toAssist() {
        this.$router.push({path: 'assist'})
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

  .num_text {
    display: inline-block;
    width: 3rem;
    color: #4DBC89;
  }

  .herbal_head_left {
    flex: 1;
    align-self: center;
  }
</style>
