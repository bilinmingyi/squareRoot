<template>
  <div class="herbal-tag" style="position:relative;">
    <div style="display: flex;">
      <div
        style="flex: 1;"
        :class="['prescript-title',{'current-tab':in_first_tab}]"
        @click.stop="in_first"
      >
        <span v-show="recipeType==1||recipeType==2">药品搜索</span>
        <span v-show="recipeType==4">项目搜索</span>
        <span v-show="recipeType==5">附加项目</span>
        <span v-show="recipeType==6">材料搜索</span>
      </div>
      <div
        v-show="recipeType==1||recipeType==2||recipeType==4"
        style="flex: 1;"
        :class="['prescript-title',{'current-tab':in_second_tab}]"
        @click.stop="in_second"
      >处方模板</div>
    </div>
    <div v-show="in_first_tab" class="mt5 ml6 mr6 mb5">
      <div class="mb6" style="width:100%;display:flex;height:2rem;font-size:1rem;">
        <!--<input class="search-input" placeholder="药品名称/拼音简码" v-model="searchName">-->
        <div class="col70 mr10">
          <Input placeholder="药品名称/拼音简码" v-model="searchName"/>
        </div>
        <!--<button class="search-btn" @click="herbalSearch()">搜索</button>-->
        <div class="col20">
          <Button @click="herbalSearch()">搜索</Button>
        </div>
      </div>
      <div class="search-result">
        <div
          :class="[{'no-stock':item.stock<1},{'herbal-result-li':recipeType===1},{'search-result-li':recipeType!=1}]"
          v-for="(item,index) in searchHerbalList"
          :key="index"
          @click.stop="selectItem(item)"
        >
          <div v-show="recipeType==1">
            {{item.name}}
            <br>
            {{item.spec}}
          </div>
          <div v-show="recipeType==2">
            {{item.name}}
            {{item.spec}}
          </div>
          <div
            v-show="recipeType==4||recipeType==5||recipeType==6"
          >{{item.clinic_alias_name||item.name}}&emsp;({{item.price||item.sale_price}}元/{{item.unit_sale}})</div>
        </div>
        <div
          class="mt10"
          style="text-align:center;font-size:1rem;"
          v-show="searchHerbalList.length<1"
        >暂无药品</div>
      </div>
    </div>
    <div v-show="in_second_tab" class="mt5 ml6 mr6 mb5">
      <div class="mb6" style="width:100%;display:flex;height:2rem;">
        <div class="col70 mr10">
          <Input placeholder="请输入模板名称" v-model="searchTplName"/>
        </div>
        <div class="col20">
          <Button @click="tplSearch()">搜索</Button>
        </div>
        <!--<input placeholder="请输入模板名称" type="text" class="search-input" v-model="searchTplName">-->
        <!--<div class="search-btn" @click="tplSearch()">搜索</div>-->
      </div>
      <span class="add_prescription_btn" @click="addTpl()">添加模板</span>
      <div style="min-height:20rem;max-height:45rem;overflow:auto;">
        <div
          class="prescript-list"
          v-for="(item,index) in tplSearchList"
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
          v-show="tplSearchList.length<1"
        >暂无模板</div>

        <div class="tpl-show mt5" v-show="showTpl">
          <div class="prescription_detail_btn" @click="tplHide()">返回</div>
          <div class="ml6 mr16 mt16">
            <span style="font-weight:900;">处方模板：</span>
            <span>{{tplData.tplName}}</span>
            <span v-show="tplData.scope==0" style="float:right;">共享模板</span>
            <span v-show="tplData.scope==1" style="float:right;">个人模板</span>
          </div>
          <div class="search-result mt16 ml5 mr5">
            <div
              :class="[{'herbal-result-li':recipeType===1},{'search-result-li':recipeType!=1}]"
              v-for="(item,index) in tplData.items"
              :key="index"
            >
              <span v-show="recipeType===1">
                {{item.name}}
                <br>
                （{{item.num}}{{item.unit}}）
              </span>
              <span v-show="recipeType!=1">
                {{item.name}}
                {{item.spec}}
              </span>
            </div>
          </div>
          <div class="mt10 ml6 mr6" v-show="recipeType==1" style="clear:both;">
            <span>剂数：</span>
            <span>{{tplData.dosage}}剂</span>
          </div>
          <div class="mt10 mb10 ml6 mr6">
            <span>医嘱：</span>
            <span>{{tplData.doctor_remark}}</span>
          </div>
          <div>
            <button class="prescription_detail_save mr2" @click.stop="useTplShow()">使用模板</button>
            <button class="prescription_detail_save" @click.stop="editTplShow()">编辑模板</button>
            <button class="prescription_detail_del" @click.stop="delTplShow()">删除模板</button>
          </div>
          <div v-show="showUseTpl" class="alert-back">
            <div class="use-tpl">
              <div
                style="text-align:center;padding-top:1rem;font-weight:900;font-size:1rem;color: #5f95da;"
              >确定使用[{{tplData.tplName}}]模板？</div>
              <div style="margin:1rem 0 0 2rem;font-weight:900;">使用模板将覆盖已编辑之信息</div>
              <div class="use-list mt10">
                <div
                  class="use-list-li"
                  v-for="(item,index) in tplData.items"
                  :key="index"
                >{{item.name}} ({{item.num}}{{item.unit}}/{{item.usage}})</div>
              </div>
              <div style="text-align:center;margin-top:2rem;">
                <button class="saveBtn mr20">确认</button>
                <button class="saveBtn cancelBtn" @click.stop="useTplHide()">取消</button>
              </div>
            </div>
          </div>
          <div v-show="showDelTpl" class="alert-back" style="font-size:1rem;">
            <div class="del-tpl">
              <div class="ml20 pt20">删除模板</div>
              <div class="ml20 pt10">
                <Icon type="md-help-circle" size="40" color="#3182FB"/>
                <span class="ml10">确定要删除[{{tplData.tplName}}]模板?</span>
              </div>
              <div style="position:absolute;right:5rem;bottom:2rem;">
                <span @click="delTplHide()">取消</span>
                <Button class="ml20" shape="circle" type="primary" @click="delTpl()">确定</Button>
              </div>
            </div>
          </div>
        </div>
        <div v-show="showEditTpl||showAddTpl" class="alert-back">
          <div class="edit-tpl">
            <div
              class="mt16"
              style="height:2.75rem;width:100%;text-align:center;font-weight:900;font-size:1.125rem;border-bottom:1px solid #cccccc;"
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
                  >{{item.name}}</Option>
                </Select>
              </div>
              <div class="mt20 ml20" v-show="recipeType===1">
                <span class="ml20">药品类型：</span>
                <span v-show="category==1">饮片</span>
                <span v-show="category==2">颗粒</span>
              </div>
              <div class="mt20 ml20 mr20">
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
                    <table class="col100">
                      <tbody>
                        <tr v-for="(item,index) in tplEditData.items" :key="index">
                          <td class="col10">{{index+1}}</td>
                          <td class="col30">{{item.name}}</td>
                          <td class="col10">
                            <Input v-model="item.num"/>
                          </td>
                          <td class="col15">{{item.unit_stock}}</td>
                          <td class="col10">{{item.spec}}</td>
                          <td class="col10">
                            <Select v-model="item.usage">
                              <Option
                                v-for="(item1,index) in herbalMedUsages"
                                :value="item1.name"
                                :key="index"
                              >{{item1.name}}</Option>
                            </Select>
                          </td>
                          <td class="col15">
                            <div style="color:#4181D8" @click.stop="delEditTplLists(index)">删除</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div
                    class="col100 mt10 pb10"
                    style="border-top:#B4B4B4 solid 1px;border-bottom:#B4B4B4 solid 1px;"
                  >
                    <div class="mt10 ml20">
                      <Input
                        class="col30"
                        placeholder="输入药品名称/编码/拼音码"
                        v-model="tplEditData.searchName"
                        @input="tplHerbalSearch()"
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
                  <div style="max-height:8.5rem;overflow:auto;">
                    <table class="col100">
                      <tbody>
                        <tr v-for="(item,index) in tplEditData.items" :key="index">
                          <td class="col5">{{index+1}}</td>
                          <td class="col25">{{item.name}}</td>
                          <td class="col10">{{item.spec}}</td>
                          <td class="col10">
                            <Input v-model="item.num" />
                          </td>
                          <td class="col5">{{item.unit}}</td>
                          <td class="col10">
                            <Select v-model="item.usage">
                              <Option
                                v-for="(item1,index) in westernMedUsages"
                                :value="item1.name"
                                :key="index"
                              >{{item1.name}}</Option>
                            </Select>
                          </td>
                          <td class="col10">
                            <Input v-model="item.dose_once" />
                          </td>
                          <td class="col10">
                            <Select v-model="item.frequency">
                              <Option
                                v-for="(item1,index) in medFrequency"
                                :value="item1.name"
                                :key="index"
                              >{{item1.name}}</Option>
                            </Select>
                          </td>
                          <td class="col10">
                            <Input v-model="item.days" />
                          </td>
                          <td class="col10">
                            <div style="color:#4181D8" @click.stop="delEditTplLists(index)">删除</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div
                    class="col100 mt10 pb10"
                    style="border-top:#B4B4B4 solid 1px;border-bottom:#B4B4B4 solid 1px;"
                  >
                    <div class="mt10 ml20">
                      <Input
                        class="col30"
                        placeholder="输入药品名称/编码/拼音码"
                        v-model="tplEditData.searchName"
                        @input="tplHerbalSearch()"
                      />
                    </div>
                  </div>
                  
                </div>
                <div
                  class="tpl-search-result"
                  v-show="tplEditData.searchListShow&&recipeType==1"
                  style="max-height:9.5rem;overflow:auto;"
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
                <div
                  class="tpl-search-result"
                  v-show="tplEditData.searchListShow&&recipeType==2"
                  style="max-height:9.5rem;overflow:auto;"
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

              <div class="mt20 ml20 mb20 col40" v-show="recipeType==1">饮片剂数：
                <Input style="width:10rem" name="dosage" v-model="tplEditData.dosage"/>&nbsp;&nbsp;&nbsp;剂
              </div>
              <div class="mt20 ml20 mb20">
                <label>医嘱：</label>
                <Input
                  v-model="tplEditData.doctor_remark"
                  class="ml20 col70 mb10"
                  type="textarea"
                  placeholder="请输入文字"
                  :rows="2"
                  :autosize="{minRows:2,maxRows:4}"
                />
              </div>
              <div v-show="showEditTpl" class="edit-tpl-foot">
                <Button
                  class="mr20"
                  type="primary"
                  shape="circle"
                  size="large"
                  @click.stop="saveTplEdit()"
                >保存</Button>
                <Button shape="circle" size="large" @click.stop="cancelTplEdit()">取消</Button>
              </div>
              <div v-show="showAddTpl" class="edit-tpl-foot">
                <Button
                  class="mr20"
                  type="primary"
                  shape="circle"
                  size="large"
                  @click.stop="saveTplAdd()"
                >保存</Button>
                <Button shape="circle" size="large" @click.stop="cancelTplAdd()">取消</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
import { Input, Button, Select, Option, Icon } from "iview";

import {
  westernMedUsages,
  herbalMedUsages,
  herbalRpUsages,
  extraFeeTypes,
  medFrequency
} from "@/assets/js/mapType";
export default {
  data() {
    return {
      westernMedUsages:westernMedUsages,
      medFrequency:medFrequency,
      url: {
        recentHerbal: "/doctreat/herbal/recent",
        searchHerbal: "/stockmng/medicine/herbalList",
        searchHerbalTpl: "/doctreat/tpl/herbal/list",
        updateHerbalTpl: "/doctreat/tpl/herbal/update",

        recentWestern: "/doctreat/western/recent",
        searchWestern: "/stockmng/medicine/westernList",
        searchWesternTpl: "/doctreat/tpl/western/list",
        updateWesternTpl: "/doctreat/tpl/herbal/update",

        recentTherapy: "/doctreat/therapy/recent",
        searchTherapy: "/clinicmng/therapy/list",
        searchTherapyTpl: "/doctreat/tpl/therapy/list",
        searchExtra: "/clinicmng/extraFee/list",
        recentMaterial: "/doctreat/material/recent",
        searchMaterial: "/stockmng/medicine/materialList"
      },
      arg: {
        recentHerbal: {
          category: 1
        },
        searchHerbal: {
          medicine_name: "",
          category: 1
        },
        searchHerbalTpl: {
          category: 1,
          is_cloud: 0,
          name: "",
          page: 1,
          page_size: 8
        },
        recentWestern: {},
        searchWestern: {
          medicine_name: "",
          status: 1,
          page: 1,
          page_size: 10
        },
        searchWesternTpl: {
          name: "",
          page: 1,
          page_size: 10
        },
        recentTherapy: {},
        searchTherapy: {
          name: "",
          page: 1,
          page_size: 10,
          status: 1
        },
        searchTherapyTpl: {
          name: "",
          page: 1,
          page_size: 8
        },
        recentExtra: {},
        searchExtra: {
          page: 1,
          page_size: 10,
          query: "",
          status: 1
        },
        recentMaterial: {},
        searchMaterial: {
          name: "",
          page: 1,
          page_size: 8
        }
      },
      showAddTpl: false,
      showDelTpl: false,
      showEditTpl: false,
      showUseTpl: false,
      searchName: "",
      searchTplName: "",
      in_first_tab: true,
      in_second_tab: false,
      tplSearchList: [],
      searchHerbalList: [],
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
        doctor_remark: ""
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
        searchListShow: false
      },
      tplType: [{ name: "个人", scope: 1 }, { name: "共享", scope: 0 }]
    };
  },
  computed: {
    herbalMedUsages: function() {
      return herbalMedUsages.filter(item => {
        return item.status === 1;
      });
    },
    ...mapGetters(["currRecipeData"]),

    recipeType: function() {
      return this.currRecipeData===undefined?1:this.currRecipeData.type;
    },
    category: function() {
      return this.currRecipeData===undefined?1:this.currRecipeData.category;
    }
  },
  components: {
    Input,
    Button,
    Select,
    Option,
    Icon
  },
  created() {
    this.firstSearch();
  },
  watch: {
    searchHerbalList: {
      handler: function() {},
      deep: true
    },
    "tplEditData.items": {
      deep: true,
      handler: function() {}
    },
    "tplEditData.searchLists": {
      deep: true,
      handler: function() {
        if (this.tplEditData.searchLists.length >= 1) {
          this.tplEditData.searchListShow = true;
        }
      }
    }
  },
  methods: {
    ...mapActions(["add_new_medicine"]),
    in_first: function() {
      this.in_first_tab = true;
      this.in_second_tab = false;
    },
    in_second: function() {
      this.in_second_tab = true;
      this.in_first_tab = false;
    },
    selectItem: function(item) {
      let filterList=this.currRecipeData.data.items.filter((med)=>{
        return item.id===med.item_id
      });
      console.log(filterList)
      if(filterList.length===0){
        this.add_new_medicine({ item: item, type: this.currRecipeData.type });
      }else {
        this.$Message.info("该药品已添加");
      }

    },
    firstSearch: function() {
      var self = this;
      var url = "";
      var arg = {};
      switch (this.recipeType) {
        case 1: {
          url = this.url.recentHerbal;
          arg = {
            category: this.category
          };
          break;
        }
        case 2: {
          url = this.url.recentWestern;
          arg = this.arg.recentWestern;
          break;
        }
        case 4: {
          url = this.url.recentTherapy;
          arg = this.arg.recentTherapy;
          break;
        }
        case 5: {
          url = this.url.searchExtra;
          arg = this.arg.recentExtra;
          break;
        }
        case 6: {
          url = this.url.recentMaterial;
          arg = this.arg.recentMaterial;
          break;
        }
      }
      axios.post(url, arg).then(
        function(response) {
          var res = response.data;
          if (res.code == 1000) {
            if (self.in_first_tab) {
              self.searchHerbalList = res.data;
            }
          }
        },
        function(error) {
          console.log(error);
        }
      );
      if (
        self.recipeType == 1 ||
        self.recipeType == 2 ||
        self.recipeType == 4
      ) {
        self.tplSearch();
      }
    },
    herbalSearch: function() {
      if (this.searchName == "") {
        this.searchHerbalList = [];
        return;
      }
      var self = this;

      var url = "";
      var arg = {};
      switch (this.recipeType) {
        case 1: {
          url = self.url.searchHerbal;
          arg = {
            medicine_name: self.searchName,
            category: self.category
          };
          break;
        }
        case 2: {
          url = self.url.searchWestern;
          arg = {
            medicine_name: self.searchName,
            status: 1,
            page: 1,
            page_size: 10
          };
          break;
        }
        case 4: {
          url = self.url.searchTherapy;
          arg = {
            name: self.searchName,
            page: 1,
            page_size: 8
          };
          break;
        }
        case 5: {
          url = self.url.searchExtra;
          arg = {
            page: 1,
            page_size: 10,
            query: self.searchName,
            status: 1
          };
          break;
        }
        case 6: {
          url = self.url.searchMaterial;
          arg = {
            name: self.searchName,
            page: 1,
            page_size: 8
          };
          break;
        }
      }

      /*axios
        .post("/stockmng/medicine/herbalList", {
          medicine_name: self.searchName,
          category: this.category
        })*/
      axios.post(url, arg).then(
        function(response) {
          var res = response.data;
          if (res.code == 1000) {
            if (self.in_first_tab) {
              self.searchHerbalList = res.data;
            }
            if (self.in_second_tab) {
              self.tplSearchList = res.data;
            }
          }
        },
        function(error) {
          console.log(error);
        }
      );
    },

    tplHerbalSearch: function() {
      var self = this;
      var url = '';
      var arg={};
      if (self.tplEditData.searchName == "") {
        this.tplEditData.searchListShow = false;
        return;
      }
      switch (this.recipeType) {
        case 1: {
          url = self.url.searchHerbal;
          arg = {
            medicine_name: self.tplEditData.searchName,
            category: self.category
          };
          break;
        }
        case 2: {
          url = self.url.searchWestern;
          arg = {
            medicine_name: self.tplEditData.searchName,
            status: 1,
            page: 1,
            page_size: 10
          };
          break;
        }
        case 4: {
          url = self.url.searchTherapy;
          arg = {
            name: self.tplEditData.searchName,
            page: 1,
            page_size: 8
          };
          break;
        }
      }
      axios
        .post(url, arg)
        .then(
          function(response) {
            var res = response.data;
            if (res.code == 1000) {
              self.tplEditData.searchLists = res.data;
            }
          },
          function(error) {
            console.log(error);
          }
        );
    },
    tplSearch: function() {
      var self = this;
      var url = "";
      var arg = {};
      switch (self.recipeType) {
        case 1: {
          url = self.url.searchHerbalTpl;
          arg = {
            category: self.category,
            is_cloud: 0,
            name: self.searchTplName,
            page: 1,
            page_size: 8
          };
          break;
        }
        case 2: {
          url = self.url.searchWesternTpl;
          arg = {
            name: self.searchTplName,
            page: 1,
            page_size: 10
          };
          break;
        }
        case 4: {
          url = self.url.searchTherapyTpl;
          arg = {
            name: self.searchTplName,
            page: 1,
            page_size: 8
          };
          break;
        }
      }
      axios.post(url, arg).then(
        function(response) {
          var res = response.data;
          if (res.code == 1000) {
            self.tplSearchList = res.data;
          }
        },
        function(error) {
          console.log(error);
        }
      );
    },
    tplShow: function(item) {
      this.tplData = {
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
        is_cloud: item.is_cloud
      };
      this.showTpl = true;
    },
    tplHide: function() {
      this.showTpl = false;
    },
    useTplShow: function() {
      this.showUseTpl = true;
    },
    useTplHide: function() {
      this.showUseTpl = false;
    },
    editTplShow: function() {
      var self = this;
      this.tplEditData.tplName = this.tplData.tplName;
      this.tplEditData.scope = this.tplData.scope;
      this.tplEditData.items = (function(items) {
        var newArr = [];
        items.forEach(function(item) {
          newArr.push(item);
        });
        return newArr;
      })(this.tplData.items);
      this.tplEditData.dosage = this.tplData.dosage;
      this.tplEditData.doctor_remark = this.tplData.doctor_remark;
      this.showEditTpl = true;
    },
    editTplHide: function() {
      this.showEditTpl = false;
    },
    delTplShow: function() {
      this.showDelTpl = true;
    },
    delTplHide: function() {
      this.showDelTpl = false;
    },
    delEditTplLists: function(index) {
      this.tplEditData.items.splice(index, 1);
    },
    editTplAddList: function(item) {
      var self = this;
      var flag = true;
      this.tplEditData.items.forEach(function(e) {
        if (e.name == item.name) {
          alert("该药品已在列表中");
          flag = false;
          self.tplEditData.searchLists = [];
          self.tplEditData.searchListShow = false;
          self.tplEditData.searchName = "";
        }
      });
      if (flag === true) {
        var newItem = {
          category: item.category,
          item_id: item.id,
          name: item.name,
          num: 0,
          unit: item.unit_stock,
          stock: item.stock,
          unit_stock: item.unit_stock,
          unit_sale: item.unit_sale,
          stock_sale_ratio: item.stock_sale_ratio,
          price: item.sale_price,
          sale_price: item.sale_price,
          usage: 0,
          spec: item.spec,
          is_match: 1
        };
        self.tplEditData.items.push(newItem);
        self.tplEditData.searchLists = [];
        self.tplEditData.searchListShow = false;
        self.tplEditData.searchName = "";
      }
    },
    delTpl: function() {
      var self = this;
      axios
        .post("/doctreat/tpl/herbal/delete?tplId=" + self.tplData.id, {})
        .then(function(response) {
          var res = response.data;
          if (res.code == 1000) {
            alert("删除成功");
            self.showDelTpl = false;
            self.showTpl = false;
            self.firstSearch();
          } else {
            alert("删除失败 " + res.msg);
            self.showDelTpl = false;
          }
        });
    },
    saveTplEdit: function() {
      var self = this;
      var url='';
      var arg='';
      switch(this.recipeType){
        case 1:{
          url=self.url.updateHerbalTpl;
          arg={
            category:self.category,
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
          }
        }
        case 2:{
          url=self.url.updateWesternTpl;
          arg={
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
          }
        }
      }
      axios
        .post(url, arg)
        .then(
          function(response) {
            var res = response.data;
            if (res.code == 1000) {
              alert("保存成功");
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
            }
          },
          function(error) {
            console.log(error);
          }
        );

      self.showEditTpl = false;
    },
    cancelTplEdit: function() {
      this.showEditTpl = false;
    },
    addTpl: function() {
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
    cancelTplAdd: function() {
      this.showAddTpl = false;
    },
    saveTplAdd: function() {
      var self = this;
      axios
        .post("/doctreat/tpl/herbal/add", {
          name: self.tplEditData.tplName,
          scope: self.tplEditData.scope,
          items: self.tplEditData.items,
          dosage: self.tplEditData.dosage,
          doctor_remark: self.tplEditData.doctor_remark,
          category: self.category,
          is_cloud: 0
        })
        .then(
          function(response) {
            var res = response.data;
            if (res.code == 1000) {
              alert("添加成功");
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
            }
          },
          function(error) {
            console.log(error);
          }
        );
    }
  }
};
</script>
<style scoped>
.prescript-title {
  height: 2rem;
  background: rgba(225, 225, 225, 1);
  color: rgba(140, 140, 140, 1);
  font-weight: bold;
  font-size: 1rem;
  border-radius: 0.5rem 0.5rem 0rem 0rem;
  text-align: center;
  line-height: 2rem;
}
.current-tab {
  background: rgba(77, 188, 137, 1);
  color: rgba(255, 255, 255, 1);
}
.prescript-list {
  margin: 0.3125rem 0;
  text-align: center;
  line-height: 2rem;
  border-radius: 0.25rem;
  border: 1px solid #5096e0;
  width: 100%;
  height: 2rem;
  font-size: 0.875rem;
}

.search-result .herbal-result-li {
  width: 31.5%;
  height: 3.75rem;
  border: #5096e0 solid 1px;
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
  border: #5096e0 solid 1px;
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
.search-result .no-stock {
  border: 0;
  background-color: #dadada;
  color: #5e5e5e;
}
.tpl-show {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  background: white;
  top: 2rem;
  box-shadow: 0 0.125rem 0.25rem 0 rgba(80, 150, 224, 0.2);
}
.tpl-show span {
  font-size: 0.875rem;
}
.tpl-show .item-list {
  margin-left: 2%;
  max-height: 15rem;
  overflow: auto;
}
.tpl-show .item-list .item-list-li {
  width: 31.5%;
  height: 3.75rem;
  border: #5096e0 solid 1px;
  border-radius: 0.25rem;
  float: left;
  margin-right: 1%;
  margin-bottom: 0.25rem;
  text-align: center;
  justify-content: center;
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 900;
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
  top: 6rem;
  width: 50rem;
  min-height: 15rem;
  max-height: 40rem;
  font-size: 1rem;
  overflow: auto;
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
  top: 3rem;
  width: 68.75rem;
  min-height: 15rem;
  max-height: 40rem;
  font-size: 1rem;
  overflow: auto;
}
.use-tpl .use-list {
  display: flex;
  flex-wrap: wrap;
  margin-left: 2rem;
  font-size: 1rem;
}
.use-tpl .use-list .use-list-li {
  width: 33.3%;
  font-size: 1rem;
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
  border: #5096e0 solid 1px;
  border-radius: 0.25rem;
  margin-right: 0.25rem;
  text-indent: 0.625rem;
  outline: none;
}
.prescription_detail_save {
  margin-left: 2%;
  width: 30%;
  height: 2rem;
  border: #5096e0 solid 1px;
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
  border: #fc3b3b solid 1px;
  border-radius: 1.875rem;
  text-align: center;
  color: #fc3b3b;
  float: left;
  background-color: transparent;
  font-size: 1rem;
}
.prescription_detail_btn {
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-size: 15px;
  text-align: center;
  border-radius: 4px;
  color: #fff;
  background: #eeae1d;
}
.saveBtn {
  font-size: 16px;
  color: #ffffff;
  font-weight: bold;
  width: 140px;
  text-align: center;
  padding: 9px 0;
  background: #5096e0;
  border-radius: 100px;
  border: none;
}
.cancelBtn {
  background: #ffffff;
  border: 1px solid #5096e0;
  color: #5096e0;
}
.add_prescription_btn {
  width: 100%;
  height: 40px;
  line-height: 40px;
  background: #eeae1d;
  color: #fff;
  font-size: 16px;
  text-align: center;
  border-radius: 4px;
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
  border: #5096e0 solid 1px;
  border-radius: 0.25rem;
  text-align: center;
}
tbody tr {
  border-bottom: #c1c1c1 solid 1px;
}
tbody td {
  padding: 0.625rem 0 !important;
}
.edit-tpl-foot {
  border-top: #ccc solid 1px;
  text-align: center;
  padding: 1.25rem 0;
}
.tpl-search-result {
  position: absolute;
  z-index: 4396;
  width: 45%;
  top: 20%;
  left: 35%;
  background-color: white;
  max-height: 12.5rem;
  overflow-y: scroll;
  box-shadow: 0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.2);
  border-radius: 0.25rem;
}
.text-center {
  text-align: center;
}
</style>
