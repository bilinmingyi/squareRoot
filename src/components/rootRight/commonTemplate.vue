<template>
  <div class="pr6 pl6 pt5 search-block">
    <f-loader v-if="showLoading" :fixed="false"></f-loader>
    <div v-if="!showDetail">
      <div class="displayFlex">
        <div class="flexOne mr10">
          <Input placeholder="请输入模板名称" @input="searchByInput" tabindex="-1" v-model="searchName"/>
        </div>
        <div>
          <button class="search-btn" @click="searchByInput">搜索</button>
        </div>
      </div>
      <section id="tplList">
        <div v-if="recipeType===0">
          <div class="prescript-list" v-for="item in tplList" @click.stop="showTemplate(item)">
            {{item.name}}
            <span v-if="item.source">({{item.source}})</span>
          </div>
        </div>
        <div v-else>
          <div class="med-template" v-for="item in tplList" @click.stop="showTemplate(item)">
            <div class="med-template-title">
              {{item.name}}
              <span v-if="item.source">《{{item.source}}》</span>
            </div>
            <div class="med-template-content">
              {{item.symptom|textEllipsis(temItemWidth)}}
            </div>
          </div>
        </div>
        <div class="mt10 tc" v-show="tplList.length <= 0">
          暂无模板
        </div>
      </section>
      <div class="t-h-btn-group pt15">
        <button
          :class="['t-h-btn', 't-h-btn-active', {'t-h-btn-disable':currPage <= 1}]"
          :disabled="currPage <= 1"
          @click.stop="changePage(0)"
        >上一页
        </button>
        <button
          :class="['t-h-btn', 't-h-btn-active', {'t-h-btn-disable':currPage >= pageNum}]"
          :disabled="currPage >= pageNum"
          @click.stop="changePage(1)"
        >下一页
        </button>
      </div>
    </div>
    <template v-if="showDetail">
      <template-record v-if="recipeType===0" @close="showDetail=false" :tpl="currTpl"></template-record>
      <template-recipe v-else @close="showDetail=false" :tpl="currTpl"></template-recipe>
    </template>

  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from "vuex";
import {Input} from "iview";
import templateRecipe from '@/components/rootRight/templateRecipe'
import templateRecord from '@/components/rootRight/templateRecord'
import fLoader from "@/components/fLoader";
import {fetchCommonTemplate} from '@/fetch/api.js'

export default {
  name: "commonTemplate",
  components: {
    fLoader,
    Input,
    templateRecipe,
    templateRecord
  },
  computed: {
    ...mapGetters(["currRecipeData"]),
    recipeType: function () {
      return this.currRecipeData === undefined ? 0 : this.currRecipeData.type;
    },
    category: function () {
      return this.currRecipeData === undefined ? 1 : (this.currRecipeData.data.category === undefined ? 1 : this.currRecipeData.data.category);
    }
  },
  watch: {
    recipeType: function () {
      this.searchName = ""
      this.getData(1)
    },
    category: function () {
      this.searchName = ""
      this.getData(1)
    }
  },
  filters: {
    textEllipsis(val, width) {
      let lineNum = Math.floor((width - 20) / 14) - 1
      if (val === '') {
        return '症状：无'
      }
      if (val.length <= lineNum * 3) {
        return val
      } else {
        return val.slice(0, lineNum * 3 - 1) + '...'
      }
    }
  },
  data() {
    return {
      showLoading: false,
      currPage: 1,
      pageNum: 0,
      temItemWidth: '',
      pageSize: 0,
      showDetail: false,
      searchName: '',
      tplList: [],
      currTpl: {},
      searchTime: null
    }
  },
  mounted () {
    this.temItemWidth = Number(this.getCurrentStyle(document.getElementById('tplList')).width.replace(/px/g, ''))
    if (this.recipeType == 0) {
      this.pageSize = window.screen.height > 960 || window.screen.width >= 1600 ? 10 : 8
    } else {
      this.pageSize = window.screen.height > 960 || window.screen.width > 1600 ? 5 : (window.screen.height >= 900 ? 4 : 3)
    }
    this.getData(1)
  },
  methods: {
    getCurrentStyle: function (node) {
      let style = null
      if (window.getComputedStyle) {
        style = window.getComputedStyle(node, null)
      } else {
        style = node.currentStyle
      }
      return style
    },
    changePage (type) {
      if (type === 0) {
        if (this.currPage <=1) {
          return
        } else {
          this.currPage--;
          this.getData(this.currPage)
        }
      } else if (type === 1) {
        if (this.currPage >= this.pageNum) {
          return
        } else {
          this.currPage++;
          this.getData(this.currPage)
        }
      }
    },
    showTemplate (item) {
      this.showDetail = true
      this.currTpl = item
    },
    getData (page) {
      this.currPage = page
      this.showLoading = true
      fetchCommonTemplate({
        "name": this.searchName,
        "page": this.currPage,
        "page_size": this.pageSize
      }, this.recipeType).then(res => {
        this.showLoading = false
        if (res.code === 1000) {
          this.tplList = res.data
          this.pageNum = Math.ceil(res.total_num / this.pageSize)
        } else {
          this.$Message.info(res.msg)
        }
      }).catch(error => {
        this.showLoading = false
        console.log(error)
      })
    },
    searchByInput () {
      clearTimeout(this.searchTime)
      this.searchTime = setTimeout(() => {
        this.getData(1)
      }, 300)
    }
  }
}
</script>

<style scoped>
  .prescript-list {
    margin: 0.3125rem 0;
    text-align: center;
    line-height: 2.5rem;
    border-radius: 0.25rem;
    border: 0.0625rem solid #5096e0;
    width: 100%;
    height: 2.5rem;
    font-size: 0.875rem;
    cursor: pointer;
  }
  .med-template {
    border: 1px solid #CCCCCC;
    border-radius: 4px;
    padding: 10px;
    min-height: 5.4375rem;
    max-height: 6.6875rem;
    margin-top: 0.625rem;
    cursor: pointer;
  }

  .med-template-title {
    color: #5096E0;
    font-weight: bold;
    font-size: 0.9375rem;
    margin-bottom: 0.375rem;
  }

  .med-template-content {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  .search-block {
    position: relative;
    height: 100%
  }
</style>
