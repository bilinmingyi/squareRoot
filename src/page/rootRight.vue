<template>
  <div class="right-block">
    <div>
      <div style="display: flex;">
        <div
          v-show="recipeType==0"
          :class="['prescript-title',{'current-tab':tabType == 4}]"
          @click.stop="changeTab(4)"
        >
          <span>{{clinicType == 6 ? '调查表' : '问诊表'}}</span>
        </div>
        <div
          v-show="recipeType==1||recipeType==2||recipeType==3||recipeType==4||recipeType==6"
          :class="['prescript-title',{'current-tab':tabType == 1}]"
          @click.stop="changeTab(1)"
        >
          <span v-show="recipeType==1||recipeType==2">药品搜索</span>
          <span v-show="recipeType==3">产品搜索</span>
          <span v-show="recipeType==4">项目搜索</span>
          <span v-show="recipeType==6">材料搜索</span>
        </div>
        <div
          v-show="recipeType==1||recipeType==2||recipeType==4||recipeType==0"
          :class="['prescript-title', 'margin-lr', {'current-tab':tabType == 2}]"
          @click.stop="changeTab(2)"
        >
          <span v-show="recipeType!=0">处方模板</span>
          <span v-show="recipeType==0">{{clinicType == 6 ? '档案' : '病历'}}模板</span>
        </div>
        <div
          style="flex: 1;"
          :class="['prescript-title',{'current-tab':tabType == 3}]"
          @click.stop="changeTab(3)"
        >
          <span>{{recipeType == 0 ? '常用模板' : '常用处方'}}</span>
        </div>
      </div>
    </div>
    <div class="right-content">
      <component :is="componentLists[(Number(tabType)-1)]"></component>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import medSearch from "@/components/rootRight/medSearch.vue";
import tpl from "@/components/rootRight/tpl.vue";
import commonTemplate from "@/components/rootRight/commonTemplate.vue"
import outpatientTable from "@/components/rootRight/outpatientTable.vue"

export default {
  name: "rootRight",
  components: {
    medSearch,
    tpl,
    outpatientTable,
    commonTemplate
  },
  data() {
    return {
      tabType: 1,
      componentLists: ['medSearch', 'tpl', 'commonTemplate', 'outpatientTable']
    };
  },
  created() {
    if (this.recipeType == 0) {
      this.tabType = 4;
    } else {
      this.tabType = 1;
    }
  },
  computed: {
    ...mapState({
      clinicType: state => state.clinicType
    }),
    ...mapGetters(["currRecipeData"]),
    recipeType: function () {
      return this.currRecipeData === undefined ? 0 : this.currRecipeData.type;
    }
  },
  watch: {
    recipeType: function () {
      if (this.recipeType == 0) {
        this.changeTab(4);
      } else {
        this.changeTab(1);
      }
    }
  },
  methods: {
    changeTab(type) {
      this.tabType = type;
    }
  }
};
</script>

<style scoped>
  .right-content {
    background: white;
    height: calc(100% - 32px);
  }

  .right-block {
    margin-bottom: 1.25rem;
    box-shadow: 0px 2px 4px 0px rgba(80, 150, 224, 0.32);
    border-radius: 0.5rem 0.5rem 0rem 0rem;
  }

  .prescript-title {
    height: 2rem;
    background: #e1e1e1;
    color: rgba(140, 140, 140, 1);
    font-weight: bold;
    font-size: 1rem;
    border-radius: 0.25rem 0.25rem 0rem 0rem;
    text-align: center;
    line-height: 2rem;
    cursor: pointer;
    flex: 1;
  }

  .margin-lr {
    margin: 0 0.0625rem;
  }

  .current-tab {
    background: rgba(77, 188, 137, 1);
    color: rgba(255, 255, 255, 1);
  }
</style>
