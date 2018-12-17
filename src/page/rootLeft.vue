<template>
  <div>这是左边</div>
</template>

<script>
  import {getHerbalList} from '@/fetch/api.js'
  export default {
    name: "rootPage",
    data(){
      return {

      }
    },
    created(){
      this.getData()
    },
    methods:{
      getData(){
        getHerbalList({
          category: 1,
          is_cloud: 0,
          name: "",
          page: 1,
          page_size: 8
        }).then(data=>{
          console.log(data)
        })
      }
    }

  }
</script>

<style scoped>

</style>
