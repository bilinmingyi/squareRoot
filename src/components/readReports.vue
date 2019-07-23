<template>
  <div class="prescription_tab_bg">
    <div class="prescription_tab">
      <div class="alert-title mb20">添加检查报告</div>
      <section>
        <div class="displayFlex align-item mb20">
          <span class="input_label pr16">机构名称</span>
          <Input class="flexOne" disabled v-model="organization"/>
        </div>
        <div class="displayFlex align-item mb20">
          <span class="input_label pr16">项目名称</span>
          <Input class="flexOne" disabled v-model="project"/>
        </div>
        <div class="displayFlex">
          <span class="input_label pr16">上传图片</span>
          <div class="displayFlex flexOne">
            <div class="img-block">
              <img :src="img_url">
            </div>
            <div class="btn-block">
              <button class="upload-btn print-btn" @click="print">打印</button>
            </div>
          </div>
        </div>
      </section>
      <section id="print" style="display: none">
        <div style="width: 100%;height: 100%">
          <img :src="img_url" style="width: 100%">
        </div>
      </section>
      <div class="tc mt30">
        <button class="saveBtn cancelBtn" @click.stop="cancel(0)">取消</button>
      </div>
    </div>
    <f-loader v-if="showLoading"></f-loader>
  </div>
</template>

<script>
import {Input} from 'iview'
import {readReposts} from "@/fetch/api.js";
import fLoader from '@/components/fLoader.vue'
import {mapState, mapActions} from "vuex";

export default {
  name: "readReports",
  props: ['report'],
  data() {
    return {
      img_url: '',
      report_id: '',
      organization: '',
      project: '',
      showLoading: false,
    }
  },
  components: {
    Input,
    fLoader
  },
  computed: {
    ...mapState({
      'patientData': state => state.patientData,
    })
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      readReposts({
        'id': this.report.check_report_id
      }).then(res => {
        if (res.code === 1000) {
          this.img_url = res.data.report_url
          this.organization = res.data.organ_name
          this.project = res.data.name
        } else {
          this.$Message.info(res.msg)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    cancel(canSave) {
      this.$emit('close', canSave)
    },
    print() {
      var el = document.getElementById('print');
      var iframe = document.createElement("IFRAME");
      var doc = null;
      iframe.setAttribute(
        "style",
        "position:absolute;width:0px;height:0px;left:-500px;top:-500px;"
      );
      document.body.appendChild(iframe);
      doc = iframe.contentWindow.document;
      doc.write("<LINK rel='stylesheet' type='text/css'>");
      doc.write("<div>" + el.innerHTML + "</div>");
      doc.close();
      setTimeout(() => {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
        if (navigator.userAgent.indexOf("MSIE") > 0) {
          document.body.removeChild(iframe);
        }
      }, 500)

    }
  }
}
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
    width: 700px;
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

  .img-block {
    width: 280px;
    height: 160px;
    background: rgba(249, 249, 249, 1);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .img-block img {
    max-width: 17.5rem;
    max-height: 10rem;
  }

  .btn-block {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .upload-btn {
    background: rgba(80, 150, 224, 1);
    border-radius: 4px;
    width: 100px;
    text-align: center;
    font-size: 14px;
    color: #fff;
    border: none;
    height: 40px;
    line-height: 40px;
    position: relative;
    overflow: hidden;
  }

  .file-input {
    position: absolute;
    top: 0;
    left: -0.25rem;
    height: 2.5rem;
    opacity: 0;
  }

  .print-btn {
    background: #4DBC89;
  }
</style>
