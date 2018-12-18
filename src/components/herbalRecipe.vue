<template>
  <div>
    <section class="herbal_head">
      <RadioGroup v-model="currentData.data.category" class="herbal_head_left">
        <Radio label="1" size="large">
          <span>饮片</span>
        </Radio>
        <Radio label="2" size="large">
          <span>颗粒</span>
        </Radio>
      </RadioGroup>
      <div>
        <button class="btn btn_cancel">删除</button>
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
        <tr>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
        </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
  import {RadioGroup, Radio} from 'iview'
  import {mapActions, mapState} from 'vuex'

  export default {
    name: "herbalRecipe",
    data() {
      return {};
    },
    components: {
      RadioGroup,
      Radio
    },
    computed:{
      ...mapState({
        recipeList: state => state.recipeList,
        currRecipe: state => state.currRecipe
      }),
      currentData:function () {
        return {...this.recipeList[this.currRecipe]}
      }
    },
    methods:{
    }
  }
</script>

<style scoped>
  .btn{
    border: 0.0625rem solid #5096E0;
    border-radius: 1.875rem;
    font-size: 1rem;
    color: #5096E0;
    background: none;
    line-height: 1.875rem;
    min-width: 5.125rem;
  }
  .btn_cancel{
    border-color: #FC3B3B;
    color: #FC3B3B;
  }
  .btn_print{
    border-color: #4DBC89;
    color: #4DBC89;
  }
  .herbal_head{
    display: flex;
    padding: 0.625rem;
  }
  .herbal_head_left{
    flex: 1;
    align-self: center;
  }
</style>
