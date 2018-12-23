<template>
  <div>
    <section class="herbal_head">
      <div class="herbal_head_left"></div>
      <div>
        <button class="btn btn_cancel" @click.stop="cancelRecipe">删除</button>
        <button class="btn">打印处方</button>
        <button class="btn btn_print" @click.stop="saveTplData">存为模板</button>
      </div>
    </section>
    <section>
      <table class="recipe_table">
        <thead>
        <tr>
          <th>序号</th>
          <th>项目名称</th>
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
          <td>
            <Input style="width:2.5rem" type="text" :value="item.num"
                   @on-change="modify_medicine({key:'num',val:$event.target.value,index:index})"/>
          </td>
          <td>{{item.price}}元/{{item.unit}}</td>
          <td>
            <Input type="text" :value="item.remark"
                   @on-change="modify_medicine({key:'remark',val:$event.target.value,index:index})"/>
          </td>
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
    <save-tpl v-if="showAddTpl" @hideTpl="hideTplShow"></save-tpl>
  </div>
</template>

<script>
  import {Select, Option, Input} from 'iview'
  import saveTpl from '@/components/saveRecipeTpl'
  import {mapActions} from 'vuex'

  export default {
    name: "therapyRecipe",
    data() {
      return {
        showAddTpl:false
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
      saveTpl
    },
    watch:{
      'currentData.data.items':{
        deep:true,
        handler:function (newVal, oldVal) {
          let allPrice=0;
          newVal.map((item)=>{
            allPrice+=Number(item.price)*Number(item.num);
          });
          setTimeout(()=>{
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
      saveTplData(){
        if(this.currentData.data.items.length===0){
          this.$Message.info("请先至少添加一个项目！");
          return
        }
        let itemList=this.currentData.data.items;
        for(var i=0;i<itemList.length;i++){
          if(itemList[i].num==='' || itemList[i].num===0){
            this.$Message.info("项目【"+itemList[i].name+"】的数量为空！")
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

</style>
