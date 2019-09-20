<template>
  <div class="h-r-prescription_tab_bg">
    <div
      class="d_sure_prescription"
      style="height: auto;max-height: 100vh;padding: 20px 50px; width: 800px;"
    >
      <div class="d_sure_prescription_title">确定导入处方？</div>
      <div class="f15 mb10 font_bold">
        导入处方将覆盖之前的编辑的信息，
        <span class="text_red">暂无药品</span>需自行更改。
      </div>
      <div class="d_Classic_prescription_quote2 clearfix">
        <div v-if="recipeData.recipe_type==1" class="flex-wrap">
          <div class="mb5" style="width: 33.3%" v-for="(item,index) in recipeData.herbal_list">
            <span v-if="item.is_match==0">
              <span>{{item.alias_name || item.clinic_alias_name ? item.alias_name || item.clinic_alias_name : item.name}}</span>
              <span class="pl10">({{item.num}}{{item.unit}}/{{item.usage}})</span>
              <span style="color: red;">暂无此药</span>
            </span>
            <span v-else>
              <span>{{item.alias_name || item.clinic_alias_name ? item.alias_name || item.clinic_alias_name : item.name}}</span>
              <span class="pl10">({{item.num}}{{item.unit}}/{{item.usage}})</span>
            </span>
          </div>
        </div>
        <div v-if="recipeData.recipe_type==2" class="flex-wrap">
          <div class="mb5" style="width: 100%" v-for="(item,index) in recipeData.western_list">
            <span v-if="item.is_match==0">
              <span>{{item.alias_name || item.clinic_alias_name ? item.alias_name || item.clinic_alias_name : item.name}}</span>
              <span class="pl10">({{item.num}}{{item.unit}}/{{item.usage}})</span>
              <span style="color: red;">暂无此药</span>
            </span>
            <span v-else>
              <span>{{item.alias_name || item.clinic_alias_name ? item.alias_name || item.clinic_alias_name : item.name}}</span>
              <span class="pl10">({{item.num}}{{item.unit}}/{{item.usage}})</span>
            </span>
          </div>
        </div>
        <div v-if="recipeData.recipe_type==3" class="flex-wrap">
          <div class="mb5" style="width: 100%" v-for="(item,index) in recipeData.product_list">
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
        <div v-if="recipeData.recipe_type==4" class="flex-wrap">
          <div class="mb5" style="width: 100%" v-for="(item,index) in recipeData.therapy_list">
            <span v-if="item.is_match==0">
              <span>{{item.alias_name || item.clinic_alias_name ? item.alias_name || item.clinic_alias_name : item.name}}</span>
              <span
                class="pl10"
              >{{item.num}}{{item.unit}}&nbsp;&nbsp;({{item.price}}元/{{item.unit}})</span>
              <span style="color: red;">暂无此项目</span>
            </span>
            <span v-else>
              <span>{{item.alias_name || item.clinic_alias_name ? item.alias_name || item.clinic_alias_name : item.name}}</span>
              <span
                class="pl10"
              >{{item.num}}{{item.unit}}&nbsp;&nbsp;({{item.price}}元/{{item.unit}})</span>
            </span>
          </div>
        </div>
        <div v-if="recipeData.recipe_type==5" class="flex-wrap">
          <div class="mb5" style="width: 100%" v-for="(item,index) in recipeData.extra_list">
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
  props: {
    recipeDataProp: {
      type: Object,
      default() {
        return {
          recipe_type: 0
        };
      }
    },
    map: {
      type: Array,
      default() {
        return [
          "",
          "herbal_list",
          "western_list",
          "product_list",
          "therapy_list",
          "extra_list"
        ];
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      currRecipe: state => state.currRecipe,
      recipeList: state => state.recipeList
    }),
    recipeData() {
      return this.recipeDataProp;
    },
    mapList() {
      return this.map;
    }
  },
  methods: {
    ...mapActions(["clean_recipe", "add_new_medicine", "modify_recipe_detail"]),
    cancelHistory() {
      this.$emit("close");
    },
    saveHistory() {
      let recipe = this.recipeData;
      let type = recipe.recipe_type;
      let map = this.mapList;
      let arr = recipe[map[type]];
      this.clean_recipe();
      if (type == 1) {
        this.modify_recipe_detail({ key: 'dosage', val: recipe.dosage});
        this.modify_recipe_detail({ key: 'category', val: recipe.category});
        this.modify_recipe_detail({ key: 'is_cloud', val: Number(recipe.is_cloud)});
      } else if(type == 2 || type == 3) {
        this.modify_recipe_detail({ key: 'is_cloud', val: Number(recipe.is_cloud)});
      } else if(type == 4){
        this.modify_recipe_detail({ key: 'type', val: Number(recipe.therapy_type)});
      }
      if(type == 2){
        arr.forEach(item => {
          item.dose_once = item.dose_once.replace(/\D*/g,'')
          this.add_new_medicine({ item, type });
        })
      }else {
        arr.forEach(item => {
          this.add_new_medicine({ item, type });
        })
      }
      this.cancelHistory();
    }
  }
};
</script>

<style scoped>
.h-r-prescription_tab_bg {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.5);
  z-index: 500;
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
  top: 30%;
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
  font-size: 0.875rem;
  color: #ffffff;
  font-weight: bold;
  width: 7.5rem;
  text-align: center;
  padding: 0.375rem 0;
  background: #5096e0;
  border-radius: 6.25rem;
  border: none;
}
.cancelBtn {
  background: #ffffff;
  border: 0.0625rem solid #5096e0;
  color: #5096e0;
}
.display-flex {
  display: flex;
}
.flex-wrap {
  display: flex;
  flex-wrap: wrap;
}
.flex-1 {
  flex: 1;
}
</style>
