<template>
  <div class="herbal-tag" style="position:relative;">
    <div style="display: flex;">
      <div
        style="flex: 1;"
        :class="['prescript_title',{'current_tab':in_first_tab}]"
        @click.stop="in_first"
      >药品搜索</div>
      <div
        style="flex: 1;"
        :class="['prescript_title',{'current_tab':in_second_tab}]"
        @click.stop="in_second"
      >处方模板</div>
    </div>
    <div v-show="in_first_tab" class="mt5 ml6 mr6 mb5">
      <Input style="width:75%;" placeholder="药品名称/拼音简码" v-model="searchName"/>
      <Button style="width:20%;float:right;" type="primary" class="ml8" @click="herbalSearch()">搜索</Button>

      <div class="search_result">
        <div
          class="search_result_li"
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
          class="prescript_list"
          v-for="(item,index) in tplSearchList"
          :key="index"
          @click.stop="tplShow(item)"
        >{{item.name}}</div>
        <div v-show="tplSearchList.length<1">没有相关处方模板</div>

        <div class="tpl-show mt5" v-show="showTpl">
          <Button type="warning" long @click.stop="tplHide()">返回</Button>
          <div class="ml16 mr16 mt16">
            <span style="font-weight:900;">处方模板：</span>
            <span>{{tplData.tplName}}</span>
            <span v-show="tplData.scope==0" style="float:right;">共享模板</span>
            <span v-show="tplData.scope==1" style="float:right;">个人模板</span>
          </div>
          <div class="item_list mt16">
            <div class="item_list_li" v-for="(item,index) in tplData.items" :key="index">
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
          <div class="btn mt10 ml16">
              <Button type="primary" shape="circle" ghost @click.stop="useTplShow()">使用模板</Button>
              <Button type="primary" shape="circle" ghost>编辑模板</Button>
              <Button type="error" shape="circle" ghost>删除模板</Button>
          </div>
          <div v-show="showUseTpl" class="alert-back">
              <div class="use-tpl">
                  <div style="text-align:center;padding-top:1rem;font-width:bold;font-size:1rem;color: #5f95da;">确定使用[{{tplData.tplName}}]模板？</div>
                  <div style="margin:1rem 0 0 2rem;">使用模板将覆盖之前所编辑之信息</div>
                  <div class="item-list mt10">
                      <div class="item-list-li" v-for="(item,index) in tplData.items" :key="index">{{item.name}}  {{item.num}}{{item.unit}}/{{item.usage}}</div>
                  </div>
                  <div style="text-align:center;margin-top:3rem;">
                      <Button type="primary" shape="circle">确定</Button>
                      <Button type="primary" shape="circle" ghost @click.stop="useTplHide()">取消</Button>
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
import { Input, Button } from "iview";
export default {
  data() {
    return {
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
      this.tplSearch();
      this.herbalSearch();
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
    }
  }
};
</script>

<style scoped>
.prescript_title {
  height: 2rem;
  background: rgba(225, 225, 225, 1);
  color: rgba(140, 140, 140, 1);
  font-weight: bold;
  font-size: 1rem;
  border-radius: 0.5rem 0.5rem 0rem 0rem;
  text-align: center;
  line-height: 2rem;
}
.current_tab {
  background: rgba(77, 188, 137, 1);
  color: rgba(255, 255, 255, 1);
}
.prescript_list {
  margin: 0.3125rem 0;
  text-align: center;
  line-height: 2rem;
  border-radius: 0.25rem;
  border: 1px solid #5096e0;
  width: 100%;
  height: 2rem;
  font-size: 1rem;
}
.search_result {
  display: flex;
  flex-wrap: wrap;
  max-height: 35rem;
  overflow: auto;
}
.search_result .search_result_li {
  width: 30%;
  text-align: center;
  border: 1px solid #5096e0;
  border-radius: 0.25rem;
  margin: 0.25rem 0.25rem;
  font-size: 1rem;
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
.item_list {
  display: flex;
  flex-wrap: wrap;
  max-height: 35rem;
  overflow: auto;
}
.item_list .item_list_li {
  width: 30%;
  text-align: center;
  border: 1px solid #5096e0;
  border-radius: 0.25rem;
  margin: 0.25rem 0.25rem;
  font-size: 1rem;
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
.use-tpl .item-list{
    display:flex;
    flex-wrap: wrap;
    margin-left: 2rem;
}
.use-tpl .item-list .item-list-li{
    width:33%;
}
</style>