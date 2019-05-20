<template>
  <div class="mt5 ml6 mb5">
    <div class="mb6" style="padding-right:3%;width:100%;display:flex;height:2rem;font-size:1rem;">
      <div class="col70 mr10">
        <Input @on-keydown="listenerKey($event)" @on-blur="curSelect=-1" @input="searchMed()" placeholder="药品名称/拼音简码"
               v-model="searchName"/>
      </div>
      <div class="col30">
        <Button long @click="searchMed()">搜索</Button>
      </div>
    </div>
    <div class="search-result" v-show="showResult">
      <div
        :class="[{'no-stock':item.stock<1 && isCloud!=1},{'herbal-result-li':recipeType===1},{'search-result-li':recipeType!=1}, {'select-box': curSelect === index}]"
        v-for="(item,index) in showList"
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
            {{item.alias_name  || item.name}}
            ({{item.spec}})
          </div>
          <div v-else>
            {{item.clinic_alias_name  || item.name}}
            ({{item.spec}})
          </div>
        </div>
        <div
          v-show="recipeType==4"
        >{{item.alias_name||item.name}}&emsp;({{item.price||item.sale_price}}元/{{item.unit_sale||item.unit}})
        </div>
        <div
          v-show="recipeType==6"
        >{{item.clinic_alias_name||item.name}}&emsp;({{item.price||item.sale_price}}元/{{item.unit_sale}})
        </div>
      </div>
      <div class="mt10" style="text-align:center;font-size:1rem;" v-show="searchList.length<1">
        {{isFirst ? '请搜索药品' : '暂无药品'}}
      </div>
    </div>
    <div class="pt15 pageBtn">
      <Button
        v-show="currPage!==1"
        shape="circle"
        type="primary"
        ghost
        @click.stop="changePage(0)"
        class="mr20"
      >上一页
      </Button>
      <Button v-show="currPage===1" class="mr20" disabled shape="circle">上一页</Button>
      <div class="ml10"></div>
      <Button
        v-show="currPage<page_num"
        shape="circle"
        type="primary"
        ghost
        @click.stop="changePage(1)"
      >下一页
      </Button>
      <Button v-show="currPage>=page_num" disabled shape="circle">下一页</Button>
    </div>
  </div>
</template>

<script>
  import {Input, Button} from "iview";
  import {mapGetters, mapActions} from "vuex";
  import {searchMed, searchRecentMed} from "@/fetch/api.js";

  export default {
    name: "medSearch",
    components: {
      Button,
      Input
    },
    data() {
      return {
        showResult: false,
        timer: null,
        searchName: "",
        searchList: [],
        currPage: 1,
        page_num: 0,
        showList: [],
        page_size: 0,
        curSelect: -1,  // 当前选中的药品
        page: 1,
        totalNum: 0,
        isFirst: true
      }
    },
    computed: {
      ...mapGetters(["currRecipeData"]),
      recipeType: function () {
        return this.currRecipeData === undefined ? 0 : this.currRecipeData.type;
      },
      isCloud: function () {
        return this.currRecipeData === undefined ? 0 : this.currRecipeData.data.is_cloud;
      }
    },
    watch: {
      recipeType: function () {
        this.searchName = "";
        this.showResult = false;
        this.firstSearch();
      },
      isCloud: function () {
        this.searchName = "";
        this.showResult = false;
        this.firstSearch();
      },
      searchList: function () {
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
        this.showResult = true;
      },
      currPage: function () {
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
          this.searchName = '';
          this.curSelect = -1;

        } else {
          this.$Message.info("该药品已添加");
        }
      },
      changePage: function (flag) {
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
      firstSearch: function () {
        if (this.recipeType === 0) {
          return;
        }
        var self = this;
        searchRecentMed(
          {
            category: self.category
          },
          self.recipeType,
          self.isCloud
        ).then(
          function (res) {
            if (res.code == 1000) {
              self.isFirst = true
              self.searchList = res.data;
            }
          },
          function (error) {
            console.log(error);
          }
        );
      },
      searchMed: function () {
        this.curSelect = -1;
        var self = this;
        if (self.searchName == "") {
          self.searchList = [];
          self.firstSearch();
          return
        }
        if (self.searchName.replace(/\s/g, '') == '') {
          return
        }
        var params = {};
        switch (self.recipeType) {
          case 1: {
            if(self.isCloud == 1){
              params = {
                query: self.searchName,
                category: self.category,
                status: 1,
                page: self.page,
              }
            } else {
              params = {
                medicine_name: self.searchName,
                category: self.category,
                status: 1,
                page: self.page,
              };
            }
            break;
          }
          case 2: {
            if (self.isCloud == 1) {
              params = {
                query: self.searchName,
                status: 1,
                page: self.page,
              };
            } else {
              params = {
                medicine_name: self.searchName,
                status: 1,
                page: self.page,
              };
            }

            break;
          }
          case 3:
            if (self.isCloud == 1) {
              params = {
                query: self.searchName,
                status: 1,
                page: self.page,
              }
            } else {
              params = {
                medicine_name: self.searchName,
                status: 1,
                page: self.page,
              }
            }

            break;
          case 4: {
            params = {
              name: self.searchName,
              page: self.page,
            };
            break;
          }
          case 5: {
            params = {
              page: self.page,
              query: self.searchName,
              status: 1
            };
            break;
          }
          case 6: {
            params = {
              name: self.searchName,
              page: self.page,
            };
            break;
          }
        }
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          searchMed(params, this.recipeType, self.isCloud).then(
            function (res) {
              if (res.code == 1000) {
                self.isFirst = false
                self.searchList = res.data;
              }
            },
            function (error) {
              console.log(error);
            }
          );
        }, 300);
      },
      listenerKey: function (event) {
        let keyCode = event.keyCode;
        let count = this.showList.length;
        let cur = this.curSelect;
        let start = event.target.selectionStart;
        let colCount = this.recipeType == 1 ? 3 : 1;
        switch (keyCode) {
          case 13:
            this.selectItem(this.showList[cur])
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
    width: 97%;
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
  }

  .search-result .no-stock {
    border: 0;
    background-color: #dadada;
    color: #5e5e5e;
  }

  .select-box {
    background: #5096e0 !important;
    color: #fff !important;
  }

  .pageBtn {
    clear: both;
    display: flex;
    justify-content: center;
  }
</style>
