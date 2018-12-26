<template>
  <div class="prescription_tab_bg">
    <section class="content">
      <div class="content_left"></div>
      <div class="content_right">
        <div>
          <Button size="large">确定无误11</Button>
        </div>
        <div>
          <Button size="large">返回修改</Button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import {Button} from 'iview'
  export default {
    name: "previewRecipe",
    components:{
      Button
    }
  }
</script>

<style scoped>
  .content {
    background: #525659;
    height: 95vh;
    width: 70vw;
    margin: 1.5vh auto 3.5vh;
    display: flex;
    border: 1px solid #b6b6b6;
    border-radius: 0.25rem;
    box-shadow: 0 0.125rem 0.375rem 0 rgba(0,0,0,0.50);
  }

  .content_left {
    flex: 3;
  }
  .content_right{
    flex: 1;
    background: #fbfbfb;
    text-align: center;
    padding-top: 12vh;
    display: flex;
  }
</style>
