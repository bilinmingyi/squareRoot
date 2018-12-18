<template>
  <div class="edit-patient-info">
    <div class="e-p-i-container">
      <div class="e-p-i-header">
        <span class="e-p-i-title">编辑患者资料</span>
        <Icon @click="closeModal" type="ios-close-circle-outline" class="e-p-i-close-icon"/>
      </div>
      <div class="e-p-i-content">
        <div class="e-p-i-content-row">
          <div class="e-p-i-content-item pr50">
            <div class="e-p-i-content-item-key">患者姓名</div>
            <Input class="e-p-i-content-item-val" v-model="patientData.name" placeholder="必填"/>
          </div>
          <div class="e-p-i-content-item">
            <div class="e-p-i-content-item-key">手机号码</div>
            <Input class="e-p-i-content-item-val" v-model="patientData.mobile" placeholder="必填"/>
          </div>
        </div>
        <div class="e-p-i-content-row">
          <div class="e-p-i-content-item pr50">
            <div class="e-p-i-content-item-key">出生日期</div>
            <Date-picker class="e-p-i-content-item-val" type="date" v-model="patientData.birthday"></Date-picker>
          </div>
          <div class="e-p-i-content-item">
            <div class="e-p-i-content-item-key">患者性别</div>
            <Select class="e-p-i-content-item-val" v-model="patientData.sex">
              <Option
                v-for="(item,index) in clinicDict.sex"
                :value="item.code"
                :key="index"
              >{{ item.name }}</Option>
            </Select>
          </div>
        </div>
        <div class="e-p-i-content-row">
          <div class="e-p-i-content-item pr50">
            <div class="e-p-i-content-item-key">婚姻状况</div>
            <Select class="e-p-i-content-item-val" v-model="patientData.maritalStatus">
              <Option
                v-for="(item,index) in clinicDict.maritalStatus"
                :value="item.code"
                :key="index"
              >{{ item.name }}</Option>
            </Select>
          </div>
        </div>
        <div class="e-p-i-content-row">
          <div class="e-p-i-content-item pr50">
            <div class="e-p-i-content-item-key">ABO血型</div>
            <Select class="e-p-i-content-item-val" v-model="patientData.bloodAbo">
              <Option
                v-for="(item,index) in clinicDict.bloodAbo"
                :value="item.code"
                :key="index"
              >{{ item.name }}</Option>
            </Select>
          </div>
          <div class="e-p-i-content-item">
            <div class="e-p-i-content-item-key">RH血型</div>
            <Select class="e-p-i-content-item-val" v-model="patientData.bloodRh">
              <Option
                v-for="(item,index) in clinicDict.bloodRh"
                :value="item.code"
                :key="index"
              >{{ item.name }}</Option>
            </Select>
          </div>
        </div>
      </div>
      <div class="e-p-i-footer">
        <button class="e-p-i-btn mr20" @click="saveInfo">确定</button>
        <button class="e-p-i-btn light" @click="closeModal">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon, Input, Select, DatePicker } from "iview";
export default {
  components: {
    Icon,
    Input,
    Select,
    DatePicker
  },
  data() {
    return {
      patientData: {
        // TODO: id
        id: 22,
        name: "A5",
        mobile: "13728089836",
        age: 14,
        birthday: new Date(1083513600000),
        sex: 1,
        weight: 55,
        marital_status: 0,
        personal_history: "过敏性鼻炎；",
        family_history: "",
        allergic_history: "头孢类；",
        maritalStatus: 0,
        bloodAbo: 0,
        bloodRh: 0
      },

      clinicDict: {
        sex: [
          { code: 0, name: "保密" },
          { code: 1, name: "男" },
          { code: 2, name: "女" }
        ],
        maritalStatus: [
          { code: 0, name: "保密" },
          { code: 1, name: "已婚" },
          { code: 2, name: "未婚" }
        ],
        bloodAbo: [
          { code: 0, name: "未知" },
          { code: 1, name: "A型" },
          { code: 2, name: "B型" },
          { code: 3, name: "AB型" },
          { code: 4, name: "O型" }
        ],
        bloodRh: [
          { code: 0, name: "未知" },
          { code: 1, name: "阴性" },
          { code: 2, name: "阳性" }
        ]
      }
    };
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    saveInfo() {
      console.log("保存信息");
    }
  }
};
</script>

<style scoped>
.edit-patient-info {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 900;
}
.e-p-i-container {
  min-width: 42.5rem;
  min-height: 25rem;
  background: #fff;
  box-shadow: 0 4px 16px 4px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  margin: 0 auto;
  z-index: 1050;
  position: absolute;
  top: 5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
}
.e-p-i-header {
  padding: 1.25rem;
  display: flex;
}
.e-p-i-title {
  flex: 1;
  text-align: center;
  font-size: 1.125rem;
  font-weight: bold;
  color: #4c4c4c;
}
.e-p-i-content {
  padding: 0 2.5rem 0 2.5rem;
}
.e-p-i-footer {
  padding: 1.875rem 0 1.25rem 0;
  text-align: center;
}
.e-p-i-content-row {
  display: flex;
  margin-bottom: 1.25rem;
  align-items: center;
}
.e-p-i-content-item {
  display: flex;
  flex-wrap: nowrap;
}
.e-p-i-content-item-key {
  width: 6.5625rem;
  font-size: 1rem;
  color: #4c4c4c;
  letter-spacing: 0;
  font-weight: bold;
  line-height: 2.25rem;
}
.e-p-i-content-item-val {
  width: 10rem;
}

.e-p-i-close-icon {
  color: #5096e0;
  font-size: 2rem;
  cursor: pointer;
  font-weight: bold;
}

.e-p-i-btn {
  font-size: 1rem;
  color: #ffffff;
  font-weight: bold;
  width: 140px;
  text-align: center;
  padding: 9px 0;
  background: #5096e0;
  border-radius: 100px;
  border: none;
  cursor: pointer;
}
.light {
  background: #ffffff;
  border: 1px solid #5096e0;
  color: #5096e0;
}
.border-5096E0 {
  border: 1px solid #5096e0;
}
</style>