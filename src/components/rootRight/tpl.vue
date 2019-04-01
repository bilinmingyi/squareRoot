<template>
  <div>
    <div class="mt5 ml6 mr6 mb5">
      <div v-if="!showTpl">
        <div class="mb6" style="width:100%;display:flex;height:2rem;">
          <div class="col70 mr10">
            <Input placeholder="请输入模板名称" @input="tplSearch()" v-model="searchTplName"/>
          </div>
          <div class="col30">
            <Button long @click="tplSearch()">搜索</Button>
          </div>
        </div>
        <span class="add_prescription_btn" v-show="recipeType!==0" @click="addTpl()">添加模板</span>
        <div v-show="showResult" style="min-height:20rem;max-height:45rem;overflow:auto;">
          <div
            class="prescript-list"
            v-for="(item,index) in showList"
            :key="index"
            @click.stop="tplShow(item)"
          >
            {{item.name}}
            <span v-show="item.scope===1">（个人模板）</span>
            <span v-show="item.scope===0">（共享模板）</span>
          </div>
          <div
            class="mt10"
            style="text-align:center;font-size:1rem;"
            v-show="showList.length<1"
          >暂无模板
          </div>
          <div class="pt15" style="clear:both;display:flex;justify-content:center;">
            <Button
              v-show="currPage!==1"
              shape="circle"
              type="primary"
              ghost
              @click.stop="changePage(0)"
            >上一页
            </Button>
            <Button v-show="currPage===1" disabled shape="circle">上一页</Button>
            <div class="ml10"></div>
            <Button
              v-show="currPage!==page_num"
              shape="circle"
              type="primary"
              ghost
              @click.stop="changePage(1)"
            >下一页
            </Button>
            <Button v-show="currPage===page_num" disabled shape="circle">下一页</Button>
          </div>
        </div>
      </div>
      <div class="tpl-show mt5" style="font-size:0.875rem;" v-show="showTpl">
        <div class="prescription_detail_btn" @click="tplHide()">返回</div>
        <div class="ml6 mr16 mt16" style="font-size:0.875rem;border-bottom: 1px solid #4c89db;">
          <span style="font-weight:900;">处方模板：</span>
          <span>{{tplData.tplName}}</span>
          <span v-show="tplData.scope==0" style="float:right;">共享模板</span>
          <span v-show="tplData.scope==1" style="float:right;">个人模板</span>
        </div>
        <div class="search-result mt16 ml5 mr5" v-show="recipeType!=0">
          <div
            :class="[{'herbal-result-li':recipeType===1},{'search-result-li':recipeType!=1}]"
            v-for="(item,index) in tplData.items"
            :key="index"
          >
            <span v-show="recipeType===1">
              {{item.alias_name||item.clinic_alias_name||item.name}}
              <br>
              （{{item.num}}{{item.unit}}）
            </span>
            <span v-show="recipeType===2">
              {{item.alias_name||item.clinic_alias_name||item.name}}
              {{item.spec}}
            </span>
            <span v-show="recipeType===4">
              {{item.alias_name||item.clinic_alias_name||item.name}}
              （{{item.num}}次）
            </span>
          </div>
        </div>
        <div class="mt10 ml6 mr6" v-show="recipeType==1" style="clear:both;">
          <span>剂数：</span>
          <span>{{tplData.dosage}}剂</span>
        </div>
        <div class="mt10 mb10 ml6 mr6" v-show="recipeType!=0">
          <span>医嘱：</span>
          <span>{{tplData.doctor_remark}}</span>
        </div>
        <div class="mt10 ml10 mb20 tpl-case" v-show="recipeType==0">
          <div>
            <span class="case-label">主述&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span>{{tplData.chief_complaint}}</span>
          </div>
          <div>
            <span class="case-label">病史&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span>{{tplData.present_illness}}</span>
          </div>
          <div>
            <span class="case-label">既往史&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span>{{tplData.past_history}}</span>
          </div>
          <div>
            <span class="case-label">过敏史&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span>{{tplData.allergic_history}}</span>
          </div>
          <div style="display:flex;">
            <span class="case-label" style="width: 3.75rem">检查</span>
            <div
              style="white-space:pre-wrap; flex:1;margin:0;font-family:'microsoft yahei';border:0!important;"
            >{{tplExamination}}
            </div>
          </div>
          <div>
            <span class="case-label">西医诊断&nbsp;</span>
            <span>{{tplData.diagnosis_xy}}</span>
          </div>
          <div>
            <span class="case-label">中医诊断&nbsp;</span>
            <span>{{tplData.diagnosis}}</span>
          </div>
        </div>
        <div>
          <button class="prescription_detail_save mr2" @click.stop="useTplShow()">使用模板</button>
          <button
            class="prescription_detail_save"
            v-show="recipeType!==0"
            @click.stop="editTplShow()"
          >编辑模板
          </button>
          <button class="prescription_detail_del" @click.stop="delTplShow()">删除模板</button>
        </div>
        <div v-if="showUseTpl" class="alert-back">
          <div class="use-tpl">
            <div class="alert-title">确定使用[{{tplData.tplName}}]模板？</div>
            <div class="mt20 mb10">
              使用模板将覆盖已编辑之信息
              <span v-if="recipeType!=0">
                <strong style="color:red;">，没有的药品</strong>不会导入至处方
              </span>
            </div>
            <div class="use-list mt10">
              <div
                v-if="recipeType!=0"
                class="use-list-li"
                v-for="(item,index) in tplData.items"
                :key="index"
              >
                {{item.alias_name||item.clinic_alias_name||item.name}} ({{item.num}}{{item.unit}}/{{item.usage}})
                <span
                  v-show="recipeType==4"
                >{{item.price}}/次</span>
                <span v-show="item.status!=1" style="color:red;font-weight:bold;">暂无此药</span>
              </div>
              <div v-if="recipeType==0" style="width: 100%;font-weight: normal">
                <div>
                  <span class="case-label">主述&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span>{{tplData.chief_complaint}}</span>
                </div>
                <div>
                  <span class="case-label">病史&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span>{{tplData.present_illness}}</span>
                </div>
                <div>
                  <span class="case-label">既往史&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span>{{tplData.past_history}}</span>
                </div>
                <div>
                  <span class="case-label">过敏史&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span>{{tplData.allergic_history}}</span>
                </div>
                <div style="display:flex;">
                  <span class="case-label" style="width: 4.5rem">检查</span>
                  <div
                    style="white-space:pre-wrap; flex:1;margin:0;font-family:'microsoft yahei';"
                  >{{tplExamination}}
                  </div>
                </div>
                <div>
                  <span class="case-label">西医诊断&nbsp;</span>
                  <span>{{tplData.diagnosis_xy}}</span>
                </div>
                <div>
                  <span class="case-label">中医诊断&nbsp;</span>
                  <span>{{tplData.diagnosis}}</span>
                </div>
              </div>
            </div>
            <div class="pb10 tc mt20">
              <button class="saveBtn mr20" @click.stop="useTpl()">确认</button>
              <button class="saveBtn cancelBtn" @click.stop="useTplHide()">取消</button>
            </div>
          </div>
        </div>
        <div v-if="showDelTpl" class="alert-back" style="font-size:1rem;">
          <div class="del-tpl">
            <div class="ml20 pt20">删除模板</div>
            <div class="ml20 pt10">
              <Icon type="md-help-circle" size="40" color="#3182FB"/>
              <span class="ml10">确定要删除[{{tplData.tplName}}]模板?</span>
            </div>
            <div style="position:absolute;right:5rem;bottom:2rem;">
              <span @click="delTplHide()">取消</span>
              <Button class="ml20 tpl-btn" shape="circle" type="primary" @click="delTpl()">确定</Button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showEditTpl||showAddTpl" class="alert-back">
        <div class="edit-tpl">
          <div
            class="pb12 pt12 font-bold tc font-18"
            style="font-size:1.125rem;border-bottom:1px solid #cccccc;"
          >
            <span v-show="showEditTpl">编辑模板</span>
            <span v-show="showAddTpl">添加模板</span>
          </div>
          <div style="position:relative;">
            <div class="mt10 ml20">
              <label class="ml20" for="edit-tpl-name">模板名称：</label>
              <Input
                name="tpl-name"
                v-model="tplEditData.tplName"
                placeholder="必填"
                style="width: 9.375rem;"
              />
              <label class="ml20" for="edit-tpl-scope">模板类别：</label>
              <Select name="edit-tpl-scope" style="width:7.5rem;" v-model="tplEditData.scope">
                <Option
                  v-for="(item,index) in tplType"
                  :key="index"
                  :value="item.scope"
                >{{item.name}}
                </Option>
              </Select>
            </div>
            <div class="mt10 ml20" v-show="recipeType===1">
              <span class="ml20">药品类型：</span>
              <span v-show="category==1">饮片</span>
              <span v-show="category==2">颗粒</span>
            </div>
            <div class="mt10 ml20 mr20">
              <!--中药列表-->
              <div v-show="recipeType===1">
                <table class="col100">
                  <thead>
                  <tr>
                    <th class="col10">序号</th>
                    <th class="col30">药名</th>
                    <th class="col10">药量</th>
                    <th class="col15">单位</th>
                    <th class="col10">规格</th>
                    <th class="col10">用法</th>
                    <th class="col15">操作</th>
                  </tr>
                  </thead>
                </table>
                <div style="max-height:8.5rem;overflow:auto;">
                  <table class="col100 font-14">
                    <tbody>
                    <tr v-for="(item,index) in tplEditData.items" :key="index">
                      <td class="col10">{{index+1}}</td>
                      <td class="col30">{{item.name}}</td>
                      <td class="col10">
                        <InputNumber
                          :value="Number(item.num)"
                          @input="item.num=$event"
                        />
                      </td>
                      <td class="col15">{{item.unit_stock}}</td>
                      <td class="col10">{{item.spec}}</td>
                      <td class="col10">
                        <Select v-model="item.usage">
                          <Option
                            v-for="(item1,index) in herbalMedUsages"
                            :value="item1.name"
                            :key="index"
                          >{{item1.name}}
                          </Option>
                        </Select>
                      </td>
                      <td class="col15">
                        <div style="color:#4181D8" @click.stop="delEditTplLists(index)">删除</div>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <div class="col100 mt10 pb10" style="border-bottom:#B4B4B4 solid 1px;">
                  <div class="mt10 ml20">
                    <Input
                      class="col30"
                      placeholder="输入药品名称/编码/拼音码"
                      v-model="tplEditData.searchName"
                      @input="tplMedSearch()"
                    />
                  </div>
                </div>
              </div>
              <!--成药列表-->
              <div v-show="recipeType==2">
                <table class="col100">
                  <thead>
                  <tr>
                    <th class="col5">序号</th>
                    <th class="col25">药名</th>
                    <th class="col10">规格</th>
                    <th class="col10">总量</th>
                    <th class="col5">单位</th>
                    <th class="col10">用法</th>
                    <th class="col10">每次用量</th>
                    <th class="col10">频次</th>
                    <th class="col10">天数</th>
                    <th class="col10">操作</th>
                  </tr>
                  </thead>
                </table>
                <div style="max-height:8.5rem;overflow:auto;font-size:0.875rem !important;">
                  <table class="col100">
                    <tbody>
                    <tr v-for="(item,index) in tplEditData.items" :key="index">
                      <td class="col5">{{index+1}}</td>
                      <td class="col25">{{item.name}}</td>
                      <td class="col10">{{item.spec}}</td>
                      <td class="col10">
                        <InputNumber
                          class="col50"
                          :value="Number(item.num)"
                          @input="item.num=$event"
                        />
                      </td>
                      <td class="col5">{{item.unit}}</td>
                      <td class="col10">
                        <Select class="col80" v-model="item.usage">
                          <Option
                            v-for="(item1,index) in westernMedUsages"
                            :value="item1.name"
                            :key="index"
                          >{{item1.name}}
                          </Option>
                        </Select>
                      </td>
                      <td class="col10">
                        <InputNumber
                          class="col50"
                          :value="Number(item.dose_once)"
                          @input="item.dose_once=$event"
                        />
                      </td>
                      <td class="col10">
                        <Select v-model="item.frequency">
                          <Option
                            v-for="(item1,index) in medFrequency"
                            :value="item1.name"
                            :key="index"
                          >{{item1.name}}
                          </Option>
                        </Select>
                      </td>
                      <td class="col10">
                        <InputNumber
                          class="col50"
                          :value="Number(item.days)"
                          @input="item.days=$event"
                        />
                      </td>
                      <td class="col10">
                        <div style="color:#4181D8" @click.stop="delEditTplLists(index)">删除</div>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <div class="col100 mt10 pb10" style="border-bottom:#B4B4B4 solid 1px;">
                  <div class="mt10 ml20">
                    <Input
                      class="col30"
                      placeholder="输入药品名称/编码/拼音码"
                      v-model="tplEditData.searchName"
                      @input="tplMedSearch()"
                    />
                  </div>
                </div>
              </div>
              <!--项目列表-->
              <div v-show="recipeType==4">
                <table class="col100">
                  <thead>
                  <tr>
                    <th class="col10">序号</th>
                    <th class="col50">项目名称</th>
                    <th class="col20">数量</th>
                    <th class="col20">操作</th>
                  </tr>
                  </thead>
                </table>
                <div style="max-height:8.5rem;overflow:auto;font-size:0.875rem !important;">
                  <table class="col100">
                    <tbody>
                    <tr v-for="(item,index) in tplEditData.items" :key="index">
                      <td class="col10">{{index+1}}</td>
                      <td class="col50">{{item.alias_name||item.clinic_alias_name||item.name}}</td>
                      <td class="col20">
                        <InputNumber
                          class="col60"
                          :value="Number(item.num)"
                          @input="item.num=$event"
                        />
                      </td>
                      <td class="col20">
                        <div style="color:#4181D8" @click.stop="delEditTplLists(index)">删除</div>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <div class="col100 mt10 pb10" style="border-bottom:#B4B4B4 solid 1px;">
                  <div class="mt10 ml20">
                    <Input
                      class="col30"
                      placeholder="输入药品名称/编码/拼音码"
                      v-model="tplEditData.searchName"
                      @input="tplMedSearch()"
                    />
                  </div>
                </div>
              </div>

              <div
                class="tpl-search-result"
                v-if="tplEditData.searchListShow&&recipeType==1"
              >
                <table class="col100">
                  <thead>
                  <tr>
                    <th class="col20">药品名称</th>
                    <th class="col20">药品类别</th>
                    <th class="col20">单位</th>
                    <th class="col20">规格</th>
                    <th class="col20">零售价</th>
                  </tr>
                  </thead>
                </table>
                <!--ref="herbal_scroll"-->
                <div class="tpl-search-list">
                  <table class="col100">
                    <tbody>
                    <tr
                      v-for="(item,index) in tplEditData.searchLists"
                      :key="index"
                      @click="editTplAddList(item)"
                    >
                      <td class="col20">{{item.name}}</td>
                      <td class="col20" v-if="item.category==1">饮片</td>
                      <td class="col20" v-if="item.category==2">颗粒</td>
                      <td class="col20">{{item.unit_stock}}</td>
                      <td class="col20">{{item.spec}}</td>
                      <td class="col20">{{item.sale_price}}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div
                class="tpl-search-result"
                v-show="tplEditData.searchListShow&&recipeType==2"
              >
                <table class="col100">
                  <thead>
                  <tr>
                    <th class="col20">药品名称</th>
                    <th class="col20">类别</th>
                    <th class="col20">厂商</th>
                    <th class="col20">规格</th>
                    <th class="col20">零售价</th>
                  </tr>
                  </thead>
                </table>
                <!--ref="western_scroll"-->
                <div class="tpl-search-list">
                  <table class="col100">
                    <tbody>
                    <tr
                      v-for="(item,index) in tplEditData.searchLists"
                      :key="index"
                      @click="editTplAddList(item)"
                    >
                      <td class="col20">{{item.name}}</td>
                      <td class="col20">{{item.form}}</td>
                      <td class="col20">{{item.vender}}</td>
                      <td class="col20">{{item.spec}}</td>
                      <td class="col20">{{item.sale_price}}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div
                class="tpl-search-result"
                v-show="tplEditData.searchListShow&&recipeType==4"
              >
                <table class="col100">
                  <thead>
                  <tr>
                    <th class="col50">项目名称</th>
                    <th class="col50">零售价</th>
                  </tr>
                  </thead>
                </table>
                <!--ref="therapy_scroll"-->
                <div class="tpl-search-list">
                  <table class="col100">
                    <tbody>
                    <tr
                      v-for="(item,index) in tplEditData.searchLists"
                      :key="index"
                      @click="editTplAddList(item)"
                    >
                      <td class="col50">{{item.alias_name||item.clinic_alias_name||item.name}}</td>
                      <td class="col50">{{item.price}}元</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div class="mt10 ml40 mb10 col40" v-show="recipeType==1">饮片剂数：
              <InputNumber
                style="width:4rem"
                name="dosage"
                :value="Number(tplEditData.dosage)"
                @input="tplEditData.dosage=$event"
              />&nbsp;&nbsp;&nbsp;剂
            </div>
            <div class="mt10 ml40 ">
              <label class="ml20">&nbsp;&nbsp;&nbsp;医嘱：</label>
              <Input
                v-model="tplEditData.doctor_remark"
                class="col70 mb10"
                type="textarea"
                placeholder="请输入文字"
                :rows="2"
                :autosize="{minRows:2,maxRows:4}"
              />
            </div>
            <div v-if="showEditTpl" class="edit-tpl-foot">
              <Button
                class="mr20 tpl-btn"
                type="primary"
                shape="circle"
                size="large"
                @click.stop="saveTplEdit()"
              >保存
              </Button>
              <Button class="tpl-btn" shape="circle" size="large" @click.stop="cancelTplEdit()">取消</Button>
            </div>
            <div v-if="showAddTpl" class="edit-tpl-foot">
              <Button
                class="mr20 tpl-btn"
                type="primary"
                shape="circle"
                size="large"
                @click.stop="saveTplAdd()"
              >保存
              </Button>
              <Button class="tpl-btn" shape="circle" size="large" @click.stop="cancelTplAdd()">取消</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    westernMedUsages,
    herbalMedUsages,
    herbalRpUsages,
    medFrequency
  } from "@/assets/js/mapType";
  import {mapState, mapGetters, mapActions} from "vuex";
  import {Input, Button, Select, Option, Icon, InputNumber} from "iview";
  import {
    searchTpl,
    updateTpl,
    delTpl,
    saveMedTpl,
    searchMed
  } from "@/fetch/api.js";

  export default {
    name: "tpl",
    components: {
      Input,
      Button,
      Select,
      Option,
      Icon,
      InputNumber
    },
    data() {
      return {
        showResult: false,
        timer: null,
        currPage: 1,
        page_num: 1,
        showList: [],
        page_size: 0,
        westernMedUsages: westernMedUsages,
        medFrequency: medFrequency,
        showAddTpl: false,
        showDelTpl: false,
        showEditTpl: false,
        showUseTpl: false,
        searchTplName: "",
        tplSearchList: [],
        searchMedicineList: [],
        showTpl: false,
        tplData: {
          category: 0,
          clinic_id: 0,
          creator_name: "",
          creator_id: "",
          id: 0,
          tplName: "",
          scope: 0,
          items: [],
          dosage: 0,
          doctor_remark: "",

          chief_complaint: "", //主诉
          present_illness: "", //病史
          allergic_history: "", //过敏史
          past_history: "", //既往史
          examination: "", //检查
          diagnosis: "", //中医诊断
          diagnosis_xy: "", //西医诊断
          treat_advice: "" //处理意见
        },
        tplEditData: {
          category: 1,
          tplName: "",
          scope: 0,
          items: [],
          dosage: 0,
          doctor_remark: "",
          searchName: "",
          searchLists: [],
          searchListShow: false,
          currIndex: -1
        },
        tplType: [{name: "个人", scope: 1}, {name: "共享", scope: 0}],
        currShowTpl: {}
      };
    },
    computed: {
      ...mapState({
        tplChange: state => state.tplChange
      }),
      tplExamination: function () {
        if (this.recipeType == 0 && this.tplData.examination) {
          var e = JSON.parse(this.tplData.examination);
          var ret = "";
          (e.bloodpressure_num1 || e.bloodpressure_num2) &&
          (ret +=
            "血压" +
            e.bloodpressure_num1 +
            "/" +
            e.bloodpressure_num2 +
            "mmHg，");
          e.bloodglucose && (ret += "血糖" + e.bloodglucose + "mg/ml，");
          e.trioxypurine && (ret += "尿酸" + e.trioxypurine + "umol/L，");
          e.heartrate && (ret += "心率" + e.heartrate + "次/分，");
          e.breathe && (ret += "呼吸" + e.breathe + "次/分，");
          e.animalheat && (ret += "体温" + e.animalheat + "℃，");
          e.weight && (ret += "体重" + e.weight + "kg，");
          e.info && (ret += (ret ? "\n" : "") + e.info);
          return ret;
        } else {
          return "";
        }
      },
      herbalMedUsages: function () {
        return herbalMedUsages.filter(item => {
          return item.status === 1;
        });
      },
      ...mapGetters(["currRecipeData"]),
      recipeType: function () {
        return this.currRecipeData === undefined ? 0 : this.currRecipeData.type;
      },
      category: function () {
        return this.currRecipeData === undefined
          ? 1
          : this.currRecipeData.data.category;
      }
    },
    created() {
      this.firstSearch();
    },
    watch: {
      recipeType: function () {
        this.showTpl = false;
        this.searchTplName = "";
        this.showResult = false;
        this.firstSearch();
      },
      category: function () {
        this.showTpl = false;
        this.searchTplName = "";
        this.showResult = false;
        this.firstSearch();
      },
      tplChange: function () {
        this.showResult = false;
        this.firstSearch();
      },
      tplSearchList: function () {
        if (this.recipeType === 1) {
          this.page_size = 10;
        } else {
          this.page_size = 10;
        }
        this.currPage = 1;
        this.page_num = Number(
          (this.tplSearchList.length / this.page_size).toFixed(0)
        );
        if (this.page_num * this.page_size < this.tplSearchList.length) {
          this.page_num++;
        }
        if (this.page_num == 1) {
          this.showList = this.tplSearchList.slice(0);
        } else {
          if (this.currPage == this.page_num) {
            this.showList = this.tplSearchList.slice(
              this.page_size * (this.currPage - 1)
            );
          } else {
            this.showList = this.tplSearchList.slice(
              this.page_size * (this.currPage - 1),
              this.page_size * this.currPage
            );
          }
        }
        this.showResult = true;
      },
      currPage: function () {
        if (this.page_num == 1) {
          this.showList = this.tplSearchList.slice(0, -1);
        } else {
          if (this.currPage == this.page_num) {
            this.showList = this.tplSearchList.slice(
              this.page_size * (this.currPage - 1)
            );
          } else {
            this.showList = this.tplSearchList.slice(
              this.page_size * (this.currPage - 1),
              this.page_size * this.currPage
            );
          }
        }
      },
      "tplEditData.items": {
        deep: true,
        handler: function () {
        }
      },
      "tplEditData.searchLists": {
        deep: true,
        handler: function () {
          if (this.tplEditData.searchLists.length >= 1) {
            this.tplEditData.searchListShow = true;
          }
        }
      }
    },
    methods: {
      ...mapActions(["add_new_medicine", "clean_recipe", "set_record_prop"]),
      firstSearch: function () {
        if (this.recipeType != 6) {
          this.tplSearch();
          this.showResult = true;
        }
      },
      changePage: function (flag) {
        if (flag == 0) {
          if (this.currPage == 1) {
            this.currPage = 1;
          } else {
            this.currPage--;
          }
        }
        if (flag == 1) {
          if (this.currPage == this.page_num) {
            this.currPage = this.page_num;
          } else {
            this.currPage++;
          }
        }
      },
      tplSearch: function () {
        var self = this;
        var params = {};
        switch (self.recipeType) {
          case 0: {
            params = {
              name: self.searchTplName,
              scope: 1,
              page: 1
            };
            break;
          }
          case 1: {
            params = {
              category: self.category,
              is_cloud: 0,
              name: self.searchTplName,
              page: 1
            };
            break;
          }
          case 2: {
            params = {
              name: self.searchTplName,
              page: 1
            };
            break;
          }
          case 4: {
            params = {
              name: self.searchTplName,
              page: 1
            };
            break;
          }
        }
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          searchTpl(params, this.recipeType).then(function (res) {
            if (res.code == 1000) {
              self.tplSearchList = res.data;
              self.showResult = true;
            }
          });
        }, 300);
      },
      addTpl: function () {
        this.tplEditData = {
          category: this.category,
          tplName: "",
          scope: 0,
          items: [],
          dosage: 0,
          doctor_remark: "",
          searchName: "",
          searchLists: [],
          searchListShow: false
        };
        this.showAddTpl = true;
      },
      tplMedSearch: function () {
        var self = this;
        var params = {};
        if (self.tplEditData.searchName == "") {
          this.tplEditData.searchListShow = false;
          return;
        }
        switch (this.recipeType) {
          case 1: {
            params = {
              category: self.category,
              medicine_name: self.tplEditData.searchName,
              page: 1,
              status: 1
            };
            break;
          }
          case 2: {
            params = {
              medicine_name: self.tplEditData.searchName,
              status: 1,
              page: 1
            };
            break;
          }
          case 4: {
            params = {
              name: self.tplEditData.searchName,
              page: 1
            };
            break;
          }
        }
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          searchMed(params, self.recipeType).then(
            function (res) {
              if (res.code == 1000) {
                self.tplEditData.searchLists = res.data;
              }
            },
            function (err) {
              console.log(err);
            }
          );
        });
      },
      editTplAddList: function (item) {
        var self = this;

        for (let i = 0, len = self.tplEditData.items.length; i < len; i++) {
          if (self.tplEditData.items[i].name == item.name) {
            self.$Message.info("该药品已在列表中")

            self.tplEditData.searchLists = [];
            self.tplEditData.searchListShow = false;
            self.tplEditData.searchName = "";
            return
          }
        }

        var newItem = {
          item_id: item.id,
          name: item.alias_name || item.clinic_alias_name || item.name,
          num: 0,
          unit: item.unit || item.unit_stock,
          unit_stock: item.unit_stock || item.unit,
          stock: item.stock,
          dose_once: item.dose_once,
          unit_stock: item.unit_stock,
          unit_sale: item.unit_sale,
          unit_dose: item.unit_dose,
          sale_dose_ratio: item.sale_dose_ratio,
          stock_sale_ratio: item.stock_sale_ratio,
          price: item.price || item.sale_price,
          sale_price: item.sale_price || item.price,
          usage: 0,
          spec: item.spec,
          alias_name: item.alias_name,
          clinic_alias_name: item.clinic_alias_name,
          status: item.status || 1,
          type: item.type,
          days: 0,
          default_sale_price: item.default_sale_price
        };
        self.tplEditData.items.push(newItem);
        self.tplEditData.searchListShow = false;
        self.tplEditData.searchLists = [];
        self.tplEditData.searchName = "";

      },
      delEditTplLists: function (index) {
        this.tplEditData.items.splice(index, 1);
      },
      saveTplAdd: function () {
        var self = this;
        var params = {};
        var flag = true;
        if (self.tplEditData.tplName == "") {
          alert("请填写模板名称");
          return;
        }
        if (self.tplEditData.items.length < 1) {
          alert("请输入至少一个药品/项目");
          return;
        }
        self.tplEditData.items.forEach(function (e) {
          if (e.num < 1) {
            flag = false;
          }
        });
        if (!flag) {
          alert("药品/项目数量必须大于零");
          return;
        }
        switch (this.recipeType) {
          case 1: {
            params = {
              name: self.tplEditData.tplName,
              scope: self.tplEditData.scope,
              items: self.tplEditData.items,
              dosage: self.tplEditData.dosage,
              doctor_remark: self.tplEditData.doctor_remark,
              category: self.category,
              is_cloud: 0
            };
            break;
          }
          case 2: {
            params = {
              name: self.tplEditData.tplName,
              scope: self.tplEditData.scope,
              items: self.tplEditData.items,
              dosage: self.tplEditData.dosage,
              doctor_remark: self.tplEditData.doctor_remark,
              category: 1,
              is_cloud: 0
            };
            break;
          }
          case 4: {
            params = {
              name: self.tplEditData.tplName,
              scope: self.tplEditData.scope,
              items: self.tplEditData.items,
              dosage: self.tplEditData.dosage,
              is_cloud: 0,
              doctor_remark: self.tplEditData.doctor_remark
            };
          }
        }
        saveMedTpl(params, this.recipeType).then(
          function (res) {
            if (res.code == 1000) {
              self.tplEditData = {
                category: self.category,
                tplName: "",
                scope: 0,
                items: [],
                dosage: 0,
                doctor_remark: "",
                searchName: "",
                searchLists: [],
                searchListShow: false
              };
              self.showAddTpl = false;
              self.firstSearch();
            } else {
              alert("添加失败，" + "res.msg");
            }
          },
          function (err) {
            console.log(err);
          }
        );
      },
      cancelTplAdd: function () {
        this.tplEditData.searchListShow = false;
        this.tplEditData.searchLists = [];
        this.showAddTpl = false;
      },
      tplShow: function (item) {
        this.tplEditData.searchName = "";
        this.currShowTpl = item;

        var self = this;
        self.tplData = {
          tplName: item.name,
          scope: item.scope,
          items: item.items,
          dosage: item.dosage,
          doctor_remark: item.doctor_remark,
          category: item.category,
          clinic_id: item.clinic_id,
          creator_name: item.creator_name,
          creator_id: item.creator_id,
          id: item.id,
          is_cloud: item.is_cloud,

          chief_complaint: item.chief_complaint, //主诉
          present_illness: item.present_illness, //病史
          allergic_history: item.allergic_history, //过敏史
          past_history: item.past_history, //既往史
          examination: item.examination, //检查
          diagnosis: item.diagnosis, //中医诊断
          diagnosis_xy: item.diagnosis_xy //西医诊断
        };
        self.showTpl = true;

      },
      tplHide: function () {
        this.showTpl = false;
      },
      useTpl: function () {
        var self = this;
        if (this.recipeType !== 0) {
          this.clean_recipe();
          self.tplData.items.forEach(function (item) {
            var newItem = {
              category: item.category,
              id: item.item_id,
              name: item.alias_name || item.clinic_alias_name || item.name,
              alias_name: item.alias_name || item.name,
              clinic_alias_name: item.clinic_alias_name || item.name,
              num: item.num,
              price: item.price,
              sale_price: item.sale_price,
              default_sale_price: item.default_sale_price || 0,
              spec: item.spec,
              stock: item.stock,
              stock_sale_ratio: item.stock_sale_ratio,
              unit: item.unit || "次",
              unit_sale: item.unit_sale,
              unit_stock: item.unit_stock,
              usage: item.usage,
              dose_once: item.dose_once,
              frequency: item.frequency,
              days: item.days,
              status: item.status || 0,
              unit_dose: item.unit_dose || "克",
              sale_dose_ratio: item.sale_dose_ratio || 0,
              type: item.type || 1
            };
            if (newItem.status == 1) {
              self.add_new_medicine({item: newItem, type: self.recipeType});
            }
          });
          this.showUseTpl = false;
        } else {
          var data = {
            chief_complaint: self.tplData.chief_complaint || "",
            present_illness: self.tplData.present_illness || "",
            allergic_history: self.tplData.allergic_history || "",
            past_history: self.tplData.past_history || "",
            examinationInfo: self.tplData.examination
              ? JSON.parse(self.tplData.examination)
              : {},
            examination: self.tplData.examination
              ? JSON.parse(self.tplData.examination)
              : {},
            diagnosis_input:
              self.tplData.diagnosis != "" ? self.tplData.diagnosis + ";" : "",
            diagnosis_xy_input:
              self.tplData.diagnosis_xy != ""
                ? self.tplData.diagnosis_xy + ";"
                : "",
            treat_advice: self.tplData.treat_advice || "",
            diagnosis_xy_labels: [],
            diagnosis_labels: []
          };
          Object.keys(data).forEach(function (k) {
            self.set_record_prop({
              key: k,
              val: data[k]
            });
          });
          self.showUseTpl = false;
        }
      },
      useTplShow: function () {
        var self = this;
        var ids = [];
        var items = self.currShowTpl.items;
        this.currShowTpl.items.forEach(function (item) {
          ids.push(Number(item.item_id));
        });
        var params = {ids: ids, status: 1};

        searchMed(params, this.recipeType).then(function (res) {
          if (res.code == 1000) {
            items.forEach((item) => {
              for (var i = 0, len = res.data.length;i < len;i++){
                if(item.item_id == res.data[i].id){
                  item.status = 1;
                  break;
                }
              }

              if(i == len){
                item.status =0;
              }
            });
            self.showUseTpl = true;
          }else {
            self.$Message.info(res.msg)
          }
        });
      },
      useTplHide: function () {
        this.showUseTpl = false;
      },
      delTplShow: function () {
        this.showDelTpl = true;
      },
      delTplHide: function () {
        this.showDelTpl = false;
      },
      editTplShow: function () {
        var self = this;
        self.tplEditData.searchName = "";
        self.tplEditData.tplName = self.tplData.tplName;
        self.tplEditData.scope = self.tplData.scope;
        self.tplEditData.is_cloud = self.tplData.is_cloud;

        if (self.recipeType !== 0) {
          self.tplEditData.items = (function (items) {
            var newArr = [];
            items.forEach(function (item) {
              newArr.push(item);
            });
            return newArr;
          })(self.tplData.items);
        }

        self.tplEditData.dosage = self.tplData.dosage;
        self.tplEditData.doctor_remark = self.tplData.doctor_remark;
        self.showEditTpl = true;
      },
      editTplHide: function () {
        this.showEditTpl = false;
      },
      delTpl: function () {
        var self = this;
        delTpl(self.tplData.id, {}, self.recipeType).then(function (res) {
          if (res.code == 1000) {
            self.showDelTpl = false;
            self.showTpl = false;
            self.firstSearch();
          } else {
            alert("删除失败 " + res.msg);
            self.showDelTpl = false;
          }
        });
      },
      saveTplEdit: function () {
        var self = this;
        var params = {};
        var flag = true;
        if (self.tplEditData.tplName == "") {
          alert("请填写模板名称");
          return;
        }
        if (self.tplEditData.items.length < 1) {
          alert("请输入至少一个药品/项目");
          return;
        }
        self.tplEditData.items.forEach(function (e) {
          if (e.num < 1) {
            flag = false;
          }
        });
        if (!flag) {
          alert("药品/项目数量必须大于零");
          return;
        }
        switch (this.recipeType) {
          case 1: {
            params = {
              category: self.category,
              name: self.tplEditData.tplName,
              scope: self.tplEditData.scope,
              items: self.tplEditData.items,
              dosage: self.tplEditData.dosage,
              doctor_remark: self.tplEditData.doctor_remark,
              clinic_id: self.tplData.clinic_id,
              creator_name: self.tplData.creator_name,
              creator_id: self.tplData.creator_id,
              id: self.tplData.id,
              is_cloud: self.tplData.is_cloud
            };
            break;
          }
          case 2: {
            params = {
              name: self.tplEditData.tplName,
              scope: self.tplEditData.scope,
              items: self.tplEditData.items,
              dosage: self.tplEditData.dosage,
              doctor_remark: self.tplEditData.doctor_remark,
              clinic_id: self.tplData.clinic_id,
              creator_name: self.tplData.creator_name,
              creator_id: self.tplData.creator_id,
              id: self.tplData.id,
              is_cloud: 0
            };
          }
          case 4: {
            params = {
              name: self.tplEditData.tplName,
              scope: self.tplEditData.scope,
              items: self.tplEditData.items,
              doctor_remark: self.tplEditData.doctor_remark,
              clinic_id: self.tplData.clinic_id,
              creator_name: self.tplData.creator_name,
              creator_id: self.tplData.creator_id,
              id: self.tplData.id,
              is_cloud: 0
            };
          }
        }
        updateTpl(params, this.recipeType).then(
          function (res) {
            if (res.code == 1000) {
              self.tplData = {
                category: 0,
                clinic_id: 0,
                creator_name: "",
                creator_id: "",
                id: 0,
                tplName: "",
                scope: 0,
                items: [],
                dosage: 0,
                doctor_remark: ""
              };
              self.firstSearch();
              self.showEditTpl = false;
              self.showTpl = false;
            }
          },
          function (error) {
            console.log(error);
          }
        );
      },
      cancelTplEdit: function () {
        this.showEditTpl = false;
        this.tplEditData.tplSearchList = [];
        this.tplEditData.searchListShow = false;
      },
      // listenerKey(event, type) {
      //   console.log(event)
      //   let keyCode = event.keyCode;
      //   let index = this.tplEditData.currIndex;
      //   let data = this.tplEditData.items;
      //   let dropDownDiv = this.$refs[type + "_scroll"];
      //   let self = this;
      //
      //   if (!dropDownDiv || !data) {
      //     return
      //   }
      //
      //   let input = this.$refs[type + "_input"]
      //
      //   switch (keyCode) {
      //     case 13:
      //       index != 0 && self.editTplAddList(data[index])
      //       break;
      //     case 38:
      //       if (index > -1) {
      //         index--;
      //       } else {
      //
      //       }
      //       break;
      //     case 40:
      //       if (index < data.length) {
      //         index++;
      //       }
      //       break;
      //     default:
      //       return
      //   }
      //   setTimeout(() => {
      //     if(data.length > 0){
      //       input.selectionStart = input.target.value.length;
      //     }
      //   })
      //   this.tplEditData.currIndex = index;
      //   // dropDownDiv.scrollTop = index>3;
      // }
    }
  };
</script>

<style scoped>
  .prescript-list {
    margin: 0.3125rem 0;
    text-align: center;
    line-height: 2.5rem;
    border-radius: 0.25rem;
    border: 0.0625rem solid #5096e0;
    width: 100%;
    height: 2.5rem;
    font-size: 0.875rem;
  }

  .add_prescription_btn {
    width: 100%;
    height: 2.5rem;
    line-height: 2.5rem;
    background: #eeae1d;
    color: #fff;
    font-size: 1rem;
    text-align: center;
    border-radius: 0.25rem;
    display: inline-block;
  }

  .prescription_detail_btn {
    width: 100%;
    height: 1.875rem;
    line-height: 1.875rem;
    font-size: 0.9375rem;
    text-align: center;
    border-radius: 0.25rem;
    color: #fff;
    background: #eeae1d;
  }

  .search-result .herbal-result-li {
    width: 31.5%;
    height: 3.75rem;
    border: #5096e0 solid 0.0625rem;
    border-radius: 0.25rem;
    float: left;
    display: flex;
    margin-right: 1%;
    margin-bottom: 0.25rem;
    text-align: center;
    justify-content: center;
    align-items: center;
    font-size: 0.875rem;
  }

  .search-result .search-result-li {
    width: 95%;
    height: 2.5rem;
    border: #5096e0 solid 0.0625rem;
    border-radius: 0.25rem;
    float: left;
    margin-right: 1%;
    margin-bottom: 0.25rem;
    text-align: center;
    justify-content: center;
    display: flex;
    align-items: center;
    font-size: 0.875rem;
  }

  .prescription_detail_save {
    margin-left: 2%;
    width: 30%;
    height: 2rem;
    border: #5096e0 solid 0.0625rem;
    border-radius: 1.875rem;
    text-align: center;
    color: #5096e0;
    float: left;
    background-color: transparent;
    font-size: 1rem;
  }

  .prescription_detail_del {
    margin-left: 2%;
    width: 30%;
    height: 2rem;
    border: #fc3b3b solid 0.0625rem;
    border-radius: 1.875rem;
    text-align: center;
    color: #fc3b3b;
    float: left;
    background-color: transparent;
    font-size: 1rem;
  }

  .alert-back {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 1000;
    background: rgba(255, 255, 255, 0.5);
  }

  .alert-back .use-tpl {
    background: #ffffff;
    box-shadow: 0 0.25rem 1rem 0.25rem rgba(0, 0, 0, 0.2);
    border-radius: 0.25rem;
    z-index: 1050;
    margin: 0 auto;
    position: relative;
    top: 20vh;
    width: 50rem;
    padding: 1.25rem 3.125rem;
    max-height: 50rem;
    font-size: 0.875rem;
    overflow: auto;
    font-weight: bold;
  }

  .alert-back .del-tpl {
    background-color: #ffffff;
    box-shadow: 0 0.25rem 1rem 0.25rem rgba(0, 0, 0, 0.2);
    border-radius: 0.25rem;
    border-radius: 0.25rem;
    z-index: 1050;
    margin: 0 auto;
    position: relative;
    top: 8rem;
    width: 24rem;
    min-height: 12rem;
  }

  .alert-back .edit-tpl {
    background: #ffffff;
    box-shadow: 0 0.25rem 1rem 0.25rem rgba(0, 0, 0, 0.2);
    border-radius: 0.25rem;
    z-index: 1050;
    margin: 0 auto;
    position: relative;
    top: 50%;
    width: 68.75rem;
    font-size: 1rem;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
  }

  .alert-title {
    text-align: center;
    font-weight: 900;
    font-size: 1rem;
    color: #5f95da;
  }

  .use-tpl .use-list {
    display: flex;
    flex-wrap: wrap;
  }

  .use-tpl .use-list .use-list-li {
    width: 33.3%;
    font-size: 0.875rem;
  }

  .search-btn {
    width: 20%;
    height: 2rem;
    background: #5096e0;
    border-radius: 0.25rem;
    color: #fff;
    display: block;
    text-align: center;
    font-size: 1rem;
    line-height: 2rem;
  }

  .search-input {
    width: 75%;
    height: 2rem;
    border: #5096e0 solid 0.0625rem;
    border-radius: 0.25rem;
    margin-right: 0.25rem;
    text-indent: 0.625rem;
    outline: none;
  }

  .saveBtn {
    font-size: 1rem;
    color: #ffffff;
    font-weight: bold;
    width: 8.75rem;
    text-align: center;
    padding: 0.5625rem 0;
    background: #5096e0;
    border-radius: 6.25rem;
    border: none;
  }

  .cancelBtn {
    background: #ffffff;
    border: 0.0625rem solid #5096e0;
    color: #5096e0;
  }

  .add_prescription_btn {
    width: 100%;
    height: 2.5rem;
    line-height: 2.5rem;
    background: #eeae1d;
    color: #fff;
    font-size: 1rem;
    text-align: center;
    border-radius: 0.25rem;
    display: inline-block;
  }

  tr th {
    background-color: #f4fafe;
    padding: 0.625rem;
  }

  td,
  th {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }

  .diagnosis_input {
    width: 90%;
    height: 2rem;
    border: #5096e0 solid 0.0625rem;
    border-radius: 0.25rem;
    text-align: center;
  }

  tbody tr {
    border-bottom: #c1c1c1 solid 0.0625rem;
  }

  tbody td {
    padding: 0.325rem 0 !important;
  }

  .edit-tpl-foot {
    border-top: #ccc solid 0.0625rem;
    text-align: center;
    padding: 1.25rem 0;
  }

  .tpl-search-result {
    position: absolute;
    z-index: 4396;
    width: 45%;
    font-size: 0.875rem;
    background-color: white;
    box-shadow: 0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.2);
    border-radius: 0.25rem;
  }

  .tpl-search-list {
    max-height: 8rem;
    overflow: auto;
  }

  .tpl-btn {
    font-size: 1rem;
    width: 6rem;
  }

  .tpl-case div {
    margin-right: 1rem;
    padding-bottom: 0.5rem;
    margin-top: 0.5rem;
    border-bottom: 0.0625rem solid #c1c1c1;
    border-top: 0.0625rem transparent;
  }

  .case-label {
    font-weight: bold;
  }
</style>
