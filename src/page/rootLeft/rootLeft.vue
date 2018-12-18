<template>
  <div>
    <div class="root-left-title">
      <span>患者资料</span>
    </div>
    <patient-detail v-show="!showHistoryDetail"></patient-detail>
    <treat-history v-show="!showHistoryDetail"></treat-history>
    <treat-history-detail v-show="showHistoryDetail"></treat-history-detail>
  </div>
</template>

<script>
  import {getHerbalList} from '@/fetch/api.js'
  import patientDetail from './patientDetail';
  import treatHistory from './treatHistory';
  import treatHistoryDetail from "./treatHistoryDetail";
  import { mapState } from "vuex";
  export default {
    name: "rootPage",
    components: {
      patientDetail,
      treatHistory,
      treatHistoryDetail
    },
    data(){
      return {

      }
    },
    computed: {
      ...mapState({
        showHistoryDetail: state => state.showHistoryDetail,
      })
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
.root-left-title {
  background: #4dbc89;
  color: #ffffff;
  font-weight: bold;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  text-align: center;
  line-height: 2.1875rem;
  font-size: 1rem;
}
</style>
