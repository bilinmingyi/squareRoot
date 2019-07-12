<template>
  <div class="textArea-block" v-on="assistListener">
    <textarea v-bind="$attrs" v-on="inputListeners" class="textArea"></textarea>
    <div class="assist-btn">
      <div class="assist-btn-text" @click.stop="openAssist">...</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "assistTextarea",
  inheritAttrs: false,
  computed: {
    inputListeners: function () {
      let vm = this
      let result = {}
      Object.keys(this.$listeners).forEach(key => {
        if (key != 'assist') {
          result[key] = this.$listeners[key]
        }
      })
      Object.assign(result,{
        input: function (event) {
          vm.$emit('input', event.target.value)
        }
      })
      return result
    },
    assistListener: function () {
      let vm = this
      return Object.assign({},
        {
          'assist': vm.$listeners.assist
        }
      )
    }
  },
  methods: {
    openAssist () {
      this.$emit('assist')
    }
  }

}
</script>

<style scoped>
  .textArea-block {
    display: flex;
    width: 100%;
  }

  .textArea {
    border: 1px solid #dcdee2;
    border-radius: 4px 0px 0px 4px;
    flex: 1;
    resize: none;
    position: relative;
    padding: 8px;
  }
  .textArea::-webkit-input-placeholder {
    color: rgba(204,204,204,1);
    font-size: 0.875rem;
  }

  .textArea:hover {
    border-color: #57a3f3;
  }

  .assist-btn {
    border-radius:0px 4px 4px 0px;
    border:1px solid rgba(204,204,204,1);
    border-left: none;
    width: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 2px;
    font-size: 18px;
    font-weight: bold;
    color: #7C7C7C;
    line-height: 1rem;
  }
  .assist-btn-text {
    padding-bottom: 10px;
    cursor: pointer;
  }
</style>
