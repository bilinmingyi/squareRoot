<template>
  <div class="mt5 ml6 mr6 mb5">
    <div class="mb6" style="width:100%;display:flex;height:2rem;font-size:1rem;">
      <div class="col70 mr10">
        <Input @input="searchMed()" placeholder="药品名称/拼音简码" v-model="searchName"/>
      </div>
      <div class="col20">
        <Button @click="searchMed()">搜索</Button>
      </div>
    </div>
    <div class="search-result" v-show="showResult">
      <div
        :class="[{'no-stock':item.stock<1},{'herbal-result-li':recipeType===1},{'search-result-li':recipeType!=1}]"
        v-for="(item,index) in showList"
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
        >{{item.alias_name||item.name}}&emsp;({{item.price||item.sale_price}}元/{{item.unit_sale||item.unit}})</div>
        <div
          v-show="recipeType==6"
        >{{item.clinic_alias_name||item.name}}&emsp;({{item.price||item.sale_price}}元/{{item.unit_sale}})</div>
      </div>
      <div class="mt10" style="text-align:center;font-size:1rem;" v-show="searchList.length<1">暂无药品</div>
    </div>
    <div class="pt15" style="clear:both;display:flex;justify-content:center;">
      <Button
        v-show="currPage!==1"
        shape="circle"
        type="primary"
        ghost
        @click.stop="changePage(0)"
      >上一页</Button>
      <Button v-show="currPage===1" disabled shape="circle">上一页</Button>
      <div class="ml10"></div>
      <Button
        v-show="currPage!==page_num"
        shape="circle"
        type="primary"
        ghost
        @click.stop="changePage(1)"
      >下一页</Button>
      <Button v-show="currPage===page_num" disabled shape="circle">下一页</Button>
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
      showResult:false,
      timer: null,
      searchName: "",
      searchList: [],
      currPage: 1,
      page_num: 0,
      showList: [],
      page_size: 0
    };
  },
  watch: {
    recipeType: function() {
      this.searchName = "";
      this.showResult=false;
      this.firstSearch();
    },
    category: function() {
      this.searchName = "";
      this.showResult=false;
      this.firstSearch();
    },
    searchList: function() {
      if (this.recipeType === 1) {
        this.page_size = 18;
      } else {
        this.page_size = 10;
      }
      this.currPage = 1;
      this.page_num = Number(
        (this.searchList.length / this.page_size).toFixed(0)
      );
      if (this.page_num * this.page_size < this.searchList.length) {
        this.page_num++;
      }
      if (this.page_num == 1) {
        this.showList = this.searchList.slice(0);
      } else {
        if (this.currPage == this.page_num) {
          this.showList = this.searchList.slice(
            this.page_size * (this.currPage - 1)
          );
        } else {
          this.showList = this.searchList.slice(
            this.page_size * (this.currPage - 1),
            this.page_size * this.currPage
          );
        }
      }
      this.showResult=true;
    },
    currPage: function() {
      if (this.page_num == 1) {
        this.showList = this.searchList.slice(0, -1);
      } else {
        if (this.currPage == this.page_num) {
          this.showList = this.searchList.slice(
            this.page_size * (this.currPage - 1)
          );
        } else {
          this.showList = this.searchList.slice(
            this.page_size * (this.currPage - 1),
            this.page_size * this.currPage
          );
        }
      }
    }
  },
  computed: {
    ...mapGetters(["currRecipeData"]),
    recipeType: function() {
      return this.currRecipeData === undefined ? 0 : this.currRecipeData.type;
    },
    category: function() {
      return this.currRecipeData === undefined
        ? 1
        : this.currRecipeData.data.category;
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
    changePage: function(flag) {
      if (flag == 0) {
        if (this.currPage == 1) {
          this.currPage = 1;
        } else {
          this.currPage--;
        }
      }
      if (flag == 1) {
        if (this.currPage == this.page_num) {
          this.currPage = this.page_num;
        } else {
          this.currPage++;
        }
      }
    },
    firstSearch: function() {
      if (this.recipeType === 0) {
        return;
      }
      var self = this;
      searchRecentMed(
        {
          category: self.category
        },
        self.recipeType
      ).then(
        function(res) {
          if (res.code == 1000) {
            self.searchList = res.data;
          }
        },
        function(error) {
          console.log(error);
        }
      );
    },
    searchMed: function() {
      var self = this;
      if (self.searchName == "") {
        self.searchList = [];
        self.firstSearch();
        return;
      }
      var params = {};
      switch (self.recipeType) {
        case 1: {
          params = {
            medicine_name: self.searchName,
            category: self.category,
            status: 1,
            page: 1
          };
          break;
        }
        case 2: {
          params = {
            medicine_name: self.searchName,
            status: 1,
            page: 1
          };
          break;
        }
        case 4: {
          params = {
            name: self.searchName,
            page: 1
          };
          break;
        }
        case 5: {
          params = {
            page: 1,
            query: self.searchName,
            status: 1
          };
          break;
        }
        case 6: {
          params = {
            name: self.searchName,
            page: 1
          };
          break;
        }
      }
      clearTimeout(this.timer);
      this.timer = setTimeout(()=> {
        searchMed(params, this.recipeType).then(
          function(res) {
            if (res.code == 1000) {
              self.searchList = res.data;
            }
          },
          function(error) {
            console.log(error);
          }
        );
      },300);
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
