<template>
  <div class="f_radio">
    <label class="demo--label">
      <input class="demo--radio" type="radio" v-bind="$attrs" v-on="$listeners" :name="name" :checked="$attrs.value==currVal">
      <span class="demo--radioInput" ></span><slot></slot>
    </label>
  </div>
</template>

<script>
  export default {
    name: "fRadio",
    inheritAttrs: false,
    props:['currVal','name'],
    created(){

    },
  }
</script>

<style scoped>
  .f_radio{
    display: inline-block;
  }
  .demo--label {
    display: inline-block;
    font-size: 0.875rem;
    margin-right: 0.5rem;
    cursor: pointer;
  }

  .demo--radioInput {
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 100%;
    display: inline-block;
    height: 1.125rem;
    vertical-align: middle;
    width: 1.125rem;
    line-height: 1.125rem;
    margin-right: 0.25rem;
  }

  .demo--radio {
    display: none !important;
  }

  .demo--radio:checked + .demo--radioInput:after {
    background-color: #5096E0;
    border-radius: 100%;
    content: "";
    display: inline-block;
    height: 0.75rem;
    width: 0.75rem;
    margin: 0.125rem;
  }
</style>
