<template>
  <div class="mt5 ml6 mr6 mb5">
    <div class="mb6" style="width:100%;display:flex;height:2rem;font-size:1rem;">
        <div class="col70 mr10">
          <Input placeholder="药品名称/拼音简码" v-model="searchName"/>
        </div>
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
</template>

<script>
import { Input, Button } from "iview";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "medSearch",
  components: {
      Button,
      Input
  },
  data() {
    return {
        searchName: '',
        searchHerbalList: [],
    };
  },
  computed:{
        ...mapGetters(["currRecipeData"]),
        recipeType: function() {
            return this.currRecipeData===undefined?1:this.currRecipeData.type;
        },
  },
  methods: {}
};
</script>

<style scoped>
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
</style>