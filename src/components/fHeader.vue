<template>
  <div class="content">
    <div class="title">患者接诊</div>
    <div>
      <Button type="primary" shape="circle" class="btn-time">临时保存</Button>
      <Button type="primary" shape="circle" class="btn-cancel">取消就诊</Button>
      <Button type="primary" shape="circle" class="btn-done">完成就诊</Button>
    </div>
  </div>
</template>

<script>
  import {Button} from 'iview'
  export default {
    name: "fHeader",
    components:{
      Button
    }
  }
</script>

<style scoped>
  .content {
    display: flex;
  }

  .title {
    font-size: 1.06rem;
    font-weight: 600;
    color: rgba(76, 76, 76, 1);
    line-height: 1.5rem;
    flex: 1;
    align-self: center;
  }
  .btn-time{
    background: #5096e0;
    border: none;
    font-size: 1rem;
  }
  .btn-cancel{
    background: #FC3B3B;
    border: none;
    font-size: 1rem;
  }
  .btn-done{
    background: #4DBC89;
    border: none;
    font-size: 1rem;
  }
</style>