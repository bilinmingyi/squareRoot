<template>
  <div id="print" style="display: none;">
    <section style="color: #000000;">
      <section style=" width: 100%;height: 70px;position: relative;">
        <div
          style="width: 100%;height: 35px;text-align: center;line-height: 35px;font-weight: bold;font-size: 20px;"
        >
          {{clinicName}}
        </div>
        <div
          style="width: 100%;height: 24px;text-align: center;line-height: 24px;font-weight: bold;font-size: 16px;"
        >
          <span v-show="recipeType==1">中药处方笺</span>
          <span v-show="recipeType==2">中成药西药笺</span>
          <span v-show="recipeType==4">项目处方笺</span>
          <span v-show="recipeType==6">材料处方笺</span>
        </div>
      </section>
      <div style="font-size: 12px;font-weight: normal;">医疗证/医保卡号：
        {{ybCardNo}}
      </div>
      <section
        style="border-bottom: #000000 solid 2px;border-top: #000000 solid 2px;padding: 10px 0px;font-size: 12px;"
      >
        <div style="width: 100%;height: auto;margin-bottom: 5px; display: flex;">
          <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">
            <span style="font-weight: bolder">姓名：</span>
            {{patientData.name}}
          </div>
          <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">
            <span style="font-weight: bolder">性别：</span>
            <span v-show="patientData.sex==0">保密</span>
            <span v-show="patientData.sex==1">男</span>
            <span v-show="patientData.sex==2">女</span>
          </div>
          <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">
            <span style="font-weight: bolder">年龄：</span>
            {{patientData.age}}
          </div>
          <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">
            <span style="font-weight: bolder">费别：</span>
            {{isYB==0?'自费':'医保'}}
          </div>
        </div>
        <div style="width: 100%;height: auto;margin-bottom: 5px; display: flex;">
          <div style="flex: 3;-webkit-flex: 3;-ms-flex: 3;">
            <span style="font-weight: bolder">病历号：</span>
            {{orderSeqno}}
          </div>
          <div style="flex: 2;-webkit-flex: 2;-ms-flex: 2;">
            <span style="font-weight: bolder">电话：</span>
            {{patientData.mobile}}
          </div>
          <div style="flex: 2;-webkit-flex: 2;-ms-flex: 2;">
            <span style="font-weight: bolder">科室：{{department}}</span>
          </div>
        </div>
        <div style="width: 100%;height: auto;margin-bottom: 5px; display: flex;">
          <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">
            <span
              style="font-weight: bolder"
            >住址：</span>
            {{patientData.province_name}}{{patientData.city_name}}{{patientData.county_name}}{{patientData.address}}
          </div>
        </div>
        <div style="width: 100%;height: auto;margin-bottom: 5px; display: flex;">
          <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">
            <span style="font-weight: bolder">临床诊断及症型：</span>
            <span>{{recordData.diagnosis}}&nbsp;{{recordData.diagnosis_xy}}</span>
          </div>
          <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">
            <span style="font-weight: bolder">开具日期：</span>
            {{getCurrDate}}
          </div>
        </div>
      </section>
      <section style="padding: 10px 0px;font-size: 12px;min-height: 250px;">
        <div style=" font-size: 18px;font-weight:bolder;">
          <span v-show="recipeType==1 || recipeType==2">Rp：</span>
          <i style="font-weight: normal;font-size: 12px;" v-show="recipeType==1">
            (药材规格：
            <span v-if="category==1">饮片</span>
            <span v-if="category==2">颗粒</span>
            )
          </i>
        </div>
        <div v-show="recipeType==1" style="position:relative;">
          <div style="width: 100%;height: auto;margin-bottom: 5px;">
            <div
              style="float: left;width: 33.3%;line-height: 24px;"
              v-for="(itemOne,index) in (currRecipeData.data.items||[])"
              :key="index"
            >
              <span style="margin-right: 8px;">{{itemOne.name}}</span>
              <span>{{itemOne.num}}</span>
              <span style="margin-right: 8px;">{{itemOne.unit_stock||itemOne.unit}}</span>
              <span>{{itemOne.usage}}</span>
            </div>
          </div>
          <div style="clear: both;"></div>
        </div>
        <div v-show="recipeType==2">
          <div style="width: 100%;height: auto;margin-bottom: 5px;">
            <div
              style="line-height: 24px;"
              v-for="(itemOne,index) in (currRecipeData.data.items||[])"
              :key="index"
            >
              <span style="margin-right: 30px;">{{itemOne.name}}</span>
              <span style="margin-right: 8px;">{{itemOne.spec}}</span>
              <span style="margin-right: 8px;">{{itemOne.num}}{{itemOne.unit}}</span>
              <span style="margin-right: 8px;" v-if="itemOne.usage!=''">用法：{{itemOne.usage}}</span>
              <span style="margin-right: 8px;">{{itemOne.frequency}}</span>
              <span style="margin-right: 8px;" v-if="itemOne.days!=0">{{itemOne.days}}天</span>
              <span v-if="itemOne.dose_once!=''">每次：{{itemOne.dose_once}}{{itemOne.unit_dose}}</span>
            </div>
          </div>
          <div style="clear: both;"></div>
        </div>
        <div v-show="recipeType==4">
          <div style="width: 100%;height: auto;margin-bottom: 15px;">
            <div
              style="width: 100%;height: auto;margin-bottom: 5px; display: flex;"
              v-for="(itemOne,index) in (currRecipeData.data.items||[])"
              :key="index"
            >
              <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">
                <span style="margin-right: 30px;">{{itemOne.name}}</span>
                <span style="padding-right: 30px;">{{itemOne.price}}元/次</span>
                <span>{{itemOne.num}}次</span>
              </div>
            </div>
          </div>
        </div>
        <div v-show="recipeType==6">
          <div style="width: 100%;height: auto;margin-bottom: 15px;">
            <div
              style="width: 100%;height: auto;margin-bottom: 5px; display: flex;"
              v-for="(itemOne,index) in (currRecipeData.data.items||[])"
              :key="index"
            >
              <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">
                <span style="margin-right: 30px;">{{itemOne.name}}</span>
                <span style="padding-right: 30px;">{{itemOne.num}}{{itemOne.unit}}</span>
                <span>{{itemOne.remark}}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        style="border-bottom: #000000 solid 2px;color: #000000;font-size: 12px;padding-bottom: 10px;padding-top: 10px;"
      >
        <div v-show="recipeType==1">
          <div style="width: 100%;height: auto;margin-bottom: 5px; display: flex;">
            <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">
              <span style="font-weight: bolder">总剂数：</span>
              {{currRecipeData.data.dosage}}
            </div>
            <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">
              <span style="font-weight: bolder">频次：</span>
              {{currRecipeData.data.frequency}}
            </div>
            <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">
              <span style="font-weight: bolder">用法：</span>
              {{currRecipeData.data.usage}}
            </div>
          </div>
          <div style="width: 100%;height: auto;margin-bottom: 5px; display: flex;">
            <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">
              <span style="font-weight: bolder">附加项目：</span>
              {{currRecipeData.data.extra_feetype}}
            </div>
            <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">
              <span style="font-weight: bolder">项目数量：</span>
              {{currRecipeData.data.extra_num}}
            </div>
            <!-- <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">
                                                        <span style="font-weight: bolder">附加费用：</span>
                                                        {{printData.extra_price}}
            </div>-->
            <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">
              <span style="font-weight: bolder">每次用量：</span>
              {{currRecipeData.data.eachDose}}
            </div>
          </div>
          <div style="clear: both;"></div>
        </div>
        <div style=" font-size: 12px;">
          <span style="font-weight:bolder;">医嘱：</span>
          {{currRecipeData.data.doctor_remark}}
        </div>
      </section>
      <section
        style="font-size: 12px;padding: 10px 0px;flex-direction: row;-webkit-flex-direction: row;"
        v-show="recipeType==1 || recipeType==2 || recipeType==6"
      >
        <div style="width: 100%;height: auto;margin-bottom: 5px; display: flex;">
          <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">
            <span style="font-weight: bolder">审核：</span>
          </div>
          <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">
            <span style="font-weight: bolder">调配：</span>
          </div>
          <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">
            <span style="font-weight: bolder">医师：</span>
            {{doctorName}}
            <!--<span>${controllers.AuthController.userName}</span>-->
          </div>
        </div>
        <div style="width: 100%;height: auto;margin-bottom: 5px; display: flex;">
          <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">
            <span style="font-weight: bolder">核对：</span>
          </div>
          <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">
            <span style="font-weight: bolder">发药：</span>
          </div>
          <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;"></div>
        </div>
        <div style="width: 100%;height: auto;margin-bottom: 5px; display: flex;">
          <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">
            <span style="font-weight: bolder">处方总金额（元）：{{currRecipeData.money}}</span>
          </div>
        </div>
      </section>
      <section
        style="font-size: 12px;padding: 10px 0px;flex-direction: row;-webkit-flex-direction: row;"
        v-show="recipeType==4"
      >
        <div style="width: 100%;height: auto;margin-bottom: 5px; display: flex;">
          <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">
            <span style="font-weight: bolder">总金额（元）：{{currRecipeData.money}}</span>
          </div>
          <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">
            <span style="font-weight: bolder">医生：</span>
            {{doctorName}}
            <!--<span>${controllers.AuthController.userName}</span>-->
          </div>
          <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">
            <span style="font-weight: bolder">执行人：--</span>
          </div>
        </div>
      </section>

      <section
        style="font-size: 12px;flex-direction: row;-webkit-flex-direction: row"
        v-show="recipeType==1"
      >
        <div style=" display: flex;display: -webkit-flex;width: 100%;">
          <span style="display: flex;display: -webkit-flex;">注：</span>
          <span style="flex: 5;-webkit-flex: 5">1、本处方当日有效
            <br>2、取药时请当面核对药品名称、规格、数量
            <br>3、延长处方用量时间原因：慢性病、老年病、外地、其他
          </span>
          <span style="flex: 5;-webkit-flex: 5" v-show="recipeType==4">1、取药时请当面核对药品名称、规格、数量
            <br>2、延长处方用量时间原因：慢性病、老年病、外地、其他
          </span>
        </div>
      </section>
    </section>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import {clinicName} from '@/assets/js/mapType.js'
export default {
  name: "printPrescription",
  data(){
    return {
      clinicName: clinicName,
    }
  },
  computed: {
    ...mapGetters(["currRecipeData"]),
    ...mapState(["patientData", "recordData","printPre", 'orderSeqno', 'doctorName', "isYB", "department", "ybCardNo"]),
    recipeType: function() {
      return this.currRecipeData === undefined ? 0 : this.currRecipeData.type;
    },
    category: function() {
      return this.currRecipeData === undefined
        ? 1
        : this.currRecipeData.data.category;
    },
    getCurrDate: function() {
      var d = new Date();
      return d.getFullYear() + "-" + (d.getMonth() + 1)+'-' + d.getDate();
    }
  },
  watch:{
      printPre: function(){
          this.printPrescription();
      }
  },
  methods: {
    printPrescription: function() {
      setTimeout(function() {
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
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
        if (navigator.userAgent.indexOf("MSIE") > 0) {
          document.body.removeChild(iframe);
        }
      }, 30);
    }
  }
};
</script>

<style scoped>
</style>
