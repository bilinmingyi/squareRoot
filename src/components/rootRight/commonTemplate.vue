<template>
  <div class="pr6 pl6 pt5">
    <f-loader v-if="showLoading"></f-loader>
    <div v-if="!showDetail">
      <div class="displayFlex">
        <div class="flexOne mr10">
          <Input placeholder="请输入模板名称"/>
        </div>
        <div>
          <button class="search-btn">搜索</button>
        </div>
      </div>
      <section id="tplList">
        <div v-if="recipeType===0">
          <div class="prescript-list" @click.stop="showTemplate">
            111
          </div>
          <div class="prescript-list">
            111
          </div>
        </div>
        <div v-else>
          <div class="med-template" @click.stop="showTemplate">
            <div class="med-template-title">测试1</div>
            <div class="med-template-content">
              {{test|textEllipsis(temItemWidth)}}
            </div>
          </div>
        </div>
        <div class="mt10 tc">
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
      <template-record v-if="recipeType===0" @close="showDetail=false"></template-record>
      <template-recipe v-else @close="showDetail=false"></template-recipe>
    </template>

  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from "vuex";
import {Input} from "iview";
import templateRecipe from '@/components/rootRight/templateRecipe'
import templateRecord from '@/components/rootRight/templateRecord'
import fLoader from "@/components/fLoader";

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
  },
  filters: {
    textEllipsis(val, width) {
      let lineNum = Math.floor((width - 20) / 14) - 1
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
      test: '胁肋疼痛，胸闷善太息，情志抑郁，易怒，脘腹胀满，脉弦，肝气郁滞证。胁肋疼痛，胸闷善太息，情志抑郁，易怒，脘腹胀满，脉弦，肝气郁。胁肋疼痛，胸闷善太息，情志抑郁，易怒，脘腹胀满，脉弦，肝气郁',
      pageSize: 0,
      showDetail: false
    }
  },
  mounted () {
    this.temItemWidth = Number(this.getCurrentStyle(document.getElementById('tplList')).width.replace(/px/g, ''))
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
    changePage (type) {},
    showTemplate () {
      this.showDetail = true
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
</style>
