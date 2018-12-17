<template>
  <div>
    这是中间
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: "rootMiddle",
    data(){
      return {

      }
    },
    methods:{
      ...mapActions([
        'add_new_recipt'
      ]),

    }
  }
</script>

<style scoped>

</style>
