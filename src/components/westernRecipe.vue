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
        <tr>
          <td>1</td>
          <td>养肝方</td>
          <td>10克/30粒/瓶</td>
          <td>
            <Input style="width:3.125rem" type="text"/>
          </td>
          <td>
            <Select style="width:3.125rem">
              <Option value="克" key="克">克</Option>
              <Option value="毫升" key="毫升">毫升</Option>
            </Select>
          </td>
          <td>
            <Select style="width:6.25rem">
              <Option v-for="item in westernMedUsages" :value="item.name" :key="item.id">{{ item.name }}</Option>
            </Select>
          </td>
          <td>
            <Input style="width:3.125rem" type="text"/>
            <span class="unitText">克</span>
          </td>
          <td>
            <Select style="width:3.125rem">
              <Option v-for="item in medFrequency" :value="item.name" :key="item.name">{{ item.name }}</Option>
            </Select>
          </td>
          <td>
            <Input style="width:3.125rem" type="text"/>
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
        <Input class="flexOne" type="textarea" :autosize="{minRows: 3,maxRows: 3}" placeholder="医嘱提示" />
      </div>
    </section>
  </div>
</template>

<script>
  import {westernMedUsages,medFrequency} from '@/assets/js/mapType'
  import {mapActions, mapGetters} from 'vuex'
  import {Select, Option, Input} from 'iview'

  export default {
    name: "westernRecipe",
    data(){
      return {
        medFrequency:medFrequency
      }
    },
    components:{
      Select,
      Option,
      Input
    },
    computed:{
      westernMedUsages:function () {
        return westernMedUsages.filter(item => {
          return item.status===1;
        })
      },
      ...mapGetters({
        currentData:'currRecipeData'
      })
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
  .unitText{
    font-size: 0.875rem;
  }
</style>
