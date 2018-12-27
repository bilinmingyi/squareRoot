<template>
  <div>
    <section class="herbal_head">
      <div class="herbal_head_left"></div>
      <div>
        <button class="btn btn_cancel" @click.stop="cancelRecipe">删除</button>
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
          <th>总量</th>
          <th>单位</th>
          <th>用法</th>
          <th>每次用量</th>
          <th>频次</th>
          <th>天数</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in currentData.data.items">
          <td>{{index+1}}</td>
          <td>{{item.name}}</td>

          <template v-if="item.is_match===1">
            <td>{{item.spec}}</td>
            <td>
              <InputNumber style="width:3.2rem;" :value="item.num"
                     @on-change="modify_medicine({key:'num',val:$event,index:index})"/>
            </td>
            <td>
              <Select style="width:3.125rem" :value="item.unit"
                      @on-change="change_unit($event,index)">
                <Option :value="item.unit_stock" key="item.unit_stock">{{item.unit_stock}}</Option>
                <Option :value="item.unit_sale" key="item.unit_sale">{{item.unit_sale}}</Option>
              </Select>
            </td>
            <td>
              <Select style="width:4.5rem" :value="item.usage"
                      @on-change="modify_medicine({key:'usage',val:$event,index:index})">
                <Option v-for="item in westernMedUsages" :value="item.name" :key="item.id">{{ item.name }}</Option>
              </Select>
            </td>
            <td>
              <InputNumber style="width:3.2rem" :value="Number(item.dose_once)"
                     @on-change="modify_medicine({key:'dose_once',val:$event,index:index})"/>
              <span class="unitText">{{item.unit_dose}}</span>
            </td>
            <td>
              <Select style="width:5.5rem" :value="item.frequency"
                      @on-change="modify_medicine({key:'frequency',val:$event,index:index})">
                <Option v-for="item in medFrequency" :value="item.name" :key="item.name">{{ item.name }}</Option>
              </Select>
            </td>
            <td>
              <InputNumber style="width:3.2rem" :value="item.days"
                     @on-change="modify_medicine({key:'days',val:$event,index:index})"/>
            </td>
          </template>
          <template v-else>
            <td colspan="7" style="color: red;">系统内搜索不到该药品</td>
          </template>

          <td>
            <a @click.stop="cancel_medicine(index)">删除</a>
          </td>
        </tr>
        <tr v-if="currentData.data.items.length==0">
          <td colspan="10">
            右侧选择添加药品
          </td>
        </tr>
        </tbody>
      </table>
    </section>
    <section class="mb50">
      <div class="pl10 pt20">
        <span class="input_label"> 处方金额：{{currentData.money}}元</span>
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
  import {westernMedUsages, medFrequency} from '@/assets/js/mapType'
  import saveTpl from '@/components/rootMiddle/saveRecipeTpl'
  import {mapActions} from 'vuex'
  import {Select, Option, Input, InputNumber} from 'iview'

  export default {
    name: "westernRecipe",
    data() {
      return {
        medFrequency: medFrequency,
        showAddTpl:false
      }
    },
    components: {
      Select,
      Option,
      Input,
      saveTpl,
      InputNumber
    },
    computed: {
      westernMedUsages: function () {
        return westernMedUsages.filter(item => {
          return item.status === 1;
        })
      },
      currentData: function () {
        return JSON.parse(JSON.stringify(this.$store.getters.currRecipeData))
      },
    },
    watch: {
      'currentData.data.items': {
        deep: true,
        handler: function (newVal, oldVal) {
          let allPrice = 0;
          newVal.map((item,index) => {
            if (item.unit === item.unit_stock) {
              allPrice += Number(item.sale_price) * Number(item.num);
            } else if (item.unit === item.unit_sale) {
              allPrice += Number(item.sale_price * 1.0 / item.stock_sale_ratio) * Number(item.num);
            } else {
              allPrice += Number(item.sale_price) * Number(item.num);
            }
          })
          setTimeout(()=>{
            this.modify_recipe({key: 'money', val: Number(allPrice).toFixed(2)})
          })
        }
      },
    },
    methods: {
      ...mapActions([
        'cancel_recipe',
        'modify_medicine',
        'cancel_medicine',
        'modify_recipe_detail',
        'modify_recipe',
        'change_print_pre',
      ]),
      print_pre: function(){
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
            console.log("88")
          }
        });
      },
      change_unit(event, index) {
        let currItems = this.currentData.data.items[index];
        this.modify_medicine({key:'unit',val:event,index:index})
        if (currItems.num !== '' && currItems.num !== 0) {
          if (event === currItems.unit_stock) {
            this.modify_medicine({key:'num',val:Math.ceil(currItems.num*1.0/currItems.stock_sale_ratio),index:index})
          } else if (event === currItems.unit_sale) {
            this.modify_medicine({key:'num',val:Math.ceil(currItems.num*currItems.stock_sale_ratio),index:index})
          }
        }

      },
      saveTplData(){
        if(this.currentData.data.items.length===0){
          this.$Message.info("请先至少添加一个药品！");
          return
        }
        let itemList=this.currentData.data.items;
        for(var i=0;i<itemList.length;i++){
          if(itemList[i].num==='' || itemList[i].num===0){
            this.$Message.info("药品【"+itemList[i].name+"】的药量为空！")
            return
          }
        }
        this.showAddTpl=true;
      },
      hideTplShow(){
        this.showAddTpl=false;
      }
    }
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

  .unitText {
    min-width: 2rem;
    display: inline-block;
    text-align: left;
  }
</style>
