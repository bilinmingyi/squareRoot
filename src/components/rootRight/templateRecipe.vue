<template>
  <div>
    <div class="prescription_detail_btn" @click.stop="cancel">返回</div>
    <div class="search-result-title">
      <span>{{tpl.name}}</span>
    </div>
    <div class="search-result-indications">
      {{tpl.symptom}}
    </div>
    <div class="search-result-line"></div>
    <section v-if="recipeType===1 && tpl.symptom_list.length > 0">
      <div class="checkbox-block">
        <CheckboxGroup v-model="extraMedList" @on-change="addExtra">
          <div :class="{'mb10':index !== (tpl.symptom_list.length - 1)}" v-for="(sym,index) in tpl.symptom_list">
            <Checkbox :label="sym.tpl_id" :key="sym.tpl_id"><span class="label-text">{{sym.name}}</span></Checkbox>
          </div>
        </CheckboxGroup>
      </div>
      <div class="search-result-line"></div>
    </section>
    <div class="search-result mt12 ml5 mr5">
      <div
        :class="[{'herbal-result-li':recipeType===1},{'search-result-li':recipeType!=1}]"
        v-for="med in lastMedList"
      >
        <span v-show="recipeType===1">
          {{med.name}}
          <br>
          （{{age > 12 ? med.adult_num : (med.kids_num !== '' ? med.kids_num : med.adult_num)}}g）
        </span>
        <span v-show="recipeType===2">
          {{med.name}}
          {{med.spec}}
        </span>
      </div>
    </div>
    <div class="clear"></div>
    <div class="pb10 mt12">
      <button class="prescription_detail_save mr2" @click.stop="useTplShow">引用方剂</button>
    </div>
    <div v-if="showUseTpl" class="alert-back">
      <div class="use-tpl">
        <div class="alert-title">确定使用[{{tpl.name}}]模板？</div>
        <div class="mt20 mb10">
          使用模板将覆盖已编辑之信息
          <strong style="color:red;">，暂无药品</strong>需要自行更改。
        </div>
        <div class="use-list mt10">
          <div
            v-if="recipeType!=0"
            class="use-list-li"
            v-for="item in useTplList"
            :key="item.id"
          >
            <span v-if="recipeType === 1">{{item.name}} ({{item.num}}{{item.unit}}/{{item.usage}})</span>
            <span v-if="recipeType === 2">{{item.name}} ({{item.num}}{{item.unit}})</span>
            <span v-show="item.is_match!=1" style="color:red;font-weight:bold;">暂无此药</span>
          </div>
        </div>
        <div class=" tc mt30">
          <button class="saveBtn mr20" @click.stop="useTpl()">确认</button>
          <button class="saveBtn cancelBtn" @click.stop="useTplHide()">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {CheckboxGroup, Checkbox} from "iview";
import {mapState, mapGetters, mapActions} from "vuex";
import {searchMed} from "@/fetch/api.js";

export default {
  name: "templateRecipe",
  props: ['tpl'],
  data() {
    return {
      initMedList: [],
      lastMedList: [],
      extraMedList: [],
      useTplList: [],
      showUseTpl: false
    }
  },
  created() {
    this.initMedList = JSON.parse(this.tpl.component)
    this.lastMedList = JSON.parse(this.tpl.component)
  },
  components: {
    CheckboxGroup,
    Checkbox
  },
  computed: {
    ...mapState({
      age: state => state.patientData.age
    }),
    ...mapGetters(["currRecipeData"]),
    recipeType: function () {
      return this.currRecipeData === undefined ? 0 : this.currRecipeData.type;
    },
    category: function () {
      return this.currRecipeData === undefined ? 1 : (this.currRecipeData.data.category === undefined ? 1 : this.currRecipeData.data.category);
    },
    isCloud: function () {
      return this.currRecipeData === undefined ? 0 : (this.currRecipeData.data.is_cloud === undefined ? 0 : this.currRecipeData.data.is_cloud);
    }
  },

  methods: {
    ...mapActions(["add_new_medicine", "clean_recipe"]),
    addExtra() {
      let self = this
      let initList = JSON.parse(JSON.stringify(self.initMedList))
      self.extraMedList.forEach(item => {
        for (let i = 0, len = self.tpl.symptom_list.length; i < len; i++) {
          if (self.tpl.symptom_list[i].tpl_id == item) {
            initList = initList.concat(JSON.parse(self.tpl.symptom_list[i].component))
            break
          }
        }
      })
      self.lastMedList = initList
    },
    useTplShow() {
      let names = []
      let self = this
      let resultList = []
      let params = {}
      self.lastMedList.forEach(function (item) {
        names.push(item.name)
      });
      if (self.recipeType == 1) {
        params = {names: names, status: 1, category: Number(self.category)}
      } else {
        params = {names: names, status: 1}
      }
      searchMed(params, self.recipeType, self.isCloud).then(function (res) {
        if (res.code == 1000) {
          self.lastMedList.forEach((item) => {

            for (var i = 0, len = res.data.length; i < len; i++) {
              if (item.name == res.data[i].name || item.name == res.data[i].alias_name || item.name == res.data[i].clinic_alias_name) {
                if (self.recipeType == 1) {
                  item.is_match = 1
                  resultList.push(Object.assign(res.data[i], {
                    num: self.age > 12 ? Number(item.adult_num) : (item.kids_num !== '' ? Number(item.kids_num) : Number(item.adult_num)),
                    name: item.name,
                    unit: item.unit,
                    usage: item.usage,
                    is_match: 1
                  }))
                } else {
                  resultList.push(Object.assign(res.data[i], {
                    'name': item.name,
                    'num': item.spec == res.data[i].spec ? Number(item.num) : 0,
                    'frequency': item.frequency,
                    'usage': item.usage,
                    'unit': item.spec == res.data[i].spec ? item.unit : '',
                    'dose_once': Number(item.dose_once.replace(/([^\d\.]*)/gim, '')),
                    'is_match': 1
                  }))
                }
                break;
              }
            }

            if (i == len) {
              item.is_match = 0;
              resultList.push(Object.assign({}, item))
            }
          });
          self.useTplList = resultList
          self.showUseTpl = true;
        } else {
          self.$Message.info(res.msg)
        }
      });
    },
    useTplHide() {
      this.showUseTpl = false
    },
    useTpl() {
      let self = this
      self.clean_recipe();
      self.useTplList.forEach(function (item) {
        self.add_new_medicine({item: item, type: self.recipeType});
      });
      self.useTplHide()
    },
    cancel() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
  .prescription_detail_btn {
    width: 100%;
    height: 1.875rem;
    line-height: 1.875rem;
    font-size: 0.9375rem;
    text-align: center;
    border-radius: 0.25rem;
    color: #fff;
    background: #eeae1d;
    cursor: pointer;
  }

  .search-result-title {
    color: #4c4c4c;
    font-size: 0.9375rem;
    font-weight: bold;
    margin-left: 0.875rem;
    padding: 1rem 0 0.375rem;
  }

  .search-result-indications {
    margin-left: 0.875rem;
    line-height: 1.25rem;
    font-size: 0.875rem;
  }

  .search-result-line {
    padding-bottom: 0.5625rem;
    border-bottom: 0.0625rem solid #CCCCCC;
  }

  .checkbox-block {
    padding: 11px 10px 3px;
  }

  .label-text {
    font-size: 0.875rem;
    margin-left: 0.5rem;
  }

  .search-result .herbal-result-li {
    width: 31.5%;
    height: 3.75rem;
    border: #CCCCCC solid 0.0625rem;
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
    width: 100%;
    height: 2.5rem;
    border: #CCCCCC solid 0.0625rem;
    border-radius: 0.25rem;
    float: left;
    margin-right: 1%;
    margin-bottom: 0.25rem;
    text-align: center;
    justify-content: center;
    display: flex;
    align-items: center;
    font-size: 0.875rem;
    cursor: pointer;
  }

  .prescription_detail_save {
    margin-left: 2%;
    width: 30%;
    height: 2rem;
    border: #5096e0 solid 0.0625rem;
    border-radius: 1.875rem;
    text-align: center;
    color: #5096e0;
    float: left;
    background-color: transparent;
  }

  .alert-back {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 1000;
    background: rgba(255, 255, 255, 0.5);
  }

  .alert-back .use-tpl {
    background: #ffffff;
    box-shadow: 0 0.25rem 1rem 0.25rem rgba(0, 0, 0, 0.2);
    border-radius: 0.25rem;
    z-index: 1050;
    position: relative;
    top: 50%;
    left: 50%;
    width: 50rem;
    padding: 1.25rem 3.125rem;
    max-height: 50rem;
    font-size: 0.875rem;
    overflow: auto;
    font-weight: bold;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .alert-title {
    text-align: center;
    font-weight: 900;
    font-size: 1rem;
    color: #5f95da;
  }

  .use-tpl .use-list {
    display: flex;
    flex-wrap: wrap;
  }

  .use-tpl .use-list .use-list-li {
    width: 33.3%;
    font-size: 0.875rem;
  }

  .saveBtn {
    font-size: 0.875rem;
    color: #ffffff;
    font-weight: bold;
    width: 8.75rem;
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

  .record-content {
    width: 100%;
    font-weight: normal;
    max-height: 50vh;
    overflow-y: auto;
  }
</style>
