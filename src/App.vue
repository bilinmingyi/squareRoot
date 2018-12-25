<template>
  <div id="app">
    <router-view name="Header"></router-view>
    <div class="page_content" v-if="initFinish">
      <router-view style="flex: 1;"></router-view>
      <router-view class="left" name="Left"/>
      <router-view class="middle" name="Middle"/>
      <router-view class="right" name="Right"/>
    </div>
    <f-loader v-show="showLoader"></f-loader>
  </div>
</template>

<script>

import { getTreatOrderDetail } from "@/fetch/api.js";
import fLoader from "@/components/fLoader";
import { mapState, mapActions } from "vuex";
export default {
  name: "App",
  components: {

    fLoader
  },
  data() {
    return {
      showLoader: false,
      initFinish: false,
    };
  },
  computed: {
    ...mapState({
      patientData: state => state.patientData,
    })
  },
  created() {
    this.init();
  },
  methods: {
    ...mapActions(['set_patient_info', 'set_order_seqno', 'set_state_prop']),
    init() {
      let params = { order_seqno: this.getOrderSeqno() };
      this.showLoader = true;
      this.set_order_seqno(this.getOrderSeqno());
      getTreatOrderDetail(params).then(res => {
        console.log(res);
        if (res.code === 1000) {
          let data = res.data;
          let patientData = this.patientData;
          Object.keys(patientData).forEach((item) => {
            let val = data['patient_' + item]
            if (val != null) {
              this.set_patient_info({key: item, val})
            }
          })
          this.set_state_prop({key: 'doctorName', val: data.doctor_name})
          this.initFinish = true;
        } else {
          console.log(res.msg);
        }

        this.showLoader = false;
      });
    },
    getOrderSeqno() {
      // TODO: 获取订单号

      return "T0283427054002";
    }
  }
};
</script>

<style>
@import "assets/css/reset.css";

#app {
  color: #2c3e50;
  margin-top: 3.75rem;
  padding: 1.25rem;
}
.page_content {
  display: flex;
  min-height: calc(100vh - 8.7rem);
}
.hidden {
  visibility: hidden;
}
.left {
  flex: 20;
  margin-right: 1rem;
  background: #f2f2f2;
  display: flex;
  flex-direction: column;
  position: relative;
}
.middle {
  flex: 60;
  margin-right: 1rem;
  background: #ffffff;
}
.right {
  flex: 20;
  background: white;
}
</style>
