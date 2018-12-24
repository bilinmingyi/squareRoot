<template>
  <div>
    <section class="displayFlex">
      <div class="root-left-title">
        中药处方详情
      </div>
      <div class="root-right"></div>
    </section>
    <section>
      <div class="recipe_name">柴胡舒肝散《医学统旨》</div>
      <div class="recipe_desc">
        <div>
          胁肋疼痛，胸闷善太息，情志抑郁，易怒，脘腹胀满，脉弦，肝气郁滞证。胁肋疼痛，胸闷善太息，情志抑郁，易怒，脘腹胀满，脉弦，肝气郁滞证。
        </div>
        <div>
          <f-radio value="1" name="diagnosis"><span style="font-weight: 600">若疼痛甚着</span></f-radio>
        </div>
      </div>
      <div class="recipe_list">
        <table class="recipe_table">
          <thead>
          <tr>
            <th>序号</th>
            <th>药名</th>
            <th>药量</th>
            <th>常用量</th>
            <th>注意事项</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>1</td>
            <td>法半夏</td>
            <td>15克</td>
            <td>20~35克</td>
            <td>不宜和海鲜同食</td>
          </tr>
          </tbody>
        </table>
      </div>

      <Button class="use_recipe_btn" type="primary" shape="circle">导入该处方</Button>

    </section>
  </div>
</template>

<script>
  import fRadio from '@/components/fRadio.vue'
  import {Button} from 'iview'

  export default {
    name: "assistRight",
    components:{
      fRadio,
      Button
    }
  }
</script>

<style scoped>
  .root-left-title {
    background: #4dbc89;
    color: #ffffff;
    font-weight: bold;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    text-align: center;
    line-height: 2.1875rem;
    font-size: 1rem;
    height: auto;
    flex: 36;
  }

  .root-right {
    flex: 64;
    background: #F2F2F2;
  }

  .recipe_name {
    font-weight: 600;
    font-size: 1rem;
    color: #4C4C4C;
    padding: 1rem;
  }

  .recipe_desc {
    background: rgba(242, 242, 242, 1);
    border-radius: 0.25rem;
    font-size: 1rem;
    color: #4C4C4C;
    line-height: 1.38rem;
    padding: 1rem;
    margin: 0 4rem 1rem 1rem;
  }
  .recipe_list{
    margin-right: 4rem;
  }
  .use_recipe_btn{
    margin: 1rem;
    background: #EEAE1D;
    border-color: #EEAE1D;
    width: 8rem;
  }
</style>
