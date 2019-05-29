<template>
  <div class="patient-detail">
    <div class="p-d-content">
      <div class="display-flex flex-ai-center">
        <div class="flex-1 font-16">
          <Icon type="md-person" class="p-d-person-icon"/>
          <span class="font-size font-bold">{{patientData.name}}</span>
          <span class="edit_span" @click="editPatient()">编辑</span>
        </div>
        <div class="p-d-is-first font-14">
          <span v-if="isFirst == 1">初诊</span>
          <span v-else-if="isFirst == 0">复诊</span>
        </div>
      </div>
      <section v-if="canShowMoney">
        <div class="mt10">
        <span class="pr20">
          <span class="font-bold pr10">年龄</span>
          <span>{{patientData.birthday | calcAge}}岁</span>
          <!-- <span v-else>{{patientData.age}}岁</span> -->
        </span>
          <span>
          <span class="font-bold pr10">性别</span>
          <span>{{patientData.sex | parseSex}}</span>
        </span>
        </div>
        <div class="mt5">
          <span class="font-bold pr10">体重</span>
          <span>{{patientData.weight > 0 ? patientData.weight + 'kg' : '未知'}}</span>
        </div>
        <div class="mt5">
          <span class="font-bold pr10">联系电话</span>
          <span>{{patientData.mobile}}</span>
        </div>
      </section>
      <section v-else>
          <div class="p-d-content-li pt6 pb10">
            <span class="font-bold">{{clinicType == 6 ? '客户' : '患者'}}性别</span>
            <span class="pl16">{{patientData.sex | parseSex}}</span>
          </div>
          <div class="p-d-content-li pt10 no_border">
            <span class="font-bold">{{clinicType == 6 ? '客户' : '患者'}}年龄</span>
            <span class="pl16">{{patientData.birthday | calcAge}}岁</span>
          </div>

      </section>

      <div class="mt5" v-if="canShowMoney">
        <span class="pr20">
          <span class="font-bold pr10">诊金(挂号费)</span>
          <span>{{treatPrice | priceFormat}}</span>
        </span>
        <!-- <span>
          <span class="font-bold pr10">总金额</span>
          <span>{{totalPrice | priceFormat}}</span>
        </span> -->
      </div>
    </div>
    <edit-patient-info v-if="showEditPatientInfo" @closeModal="showEditPatientInfo = false"></edit-patient-info>
  </div>
</template>

<script>
  import {Icon} from "iview";
  import editPatientInfo from "./editPatientInfo";
  import {mapState, mapGetters, mapActions} from "vuex";
  import {getPatientInfo} from "@/fetch/api.js";

  export default {
    props: {
      canShowMoney: {
        type: Boolean,
        default: true
      }
    },
    components: {
      Icon,
      editPatientInfo
    },
    data() {
      return {
        recipeData: {
          recipeList: []
        },
        showEditPatientInfo: false // 显示编辑患者资料
      };
    },
    computed: {
      ...mapState({
        isFirst: state => state.isFirst,
        treatPrice: state => state.treatPrice,
        patientData: state => state.patientData,
        clinicType: state => state.clinicType
      }),
      ...mapGetters(['totalPrice']),
    },
    created() {
      if (!this.canShowMoney) {
        let patientInfoParams = new FormData();
        patientInfoParams.append("patientId", this.patientData.id);
        getPatientInfo(patientInfoParams).then(res => {
          if (res.code == 1000) {
            this.set_state_prop({key: "patientData", val: res.data});
          }
        });
      }
    },
    methods: {
      ...mapActions(['set_state_prop']),
      editPatient() {
        this.showEditPatientInfo = true;
      }
    }
  };
</script>

<style scoped>
  .patient-detail {
    font-size: 0.9375rem;
  }

  .p-d-content {
    padding: 10px;
    background: rgba(255, 255, 255, 1);
    box-shadow:0px 2px 8px 0px rgba(80,150,224,0.32);
    margin-bottom: 0.4375rem;
  }

  .p-d-person-icon {
    color: #5096e0;
    font-size: 1.33rem;
    padding-bottom: 0.25rem;
  }

  .p-d-is-first {
    background: #eeae1d;
    font-size: 0.875rem;
    color: #ffffff;
    line-height: 20px;
    height: 20px;
    padding: 0 10px;
  }

  .edit_span {
    color: #5096e0;
    text-decoration: underline;
    cursor: pointer;
  }
  .p-d-content-li{
    border-bottom:0.06rem solid rgba(204,204,204,1);
  }
  .no_border{
    border-bottom: none;
  }
  .display-flex {
    display: flex;
  }

  .flex-1 {
    flex: 1;
  }

  .flex-ai-center {
    align-items: center;
  }
</style>
