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
          <span v-if="isFirst === '1'">初诊</span>
          <span v-else-if="isFirst === '0'">复诊</span>
        </div>
      </div>
      <div class="mt10">
        <span class="pr20">
          <span class="font-bold pr10">年龄</span>
          <span v-if="patientData.birthday != null">{{patientData.birthday | calcAge}}岁</span>
          <span v-else>{{patientData.age}}岁</span>
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
      <div class="mt5">
        <span class="pr20">
          <span class="font-bold pr10">诊金</span>
          <span>{{treatPrice | priceFormat}}</span>
        </span>
        <span>
          <span class="font-bold pr10">总金额</span>
          <span>{{allPrice | priceFormat}}</span>
        </span>
      </div>
    </div>
    <edit-patient-info v-if="showEditPatientInfo" @closeModal="showEditPatientInfo = false"></edit-patient-info>
  </div>
</template>

<script>
import { Icon } from "iview";
import editPatientInfo from "./editPatientInfo";
import { mapState, mapActions } from "vuex";
export default {
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
      // TODO: is_first & treatPrice
      isFirst: state => state.is_first,
      treatPrice: state => state.treatPrice,
      patientData: state => state.patientData
    }),
    // 总金额
    allPrice() {
      let tempPrice = 0;
      let recipeList = this.recipeData.recipeList;
      recipeList.forEach(function(recipe) {
        var price = 0;
        recipe.items.forEach(function(item) {
          price += Number(item.price) * 10000 * Number(item.num); // 防精度丢失
        });
        price /= 10000;
        if (recipe.name == "中药处方") {
          tempPrice +=
            Number(recipe.dosage) * Number(price) + Number(recipe.extra_price);
        } else if (recipe.name == "中成药西药") {
          tempPrice += Number(price);
        } else if (recipe.name == "产品处方") {
          tempPrice += Number(price);
        } else if (recipe.name == "项目处方") {
          tempPrice += Number(price);
        } else if (recipe.name == "附加服务") {
          tempPrice += Number(price);
        } else if (recipe.name == "材料处方") {
          tempPrice += Number(price);
        }
      });
      tempPrice += Number(this.treatPrice);
      return tempPrice.toFixed(2);
    }
  },
  methods: {
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
  box-shadow: 0px 2px 4px 0px rgba(80, 150, 224, 0.2);
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