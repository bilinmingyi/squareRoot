<template>
  <div class="right-block">
    <div>
      <div style="display: flex;background-color: #f2f2f2;">
        <div
          v-show="recipeType==1||recipeType==2||recipeType==4||recipeType==6"
          style="flex: 1;"
          :class="['prescript-title',{'current-tab':tabType == 1}]"
          @click.stop="changeTab(1)"
        >
          <span v-show="recipeType==1||recipeType==2">药品搜索</span>
          <span v-show="recipeType==4">项目搜索</span>
          <span v-show="recipeType==6">材料搜索</span>
        </div>
        <div
          v-show="recipeType==1||recipeType==2||recipeType==4||recipeType==0"
          style="flex: 1;"
          :class="['prescript-title',{'current-tab':tabType == 2}]"
          @click.stop="changeTab(2)"
        >
          <span v-show="recipeType!=0">处方模板</span>
          <span v-show="recipeType==0">病历模板</span>
        </div>
        <div
          style="flex: 1;"
          v-show="recipeType == 1"
          :class="['prescript-title',{'current-tab':tabType == 3}]"
          @click.stop="changeTab(3)"
        >
          <span>经典方剂</span>
        </div>
      </div>
    </div>
    <div class="right-content">
      <keep-alive>
        <component :is="componentLists[(Number(tabType)-1)]"></component>
      </keep-alive>

    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from "vuex";
  import medSearch from "@/components/rootRight/medSearch.vue";
  import tpl from "@/components/rootRight/tpl.vue";
  import classic from "@/components/rootRight/classic.vue"

  export default {
    name: "rootRight",
    components: {
      medSearch,
      tpl,
      classic
    },
    data() {
      return {
        tabType:1,
        componentLists:['medSearch','tpl','classic']
      };
    },
    created() {
      if (this.recipeType == 0) {
        this.tabType = 2;
      } else {
        this.tabType = 1;
      }
    },
    computed: {
      ...mapGetters(["currRecipeData"]),
      recipeType: function () {
        return this.currRecipeData === undefined ? 0 : this.currRecipeData.type;
      }
    },
    watch: {
      recipeType: function () {
        if (this.recipeType == 0) {
          this.changeTab(2);
        } else {
          this.changeTab(1);
        }
      }
    },
    methods: {
      changeTab(type){
        this.tabType = type;
      }
    }
  };
</script>

<style scoped>
  .right-content {
    background: white;
  }

  .right-block {
    margin-bottom: 1.25rem;
    box-shadow: 0px 2px 4px 0px rgba(80, 150, 224, 0.32);
  }

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
</style>
