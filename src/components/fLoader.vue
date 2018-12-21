<template>
  <div :class="['f-loader', {'f-fixed': fixed}, {'f-abs': !fixed}]">
    <div :class="['loader-box', {'top-1': fixed}, {'top-2': !fixed}]"></div>
  </div>
</template>

<script>
export default {
  props: {
    fixed: {
      default: true,
      type: Boolean
    }
  },
  data () {
    return {
    } ; 
  },
}
</script>

<style scoped>
.f-fixed {
  position: fixed;
  font-size: 1rem;
}
.f-abs {
  position: absolute;
  font-size: 0.5rem;
}
.f-loader {
  z-index: 2018;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, .8);
}
.loader-box {
  position: absolute;
  left: 50%;
  width: 1em;
  height: 1em;
  transform: translateX(-50%);
  animation: loading-spinning-bubbles 1.3s infinite linear;
  border-radius: 50%;
}

.top-1 {
  top: 30%;
  transform: translateY(-50%);
}

.top-2 {
  top: 20%;
}

@keyframes loading-spinning-bubbles {
  0%,
  100% {
    -webkit-box-shadow: 0em -3em 0em 0.2em #5096e0, 2em -2em 0em 0em #5096e0, 3em 0em 0em -0.5em #5096e0, 2em 2em 0em -0.5em #5096e0, 0em 3em 0em -0.5em #5096e0, -2em 2em 0em -0.5em #5096e0, -3em 0em 0em -0.5em #5096e0, -2em -2em 0em 0em #5096e0;
    box-shadow: 0em -3em 0em 0.2em #5096e0, 2em -2em 0em 0em #5096e0, 3em 0em 0em -0.5em #5096e0, 2em 2em 0em -0.5em #5096e0, 0em 3em 0em -0.5em #5096e0, -2em 2em 0em -0.5em #5096e0, -3em 0em 0em -0.5em #5096e0, -2em -2em 0em 0em #5096e0;
  }
  12.5% {
    -webkit-box-shadow: 0em -3em 0em 0em #5096e0, 2em -2em 0em 0.2em #5096e0, 3em 0em 0em 0em #5096e0, 2em 2em 0em -0.5em #5096e0, 0em 3em 0em -0.5em #5096e0, -2em 2em 0em -0.5em #5096e0, -3em 0em 0em -0.5em #5096e0, -2em -2em 0em -0.5em #5096e0;
    box-shadow: 0em -3em 0em 0em #5096e0, 2em -2em 0em 0.2em #5096e0, 3em 0em 0em 0em #5096e0, 2em 2em 0em -0.5em #5096e0, 0em 3em 0em -0.5em #5096e0, -2em 2em 0em -0.5em #5096e0, -3em 0em 0em -0.5em #5096e0, -2em -2em 0em -0.5em #5096e0;
  }
  25% {
    -webkit-box-shadow: 0em -3em 0em -0.5em #5096e0, 2em -2em 0em 0em #5096e0, 3em 0em 0em 0.2em #5096e0, 2em 2em 0em 0em #5096e0, 0em 3em 0em -0.5em #5096e0, -2em 2em 0em -0.5em #5096e0, -3em 0em 0em -0.5em #5096e0, -2em -2em 0em -0.5em #5096e0;
    box-shadow: 0em -3em 0em -0.5em #5096e0, 2em -2em 0em 0em #5096e0, 3em 0em 0em 0.2em #5096e0, 2em 2em 0em 0em #5096e0, 0em 3em 0em -0.5em #5096e0, -2em 2em 0em -0.5em #5096e0, -3em 0em 0em -0.5em #5096e0, -2em -2em 0em -0.5em #5096e0;
  }
  37.5% {
    -webkit-box-shadow: 0em -3em 0em -0.5em #5096e0, 2em -2em 0em -0.5em #5096e0, 3em 0em 0em 0em #5096e0, 2em 2em 0em 0.2em #5096e0, 0em 3em 0em 0em #5096e0, -2em 2em 0em -0.5em #5096e0, -3em 0em 0em -0.5em #5096e0, -2em -2em 0em -0.5em #5096e0;
    box-shadow: 0em -3em 0em -0.5em #5096e0, 2em -2em 0em -0.5em #5096e0, 3em 0em 0em 0em #5096e0, 2em 2em 0em 0.2em #5096e0, 0em 3em 0em 0em #5096e0, -2em 2em 0em -0.5em #5096e0, -3em 0em 0em -0.5em #5096e0, -2em -2em 0em -0.5em #5096e0;
  }
  50% {
    -webkit-box-shadow: 0em -3em 0em -0.5em #5096e0, 2em -2em 0em -0.5em #5096e0, 3em 0em 0em -0.5em #5096e0, 2em 2em 0em 0em #5096e0, 0em 3em 0em 0.2em #5096e0, -2em 2em 0em 0em #5096e0, -3em 0em 0em -0.5em #5096e0, -2em -2em 0em -0.5em #5096e0;
    box-shadow: 0em -3em 0em -0.5em #5096e0, 2em -2em 0em -0.5em #5096e0, 3em 0em 0em -0.5em #5096e0, 2em 2em 0em 0em #5096e0, 0em 3em 0em 0.2em #5096e0, -2em 2em 0em 0em #5096e0, -3em 0em 0em -0.5em #5096e0, -2em -2em 0em -0.5em #5096e0;
  }
  62.5% {
    -webkit-box-shadow: 0em -3em 0em -0.5em #5096e0, 2em -2em 0em -0.5em #5096e0, 3em 0em 0em -0.5em #5096e0, 2em 2em 0em -0.5em #5096e0, 0em 3em 0em 0em #5096e0, -2em 2em 0em 0.2em #5096e0, -3em 0em 0em 0em #5096e0, -2em -2em 0em -0.5em #5096e0;
    box-shadow: 0em -3em 0em -0.5em #5096e0, 2em -2em 0em -0.5em #5096e0, 3em 0em 0em -0.5em #5096e0, 2em 2em 0em -0.5em #5096e0, 0em 3em 0em 0em #5096e0, -2em 2em 0em 0.2em #5096e0, -3em 0em 0em 0em #5096e0, -2em -2em 0em -0.5em #5096e0;
  }
  75% {
    -webkit-box-shadow: 0em -3em 0em -0.5em #5096e0, 2em -2em 0em -0.5em #5096e0, 3em 0em 0em -0.5em #5096e0, 2em 2em 0em -0.5em #5096e0, 0em 3em 0em -0.5em #5096e0, -2em 2em 0em 0em #5096e0, -3em 0em 0em 0.2em #5096e0, -2em -2em 0em -0.5em #5096e0;
    box-shadow: 0em -3em 0em -0.5em #5096e0, 2em -2em 0em -0.5em #5096e0, 3em 0em 0em -0.5em #5096e0, 2em 2em 0em -0.5em #5096e0, 0em 3em 0em -0.5em #5096e0, -2em 2em 0em 0em #5096e0, -3em 0em 0em 0.2em #5096e0, -2em -2em 0em -0.5em #5096e0;
  }
  87.5% {
    -webkit-box-shadow: 0em -3em 0em 0em #5096e0, 2em -2em 0em -0.5em #5096e0, 3em 0em 0em -0.5em #5096e0, 2em 2em 0em -0.5em #5096e0, 0em 3em 0em -0.5em #5096e0, -2em 2em 0em -0.5em #5096e0, -3em 0em 0em 0em #5096e0, -2em -2em 0em 0.2em #5096e0;
    box-shadow: 0em -3em 0em 0em #5096e0, 2em -2em 0em -0.5em #5096e0, 3em 0em 0em -0.5em #5096e0, 2em 2em 0em -0.5em #5096e0, 0em 3em 0em -0.5em #5096e0, -2em 2em 0em -0.5em #5096e0, -3em 0em 0em 0em #5096e0, -2em -2em 0em 0.2em #5096e0;
  }
}
</style>