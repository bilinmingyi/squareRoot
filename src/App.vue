<template>
  <div id="app">
    <f-header></f-header>
    <div class="page_content">
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
  .page_content{
    display: flex;
    min-height:calc( 100vh - 8.6rem);
  }
  .left{
    flex: 21;
    margin-right: 1rem;
    background: #f2f2f2;
    display: flex;
    flex-direction: column;
  }
  .middle{
    flex: 54;
    margin-right: 1rem;
    background: #FFFFFF;
  }
  .right{
    flex: 25;
    background: white;
  }

</style>
