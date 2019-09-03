<template>
  <div>
    <section class="herbal_head">
      <div class="herbal_head_left"></div>
      <div>
        <button class="btn btn_cancel" @click.stop="cancelRecipe">删除</button>
        <button class="btn" @click="print_pre()">打印处方</button>
      </div>
    </section>
    <section>
      <table class="recipe_table">
        <thead>
        <tr>
          <th>序号</th>
          <th>材料名称</th>
          <th>规格</th>
          <th>数量</th>
          <th>单价</th>
          <th>备注</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in currentData.data.items">
          <td>{{index+1}}</td>
          <td>{{item.name}}</td>
          <td>{{item.spec}}</td>
          <template v-if="item.is_match===1">
            <td>
              <InputNumber style="width:3.2rem"
                           :value="item.num"
                           @on-change="modify_medicine({key:'num',val:$event,index:index})"
                           :formatter="value => `${Math.floor(value)}`"
                           :parser="value => `${Math.floor(value)}`"
              />
              <span class="unit_text">{{item.unit}}</span>
            </td>
            <td>{{item.price|priceFormat}}</td>
            <td>
              <Input type="text" :value="item.remark"
                     @on-change="modify_medicine({key:'remark',val:$event.target.value,index:index})"/>
            </td>
          </template>
          <template v-else>
            <td colspan="3" style="color: red;">
              系统内没有匹配到该材料
            </td>
          </template>
          <td>
            <a @click.stop="cancel_medicine(index)">删除</a>
          </td>
        </tr>
        <tr v-if="currentData.data.items.length===0">
          <td colspan="6">
            右侧选择添加药品
          </td>
        </tr>
        </tbody>
      </table>
    </section>
    <section class="mb50">
      <div class="pl10 pt20">
        <span class="input_label"> 处方金额：{{currentData.money | priceFormat}}元</span>
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
import {mapActions} from 'vuex'
import {Select, Option, Input, InputNumber} from 'iview'

export default {
  name: "materialRecipe",
  data() {
    return {}
  },
  computed: {
    currentData: function () {
      return JSON.parse(JSON.stringify(this.$store.getters.currRecipeData))
    },
  },
  watch: {
    'currentData.data.items': {
      deep: true,
      handler: function (newVal, oldVal) {
        let allPrice = 0;
        newVal.map((item) => {
          allPrice += Number(item.price) * Number(item.num);
        })
        setTimeout(() => {
          this.modify_recipe({key: 'money', val: Number(allPrice).toFixed(2)})
        })
      }
    }
  },
  components: {
    Select,
    Option,
    InputNumber,
    Input
  },
  methods: {
    ...mapActions([
      'cancel_recipe',
      'cancel_medicine',
      'modify_medicine',
      'modify_recipe_detail',
      'modify_recipe',
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
    font-size: 0.875rem;
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
    padding-top: 0;
  }

  .herbal_head_left {
    flex: 1;
    align-self: center;
  }

  .unit_text {
    display: inline-block;
    min-width: 2rem;
    text-align: left;
  }
</style>
