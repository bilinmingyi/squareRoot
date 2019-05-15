<template>
  <div class="prescription_tab_bg">
    <iframe :src="url" class="ifram-content" frameborder="1" name="zhyb"></iframe>
    <div class="close-btn" @click="hide">
      +
    </div>
  </div>
</template>

<script>
  export default {
    name: "wisdomyb",
    props: ['url'],
    methods: {
      hide () {
        this.$emit('close')
      }
    }
  }
</script>

<style scoped>
  .ifram-content {
    width: 70vw;
    height: 70vh;
    background: #ffffff;
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .close-btn {
    width: 3rem;
    height: 3rem;
    background: #4DBC89;
    color: #ffffff;
    font-weight: bold;
    font-size: 3rem;
    line-height: 2.5rem;
    border-radius: 50%;
    text-align: center;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
    position: absolute;
    right: 5vw;
    top: 5vh;
  }
</style>
