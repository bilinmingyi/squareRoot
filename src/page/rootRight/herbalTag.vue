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
        <input class="search-input" placeholder="药品名称/拼音简码" v-model="searchName"/>
        <button class="search-btn" @click="herbalSearch()">搜索</button>
      </div>
      <div class="search-result">
        <div
          class="search-result-li"
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
      <Input style="width:75%;" placeholder="请输入模板名称" v-model="searchTplName"/>
      <Button style="width:20%;float:right;" type="primary" class="ml8" @click="tplSearch()">搜索</Button>
      <div class="prescript_list">添加模板</div>
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
            <span>剂数： </span>
            <span>{{tplData.dosage}}剂</span>
          </div>
          <div class="mt10 ml6 mr6">
            <span>医嘱： </span>
            <span>{{tplData.doctor_remark}}</span>
          </div>
          <div>
              <button class="prescription_detail_save mr2" @click.stop="useTplShow()">使用模板</button>
              <button class="prescription_detail_save" @click.stop="editTplShow()">编辑模板</button>
              <button class="prescription_detail_del">删除模板</button>
          </div>
          <div v-show="showUseTpl" class="alert-back">
              <div class="use-tpl">
                  <div style="text-align:center;padding-top:1rem;font-weight:900;font-size:1rem;color: #5f95da;">确定使用[{{tplData.tplName}}]模板？</div>
                  <div style="margin:1rem 0 0 2rem;font-weight:900;">使用模板将覆盖之前所编辑之信息</div>
                  <div class="use-list mt10">
                      <div class="use-list-li" v-for="(item,index) in tplData.items" :key="index">{{item.name}}  ({{item.num}}{{item.unit}}/{{item.usage}})</div>
                  </div>
                  <div style="text-align:center;margin-top:2rem;">
                      <button class="saveBtn mr20">确认</button>
                      <button class="saveBtn cancelBtn" @click.stop="useTplHide()">取消</button>
                  </div>
              </div>
          </div>
          <div v-show="showEditTpl" class="alert-back">
              <div class="edit-tpl">
                  <div class="mt16" style="height:2.75rem;width:100%;text-align:center;font-weight:900;font-size:1.125rem;border-bottom:1px solid #cccccc;">编辑模板</div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { Input, Button } from "iview";
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
      }
    };
  },
  components: {
    Input,
    Button
  },
  created(){
      this.firstSearch();
  },
  watch: {
    searchHerbalList: {
      handler: function() {},
      deep: true
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
      axios.post("/doctreat/herbal/recent", {
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
        this.showUseTpl=true;
    },
    useTplHide: function() {
        this.showUseTpl=false;
    },
    editTplShow: function() {
        this.showEditTpl=true;
    },
    editTplHide: function() {
        this.showEditTpl=false;
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
    font-weight:900;
}
.alert-back{
    width:100%;
    height: 100%;
    position: fixed;
    top:0px;
    left: 0px;
    z-index: 1000;
    background: rgba(255,255,255,0.50);
}
.alert-back .use-tpl{
    background: #FFFFFF;
    box-shadow: 0 0.25rem 1rem 0.25rem rgba(0,0,0,0.20);
    border-radius: 0.25rem;
    z-index: 1050;
    margin: 0 auto;
    position: relative;
    top:15%;
    width:50%;
    min-height: 15rem;
    max-height: 40rem;
    font-size: 1rem;
    overflow: auto;
}
.alert-back .edit-tpl{
    background: #FFFFFF;
    box-shadow: 0 0.25rem 1rem 0.25rem rgba(0,0,0,0.20);
    border-radius: 0.25rem;
    z-index: 1050;
    margin: 0 auto;
    position: relative;
    top:15%;
    width:80%;
    min-height: 15rem;
    max-height: 40rem;
    font-size: 1rem;
    overflow: auto;
}
.use-tpl .use-list{
    display:flex;
    flex-wrap: wrap;
    margin-left: 2rem;
    font-size: 1rem;
}
.use-tpl .use-list .use-list-li{
    width:33.3%;
    font-size: 1rem
}
.search-btn{
    width: 20%;
    height: 2rem;
    background: #5096E0;
    border-radius: 0.25rem;
    color: #fff;
    display: block;
    text-align: center;
    font-size: 1rem;
    line-height: 2rem;
}
.search-input{
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
    height:2rem;
    border: #5096E0 solid 1px;
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
    height:2rem;
    border: #FC3B3B solid 1px;
    border-radius: 1.875rem;
    text-align: center;
    color: #FC3B3B;
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
    background: #EEAE1D;
}
.saveBtn {
    font-size: 16px;
    color: #FFFFFF;
    font-weight: bold;
    width: 140px;
    text-align: center;
    padding: 9px 0;
    background: #5096E0;
    border-radius: 100px;
    border: none;
}
.cancelBtn {
    background: #FFFFFF;
    border: 1px solid #5096E0;
    color: #5096E0;
}
</style>