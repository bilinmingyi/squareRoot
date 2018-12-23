<template>
  <div class="mt5 ml6 mr6 mb5">
    <div class="mb6" style="width:100%;display:flex;height:2rem;font-size:1rem;">
      <div class="col70 mr10">
        <Input placeholder="药品名称/拼音简码" v-model="searchName"/>
      </div>
      <div class="col20">
        <Button @click="searchMed()">搜索</Button>
      </div>
    </div>
    <div class="search-result">
      <div
        :class="[{'no-stock':item.stock<1},{'herbal-result-li':recipeType===1},{'search-result-li':recipeType!=1}]"
        v-for="(item,index) in searchList"
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
          v-show="recipeType==4"
        >{{item.alias_name||item.name}}&emsp;({{item.price||item.sale_price}}元/{{item.unit_sale}})</div>
        <div
          v-show="recipeType==6"
        >{{item.clinic_alias_name||item.name}}&emsp;({{item.price||item.sale_price}}元/{{item.unit_sale}})</div>
      </div>
      <div class="mt10" style="text-align:center;font-size:1rem;" v-show="searchList.length<1">暂无药品</div>
    </div>
  </div>
</template>

<script>
import { Input, Button } from "iview";
import { mapGetters, mapActions } from "vuex";
import { searchMed, searchRecentMed } from "@/fetch/api.js";
export default {
  name: "medSearch",
  components: {
    Button,
    Input
  },
  data() {
    return {
      searchName: "",
      searchList: []
    };
  },
  watch: {
    recipeType: function() {
      this.searchName = "";
      this.searchList=[];
      this.firstSearch();
    },
    category: function() {
      alert(this.category);
      this.searchName = "";
      this.searchList=[];
      this.firstSearch();
    },
    searchList: {
      handler: function() {},
      deep: true
    }
  },
  computed: {
    ...mapGetters(["currRecipeData"]),
    recipeType: function() {
      return this.currRecipeData === undefined ? 1 : this.currRecipeData.type;
    },
    category: function() {
      return this.currRecipeData === undefined
        ? 1
        : this.currRecipeData.category;
    }
  },
  created() {
    this.firstSearch();
  },
  methods: {
    ...mapActions(["add_new_medicine"]),
    selectItem: function(item) {
      let filterList = this.currRecipeData.data.items.filter(med => {
        return item.id === med.item_id;
      });
      if (filterList.length === 0) {
        this.add_new_medicine({ item: item, type: this.currRecipeData.type });
      } else {
        this.$Message.info("该药品已添加");
      }
    },
    firstSearch: function() {
      var self = this;
      self.searchList = [];
      searchRecentMed(
        {
          category: self.category
        },
        self.recipeType
      ).then(
        function(res) {
          if (res.code == 1000) {
            
            res.data.forEach(function(e) {
              self.searchList.push(e);
            });
          }
        },
        function(error) {
          console.log(error);
        }
      );
    },
    searchMed: function() {
      if (this.searchName == "") {
        this.firstSearch();
        return;
      }
      var self = this;
      var params = {};
      switch (this.recipeType) {
        case 1: {
          params = {
            medicine_name: self.searchName,
            category: self.category,
            status: 1,
            page: 1,
            page_size: 10
          };
          break;
        }
        case 2: {
          params = {
            medicine_name: self.searchName,
            status: 1,
            page: 1,
            page_size: 10
          };
          break;
        }
        case 4: {
          params = {
            name: self.searchName,
            page: 1,
            page_size: 8
          };
          break;
        }
        case 5: {
          params = {
            page: 1,
            page_size: 10,
            query: self.searchName,
            status: 1
          };
          break;
        }
        case 6: {
          params = {
            name: self.searchName,
            page: 1,
            page_size: 8
          };
          break;
        }
      }
      searchMed(params, this.recipeType).then(
        function(res) {
          if (res.code == 1000) {
            self.searchList = [];
            res.data.forEach(function(e) {
              self.searchList.push(e);
            });
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