<template>
  <div class="edit-patient-info">
    <div class="e-p-i-container">
      <div class="e-p-i-header mt10">
        <span class="e-p-i-title">编辑患者资料</span>
        <Icon @click="closeModal" type="ios-close-circle-outline" class="e-p-i-close-icon"/>
      </div>
      <div class="e-p-i-content">
        <div class="e-p-i-content-row">
          <div class="e-p-i-content-item pr50">
            <div class="e-p-i-content-item-key">患者姓名</div>
            <Input
              class="e-p-i-content-item-val"
              :value="localPatientData.name"
              @input="changePatientData('name', $event)"
              placeholder="必填"
            />
          </div>
          <div class="e-p-i-content-item">
            <div class="e-p-i-content-item-key">手机号码</div>
            <Input
              class="e-p-i-content-item-val"
              :value="localPatientData.mobile"
              @input="changePatientData('mobile', $event)"
              placeholder="必填"
            />
          </div>
        </div>
        <div class="e-p-i-content-row">
          <div class="e-p-i-content-item pr50">
            <div class="e-p-i-content-item-key">出生日期</div>
            <Date-picker
              class="e-p-i-content-item-val"
              type="date"
              :value="new Date(localPatientData.birthday)"
              @input="changePatientData('birthday', $event.getTime())"
            ></Date-picker>
          </div>
          <div class="e-p-i-content-item">
            <div class="e-p-i-content-item-key">患者性别</div>
            <Select
              class="e-p-i-content-item-val"
              :value="localPatientData.sex"
              @input="changePatientData('sex', $event)"
            >
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
            <Select
              class="e-p-i-content-item-val"
              :value="localPatientData.marital_status"
              @input="changePatientData('marital_status', $event)"
            >
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
            <Select
              class="e-p-i-content-item-val"
              :value="localPatientData.blood_abo"
              @input="changePatientData('blood_abo', $event)"
            >
              <Option
                v-for="(item,index) in clinicDict.bloodAbo"
                :value="item.code"
                :key="index"
              >{{ item.name }}</Option>
            </Select>
          </div>
          <div class="e-p-i-content-item">
            <div class="e-p-i-content-item-key">RH血型</div>
            <div>{{patientData.bloodRh}}</div>
            <Select
              class="e-p-i-content-item-val"
              :value="localPatientData.blood_rh"
              @input="changePatientData('blood_rh', $event)"
            >
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
        <button class="e-p-i-btn ml20 light" @click="closeModal">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon, Input, Select, Option, DatePicker } from "iview";
import { mapState, mapActions } from "vuex";
import { updatePatientData, saveDraft } from "@/fetch/api.js";
export default {
  components: {
    Icon,
    Input,
    Select,
    Option,
    DatePicker
  },
  data() {
    return {
      clinicDict: {
        // TODO: clinicDict
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
      },
      localPatientData: {}
    };
  },
  computed: {
    ...mapState({
      recordData: state => state.recordData,
      recipeList: state => state.recipeList,
      patientData: state => state.patientData,
      orderSeqno: state => state.orderSeqno
    })
  },
  created() {
    this.localPatientData = JSON.parse(JSON.stringify(this.patientData));
  },
  methods: {
    ...mapActions(["set_patient_info", "save_draft_data"]),
    closeModal() {
      this.$emit("closeModal");
    },
    saveInfo() {
      let reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      if (!reg.test(this.localPatientData.mobile)) {
        this.$Message.info({
          duration: 2,
          closable: true,
          content: "请输入正确的手机号！"
        });
      }

      let params = {
        id: this.localPatientData.id,
        name: this.localPatientData.name,
        birthday: this.localPatientData.birthday,
        sex: Number(this.localPatientData.sex),
        mobile: this.localPatientData.mobile,
        marital_status: Number(this.localPatientData.marital_status),
        blood_abo: this.localPatientData.blood_abo,
        blood_rh: this.localPatientData.blood_rh
      };

      updatePatientData(params).then(res => {
        if (res.code == 1000) {
          // 更新Vuex patientData
          Object.keys(this.localPatientData).forEach(key => {
            var val = this.localPatientData[key];
            this.set_patient_info({ key, val });
          });
          this.closeModal();
          this.saveDraftData();
        } else if (res.code == 200002) {
          this.$Message.warning("手机号已存在");
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    changePatientData(key, val) {
      this.localPatientData[key] = val;
    },
    saveDraftData(canReturn) {
      let draftData = {
        recipeList: this.recipeList,
        recordData: this.recordData
      };
      this.save_draft_data(JSON.stringify(draftData));
      saveDraft({
        patient_name: this.patientData.name,
        patient_mobile: this.patientData.mobile,
        patient_sex: this.patientData.sex,
        patient_marital_status: this.patientData.marital_status,
        patient_birthday: this.patientData.birthday,
        order_seqno: this.orderSeqno,
        draft: JSON.stringify(draftData)
      }).then(data => {
        console.log(data);
        if (data.code === 1000) {
          if (canReturn === 1) {
            this.$router.go(-1);
          }
        } else {
          this.$Message.info("保存失败");
        }
      });
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
  min-width: 40rem;
  min-height: 20rem;
  background: #fff;
  box-shadow: 0 0.25rem 1rem 0.25rem rgba(0, 0, 0, 0.2);
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
  position: relative;
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
  padding: 0.5rem 0 1.75rem 0;
  text-align: center;
}
.e-p-i-content-row {
  display: flex;
  margin-bottom: 0.75rem;
  align-items: center;
}
.e-p-i-content-item {
  display: flex;
  flex-wrap: nowrap;
}
.e-p-i-content-item-key {
  width: 5.5rem;
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
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(-50%, -50%);
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