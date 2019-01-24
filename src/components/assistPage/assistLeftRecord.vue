<template>
    <div class="patient-detail">
      <div class="p-d-content">
        <div class="p-d-content-li">
          <span class="font-bold">患者姓名</span>
        </div>
        <div class="p-d-content-li">
          <span class="font-bold">患者性别</span>
        </div>
        <div class="p-d-content-li no_border">
          <span class="font-bold">患者年龄</span>
        </div>
      </div>
    </div>
</template>

<script>
    export default {

    }
</script>

<style scoped>
  .patient-detail {
    font-size: 0.9375rem;
  }
  .p-d-content {
    padding: 0 10px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 4px 0px rgba(80, 150, 224, 0.2);
    margin-bottom: 0.4375rem;
  }
  .p-d-content-li{
    padding: 0.6rem 0;
    border-bottom:0.06rem solid rgba(204,204,204,1);
  }
  .no_border{
    border-bottom: none;
  }
</style>
