<template>
  <div class="content">
    <div class="title">辅助开方</div>
    <div>
      <Button type="primary" shape="circle" class="btn-cancel" @click="historyBack()">关闭</Button>
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
    background: #FC3B3B;
    border: none;
    font-size: 1rem;
    width: 8rem;
  }
</style>
