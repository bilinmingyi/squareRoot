<template>
  <section class="prescription_tab_bg">
    <div
      class="prescription_tab"
    >
      <div class="mb20">
        <div class="alert-title">添加病历模板</div>
      </div>
      <section>
        <div class="displayFlex align-item mb15">
          <span class="input_label pr16">模板范围</span>
          <RadioGroup class="flexOne" v-model="recordTemplateScope">
            <Radio label="1">个人</Radio>
            <Radio class="ml30" label="0">本诊所</Radio>
          </RadioGroup>
        </div>
        <div class="displayFlex align-item mb10">
          <span class="input_label pr16">模板名称</span>
          <Input class="flexOne" placeholder="请输入名称(必填)" v-model="recordTemplateName"/>
        </div>
        <div class="displayFlex align-item mb10">
          <span class="input_label pr16">中医诊断</span>
          <Input class="flexOne" placeholder="选填" v-model="diagnosis"/>
        </div>
        <div class="displayFlex align-item mb10">
          <span class="input_label pr16">西医诊断</span>
          <Input class="flexOne" placeholder="选填" v-model="diagnosis_xy"/>
        </div>
      </section>
      <div class="tc mt30">
        <button class="saveBtn mr20" @click.stop="saveAsTemplate">确定</button>
        <button class="saveBtn cancelBtn" @click.stop="hideSaveTemplate()">取消</button>
      </div>
    </div>
  </section>
</template>

<script>
import {Input, RadioGroup, Radio} from 'iview'
import {addRecordTpl} from "@/fetch/api.js";
import {mapState, mapActions} from "vuex";

export default {
  props: [],
  data() {
    return {
      recordTemplateName: "",
      recordTemplateScope: "1",
      diagnosis_xy: "",
      diagnosis: ""
    };
  },
  computed: {
    ...mapState({

      tplChange: state => state.tplChange
    })
  },
  components: {
    Input,
    RadioGroup,
    Radio
  },
  mounted() {
    this.diagnosis_xy = this.recordData.diagnosis_xy
    this.diagnosis = this.recordData.diagnosis
  },
  methods: {
    ...mapActions(['set_state_prop']),
    checkRecord(type) {
      var self = this
      return self.recordData.recordList.indexOf(type) >= 0
    },
    saveAsTemplate() {
      let self = this
      if (self.recordTemplateName == "") {
        self.$Message.info("请先填写模板名称");
        return;
      }
      if (self.recordTemplateName.length > 32) {
        self.$Message.info("模板名称过长，请修改");
        return;
      }
      let params = {
        name: self.recordTemplateName,
        scope: Number(self.recordTemplateScope)
      };
      let recordData = this.recordData;
      recordData.recordList.forEach(key => {
        if (key === 'examination') {
          params[key] = JSON.stringify(recordData[key])
        } else if (key === 'diagnosis') {
          params[key] = self.diagnosis
        } else {
          params[key] = recordData[key]
        }
      })

      Object.assign(params, {
        chief_complaint: recordData.chief_complaint,
        present_illness: recordData.present_illness,
        diagnosis_xy: self.diagnosis_xy,
        treat_advice: recordData.treat_advice,
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
    width: 34rem;
    height: auto;
    background: #fff;
    padding: 1.5rem 6.25rem 2rem;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  .alert-title {
    text-align: center;
    font-weight: 900;
    font-size: 1rem;
    color: #5f95da;
  }

  .saveBtn {
    font-size: 0.875rem;
    color: #ffffff;
    font-weight: bold;
    width: 7.5rem;
    text-align: center;
    padding: 0.375rem 0;
    background: #5096e0;
    border-radius: 6.25rem;
    border: none;
  }

  .cancelBtn {
    background: #ffffff;
    border: 0.0625rem solid #5096e0;
    color: #5096e0;
  }

  .align-item {
    align-items: center;
  }
</style>
