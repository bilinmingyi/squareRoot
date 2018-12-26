<template>
  <div>
    <div class="assistContent">
      <assist-left class="assistLeft"> </assist-left>
      <assist-right class="assistRight"></assist-right>
    </div>
  </div>
</template>

<script>
  import assistLeft from '@/components/assistPage/assistLeft.vue'
  import assistRight from '@/components/assistPage/assistRight.vue'

  export default {
    name: "assistPage",
    components: {
      assistLeft,
      assistRight
    }
  }
</script>

<style scoped>
  .assistContent {
    display: flex;
  }
  .assistLeft{
    flex: 26;
    margin-right: 1rem;
    min-height: calc(100vh - 9.2rem);
  }
  .assistRight{
    flex: 73;
    background: #ffffff;
  }
</style>
