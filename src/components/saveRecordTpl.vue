<template>
  <section class="prescription_tab_bg">
    <div
      class="prescription_tab"
      style="width: 20rem;padding: 1.25rem 1.875rem 1.875rem;top: 35%;left: 50%;"
    >
      <div class="mb10">
        <div class="prescription_tab_head_title">请输入模板名称</div>
      </div>
      <div class="mb10">
        <input
          type="text"
          class="CommonEdit_input"
          style="width: 100%;"
          placeholder="最多不超过10个字"
          v-model="recordTemplateName"
        >
      </div>
      <div class="display-flex">
        <div
          class="prescription_tab_save mr20"
          style="width: 120px;"
          @click.stop="saveAsTemplate()"
        >确定</div>
        <div
          class="prescription_tab_cancel"
          style="width: 120px;"
          @click.stop="hideSaveTemplate()"
        >取消</div>
      </div>
    </div>
  </section>
</template>

<script>
import { addRecordTpl } from "@/fetch/api.js";
import { mapState, mapActions } from "vuex";
export default {
  props: [],
  data() {
    return {
      recordTemplateName: ""
    };
  },
  computed: {
    ...mapState({
      recordData: state => state.recordData,
      tplChange: state => state.tplChange
    })
  },
  methods: {
    ...mapActions(['set_state_prop']),
    saveAsTemplate() {
      if (this.recordTemplateName == "") {
        this.$Message.warning("请先填写模板名称");
        return;
      }
      if (this.recordTemplateName.length > 10) {
        this.$Message.warning("模板名称不超过10个字");
        return;
      }
      let params = {
        name: this.recordTemplateName,
        scope: 1
      };
      let recordData = this.recordData;
      Object.assign(params, {
        chief_complaint: recordData.chief_complaint,
        present_illness: recordData.present_illness,
        allergic_history: recordData.allergic_history,
        personal_history: recordData.personal_history,
        past_history: recordData.past_history,
        family_history: recordData.family_history,
        prophylactic_history: recordData.prophylactic_history,
        examination: JSON.stringify(recordData.examination),
        diagnosis: recordData.diagnosis,
        diagnosis_xy: recordData.diagnosis_xy,
        treat_advice: recordData.treat_advice,
        sport_advice: recordData.sport_advice,
        dietary_advice: recordData.dietary_advice
      });
      addRecordTpl(params).then(res => {
        if (res.code == 1000) {
          this.$Message.success("存为模板成功");
          this.set_state_prop({key: 'tplChange', val: !this.tplChange})
          this.hideSaveTemplate();
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    hideSaveTemplate() {
      this.recordTemplateName = "";
      this.$emit("close");
    }
  }
};
</script>

<style scoped>
.prescription_tab_bg {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.5);
  z-index: 500;
  position: fixed;
  top: 0;
  left: 0;
}
.prescription_tab {
  z-index: 998;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  left: 50%;
  width: 47.5rem;
  height: auto;
  background: #f6fbfe;
  padding: 0.9375rem;
  box-shadow: 0 0.25rem 1rem 0.25rem rgba(0, 0, 0, 0.2);
  border-radius: 0.25rem;
}
.prescription_tab_head_title {
  color: #4c4c4c;
  font-size: 1rem;
  font-weight: bold;
}
.CommonEdit_input {
  width: 10rem;
  height: 2.5rem;
  line-height: 2.5rem;
  border: #5096e0 solid 1px;
  background: #fff;
  border-radius: 0.25rem;
  text-indent: 0.3125rem;
}
.prescription_tab_save {
  width: 10rem;
  height: 2.5rem;
  line-height: 2.5rem;
  border-radius: 1.875rem;
  background: #5096e0;
  color: #fff;
  text-align: center;
  font-size: 0.9375rem;
  cursor: pointer;
}
.prescription_tab_cancel {
  width: 10rem;
  height: 2.5rem;
  line-height: 2.5rem;
  border-radius: 1.875rem;
  background: #fff;
  color: #5096e0;
  border: #5096e0 solid 1px;
  text-align: center;
  font-size: 0.9375rem;
}
.display-flex {
  display: flex;
}
</style>
