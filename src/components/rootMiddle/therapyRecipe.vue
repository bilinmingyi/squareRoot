<template>
  <div>
    <section class="herbal_head">
      <div class="herbal_head_left">
        <f-radio value=1 :name="'therapyType'" :currVal="currentData.data.type" @change="changeType($event)">治疗
        </f-radio>
        <f-radio value=2 :name="'therapyType'" :currVal="currentData.data.type" @change="changeType($event)">检验
        </f-radio>
        <f-radio value=3 :name="'therapyType'" :currVal="currentData.data.type" @change="changeType($event)">检查
        </f-radio>
      </div>
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
          <th>项目名称</th>
          <th v-if="currentData.data.type == 1">数量</th>
          <th v-if="currentData.data.type == 2">标本</th>
          <th v-if="currentData.data.type == 3">部位</th>
          <th>单价</th>
          <th><span v-if="currentData.data.type == 3">检查目的</span><span v-else>备注</span></th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in currentData.data.items">
          <td>{{index+1}}</td>
          <td>{{item.name}}</td>
          <template v-if="item.is_match===1">
            <td v-if="currentData.data.type == 1">
              <InputNumber style="width:3.2rem" :value="item.num"
                           @on-change="modify_medicine({key:'num',val:$event,index:index})"/>
              <span class="unit_text">{{item.unit}}</span>
            </td>
            <td v-if="currentData.data.type == 2">
              {{item.sample}}
            </td>
            <td v-if="currentData.data.type == 3" style="width: 150px">
              <Input type="text" :value="item.position"
                     @on-change="modify_medicine({key:'position',val:$event.target.value,index:index})"/>
            </td>
            <td>{{item.price|priceFormat}}</td>
            <td>
              <Input type="text" :value="item.remark"
                     @on-change="modify_medicine({key:'remark',val:$event.target.value,index:index})"/>
            </td>
          </template>
          <template v-else>
            <td colspan="3" style="color: red;">
              系统内没有匹配到该项目
            </td>
          </template>
          <td style="width: 120px;">
            <a @click.stop="print_index(index)">打印项目</a>
            <a @click.stop="cancel_medicine(index)">删除</a>
          </td>
        </tr>
        <tr v-if="currentData.data.items.length===0">
          <td colspan="6">
            右侧选择添加{{currentData.data.type == 1 ? '治疗项目' : (currentData.data.type == 2 ? '检验项目' : '检查项目')}}
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
    <save-tpl v-if="showAddTpl" @hideTpl="hideTplShow"></save-tpl>
  </div>
</template>

<script>
import {Select, Option, Input, InputNumber} from 'iview'
import fRadio from '@/components/fRadio.vue'
import saveTpl from '@/components/rootMiddle/saveRecipeTpl'
import {mapActions} from 'vuex'

export default {
  name: "therapyRecipe",
  data() {
    return {
      showAddTpl: false
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
    InputNumber,
    saveTpl,
    fRadio
  },
  watch: {
    'currentData.data.items': {
      deep: true,
      handler: function (newVal, oldVal) {
        let allPrice = 0;
        newVal.map((item) => {
          allPrice += Number(item.price) * Number(item.num);
        });
        setTimeout(() => {
          this.modify_recipe({key: 'money', val: Number(allPrice).toFixed(2)})
        })
      }
    }
  },
  methods: {
    ...mapActions([
      'cancel_recipe',
      'cancel_medicine',
      'modify_medicine',
      'modify_recipe_detail',
      'modify_recipe',
      'change_print_pre',
      'change_print_index',
      'clean_recipe'
    ]),
    print_pre() {
      this.change_print_index(null);
      this.change_print_pre();
    },
    print_index(index) {
      this.change_print_index(index);
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
    changeType(event) {
      if (this.currentData.data.items.length === 0) {
        this.modify_recipe_detail({key: 'type', val: Number(event.target.value)})
      } else {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>切换项目类型将清空已选的项目，确认要切换?</p>',
          onOk: () => {
            this.modify_recipe_detail({key: 'type', val: Number(event.target.value)})
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
        this.$Message.info("请先至少添加一个项目！");
        return
      }
      let itemList = this.currentData.data.items;
      for (var i = 0; i < itemList.length; i++) {
        if ((itemList[i].num === '' || itemList[i].num === 0) && this.currentData.data.type == 1) {
          this.$Message.info("项目【" + itemList[i].name + "】的数量为空！")
          return
        }
      }
      this.showAddTpl = true;
    },
    hideTplShow() {
      this.showAddTpl = false;
    }
  }
}
</script>

<style scoped>
  .btn {
    border: 0.0625rem solid #5096e0;
    border-radius: 1.875rem;
    font-size: 0.875rem;
    color: #5096e0;
    background: none;
    line-height: 1.875rem;
    min-width: 5.125rem;
  }

  .btn_cancel {
    border-color: #fc3b3b;
    color: #fc3b3b;
  }

  .btn_print {
    border-color: #4dbc89;
    color: #4dbc89;
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
