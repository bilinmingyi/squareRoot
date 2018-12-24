<template>
  <div class="prescription_tab_bg">
    <div
      class="d_sure_prescription"
      style="height: auto;max-height: 100vh;padding: 20px 50px; width: 800px;"
    >
      <div class="d_sure_prescription_title">确定导入处方？</div>
      <div class="f15 mb10 font_bold">
        导入处方将覆盖之前的编辑的信息，
        <span class="text_red">没有的药品</span>不会导入至处方。
      </div>
      <div class="d_Classic_prescription_quote2 clearfix">
        <div v-if="recipeData.historyType==1">
          <div class="fl mb5" style="width: 33.3%" v-for="(item,index) in recipeData.historyMach">
            <span v-if="item.is_match==0">
              <span>{{item.name}}</span>
              <span class="pl10">({{item.num}}{{item.unit}}/{{item.usage}})</span>
              <span style="color: red;">暂无此药</span>
            </span>
            <span v-else>
              <span>{{item.name}}</span>
              <span class="pl10">({{item.num}}{{item.unit}}/{{item.usage}})</span>
            </span>
          </div>
        </div>
        <div v-if="recipeData.historyType==2">
          <div class="fl mb5" style="width: 100%" v-for="(item,index) in recipeData.historyMach">
            <span v-if="item.is_match==0">
              <span>{{item.name}}</span>
              <span class="pl10">({{item.num}}{{item.unit}}/{{item.usage}})</span>
              <span style="color: red;">暂无此药</span>
            </span>
            <span v-else>
              <span>{{item.name}}</span>
              <span class="pl10">({{item.num}}{{item.unit}}/{{item.usage}})</span>
            </span>
          </div>
        </div>
        <div v-if="recipeData.historyType==3">
          <div class="fl mb5" style="width: 100%" v-for="(item,index) in recipeData.historyMach">
            <span v-if="item.is_match==0">
              <span>{{item.name}}</span>
              <span class="pl10">({{item.num}}{{item.unit}}/{{item.usage}})</span>
              <span style="color: red;">暂无此药</span>
            </span>
            <span v-else>
              <span>{{item.name}}</span>
              <span class="pl10">({{item.num}}{{item.unit}}/{{item.usage}})</span>
            </span>
          </div>
        </div>
        <div v-if="recipeData.historyType==4">
          <div class="fl mb5" style="width: 100%" v-for="(item,index) in recipeData.historyMach">
            <span v-if="item.is_match==0">
              <span>{{item.name}}</span>
              <span
                class="pl10"
              >{{item.num}}{{item.unit}}&nbsp;&nbsp;({{item.price}}元/{{item.unit}})</span>
              <span style="color: red;">暂无此项目</span>
            </span>
            <span v-else>
              <span>{{item.name}}</span>
              <span
                class="pl10"
              >{{item.num}}{{item.unit}}&nbsp;&nbsp;({{item.price}}元/{{item.unit}})</span>
            </span>
          </div>
        </div>
        <div v-if="recipeData.historyType==5">
          <div class="fl mb5" style="width: 100%" v-for="(item,index) in recipeData.historyMach">
            <span v-if="item.is_match==0">
              <span>{{item.name}}</span>
              <span
                class="pl10"
              >{{item.num}}{{item.unit}}&nbsp;&nbsp;({{item.price}}元/{{item.unit}})</span>
              <span style="color: red;">暂无此项目</span>
            </span>
            <span v-else>
              <span>{{item.name}}</span>
              <span
                class="pl10"
              >{{item.num}}{{item.unit}}&nbsp;&nbsp;({{item.price}}元/{{item.unit}})</span>
            </span>
          </div>
        </div>
      </div>
      <div class="tc mt20">
        <button class="saveBtn mr20" @click="saveHistory()">确认</button>
        <button class="saveBtn cancelBtn" @click="cancelHistory()">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  props: ['recipeProp'],
  data() {
    return {
      recipeData: {
        historyType: 0,
        historyMach: [],
      },

    };
  },
  computed: {
    ...mapState({
      currRecipe: state => state.currRecipe,
    }),
    recipeList() {
      return this.recipeData;
    }
  }
};
</script>

<style scoped>
.prescription_tab_bg {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.5);
  z-index: 1999;
  position: fixed;
  top: 0;
  left: 0;
}
.d_sure_prescription {
  background: #ffffff;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  min-width: 610px;
  height: 80vh;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
}
.d_sure_prescription_title {
  font-size: 16px;
  font-weight: bold;
  color: #5096e0;
  text-align: center;
  margin-bottom: 20px;
}
.font_bold {
  font-weight: bold;
}
.f15 {
  font-size: 15px;
}
.d_Classic_prescription_quote2 {
  max-height: calc(80vh - 230px);
  font-size: 14px;
  overflow-y: scroll;
  font-weight: bold;
}
.text_red {
  color: #fc3b3b;
}
.tc {
  text-align: center !important;
}
.saveBtn {
  font-size: 16px;
  color: #ffffff;
  font-weight: bold;
  width: 140px;
  text-align: center;
  padding: 9px 0;
  background: #5096e0;
  border-radius: 100px;
  border: none;
}
.cancelBtn {
  background: #ffffff;
  border: 1px solid #5096e0;
  color: #5096e0;
}
</style>