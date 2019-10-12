<template>
  <div id="print" style="display: none;">
    <!-- <div v-if="clinic.id==30">
      <section style="color: #000000;">
        <section style=" width: 100%;height: 70px;position: relative;">
          <div style="width: 100%;height: 35px;text-align: center;line-height: 35px;font-weight: bold;font-size: 20px;">
            {{clinicName}}
          </div>
          <div style="width: 100%;height: 24px;text-align: center;line-height: 24px;font-weight: bold;font-size: 16px;">
            <span v-show="recipeType==1">中药处方笺</span>
            <span v-show="recipeType==2">中成药西药笺</span>
            <span v-show="recipeType==3">{{clinicType == 6 ? '营养' : '产品'}}处方笺</span>
            <span v-show="recipeType==4">{{therapyType|therapyType}}处方笺</span>
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
            <div style="width: 100%;height: auto;margin-bottom: 15px;" v-if="printIndex==null">
              <div style="width: 100%;" v-for="(itemOne,index) in (currRecipeData.data.items||[])" :key="index">
                <div style="height: auto;margin-bottom: 5px;" v-if="printIndex == null || printIndex == index">
                  <span style="margin-right: 8px;">{{printIndex == null ? (index+1) : 1}}、</span>
                  <span style="margin-right: 20px;">{{itemOne.name}}</span>
                  <span style="margin-right: 20px;" v-if="itemOne.type==2&&therapyType==2&&itemOne.sample">标本：{{itemOne.sample}}</span>
                  <span style="margin-right: 20px;" v-if="itemOne.type==3&&itemOne.position&&therapyType==3">部位：{{itemOne.position}}</span>
                  <span style="margin-right: 20px;" v-if="therapyType==1">{{itemOne.num}}次</span>
                  <span v-if="itemOne.remark">备注：{{itemOne.remark}}</span>
                </div>
              </div>
            </div>
            <div style="width: 100%;height: auto;margin-bottom:  5px;" v-else>
              <div v-if="currRecipeData.data.items[printIndex].type==1">
                <div style="font-weight:600;">
                  项目名称:
                </div>
                <div style="minHeight:60px;text-indent: 2em;padding-top:5px;">
                  {{currRecipeData.data.items[printIndex].name}}
                  <span class="margin-left:20px;">{{currRecipeData.data.items[printIndex].num}}次</span>
                </div>

                <div style="minHeight:40px;text-indent: 2em;padding-top:10px;">
                  {{currRecipeData.data.items[printIndex].sample}}
                </div>
                <div style="font-weight:600;">
                  备注:
                </div>
                <div style="minHeight:40px;text-indent: 2em;padding-top:10px;">
                  {{currRecipeData.data.items[printIndex].remark}}
                </div>
              </div>
              <div v-if="currRecipeData.data.items[printIndex].type==3">
                <div style="font-weight:600;">
                  项目名称:
                </div>
                <div style="minHeight:60px;text-indent: 2em;padding-top:5px;">
                  {{currRecipeData.data.items[printIndex].name}}
                </div>
                <div style="font-weight:600;">
                  检查目的及要求:
                </div>
                <div style="minHeight:80px;text-indent: 2em;padding-top:5px;">
                  {{currRecipeData.data.items[printIndex].remark}}
                </div>
                <div style="font-weight:600;">
                  检查部位:
                </div>
                <div style="minHeight:80px;text-indent:2em;width:100%;word-break:break-all;padding-top:5px;">
                  {{currRecipeData.data.items[printIndex].position}}
                </div>
                <div style="font-weight:600;">
                  备注:
                </div>
                <div style="minHeight:40px;text-indent: 2em;">

                </div>
              </div>
              <div v-if="currRecipeData.data.items[printIndex].type==2">
                <div style="font-weight:600;">
                  项目名称:
                </div>
                <div style="minHeight:60px;text-indent: 2em;padding-top:10px;">
                  {{currRecipeData.data.items[printIndex].name}}
                </div>
                <div style="font-weight:600;" v-if="currRecipeData.data.items[printIndex].sample">
                  标本:
                </div>
                <div style="minHeight:40px;text-indent: 2em;padding-top:10px;">
                  {{currRecipeData.data.items[printIndex].sample}}
                </div>
                <div style="font-weight:600;">
                  备注:
                </div>
                <div style="minHeight:40px;text-indent: 2em;padding-top:10px;">
                  {{currRecipeData.data.items[printIndex].remark}}
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
              <span style="font-weight: bolder">处方总金额（元）：{{currRecipeData.money}}元</span>
            </div>
          </div>
        </section>
        <section style="font-size: 12px;padding: 10px 0px;flex-direction: row;-webkit-flex-direction: row;" v-show="recipeType==4">
          <div style="width: 100%;height: auto;margin-bottom: 5px; display: flex;">
            <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">
              <span
                style="font-weight: bolder">总金额（元）：{{printIndex == null ? currRecipeData.money : currRecipeData.data.items[printIndex].num*currRecipeData.data.items[printIndex].price}}元</span>
            </div>
            <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">
              <span style="font-weight: bolder">医生：</span>
              {{doctorName}}
  
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
    </div> -->
    <!-- <div v-else style="position:relative;height:100%;">
      <section>
        <div style="width: 100%;height: 35px;text-align: center;line-height: 35px;font-weight: bold;font-size: 20px;">{{clinicName}}</div>
        <div style="width: 100%;height: 24px;text-align: center;line-height: 24px;font-weight: bold;font-size: 16px;">
          <span v-show="recipeType==1">处方笺</span>
          <span v-show="recipeType==2">处方笺</span>
          <span v-show="recipeType==3">{{clinicType == 6 ? '营养处方笺' : '处方笺'}}</span>
          <span v-if="recipeType==4">
            {{printIndex==null?'申请单': getTreatName(currRecipeData.data.items[printIndex])}}
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
          <div style="width:39%; display: flex;"><span style="width:48px;text-align:left;">姓名：</span>
            <div style="width:65%;border-bottom:1px solid #000000;">{{patientData.name}}</div>
          </div>
          <div style="width:33%; display: flex;align-items:center;"><span>性别：</span>
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
          <div style="width:39%; display: flex;"><span style="width:48px;">门诊号：</span>
            <div style="width:65%;border-bottom:1px solid #000000;">{{orderSeqno}}</div>
          </div>
          <div style="width:33%;">
            <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;display:flex; ">
              <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1; display: flex;"><span>时间：</span>
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
          <div style="width: 100%;height: auto;margin-bottom:  5px;" v-if="printIndex==null">
            <div style="width: 100%;" v-for="(itemOne,index) in (currRecipeData.data.items||[])" :key="index">
              <div style="height: auto;margin-bottom: 5px;" v-if="printIndex == null || printIndex == index">
                <span style="margin-right: 8px;">{{printIndex == null ? (index+1) : '1'}}、</span>
                <span style="margin-right: 20px;">{{itemOne.name}}</span>
                <span style="margin-right: 20px;" v-if="itemOne.type==2&&therapyType==2&&itemOne.sample">标本：{{itemOne.sample}}</span>
                <span style="margin-right: 20px;" v-if="itemOne.type==3&&itemOne.position&&therapyType==3">部位：{{itemOne.position}}</span>
          
                <span style="margin-right: 20px;" v-if="therapyType==1">{{itemOne.num}}次</span>
                <span v-if="itemOne.remark">备注：{{itemOne.remark}}</span>
              </div>
            </div>
          </div>
          <div style="width: 100%;height: auto;margin-bottom:  5px;margin-top:10px;" v-else>
            <div v-if="currRecipeData.data.items[printIndex].type==1">
              <div style="font-weight:600;">
                治疗项目:
              </div>
              <div style="minHeight:60px;text-indent: 2em;padding-top:10px;">
                {{currRecipeData.data.items[printIndex].name}}
                <span class="margin-left:20px;">{{currRecipeData.data.items[printIndex].num}}次</span>
              </div>

              <div style="minHeight:40px;text-indent: 2em;padding-top:10px;">
                {{currRecipeData.data.items[printIndex].sample}}
              </div>
              <div style="font-weight:600;">
                备注:
              </div>
              <div style="minHeight:40px;text-indent: 2em;padding-top:10px;">
                {{currRecipeData.data.items[printIndex].remark}}
              </div>
            </div>
            <div v-if="currRecipeData.data.items[printIndex].type==3">
              <div style="display: flex;minHeight:60px;">
                <div style="font-weight:600;width:48px;">病史：</div>
                <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;">{{recordData.present_illness}}</div>
              </div>
              <div style="font-weight:600;">
                检查目的及要求:
              </div>
              <div style="minHeight:80px;text-indent: 2em; padding-top:5px;">
                {{currRecipeData.data.items[printIndex].remark}}
              </div>
              <div style="font-weight:600;">
                检查部位:
              </div>
              <div style="minHeight:80px;text-indent:2em;width:100%;word-break:break-all;padding-top:5px;">
                {{currRecipeData.data.items[printIndex].name}}({{currRecipeData.data.items[printIndex].position}})
              </div>
              <div style="font-weight:600;">
                备注:
              </div>
              <div style="minHeight:40px;text-indent: 2em;">

              </div>
            </div>
            <div v-if="currRecipeData.data.items[printIndex].type==2">
              <div style="font-weight:600;">
                检验项目:
              </div>
              <div style="minHeight:60px;text-indent: 2em;padding-top:10px;">
                {{currRecipeData.data.items[printIndex].name}}
              </div>
              <div style="font-weight:600;" v-if="currRecipeData.data.items[printIndex].sample">
                标本:
              </div>
              <div style="minHeight:40px;text-indent: 2em;padding-top:10px;">
                {{currRecipeData.data.items[printIndex].sample}}
              </div>
              <div style="font-weight:600;">
                备注:
              </div>
              <div style="minHeight:40px;text-indent: 2em;padding-top:10px;">
                {{currRecipeData.data.items[printIndex].remark}}
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
        <div style="width:100%;text-align:center;margin-top:10px;padding-bottom:20px;">
          {{recipeType != 4 ? '(以下空白)' : ' '}}
          </div>
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
          <div style="width: 100%;height: auto;margin-bottom: 5px; display: flex;margin-top:10px;justify-content:space-between;">
            <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;display:flex;">
              <div>申请医生</div>:<div style="border-bottom:1px solid #000000;width:50%;"><span style="padding-left:15px;">{{doctorName}}</span></div>
            </div>
            <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;display:flex;margin-left:30px;">
              <div style="margin-left:5px;">医生签名</div>:<div style="width:50%;border-bottom:1px solid #000000;"></div>
            </div>
            <div style="flex: 1;-webkit-flex: 1;-ms-flex: 1;display:flex;">
              <div style="width:48px;margin-left:5px;padding-left:5px;text-align:right;">金额</div>:<div style="width:50%;border-bottom:1px solid #000000;"><span
                  style="padding-left:15px;">
                  {{printIndex == null ? currRecipeData.money : (currRecipeData.data.items[printIndex].num*currRecipeData.data.items[printIndex].price).toFixed(2)}}元
                </span>
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
    </div> -->
    <f-loader v-if="showLoading"></f-loader>
  </div>
</template>
<script>
import { mapGetters, mapState, mapActions } from "vuex";
import { clinicName } from '@/assets/js/mapType.js'
import fLoader from '@/components/fLoader.vue'
import axios from 'axios'
import filter from "@/assets/js/filters.js"
import { printRendering } from '@/assets/js/printRendering.js'
import clodopToggle from '@/assets/js/clodop_toggle.js'
export default {
  name: "printPrescription",
  components: {
    fLoader
  },
  data() {
    return {
      showLoading: false,
      clinicName: clinicName,
      sexOptions: [
        { code: 1, name: '男' },
        { code: 2, name: '女' }
      ],
      clinicAddress: '',
      customerPhone: '',
      HeightStyle: {
        fontSize: '12px',
        minHeight: '375px',
        position: 'relative',
        bottom: '0'
      },
      HeightStyle2: {
        fontSize: '12px',
        minHeight: '385px',
        position: 'static',
        bottom: '0'
      },
      bottomStyle: {
        position: 'static',
        bottom: '2px',
        left: '0px',
        width: '100%'
      }
    }
  },
  computed: {
    ...mapGetters(["currRecipeData"]),
    ...mapState(["patientData", "recordData", "printPre", "printIndex", 'orderSeqno', 'doctorName', "isYB", "department", "ybCardNo", 'clinicType', 'clinic', 'print_createTime']),
    recipeType: function () {
      console.log(this.currRecipeData)
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
    },
    therapyType: function () {
      var type = this.currRecipeData === undefined ? 0 : this.currRecipeData.type
      return type == 4 ? this.currRecipeData.data.type : 0
    },
    examination() {
      // 计算检查结果
      var examination = this.recordData.examination;
      var ret = "";
      (examination.bloodpressure_num1 || examination.bloodpressure_num2) &&
        (ret +=
          "血压" +
          examination.bloodpressure_num1 +
          "/" +
          examination.bloodpressure_num2 +
          "mmHg，");
      examination.bloodglucose &&
        (ret += "血糖" + examination.bloodglucose + "mg/ml，");
      examination.trioxypurine &&
        (ret += "尿酸" + examination.trioxypurine + "umol/L，");
      examination.heartrate &&
        (ret += "心率" + examination.heartrate + "次/分，");
      examination.breathe && (ret += "呼吸" + examination.breathe + "次/分，");
      examination.animalheat &&
        (ret += "体温" + examination.animalheat + "℃，");
      examination.weight && (ret += "体重" + examination.weight + "kg，");
      examination.info && (ret += (ret ? '\n' : '') + examination.info);
      return ret;
    }
  },
  watch: {
    printPre: function () {
      this.printPrescription()
    }
  },
  methods: {
    ...mapActions(['change_print_index',]),
    getTreatName: function (val) {
      console.log(val)
      switch (val.type) {
        case 1:
          return '申请单'
        case 2:
          return '检验申请单'
        case 3:
          return val.name + '申请单'
        default:
          return '申请单'
      }
    },
    printPrescription: function () {
      var self = this
      self.showLoading = true
      var printType = ''
      var recipe = self.currRecipeData.data
      var fn = function (htmlStr, width, height) {
        var printParams = {
          pageHeight: height,
          pageWidth: width
        }
        self.showLoading = false
        clodopToggle(htmlStr, printParams)
      }
      var vue = axios
      var filterExam = JSON.stringify(self.examination)
      var commonVar = {
        '$机构名称': self.clinic.name || '',
        '$机构地址': self.clinic.city_name + '市' + self.clinic.county_name + '区' + self.clinic.address,
        '$服务热线': self.clinic.customer_phone || '',
        '$打印时间': filter.dateFormat(new Date(), 'yyyy-MM-dd hh:mm'),
        '$年': filter.dateFormat(new Date(), 'yyyy'),
        '$月': filter.dateFormat(new Date(), 'MM'),
        '$日': filter.dateFormat(new Date(), 'dd'),
        '$时': filter.dateFormat(new Date(), 'hh'),
        '$分': filter.dateFormat(new Date(), 'mm'),
        '$医保卡号': self.ybCardNo,
        '$就诊订单号': self.orderSeqno,
        '$费别': self.isYB == 0 ? '自费' : '医保',
        '$患者姓名': self.patientData.name || '',
        '$患者年龄': self.patientData.age || '',
        '$患者性别': self.patientData.sex == 0 ? '未知' : (self.patientData.sex == 1 ? '男' : '女'),
        '$患者电话': self.patientData.mobile || '',
        '$患者地址': self.patientData.province_name +
          '省' +
          self.patientData.city_name +
          '市' +
          self.patientData.county_name +
          '区' +
          self.patientData.address,
        '$医生姓名': self.doctorName || '',
        '$医生科室': self.department || '',
        '$主诉': self.recordData.chief_complaint || '',
        '$现病史': self.recordData.present_illness || '',
        '$既往史': self.recordData.past_history || '',
        '$过敏史': self.recordData.allergic_history || '',
        '$个人史': self.recordData.personal_history || '',
        '$家族史': self.recordData.family_history || '',
        '$预防接种史': self.recordData.prophylactic_history || '',
        '$体格检查': JSON.stringify(self.recordData.examination) || '',
        '$辅助检查': self.recordData.auxiliary_examination || '',
        '$中医诊断': self.recordData.diagnosis || '',
        '$初步诊断': self.recordData.diagnosis_xy || '',
        '$治疗处理': self.recordData.treat_advice || '',
        '$运动建议': self.recordData.sport_advice || '',
        '$膳食建议': self.recordData.dietary_advice || '',
        '$病历号': self.orderSeqno,
        '$处方订单号':
          filter.dateFormat(new Date(), 'yyyyMMdd') +
          self.orderSeqno.slice(-6),
        '$处方金额': self.currRecipeData.money || '',
        '$医嘱': self.currRecipeData.data.doctor_remark || ''
      }
      console.log(self.currRecipeData.type)

      switch (self.currRecipeData.type) {
        case 0:
          return new printRendering(
            'herbalRecipe',
            Object.assign({}, commonVar, {
              '$中药列表': recipe.items,
              '$中药类型': recipe.category == 1 ? '饮片' : '颗粒',
              '$中药剂数': recipe.dosage,
              '$中药频次': recipe.frequency,
              '$中药用法': recipe.usage,
              '$中药用量': recipe.dose_once || self.currRecipeData.data.eachDose,
            }),
            vue,
            fn);
          break;
        case 1:
          return new printRendering(
            'herbalRecipe',
            Object.assign({}, commonVar, {
              '$中药列表': recipe.items,
              '$中药类型': recipe.category == 1 ? '饮片' : '颗粒',
              '$中药剂数': recipe.dosage,
              '$中药频次': recipe.frequency,
              '$中药用法': recipe.usage,
              '$中药用量': recipe.dose_once || self.currRecipeData.data.eachDose,
            }),
            vue,
            fn);
          break;
        case 2:
          return new printRendering(
            'westernRecipe',
            Object.assign({}, commonVar, {
              '$成药列表': recipe.items,
            }),
            vue,
            fn);
          break;
        case 6:
          return new printRendering(
            'materialRecipe',
            Object.assign({}, commonVar, {
              '$材料列表': recipe.items,
            }),
            vue,
            fn);
          break;
        case 3:
          return new printRendering(
            'westernRecipe',
            Object.assign({}, commonVar, {
              '$产品列表': recipe.items,
            }),
            vue,
            fn);
          break;
        case 4:
          switch (recipe.type) {
            case 1:
              if (self.printIndex !== undefined && self.printIndex !== null) {
                return new printRendering(
                  'treatApply',
                  Object.assign({}, commonVar, {
                    '$项目名称': recipe.items[self.printIndex].name,
                    '$执行次数': recipe.items[self.printIndex].num,
                    '$备注': recipe.items[self.printIndex].remark,
                    '$处方金额': (
                      recipe.items[self.printIndex].price *
                      recipe.items[self.printIndex].num
                    ).toFixed(2)
                  }),
                  vue,
                  fn
                )
              } else {
                return new printRendering(
                  'treatRecipe',
                  Object.assign({}, commonVar, {
                    '$治疗项目列表': recipe.items
                  }),
                  vue,
                  fn
                )
              }
              break
            case 2:
              if (self.printIndex !== undefined && self.printIndex !== null) {
                return new printRendering(
                  'textApply',
                  Object.assign({}, commonVar, {
                    '$项目名称': recipe.items[self.printIndex].name,
                    '$标本': recipe.items[self.printIndex].sample,
                    '$备注': recipe.items[self.printIndex].remark,
                    '$处方金额': (
                      recipe.items[self.printIndex].price *
                      recipe.items[self.printIndex].num
                    ).toFixed(2)
                  }),
                  vue,
                  fn
                )
              } else {
                return new printRendering(
                  'textRecipe',
                  Object.assign({}, commonVar, {
                    '$检验项目列表': recipe.items
                  }),
                  vue,
                  fn
                )
              }
              break
            case 3:
              if (self.printIndex !== undefined && self.printIndex !== null) {
                return new printRendering(
                  'examineApply',
                  Object.assign({}, commonVar, {
                    '$项目名称': recipe.items[self.printIndex].name,
                    '$部位': recipe.items[self.printIndex].position,
                    '$检查目的': recipe.items[self.printIndex].remark,
                    '$处方金额': (
                      recipe.items[self.printIndex].price *
                      recipe.items[self.printIndex].num
                    ).toFixed(2)
                  }),
                  vue,
                  fn
                )
              } else {
                return new printRendering(
                  'examineRecipe',
                  Object.assign({}, commonVar, {
                    '$检查项目列表': recipe.items
                  }),
                  vue,
                  fn
                )
              }
              break
          }
          break
      }
    }
  }
};
</script>

<style scoped>
</style>
