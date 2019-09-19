<template>
  <div id="print" style="display: none;">
    <div v-if="clinic.id!=30">
      <section style="color: #000000;">
        <section style=" width: 100%;height: 70px;position: relative;">
          <div style="width: 100%;height: 35px;text-align: center;line-height: 35px;font-weight: bold;font-size: 20px;">
            {{clinicName}}
          </div>
          <div style="width: 100%;height: 24px;text-align: center;line-height: 24px;font-weight: bold;font-size: 16px;">
            <span v-show="recipeType==1">中药处方笺</span>
            <span v-show="recipeType==2">中成药西药笺</span>
            <span v-show="recipeType==3">{{clinicType == 6 ? '营养' : '产品'}}处方笺</span>
            <span v-show="recipeType==4">项目处方笺</span>
            <span v-show="recipeType==6">材料处方笺</span>
          </div>
        </section>
        <div style="font-size: 12px;font-weight: normal;">医疗证/医保卡号：
          {{ybCardNo}}
        </div>
        <section style="border-bottom: #000000 solid 2px;border-top: #000000 solid 2px;padding: 10px 0px;font-size: 12px;">
          <div style="width: 100%;height: auto;margin-bottom: 5px; display: flex;">
            <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;align-items:center;">
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
              <span style="font-weight: bolder">{{clinicType==6?'咨询':'病历'}}号：</span>
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
              <span style="font-weight: bolder">住址：</span>
              {{patientData.province_name}}{{patientData.city_name}}{{patientData.county_name}}{{patientData.address}}
            </div>
          </div>
          <div style="width: 100%;height: auto;margin-bottom: 5px; display: flex;">
            <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">
              <span style="font-weight: bolder">临床诊断：</span>
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
              <div style="float: left;width: 33.3%;line-height: 24px;" v-for="(itemOne,index) in (currRecipeData.data.items||[])" :key="index">
                <span style="margin-right: 8px;">{{itemOne.name}}{{category==2 ? '颗粒' : ''}}</span>
                <span>{{itemOne.num}}</span>
                <span style="margin-right: 8px;">{{itemOne.unit_stock||itemOne.unit}}</span>
                <span>{{itemOne.usage}}</span>
              </div>
            </div>
            <div style="clear: both;"></div>

          </div>
          <div v-show="recipeType==2">
            <div style="width: 100%;height: auto;margin-bottom: 5px;">
              <div style="line-height: 24px;display: flex;" v-for="(itemOne,index) in (currRecipeData.data.items||[])" :key="index">
                <div style="margin-right: 8px;">{{index+1}}、</div>
                <div style="flex: 1;-webkit-flex: 1">
                  <div>
                    <span style="margin-right: 15px;">{{itemOne.name}}</span>
                    <span style="margin-right: 15px;">
                      {{itemOne.spec}}
                    </span>
                    <span style="margin-right: 15px;">{{itemOne.num}}{{itemOne.unit}}</span>
                  </div>
                  <div style="margin-left: 15px">
                    用法:
                    <span style="margin-right: 8px;" v-if="itemOne.dose_once!=''">{{itemOne.dose_once}}</span>
                    <span style="margin-right: 8px;" v-if="itemOne.usage!=''">{{itemOne.usage}}</span>
                    <span style="margin-right: 8px;">{{itemOne.frequency}}</span>
                    <span v-if="itemOne.days!=0">{{itemOne.days}}天</span>
                  </div>
                </div>
              </div>
            </div>
            <div style="clear: both;"></div>
          </div>
          <!--        这里未绑定正确的产品处方笺-->
          <div v-show="recipeType==3">
            <div style="width: 100%;height: auto;margin-bottom: 5px;">
              <div style="line-height: 24px;" v-for="(itemOne,index) in (currRecipeData.data.items||[])" :key="index">
                <span style="margin-right: 8px;">{{index+1}}、</span>
                <span style="margin-right: 30px;">{{itemOne.name}}</span>
                <span style="margin-right: 8px;">
                  {{itemOne.spec}}
                </span>
                <span style="margin-right: 8px;">{{itemOne.num}}{{itemOne.unit}}</span>
                <span>{{itemOne.remark}}</span>
              </div>
            </div>
            <div style="clear: both;"></div>
          </div>
          <div v-show="recipeType==4">
            <div style="width: 100%;height: auto;margin-bottom: 15px;">
              <div style="width: 100%;height: auto;margin-bottom: 5px; display: flex;" v-for="(itemOne,index) in (currRecipeData.data.items||[])" :key="index">
                <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">
                  <span style="margin-right: 8px;">{{index+1}}、</span>
                  <span style="margin-right: 30px;">{{itemOne.name}}</span>
                  <span style="padding-right: 30px;">{{itemOne.price}}元/次</span>
                  <span>{{itemOne.num}}次</span>
                </div>
              </div>
            </div>
          </div>
          <div v-show="recipeType==6">
            <div style="width: 100%;height: auto;margin-bottom: 15px;">
              <div style="width: 100%;height: auto;margin-bottom: 5px; display: flex;" v-for="(itemOne,index) in (currRecipeData.data.items||[])" :key="index">
                <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">
                  <span style="margin-right: 8px;">{{index+1}}、</span>
                  <span style="margin-right: 30px;">{{itemOne.name}}</span>
                  <span style="padding-right: 30px;">{{itemOne.num}}{{itemOne.unit}}</span>
                  <span>{{itemOne.remark}}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section style="border-bottom: #000000 solid 2px;color: #000000;font-size: 12px;padding-bottom: 10px;padding-top: 10px;">
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
        <section style="font-size: 12px;padding: 10px 0px;flex-direction: row;-webkit-flex-direction: row;"
          v-show="recipeType==1 || recipeType==2 || recipeType==3 || recipeType==6">
          <div style="width: 100%;height: auto;margin-bottom: 5px; display: flex;">
            <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">
              <span style="font-weight: bolder">审核：</span>
            </div>
            <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">
              <span style="font-weight: bolder">调配：</span>
            </div>
            <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">
              <span style="font-weight: bolder">{{clinicType==6?'营养师':'医师'}}：</span>
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
        <section style="font-size: 12px;padding: 10px 0px;flex-direction: row;-webkit-flex-direction: row;" v-show="recipeType==4">
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

        <section style="font-size: 12px;flex-direction: row;-webkit-flex-direction: row" v-show="recipeType==1">
          <div style=" display: flex;display: -webkit-flex;width: 100%;">
            <span style="display: flex;display: -webkit-flex;">注：</span>
            <span style="flex: 5;-webkit-flex: 5">1、本处方当日有效
              <br>2、取药时请当面核对药品名称、规格、数量
              <br>3、延长处方用量时间原因：慢性病、老年病、外地、其他
            </span>
          </div>
        </section>
      </section>
    </div>
    <div v-else style="position:relative;height:100%;">
      <section>
        <div style="width: 100%;height: 35px;text-align: center;line-height: 35px;font-weight: bold;font-size: 20px;">{{clinicName}}</div>
        <div style="width: 100%;height: 24px;text-align: center;line-height: 24px;font-weight: bold;font-size: 16px;">
          <span v-show="recipeType==1">处方笺</span>
          <span v-show="recipeType==2">处方笺</span>
          <span v-show="recipeType==3">{{clinicType == 6 ? '营养处方笺' : '处方笺'}}</span>
          <span v-if="recipeType==4">
            申请单
          </span>
          <span v-show="recipeType==6">处方笺</span>
        </div>
      </section>
      <section style="border-top: #000000 solid 1px;font-size: 12px;">
        <div
          style="width: 100%;height: auto;margin-bottom: 5px; display: flex; border-bottom: #000000 solid 1px;display:flex;justify-content:space-between;align-items:flex-end;padding-right:10px;padding-bottom:5px;">
          <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1; display: flex;align-items:center;"><span>费别：</span>
            <div v-if="isYB==0">
              <div style="display: flex;align-items:center;height:20px; "><input type="checkbox" checked>自费</div>
              <div style="display: flex;align-items:center;height:20px; "><input type="checkbox" />医保卡 <span style="padding-left:5px;">医保卡号：</span></div>
            </div>
            <div v-else>
              <div style="display: flex;align-items:center;height:20px; "><input type="checkbox">自费</div>
              <div style="display: flex;align-items:center;height:20px; "><input type="checkbox" checked />医保卡 <span
                  style="padding-left:5px;">医保卡号：{{ybCardNo}}</span></div>
            </div>
          </div>
          <div>处方号：{{print_createTime|dateFormat('yyyyMMdd')}}{{prescriptionNum}}</div>
        </div>
        <div style="width: 100%;height: auto;margin-bottom: 5px; display: flex;padding-left:10px;padding-right:10px;justify-content:space-between;">
          <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1; display: flex;align-items:center;"><span>姓名：</span>
            <div style="width:60%;border-bottom:1px solid #000000;">{{patientData.name}}</div>
          </div>
          <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1; display: flex;align-items:center;"><span>性别：</span>
            <div v-for="(item,index) in sexOptions" :key="item.code">
              <label style="display: flex;align-items:center;height:20px;" v-if="item.code==patientData.sex"><input type="checkbox"
                  checked>{{item.name}}</label>
              <label style="display: flex;align-items:center;height:20px;" v-else><input type="checkbox">{{item.name}}</label>
            </div>
          </div>
          <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;display: flex;align-items:center;"><span>年龄：</span>
            <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;margin-right:10px;border-bottom:1px solid #000000;">{{patientData.age}}岁</div>
          </div>
        </div>
        <div style="width: 100%;height: auto;margin-bottom: 5px; display: flex;padding-left:10px;padding-right:10px;justify-content:space-between;">
          <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1; display: flex;"><span>门诊号：</span>
            <div style="width:65%;border-bottom:1px solid #000000;">{{orderSeqno}}</div>
          </div>
          <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1; ">
            <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;display:flex; ">
              <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1; display: flex;" v-if="recipeType==4"><span>时间：</span>
                <div style="width:65%;border-bottom:1px solid #000000;">{{print_createTime|dateFormat('yyyy-MM-dd hh:mm')}}</div>
              </div>
            </div>
          </div>
          <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;display: flex;"><span>科室：</span>
            <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;margin-right:10px;border-bottom:1px solid #000000;">{{department}}</div>
          </div>
        </div>
        <div style="width: 100%;height: auto;margin-bottom: 5px; display: flex;border-bottom:1px solid #000000;padding-left:10px;padding-bottom:2px;"
          v-if="recipeType!=4">
          过敏史：{{recordData.allergic_history}}</div>
        <div style="width: 100%;height: auto;margin-bottom: 5px; display: flex;border-bottom:1px solid #000000;padding-left:10px;padding-bottom:2px;">
          电话：{{patientData.mobile}}</div>
        <div style="width: 100%;height: auto;margin-bottom: 5px; display: flex;border-bottom:1px solid #000000;padding-left:10px;padding-bottom:2px;">
          临床诊断：{{recordData.diagnosis}}&nbsp;{{recordData.diagnosis_xy}}</div>
      </section>
      <section :style="recipeType!=4?HeightStyle:HeightStyle2" id="content">
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
            <div style="float: left;width: 33.3%;line-height: 24px;" v-for="(itemOne,index) in (currRecipeData.data.items||[])" :key="index">
              <span style="margin-right: 8px;">{{itemOne.name}}{{category==2 ? '颗粒' : ''}}</span>
              <span>{{itemOne.num}}</span>
              <span style="margin-right: 8px;">{{itemOne.unit_stock||itemOne.unit}}</span>
              <span>{{itemOne.usage}}</span>
            </div>
          </div>
          <div style="clear: both;"></div>
        </div>
        <div v-show="recipeType==2">
          <div style="width: 100%;height: auto;margin-bottom: 5px;">
            <div style="line-height: 24px;display: flex;" v-for="(itemOne,index) in (currRecipeData.data.items||[])" :key="index">
              <div style="margin-right: 8px;">{{index+1}}、</div>
              <div style="flex: 1;-webkit-flex: 1">
                <div>
                  <span style="margin-right: 15px;">{{itemOne.name}}</span>
                  <span style="margin-right: 15px;">
                    {{itemOne.spec}}
                  </span>
                  <span style="margin-right: 15px;">{{itemOne.num}}{{itemOne.unit}}</span>
                </div>
                <div style="margin-left: 15px">
                  用法:
                  <span style="margin-right: 8px;" v-if="itemOne.dose_once!=''">{{itemOne.dose_once}}</span>
                  <span style="margin-right: 8px;" v-if="itemOne.usage!=''">{{itemOne.usage}}</span>
                  <span style="margin-right: 8px;">{{itemOne.frequency}}</span>
                  <span v-if="itemOne.days!=0">{{itemOne.days}}天</span>
                </div>
              </div>
            </div>
          </div>
          <div style="clear: both;"></div>
        </div>
        <!--        这里未绑定正确的产品处方笺-->
        <div v-show="recipeType==3">
          <div style="width: 100%;height: auto;margin-bottom: 5px;">
            <div style="line-height: 24px;" v-for="(itemOne,index) in (currRecipeData.data.items||[])" :key="index">
              <span style="margin-right: 8px;">{{index+1}}、</span>
              <span style="margin-right: 30px;">{{itemOne.name}}</span>
              <span style="margin-right: 8px;">
                {{itemOne.spec}}
              </span>
              <span style="margin-right: 8px;">{{itemOne.num}}{{itemOne.unit}}</span>
              <span>{{itemOne.remark}}</span>
            </div>
          </div>
          <div style="clear: both;"></div>
        </div>
        <div v-show="recipeType==4">
          <div style="width: 100%;height: auto;margin-bottom:  5px;">
            <div style="width: 100%;height: auto;margin-bottom: 5px; display: flex;" v-for="(itemOne,index) in (currRecipeData.data.items||[])" :key="index">
              <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">
                <span style="margin-right: 8px;">{{index+1}}、</span>
                <span style="margin-right: 30px;">{{itemOne.name}}</span>
                <span style="padding-right: 30px;">{{itemOne.price}}元/次</span>
                <span>{{itemOne.num}}次</span>
              </div>
            </div>
          </div>
        </div>
        <div v-show="recipeType==6">
          <div style="width: 100%;height: auto;margin-bottom: 5px;">
            <div style="width: 100%;height: auto;margin-bottom: 5px; display: flex;" v-for="(itemOne,index) in (currRecipeData.data.items||[])" :key="index">
              <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">
                <span style="margin-right: 8px;">{{index+1}}、</span>
                <span style="margin-right: 30px;">{{itemOne.name}}</span>
                <span style="padding-right: 30px;">{{itemOne.num}}{{itemOne.unit}}</span>
                <span>{{itemOne.remark}}</span>
              </div>
            </div>
          </div>
        </div>
        <section style="color: #000000;font-size: 12px;position:absolute;bottom:0;width:100%;">
          <div v-show="recipeType==1">
            <div style="width: 100%;height: auto; display: flex;">
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
              <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">
                <span style="font-weight: bolder">每次用量：</span>
                {{currRecipeData.data.eachDose}}
              </div>
            </div>

            <div style="clear: both;"></div>
          </div>

        </section>
        <div style="width:100%;text-align:center;margin-top:10px;padding-bottom:20px;">(以下空白)</div>
      </section>
      <div :style="bottomStyle" id="bottomContent" v-if="recipeType!=4">
        <section style="border-bottom:1px solid #000000;font-size: 12px;flex-direction: row;-webkit-flex-direction: row;">
          <div style="font-size: 12px;padding-bottom:5px;;" v-show="recipeType!=4">若药品已取则无法退费</div>
          <div style="width: 100%;height: auto;margin-bottom: 5px; display: flex; border-top:1px solid #000000;padding-top:5px;">
            <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;display:flex;">
              <div style="text-align:justify;text-align-last: justify;width:48px;text-justify:inter-ideograph;">医生</div>:<div
                style="flex: 1;-webkit-flex: 1;-ms-flex: 1;border-bottom:1px solid #000000;padding-left:5px;">{{doctorName}}</div>
            </div>
            <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;display:flex;">
              <div style="text-align:justify;text-align-last: justify;width:48px;margin-left:5px;text-justify:inter-ideograph;">药品金额</div>:<div
                style="padding-left:5px;flex: 1;-webkit-flex: 1;-ms-flex: 1;border-bottom:1px solid #000000;">{{currRecipeData.money}}元</div>
            </div>
            <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;display:flex;">
              <div style="padding-left:5px;">收费章</div>:<div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;border-bottom:1px solid #000000;"></div>
            </div>
          </div>
          <div style="width: 100%;height: auto;margin-bottom: 5px; display: flex;margin-top:10px;">
            <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;display:flex;">
              <div>审核药师</div>:<div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;border-bottom:1px solid #000000;"></div>
            </div>
            <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;display:flex;">
              <div style="margin-left:5px;">调配药师/士</div>:<div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;border-bottom:1px solid #000000;"></div>
            </div>
            <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;display:flex;">
              <div style="padding-left:5px;">核对、发药药师</div>:<div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;border-bottom:1px solid #000000;"></div>
            </div>
          </div>
          <div style="width: 100%;height: auto;margin-bottom: 5px; display: flex;padding-right:10px;justify-content:space-between;">
            <div style="flex: 2;-webkit-flex: 2;-ms-flex: 2; display: flex;"><span>打印时间：</span>{{Date.now()|dateFormat('yyyy-MM-dd hh:mm') }}</div>
            <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;"><span>处方当日有效</span></div>
          </div>
        </section>
        <div style="text-align:center;width:100%;">
          <span style="font-size:12px;padding-top:5px;padding-right:5px;">地址：
            {{(clinic.city_name ? clinic.city_name + '市' : '') +
                (clinic.county_name ? clinic.county_name + '区' : '') +
                clinic.address}}</span>
          <span style="font-size:12px;padding-top:5px;" v-if="clinic.customer_phone">服务热线：{{clinic.customer_phone}}</span>
        </div>
      </div>
      <div :style="bottomStyle" id="bottomContent" v-else>
        <section style="border-bottom:1px solid #000000;font-size: 12px;flex-direction: row;-webkit-flex-direction: row;height:105px;">

          <div style="width: 100%;height: auto;margin-bottom: 5px; display: flex; border-top:1px solid #000000;">

          </div>
          <div style="width: 100%;height: auto;margin-bottom: 5px; display: flex;margin-top:10px;">
            <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;display:flex;">
              <div>申请医生</div>:<div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;border-bottom:1px solid #000000;"><span
                  style="padding-left:15px;">{{doctorName}}</span></div>
            </div>
            <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;display:flex;">
              <div style="margin-left:5px;">医生签名</div>:<div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;border-bottom:1px solid #000000;"></div>
            </div>
            <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;display:flex;">
              <div style="width:48px;margin-left:5px;padding-left:5px;text-align:right;">金额</div>:<div
                style="flex: 1;-webkit-flex: 1;-ms-flex: 1;border-bottom:1px solid #000000;"><span style="padding-left:15px;">{{currRecipeData.money}}元</span>
              </div>
            </div>
          </div>

        </section>
        <div style="text-align:center;width:100%;">
          <span style="font-size:12px;padding-top:5px;padding-right:5px;">地址：
            {{(clinic.city_name ? clinic.city_name + '市' : '') +
                (clinic.county_name ? clinic.county_name + '区' : '') +
                clinic.address}}</span>
          <span style="font-size:12px;padding-top:5px;" v-if="clinic.customer_phone">服务热线：{{clinic.customer_phone}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import { clinicName } from '@/assets/js/mapType.js'

export default {
  name: "printPrescription",
  data() {
    return {
      clinicName: clinicName,
      sexOptions: [
        { code: 1, name: '男' },
        { code: 2, name: '女' }
      ],
      clinicAddress: '',
      customerPhone: '',
      HeightStyle: {
        fontSize: '12px',
        minHeight: '370px',
        position: 'relative',
        bottom: '0'
      },
      HeightStyle2: {
        fontSize: '12px',
        minHeight: '385px',
        position: 'relative',
        bottom: '0'
      },
      bottomStyle: {
        position: 'absolute',
        bottom: '2px',
        left: '0px',
        width: '100%'
      }
    }
  },

  computed: {
    ...mapGetters(["currRecipeData"]),
    ...mapState(["patientData", "recordData", "printPre", 'orderSeqno', 'doctorName', "isYB", "department", "ybCardNo", 'clinicType', 'clinic', 'print_createTime']),
    recipeType: function () {
      return this.currRecipeData === undefined ? 0 : this.currRecipeData.type;
    },
    category: function () {
      return this.currRecipeData === undefined
        ? 1
        : this.currRecipeData.data.category;
    },
    getCurrDate: function () {
      var d = new Date();
      return d.getFullYear() + "-" + (d.getMonth() + 1) + '-' + d.getDate();
    },
    prescriptionNum: function () {
      var tempNum = this.orderSeqno.slice(-6)
      return tempNum.length < 7 ? ('000000' + tempNum).slice(-6) : tempNum
    }
  },
  watch: {
    printPre: function () {
      this.printPrescription();
    }
  },
  methods: {
    printPrescription: function () {
      var self = this
      setTimeout(function () {
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
        if (self.clinic.id == 30) {
          //兼容底部的问题
          iframe.contentWindow.document.getElementById(
            'bottomContent'
          ).style.position =
            iframe.contentWindow.document.getElementById('content')
              .offsetHeight > 362
              ? 'static'
              : 'absolute'
        }
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
