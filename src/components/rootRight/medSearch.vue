<template>
  <div class="pt5 pl6 pr6 search-block">
    <div class="mb6 search-box">
      <div class="flexOne mr10">
        <Input @on-keydown="listenerKey($event)" @on-blur="curSelect=-1" tabindex="-1" @input="searchMedicine(1)" placeholder="药品名称/拼音简码"
               v-model="searchName"/>
      </div>
      <div>
        <button @click="searchMedicine(1)" class="search-btn">搜索</button>
      </div>
    </div>

    <f-loader v-if="showLoading" :fixed="false"></f-loader>

    <div class="search-result">
      <div
        :class="[{'no-stock':item.stock<1 && isCloud!=1},{'herbal-result-li':recipeType===1},{'search-result-li':recipeType!=1}, {'select-box': curSelect === index}]"
        v-for="(item,index) in searchList"
        :key="index"
        @click.stop="selectItem(item)"
      >
        <div v-show="recipeType==1">
          <div v-if="isCloud == 1">
            {{item.alias_name || item.name}}
            <br>
            {{item.spec}}
          </div>
          <div v-else>
            {{item.clinic_alias_name || item.name}}
            <br>
            {{item.spec}}
          </div>
        </div>
        <div v-show="recipeType==2 || recipeType==3">
          <div v-if="isCloud == 1">
            {{item.alias_name || item.name}}
            ({{item.spec}})
          </div>
          <div v-else>
            {{item.clinic_alias_name || item.name}}
            ({{item.spec}})
          </div>
        </div>
        <div
          v-show="recipeType==4"
        >{{item.alias_name||item.name}}&emsp;({{item.price||item.sale_price}}元/{{item.unit_sale||item.unit}})
        </div>
        <div
          v-show="recipeType==6"
        >{{item.clinic_alias_name||item.name}}&emsp;({{item.price||item.spec}})
        </div>
      </div>
      <div class="mt10" style="text-align:center;font-size:1rem;" v-show="searchList.length<1">
        {{isFirst ? '请搜索药品' : '暂无药品'}}
      </div>
    </div>
    <div class="clear" >
      <div class="t-h-btn-group pt15" v-show="!isFirst">
        <button
          :class="['t-h-btn', 't-h-btn-active', {'t-h-btn-disable':currPage <= 1}]"
          :disabled="currPage <= 1"
          @click.stop="changePage(0)"
        >上一页
        </button>
        <button
          :class="['t-h-btn', 't-h-btn-active', {'t-h-btn-disable':currPage >= page_num}]"
          :disabled="currPage >= page_num"
          @click.stop="changePage(1)"
        >下一页
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {Input, Button} from "iview";
import {mapGetters, mapActions} from "vuex";
import {searchMed, searchRecentMed} from "@/fetch/api.js";
import fLoader from "@/components/fLoader";

export default {
  name: "medSearch",
  components: {
    Button,
    Input,
    fLoader
  },
  props: ['tabType'],
  data() {
    return {
      timer: null,
      searchName: "",
      searchList: [],
      recentList: [],
      currPage: 1,
      page_num: 0,
      page_size: 0,
      curSelect: -1,  // 当前选中的药品
      totalNum: 0,
      isFirst: true,
      showLoading: false,
      firstTimer: null
    }
  },
  computed: {
    ...mapGetters(["currRecipeData"]),
    recipeType: function () {
      return this.currRecipeData === undefined ? 0 : this.currRecipeData.type;
    },
    isCloud: function () {
      return this.currRecipeData === undefined ? 0 : (this.currRecipeData.data.is_cloud === undefined ? 0 : this.currRecipeData.data.is_cloud);
    },
    category: function () {
      return this.currRecipeData === undefined ? 1 : (this.currRecipeData.data.category === undefined ? 1 : this.currRecipeData.data.category);
    }
  },
  watch: {
    category: function () {
      this.searchName = "";
      this.firstSearch();
    },
    recipeType: function () {
      this.searchName = "";
      this.firstSearch();
    },
    isCloud: function () {
      this.searchName = "";
      this.firstSearch();
    },
    tabType: function () {
      this.searchName = "";
      this.firstSearch();
    }
  },

  created() {
    this.firstSearch();
  },
  methods: {
    ...mapActions(["add_new_medicine"]),
    selectItem: function (item) {
      let filterList = this.currRecipeData.data.items.filter(med => {
        return item.id === med.item_id;
      });
      if (filterList.length === 0) {
        this.add_new_medicine({item: item, type: this.currRecipeData.type});
        this.searchList = this.recentList;
        this.page_num = 1;
        this.currPage = 1;
        this.isFirst = true
        this.searchName = '';
        this.curSelect = -1;

      } else {
        this.$Message.info("该药品已添加");
      }
    },
    changePage: function (flag) {
      if (flag == 0) {
        if (this.currPage <= 1) {
          this.currPage = 1;
        } else {
          this.currPage--;
          this.searchMedicine(this.currPage)
        }
      }
      if (flag == 1) {
        if (this.currPage >= this.page_num) {
          this.currPage = this.page_num;
        } else {
          this.currPage++;
          this.searchMedicine(this.currPage)
        }
      }
    },
    firstSearch: function () {
      if (this.recipeType === 0) {
        return;
      }
      this.searchName = ""
      this.searchList = []
      this.recentList = []
      this.currPage = 1
      this.page_num = 0
      this.page_size = 0
      this.curSelect = -1
      this.totalNum = 0
      this.isFirst = true
      this.showLoading = false
      clearTimeout(this.firstTimer)
      this.firstTimer = setTimeout(() => {
        this.firstFetch()
      }, 100)
    },
    firstFetch: function () {
      var self = this, params = {};
      self.showLoading = true
      if (self.recipeType === 1) {
        params = {
          page: 1,
          page_size: 18,
          status: 1,
          category: self.category
        }
      } else if (self.recipeType === 4) {
        params = {
          page: 1,
          page_size: window.screen.height > 960 || window.screen.width >= 1600 ? 10 : 8,
          status: 1,
          is_combine: self.tabType == 5 ? 1 : 0
        }
      } else {
        params = {
          page: 1,
          page_size: window.screen.height > 960 || window.screen.width >= 1600 ? 10 : 8,
          status: 1
        }
      }
      Promise.all([
        searchMed(params, self.recipeType, self.isCloud),
        searchRecentMed({category: self.category}, self.recipeType, self.isCloud)
      ]).then(res => {
        if (res[0].code === 1000 && res[1].code === 1000) {
          self.showLoading = false
          let isCombine = self.tabType == 5 ? 1: 0
          if (self.recipeType == 4) {
            var resultList = res[1].data.filter(item => {
              return item.is_combine == isCombine
            })
          } else {
            var resultList = res[1].data
          }

          if (resultList.length < params.page_size) {
            for (let i = 0, len = res[0].data.length; i < len && resultList.length < params.page_size; i++) {
              if (!res[1].data.some(med => med.id === res[0].data[i].id)) {
                resultList.push(res[0].data[i])
              }
            }
            self.isFirst = true
            self.recentList = resultList
            self.searchList = resultList
          } else {
            self.isFirst = true
            self.recentList = resultList.slice(0, Number(params.page_size))
            self.searchList = resultList.slice(0, Number(params.page_size))
          }


        }
      }).catch(error => {
        self.showLoading = false
        console.log(error)
      })
    },
    searchMedicine: function (page) {
      this.curSelect = -1;
      this.currPage = page
      var self = this;
      if (self.searchName == "") {
        self.searchList = self.recentList;
        self.page_num = 1;
        self.currPage = 1;
        self.isFirst = true
        return
      }
      if (self.searchName.replace(/\s/g, '') == '') {
        return
      }
      var params = {};
      switch (self.recipeType) {
        case 1: {
          self.page_size = 18
          if (self.isCloud == 1) {
            params = {
              query: self.searchName,
              category: self.category,
              status: 1,
              page: self.currPage,
              page_size: self.page_size
            }
          } else {
            params = {
              medicine_name: self.searchName,
              category: self.category,
              status: 1,
              page: self.currPage,
              page_size: self.page_size
            };
          }
          break;
        }
        case 2: {
          self.page_size = window.screen.height > 960 || window.screen.width >= 1600 ? 10 : 8
          if (self.isCloud == 1) {
            params = {
              query: self.searchName,
              status: 1,
              page: self.currPage,
              page_size: self.page_size
            };
          } else {
            params = {
              medicine_name: self.searchName,
              status: 1,
              page: self.currPage,
              page_size: self.page_size
            };
          }

          break;
        }
        case 3:
          self.page_size = window.screen.height > 960 || window.screen.width >= 1600 ? 10 : 8
          if (self.isCloud == 1) {
            params = {
              query: self.searchName,
              status: 1,
              page: self.currPage,
              page_size: self.page_size
            }
          } else {
            params = {
              medicine_name: self.searchName,
              status: 1,
              page: self.currPage,
              page_size: self.page_size
            }
          }
          break;
        case 4:
          self.page_size = window.screen.height > 960 || window.screen.width >= 1600 ? 10 : 8
          params = {
            name: self.searchName,
            page: self.currPage,
            status: 1,
            is_combine: self.tabType == 5 ? 1 : 0,
            page_size: self.page_size
          };
          break;

        case 5:
          self.page_size =( window.screen.height > 960 || window.screen.width >= 1600) ? 10 : 8
          params = {
            page: self.currPage,
            query: self.searchName,
            status: 1,
            page_size: self.page_size
          };
          break;
        case 6:
          self.page_size = window.screen.height > 960 || window.screen.width >= 1600 ? 10 : 8
          params = {
            name: self.searchName,
            page: self.currPage,
            status: 1,
            page_size: self.page_size
          };
          break;
      }
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        self.showLoading = true
        searchMed(params, self.recipeType, self.isCloud).then(
          function (res) {
            self.showLoading = false
            if (res.code == 1000) {
              self.isFirst = false
              self.page_num = Math.ceil(res.total_num / self.page_size)
              self.searchList = res.data;
            }
          },
          function (error) {
            self.showLoading = false
            console.log(error);
          }
        );
      }, 300);
    },
    listenerKey: function (event) {
      let keyCode = event.keyCode;
      let count = this.searchList.length;
      let cur = this.curSelect;
      let start = event.target.selectionStart;
      let colCount = this.recipeType == 1 ? 3 : 1;
      switch (keyCode) {
        case 13:
          this.selectItem(this.searchList[cur])
          break;
        case 37:
          // left
          if (cur !== -1) {
            this.curSelect--;
            setTimeout(() => {
              event.target.selectionStart = event.target.selectionEnd = start;
            })
          }
          break;
        case 38:
          // up
          if (cur > colCount - 1) {
            this.curSelect -= colCount;
          } else {
            this.curSelect = -1;
            setTimeout(() => {
              event.target.selectionStart = event.target.selectionEnd = start;
            })
          }
          break;
        case 39:
          // right
          if (cur !== -1 && cur < count - 1) {
            this.curSelect++;
            setTimeout(() => {
              event.target.selectionStart = event.target.selectionEnd = start;
            })
          }
          break;
        case 40:
          // down
          if (cur === -1 && count > 0) {
            this.curSelect = 0;
            setTimeout(() => {
              event.target.selectionStart = event.target.selectionEnd = start;
            })
          } else if (cur < count - colCount) {
            this.curSelect += colCount;
          }
          break;
        default:
          return;
      }
    }
  }
};
</script>
<style scoped>
  .search-block {
    position: relative;
    height: 100%
  }

  .search-result .herbal-result-li {
    width: calc((100% - 1.5rem) / 3);
    height: 3.125rem;
    border: #5096e0 solid 1px;
    border-radius: 0.25rem;
    float: left;
    display: flex;
    margin-right: 0.25rem;
    margin-bottom: 0.25rem;
    text-align: center;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 0.8125rem;
  }

  .search-result .search-result-li {
    width: 100%;
    height: 2.5rem;
    border: #5096e0 solid 1px;
    border-radius: 0.25rem;
    float: left;
    margin-bottom: 0.25rem;
    padding-right: 1%;
    text-align: center;
    justify-content: center;
    display: flex;
    align-items: center;
    font-size: 0.875rem;
    cursor: pointer;
  }

  .search-result .no-stock {
    border: 0;
    background-color: #e1e1e1;
    color: #5e5e5e;
  }

  .select-box {
    background: #5096e0 !important;
    color: #fff !important;
  }

  .search-box {
    width: 100%;
    display: flex;
    height: 2rem;
    font-size: 1rem;
  }

</style>
