<template>
  <div id="app">
    <f-header></f-header>
    <div class="content">
      <router-view class="left" name="Left"/>
      <router-view class="middle" name="Middle"/>
      <router-view class="right" name="Right"/>
    </div>
  </div>
</template>

<script>
  import fHeader from '@/components/fHeader.vue'
  export default {
    name: 'App',
    components:{
      fHeader
    }
  }
</script>

<style>
  @import "assets/css/reset.css";

  #app {
    color: #2c3e50;
    margin-top: 3.75rem;
    padding: 1.25rem;
  }
  .content{
    display: flex;
  }
  .left{
    flex: 21;
  }
  .middle{
    flex: 54;
  }
  .right{
    flex: 25;
  }

</style>
