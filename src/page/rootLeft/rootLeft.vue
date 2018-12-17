<template>
  <div>
    <patient-detail></patient-detail>
    <treat-history></treat-history>
  </div>
</template>

<script>
  import {getHerbalList} from '@/fetch/api.js'
  import patientDetail from './patientDetail';
  import treatHistory from './treatHistory';
  export default {
    name: "rootPage",
    components: {
      patientDetail,
      treatHistory
    },
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
