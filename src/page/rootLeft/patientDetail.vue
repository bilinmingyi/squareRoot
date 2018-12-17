<template>
  <div class="patient-detail">
    <div class="p-d-title">
      <span>患者资料</span>
    </div>
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
        <span class="font-bold pr10">年龄</span>
        <span>{{patientData.birthday | calcAge }}岁</span>
        <span class="font-bold pl20">性别</span>
        <span>{{patientData.sex | parseSex}}</span>
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
        <span class="font-bold pr10">诊金</span>
        <span>{{treatPrice | priceFormat}}</span>
        <span class="font-bold pr10 pl20">总金额</span>
        <span>{{allPrice | priceFormat}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // TODO: isFirst & treatPrice
      isFirst: "1", // 是否初诊
      treatPrice: 3, // 诊金
      patientData: {
        // TODO: id
        id: 22,
        name: "A5",
        mobile: "13728089836",
        age: 14,
        birthday: 1083513600000,
        sex: 0,
        weight: 55,
        marital_status: 0,
        personal_history: "过敏性鼻炎；",
        family_history: "",
        allergic_history: "头孢类；"
      },
      // TODO:
      recipeData: {
        recipeList: []
      }
    };
  },
  computed: {
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
      console.log("编辑");
    }
  }
};
</script>

<style scoped>
.patient-detail {
  font-size: 0.9375rem;
}
.p-d-title {
  background: #4dbc89;
  color: #ffffff;
  font-weight: bold;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  text-align: center;
  line-height: 2.1875rem;
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
  padding: 0.125rem;
}
.p-d-is-first {
  background: #eeae1d;
  font-size: 0.875rem;
  color: #ffffff;
  line-height: 20px;
  height: 20px;
  padding: 0 10px;
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
.font-16 {
  font-size: 1rem;
}
.font-15 {
  font-size: 0.9375rem;
}
.font-14 {
  font-size: 0.875rem;
}
.font-bold {
  font-weight: bold;
}
</style>