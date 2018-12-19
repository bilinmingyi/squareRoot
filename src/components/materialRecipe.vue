<template>
  <div>
    <section class="herbal_head">
      <div class="herbal_head_left"></div>
      <div>
        <button class="btn btn_cancel" @click.stop="cancelRecipe">删除</button>
        <button class="btn">打印处方</button>
      </div>
    </section>
    <section>
      <table class="recipe_table">
        <thead>
        <tr>
          <th>序号</th>
          <th>材料名称</th>
          <th>数量</th>
          <th>单位</th>
          <th>备注</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>1</td>
          <td>针灸</td>
          <td>
            <Input style="width:3.125rem" type="text"/>
          </td>
          <td>支</td>
          <td>
            <Input type="text"/>
          </td>
          <td>
            <a>删除</a>
          </td>
        </tr>
        </tbody>
      </table>
    </section>
    <section>
      <div class="pl10 pt20">
        <span class="input_label"> 处方金额：100元</span>
      </div>
      <div class="displayFlex pl10 pt10 width-620">
        <span class="input_label pr4">医嘱：</span>
        <Input class="flexOne" type="textarea" :autosize="{minRows: 3,maxRows: 3}" placeholder="医嘱提示"/>
      </div>
    </section>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import {Select, Option, Input} from 'iview'

  export default {
    name: "materialRecipe",
    data(){
      return {

      }
    },
    computed:{
      ...mapGetters({
        currentData:'currRecipeData'
      }),
    },
    components:{
      Select,
      Option,
      Input
    },
    methods:{
      ...mapActions([
        'cancel_recipe'
      ]),
      cancelRecipe(){
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
</style>
