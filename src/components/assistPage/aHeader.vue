<template>
  <div class="content">
    <div class="title">辅助开方</div>
    <div>
      <Button size="small" type="primary" shape="circle" class="btn-cancel" @click="historyBack()">关闭</Button>
    </div>
  </div>
</template>

<script>
  import {Button} from 'iview'

  export default {
    name: "aHeader",
    components: {
      Button
    },
    methods:{
      historyBack(){
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  .content {
    display: flex;
    padding: 0.5rem 0 0.5rem 0.5rem;
  }

  .title {
    font-size: 1.06rem;
    font-weight: 600;
    color: rgba(76, 76, 76, 1);
    line-height: 1.5rem;
    flex: 1;
    align-self: center;
  }
  .btn-cancel{
    background: #FFFFFF;
    border-color: #FC3B3B;
    font-size: 1rem;
    width: 8rem;
    color: #FC3B3B;
  }
</style>
