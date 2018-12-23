<template>
  <div style="margin-top: 2rem;">
    <div>
      <div style="display: flex;background-color: #f2f2f2;">
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
    </div>
    <div class="right-content">
      <med-search v-show="in_first_tab"></med-search>
      <tpl v-show="in_second_tab"></tpl>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import medSearch from '@/components/rootRight/medSearch.vue'
import tpl from '@/components/rootRight/tpl.vue'
  export default {
    name: "rootRight",
    components: {
    medSearch,
    tpl
  },
    data (){
      return{
      in_first_tab: true,
      in_second_tab: false,
      }
      
    },
    computed:{
    ...mapGetters(["currRecipeData"]),
      recipeType: function() {
        return this.currRecipeData===undefined?1:this.currRecipeData.type;
    },
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
    }
  }
</script>

<style scoped>
.right-content{
  background: white;
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
