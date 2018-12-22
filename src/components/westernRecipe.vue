<template>
  <div>
    <section class="herbal_head">
      <div class="herbal_head_left"></div>
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
          <td>{{item.spec}}</td>
          <td>
            <Input style="width:2.5rem" type="text" :value="item.num"
                   @on-change="modify_medicine({key:'num',val:$event.target.value,index:index})"/>
          </td>
          <td>
            <Select style="width:3.125rem" :value="item.unit"
                    @on-change="modify_medicine({key:'unit',val:$event,index:index})">
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
            <Input style="width:2.5rem" type="text" :value="item.dose_once"
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
            <Input style="width:2.5rem" type="text" :value="item.days"
                   @on-change="modify_medicine({key:'days',val:$event.target.value,index:index})"/>
          </td>
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
    <section>
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
  </div>
</template>

<script>
  import {westernMedUsages, medFrequency} from '@/assets/js/mapType'
  import {mapActions, mapGetters} from 'vuex'
  import {Select, Option, Input} from 'iview'

  export default {
    name: "westernRecipe",
    data() {
      return {
        medFrequency: medFrequency
      }
    },
    components: {
      Select,
      Option,
      Input
    },
    computed: {
      westernMedUsages: function () {
        return westernMedUsages.filter(item => {
          return item.status === 1;
        })
      },
      ...mapGetters({
        currentData: 'currRecipeData'
      })
    },
    watch:{
      'currentData.data.items':{
        deep:true,
        handler:function (newVal,oldVal) {
          console.log(newVal)
          let allPrice=0;
          newVal.map((item)=>{
            if(item.unit===item.unit_stock){
              allPrice+=Number(item.sale_price)*Number(item.num);
            }else if(item.unit === item.unit_sale){
              allPrice+=Number(item.sale_price * 1.0 / item.stock_sale_ratio)*Number(item.num);
            }else {
              allPrice+=Number(item.sale_price)*Number(item.num);
            }
          })
          this.modify_recipe({key:'money',val:Number(allPrice).toFixed(2)})
        }
      }
    },
    methods: {
      ...mapActions([
        'cancel_recipe',
        'modify_medicine',
        'cancel_medicine',
        'modify_recipe_detail',
        'modify_recipe'
      ]),
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
