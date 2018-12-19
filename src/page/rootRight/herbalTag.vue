<template>
  <div class="herbal-tag" style="position:relative;">
    <div style="display: flex;">
      <div
        style="flex: 1;"
        :class="['prescript-title',{'current-tab':in_first_tab}]"
        @click.stop="in_first"
      >药品搜索</div>
      <div
        style="flex: 1;"
        :class="['prescript-title',{'current-tab':in_second_tab}]"
        @click.stop="in_second"
      >处方模板</div>
    </div>
    <div v-show="in_first_tab" class="mt5 ml6 mr6 mb5">
      <div class="mb6" style="width:100%;display:flex;height:2rem;">
        <input class="search-input" placeholder="药品名称/拼音简码" v-model="searchName">
        <button class="search-btn" @click="herbalSearch()">搜索</button>
      </div>
      <div class="search-result">
        <div
          class="search-result-li"
          :class="[{'no-stock':item.stock<1}]"
          v-for="(item,index) in searchHerbalList"
          :key="index"
          @click.stop="selectHerbalItem(item)"
        >
          {{item.name}}
          <br>
          {{item.spec}}
        </div>
      </div>
    </div>

    <div v-show="in_second_tab" class="mt5 ml6 mr6 mb5">
      <div class="mb6" style="width:100%;display:flex;height:2rem;">
        <input placeholder="请输入模板名称" type="text" class="search-input" v-model="searchTplName">
        <div class="search-btn" @click="tplSearch()">搜索</div>
      </div>
      <span class="add_prescription_btn">添加模板</span>
      <div style="min-height:20rem;max-height:45rem;overflow:auto;">
        <div
          class="prescript-list"
          v-for="(item,index) in tplSearchList"
          :key="index"
          @click.stop="tplShow(item)"
        >{{item.name}}</div>
        <div v-show="tplSearchList.length<1">没有相关处方模板</div>

        <div class="tpl-show mt5" v-show="showTpl">
          <div class="prescription_detail_btn">返回</div>
          <div class="ml16 mr16 mt16">
            <span style="font-weight:900;">处方模板：</span>
            <span>{{tplData.tplName}}</span>
            <span v-show="tplData.scope==0">共享模板</span>
            <span v-show="tplData.scope==1" style="float:right;">个人模板</span>
          </div>
          <div class="item-list mt16">
            <div class="item-list-li" v-for="(item,index) in tplData.items" :key="index">
              {{item.name}}
              <br>
              （{{item.num}}{{item.unit}}）
            </div>
          </div>
          <div class="mt10 ml6 mr6">
            <span>剂数：</span>
            <span>{{tplData.dosage}}剂</span>
          </div>
          <div class="mt10 ml6 mr6">
            <span>医嘱：</span>
            <span>{{tplData.doctor_remark}}</span>
          </div>
          <div>
            <button class="prescription_detail_save mr2" @click.stop="useTplShow()">使用模板</button>
            <button class="prescription_detail_save" @click.stop="editTplShow()">编辑模板</button>
            <button class="prescription_detail_del">删除模板</button>
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
          <div v-show="showEditTpl" class="alert-back">
            <div class="edit-tpl">
              <div
                class="mt16"
                style="height:2.75rem;width:100%;text-align:center;font-weight:900;font-size:1.125rem;border-bottom:1px solid #cccccc;"
              >编辑模板</div>
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
                    <Option value="0">共享</Option>
                    <Option value="1">个人</Option>
                  </Select>
                </div>
                <div class="mt20 ml20">
                  <span class="ml20">药品类型：</span>
                  <span>饮片</span>
                  <span>颗粒</span>
                </div>
                <div class="mt20 ml20 mr20">
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
                            <input class="diagnosis_input" v-model="item.num">
                          </td>
                          <td class="col15">{{item.unit}}</td>
                          <td class="col10">{{item.spec}}</td>
                          <td class="col10">
                            <input class="diagnosis_input" v-model="item.usage">
                          </td>
                          <td class="col15">
                            <div style="color:#4181D8" @click.stop="delEditTplLists(index)">删除</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="col100 mt10" style="border-top:#B4B4B4 solid 1px;">
                    <div class="mt10 ml20">
                      <input
                        type="text"
                        class="diagnosis_input col30"
                        placeholder="输入药品名称/编码/拼音码"
                        v-model="tplEditData.searchName"
                        @input="tplEditSearch(search,100)"
                        style
                      >
                    </div>
                  </div>
                </div>
                <div class="tpl-search-result">
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
                        :click="editTplAddList(item)"
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
                <div class="mt20 ml20 mb20">
                  <label for="dosage">饮片剂数：</label>
                  <input
                    class="diagnosis_input col5 mr5"
                    name="dosage"
                    v-model="tplEditData.dosage"
                  >剂
                </div>
                <div class="mt20 ml20 mb20">
                  <label>医嘱：</label>
                  <Input
                    class="ml20 col70 mb10"
                    type="textarea"
                    placeholder="请输入文字"
                    :rows="2"
                    :autosize="{minRows:2,maxRows:4}"
                  />
                </div>
                <div class="edit-tpl-foot">
                  <Button
                    class="mr20"
                    type="primary"
                    shape="circle"
                    size="large"
                    @click="saveTplEdit()"
                  >保存</Button>
                  <Button shape="circle" size="large" @click="cancelTplEdit()">取消</Button>
                </div>
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
import { Input, Button, Select, Option } from "iview";
export default {
  data() {
    return {
      showEditTpl: false,
      showUseTpl: false,
      category: 1,
      searchName: "",
      searchTplName: "",
      in_first_tab: true,
      in_second_tab: false,
      tplSearchList: [],
      searchHerbalList: [],
      showTpl: false,
      tplData: {
        tplName: "",
        scope: 0,
        items: [],
        dosage: 0,
        doctor_remark: ""
      },
      tplEditData: {
        tplName: "",
        scope: 0,
        items: [],
        dosage: 0,
        doctor_remark: "",
        searchName: "",
        searchLists: [],
        category: 1
      }
    };
  },
  components: {
    Input,
    Button,
    Select,
    Option
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
    }
  },
  methods: {
    in_first: function() {
      this.in_first_tab = true;
      this.in_second_tab = false;
    },
    in_second: function() {
      this.in_second_tab = true;
      this.in_first_tab = false;
    },
    selectHerbalItem: function(item) {
      alert(item);
    },
    selectRecipePrescript: function(item) {
      alert(item);
    },
    firstSearch: function() {
      var self = this;
      axios
        .post("/doctreat/herbal/recent", {
          medicine_name: self.searchName,
          category: this.category
        })
        .then(
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
      self.tplSearch();
    },
    herbalSearch: function() {
      var self = this;
      axios
        .post("/stockmng/medicine/herbalList", {
          medicine_name: self.searchName,
          category: this.category
        })
        .then(
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
    tplSearch: function() {
      var self = this;
      axios
        .post("/doctreat/tpl/herbal/list", {
          name: self.searchTplName,
          category: this.category
        })
        .then(
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
    search: function() {
      var self = this;
      console.log(self.tplEditData.searchName, elf.tplEditData.category);
      axios
        .post("/stockmng/medicine/herbalList", {
          medicine_name: self.tplEditData.searchName,
          category: self.tplEditData.category
        })
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
    tplEditSearch: function(func, delay) {
      var timer = null;
      return function() {
        clearTimeout(timer);
        var context = this;
        timer = setTimeout(function() {
          func.apply(context);
        }, delay);
      };
    },
    tplShow: function(item) {
      this.tplData = {
        tplName: item.name,
        scope: item.scope,
        items: item.items,
        dosage: item.dosage,
        doctor_remark: item.doctor_remark
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
      this.showEditTpl = true;
      var self = this;
      this.tplEditData = {
        tplName: self.tplData.tplName,
        scope: self.tplData.scope,
        items: (function(items) {
          var newArr = [];
          items.forEach(function(item) {
            newArr.push(item);
          });
          return newArr;
        })(self.tplData.items),
        dosage: self.tplData.dosage,
        doctor_remark: self.tplData.doctor_remark
      };
    },
    editTplHide: function() {
      this.showEditTpl = false;
    },
    delEditTplLists: function(index) {
      this.tplEditData.items.splice(index, 1);
    },
    editTplAddList: function(item) {
      this.tplEditData.items.forEach(function(e) {
        if (e.name == item.name) {
          alert("该药品已在列表中");
          return;
        } else {
          this.tplEditData.items.push(item);
        }
      });
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
  font-size: 1rem;
}

.search-result .search-result-li {
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
  font-size: 1rem;
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
  top: 15%;
  width: 50%;
  min-height: 15rem;
  max-height: 40rem;
  font-size: 1rem;
  overflow: auto;
}
.alert-back .edit-tpl {
  background: #ffffff;
  box-shadow: 0 0.25rem 1rem 0.25rem rgba(0, 0, 0, 0.2);
  border-radius: 0.25rem;
  z-index: 1050;
  margin: 0 auto;
  position: relative;
  top: 8%;
  width: 80%;
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
</style>