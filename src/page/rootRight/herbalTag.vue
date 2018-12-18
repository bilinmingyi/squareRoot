<template>
  <div class="herbal-tag">
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
      <Input style="width:75%;" placeholder="药品名称/拼音简码"/>
      <Button style="width:20%;float:right;" type="primary" class="ml8" @click="herbalSearch()">搜索</Button>

      <div class="search_result">
        <div class="search_result_li" v-for="(item,index) in searchHerbalList" :key="index" @click.stop="selectHerbalItem(item)">
          {{item.name}}
          <br>
          {{item.spec}}
        </div>
      </div>
    </div>

    <div v-show="in_second_tab" class="mt5 ml6 mr6 mb5">
      <div class="prescript_list">添加模板</div>
      <div style="min-height:10rem;max-height:30rem;overflow:auto;">
        <div class="prescript_list" v-for="(item,index) in prescript_list" :key="index" @click.stop="selectRecipePrescript(item)">{{item}}</div>
      </div>
      <div v-show="prescript_list.length<1">没有相关处方模板</div>
    </div>
  </div>
</template>

<script>
import { Input, Button } from "iview";
export default {
  data() {
    return {
      in_first_tab: true,
      in_second_tab: false,
      prescript_list: ["一二三四", "一二三四", "一二三四", "一二三四"],
      searchHerbalList: [
        { name: "生姜", spec: "2g/包" },
        { name: "半夏", spec: "2g/包" },
        { name: "甘草", spec: "2g/包" },
        { name: "甘草", spec: "2g/包" }
      ],


      herbalData: {
            herbalBtn: 1,
            appContext: null,      // use for this
            recipe: {},       // 关联处方
            showBox: false,     // 是否显示编辑页
            searchShow: false,  // 中药药品搜索弹框显隐
            searchName: '',
            searchList: [],     // 存放查询返回数据
            tplsearchList: [],
            searchTimer: null,  // 搜索定时器
            historyType: '',
            historyMach: [],//历史处方导入数组匹配
            //常用药分页常量
            isUsed: false,
            Usedpage: 0,
            UsedpageSize: 0,
            UsedtotalPageNum: 0,
            UsedcompleteFirst: false,
            UsedMedList: [],
            totalPageNum: 0,
            page: 1,
            pageSize: 20,
            completeFirst: false,
            tpl_is_cloud: '',
            rpUsages: window.baseInfo.herbalRpUsages,
            medUsages: window.baseInfo.herbalMedUsages,
            extraFeeTypes: window.baseInfo.extraFeeTypes,
            itemPrice: 0, // 药物总价
            iscloudPrice: 0,
            //iscloudextraid:'',
            isExtraPrice: 0,
            isExtraFirst: true,
        },
    };
  },
  components: {
    Input,
    Button
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
    selectRecipePrescript: function(item){
        alert(item);
    },
    herbalSearch: function(){
        
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
  max-height: 40rem;
}
.search_result .search_result_li {
  width: 30%;
  text-align: center;
  border: 1px solid #5096e0;
  border-radius: 0.25rem;
  margin: 0.25rem 0.25rem;
  font-size: 1rem;
}
</style>