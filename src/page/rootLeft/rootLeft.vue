<template>
  <div>
    <div class="root-left-title">
      <span>患者资料</span>
    </div>
    <patient-detail v-show="!showHistoryDetail"></patient-detail>
    <treat-history></treat-history>
  </div>
</template>

<script>
  import {getHerbalList} from '@/fetch/api.js'
  import patientDetail from './patientDetail';
  import treatHistory from './treatHistory';
  import { mapState, mapActions } from "vuex";
  import {getPatientInfo} from '@/fetch/api.js';
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
    computed: {
      ...mapState({
        showHistoryDetail: state => state.showHistoryDetail,
      })
    },
    created(){
      this.getData()
    },
    methods:{
      ...mapActions(['set_state_prop']),
      getData(){
        // TODO: 获取患者id
        let params = new FormData();
        params.append('patientId', 22);
        getPatientInfo(params).then(res=>{
          if (res.code == 1000) {
            this.set_state_prop({key: 'patientData', val: res.data})
          }
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
