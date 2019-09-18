<template>
  <div class="pt5 pl6 pr6 search-block">
    <f-loader v-if="showLoading" :fixed="false"></f-loader>
    <div v-if="!showTpl">
      <div class="mb6" style="width:100%;display:flex;height:2rem;">
        <div class="flexOne mr10">
          <Input placeholder="请输入模板名称" tabindex="-1" @input="tplSearch(1)" v-model="searchTplName"/>
        </div>
        <div>
          <button class="search-btn" @click="tplSearch(1)">搜索</button>
        </div>
      </div>
      <div v-show="showResult" style="min-height:20rem" id="tplList">
        <div
          v-for="item in tplSearchList"
          :key="item.id"
          @click.stop="tplShow(item)"
        >
          <div
            v-if="recipeType===0"
            class="prescript-list"
          >
            {{item.name}}
            <span v-show="item.scope===1">（个人模板）</span>
            <span v-show="item.scope===0">（共享模板）</span>
          </div>
          <div
            v-else
            class="med-template"
          >
            <div class="med-template-title">{{item.name}}</div>
            <div class="med-template-content">
              {{item.symptom|textEllipsis(temItemWidth)}}
            </div>
          </div>
        </div>
        <div
          class="mt10 tc"
          v-show="tplSearchList.length<1"
        >暂无模板
        </div>
        <div class="t-h-btn-group pt15">
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
    <div class="mt5" v-show="showTpl">
      <div class="prescription_detail_btn mb16" @click="tplHide()">返回</div>
      <section class="tpl-content">
        <div class="search-result-title">
          <span>{{tplData.name}}</span>
          <span v-show="tplData.scope==0">(共享模板)</span>
          <span v-show="tplData.scope==1">(个人模板)</span>
        </div>
        <div class="search-result-indications" v-show="recipeType!=0">
          {{tplData.symptom}}
        </div>
        <div class="search-result-line"></div>
        <div class="search-result mt12 ml5 mr5" v-show="recipeType!=0">
          <div
            :class="[{'herbal-result-li':recipeType===1},{'search-result-li':recipeType!=1}]"
            v-for="(item,index) in tplData.items"
            :key="index"
          >
            <span v-show="recipeType===1">
              {{item.alias_name||item.clinic_alias_name||item.name}}
              <br>
              （{{item.adult_num}}{{item.unit}}）
            </span>
            <span v-show="recipeType===2">
              {{item.alias_name||item.clinic_alias_name||item.name}}
              {{item.spec}}
            </span>
            <span v-show="recipeType===4">
              {{item.alias_name||item.clinic_alias_name||item.name}}
              （{{item.num}}次）
            </span>
          </div>
          <div class="clear"></div>
        </div>
        <div class="ml10" v-show="recipeType==0">
          <div v-if="tplData.chief_complaint" class="tpl-case-div">
            <span class="case-label">主诉</span>
            <span>{{tplData.chief_complaint}}</span>
          </div>
          <div v-if="tplData.present_illness" class="tpl-case-div">
            <span class="case-label">现病史</span>
            <span>{{tplData.present_illness}}</span>
          </div>
          <div v-if="tplData.past_history" class="tpl-case-div">
            <span class="case-label">既往史</span>
            <span>{{tplData.past_history}}</span>
          </div>
          <div v-if="tplData.allergic_history" class="tpl-case-div">
            <span class="case-label">过敏史</span>
            <span>{{tplData.allergic_history}}</span>
          </div>
          <div v-if="tplData.personal_history" class="tpl-case-div">
            <span class="case-label">个人史</span>
            <span>{{tplData.personal_history}}</span>
          </div>
          <div v-if="tplData.family_history" class="tpl-case-div">
            <span class="case-label">家族史</span>
            <span>{{tplData.family_history}}</span>
          </div>
          <div v-if="tplData.prophylactic_history" class="tpl-case-div">
            <span class="case-label">预防接种史</span>
            <span>{{tplData.prophylactic_history}}</span>
          </div>
          <div v-if="tplExamination" class="tpl-case-div">
            <span class="case-label">体格检查</span>
            <span>{{tplExamination}}</span>
          </div>
          <div v-if="tplData.auxiliary_examination" class="tpl-case-div">
            <span class="case-label">辅助检查</span>
            <span>{{tplData.auxiliary_examination}}</span>
          </div>
          <div v-if="tplData.diagnosis" class="tpl-case-div">
            <span class="case-label">中医诊断</span>
            <span>{{tplData.diagnosis}}</span>
          </div>
          <div v-if="tplData.diagnosis_xy" class="tpl-case-div">
            <span class="case-label">初步诊断</span>
            <span>{{tplData.diagnosis_xy}}</span>
          </div>
          <div v-if="tplData.treat_advice" class="tpl-case-div">
            <span class="case-label">治疗处理</span>
            <span>{{tplData.treat_advice}}</span>
          </div>
          <div v-if="tplData.sport_advice" class="tpl-case-div">
            <span class="case-label">运动建议</span>
            <span>{{tplData.sport_advice}}</span>
          </div>
          <div v-if="tplData.dietary_advice" class="tpl-case-div">
            <span class="case-label">膳食建议</span>
            <span>{{tplData.dietary_advice}}</span>
          </div>

        </div>
      </section>

      <div class="mb20 mt20">
        <button class="prescription_detail_save mr2" @click.stop="useTplShow()">引用模板</button>
        <button class="prescription_detail_del" @click.stop="delTplShow()">删除模板</button>
        <div class="clear"></div>
      </div>
      <div v-if="showUseTpl" class="alert-back">
        <div class="use-tpl">
          <div class="alert-title">确定使用[{{tplData.name}}]模板？</div>
          <div class="mt20 mb10">
            使用模板将覆盖已编辑之信息
            <span v-if="recipeType!=0">
                <strong style="color:red;">，暂无药品</strong>需要自行更改。
              </span>
          </div>
          <div class="use-list mt10">
            <div
              v-if="recipeType!=0"
              class="use-list-li"
              v-for="(item,index) in tplUseList"
              :key="index"
            >
              {{item.alias_name||item.clinic_alias_name||item.name}} ({{item.num}}{{item.unit}}<strong
              v-if="item.usage">/</strong>{{item.usage}})
              <span
                v-show="recipeType==4"
              >{{item.price}}/次</span>
              <span v-show="item.is_match!=1" style="color:red;font-weight:bold;">暂无此药</span>
            </div>
            <div v-if="recipeType==0" class="record-content">
              <div class="mb10" v-if="tplData.chief_complaint">
                <span class="case-label">主诉</span>
                <span>{{tplData.chief_complaint}}</span>
              </div>
              <div class="mb10" v-if="tplData.present_illness">
                <span class="case-label">现病史</span>
                <span>{{tplData.present_illness}}</span>
              </div>
              <div class="mb10" v-if="tplData.past_history">
                <span class="case-label">既往史</span>
                <span>{{tplData.past_history}}</span>
              </div>
              <div class="mb10" v-if="tplData.allergic_history">
                <span class="case-label">过敏史</span>
                <span>{{tplData.allergic_history}}</span>
              </div>
              <div class="mb10" v-if="tplData.personal_history">
                <span class="case-label">个人史</span>
                <span>{{tplData.personal_history}}</span>
              </div>
              <div class="mb10" v-if="tplData.family_history">
                <span class="case-label">家族史</span>
                <span>{{tplData.family_history}}</span>
              </div>
              <div class="mb10" v-if="tplData.prophylactic_history">
                <span class="case-label">预防接种史</span>
                <span>{{tplData.prophylactic_history}}</span>
              </div>
              <div class="mb10" v-if="tplExamination">
                <span class="case-label">体格检查</span>
                <span>{{tplExamination}}</span>
              </div>
              <div class="mb10" v-if="tplData.auxiliary_examination">
                <span class="case-label">辅助检查</span>
                <span>{{tplData.auxiliary_examination}}</span>
              </div>
              <div class="mb10" v-if="tplData.diagnosis">
                <span class="case-label">中医诊断</span>
                <span>{{tplData.diagnosis}}</span>
              </div>
              <div class="mb10" v-if="tplData.diagnosis_xy">
                <span class="case-label">初步诊断</span>
                <span>{{tplData.diagnosis_xy}}</span>
              </div>
              <div class="mb10" v-if="tplData.treat_advice">
                <span class="case-label">治疗处理</span>
                <span>{{tplData.treat_advice}}</span>
              </div>
              <div class="mb10" v-if="tplData.sport_advice">
                <span class="case-label">运动建议</span>
                <span>{{tplData.sport_advice}}</span>
              </div>
              <div class="mb10" v-if="tplData.dietary_advice">
                <span class="case-label">膳食建议</span>
                <span>{{tplData.dietary_advice}}</span>
              </div>
            </div>
          </div>
          <div class=" tc mt30">
            <button class="saveBtn mr20" @click.stop="useTpl()">确认</button>
            <button class="saveBtn cancelBtn" @click.stop="useTplHide()">取消</button>
          </div>
        </div>
      </div>
      <div v-if="showDelTpl" class="alert-back" style="font-size:1rem;">
        <div class="del-tpl">
          <div class="ml20 pt20">删除模板</div>
          <div class="ml20 pt10">
            <Icon type="md-help-circle" size="40" color="#3182FB"/>
            <span class="ml10">确定要删除[{{tplData.name}}]模板?</span>
          </div>
          <div style="position:absolute;right:5rem;bottom:2rem;">
            <span @click="delTplHide()">取消</span>
            <Button class="ml20 tpl-btn" shape="circle" type="primary" @click="delTpl()">确定</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  westernMedUsages,
  herbalMedUsages,
  herbalRpUsages,
  medFrequency
} from "@/assets/js/mapType";
import {mapState, mapGetters, mapActions} from "vuex";
import {Input, Button, Select, Option, Icon, InputNumber} from "iview";
import {
  searchTpl,
  updateTpl,
  delTpl,
  saveMedTpl,
  searchMed
} from "@/fetch/api.js";
import fLoader from "@/components/fLoader";

export default {
  name: "tpl",
  components: {
    Input,
    Button,
    Select,
    Option,
    Icon,
    InputNumber,
    fLoader
  },
  data() {
    return {
      showResult: false,
      timer: null,
      currPage: 1,
      page_num: 1,
      page_size: 10,
      westernMedUsages: westernMedUsages,
      medFrequency: medFrequency,
      showAddTpl: false,
      showDelTpl: false,
      showEditTpl: false,
      showUseTpl: false,
      searchTplName: "",
      tplSearchList: [],
      searchMedicineList: [],
      showTpl: false,
      tplData: {
        category: 0,
        clinic_id: 0,
        creator_name: "",
        creator_id: "",
        id: 0,
        name: "",
        symptom: "",
        scope: 0,
        items: [],
        dosage: 0,
        doctor_remark: "",

        chief_complaint: "", //主诉
        present_illness: "", //病史
        allergic_history: "", //过敏史
        personal_history: "", // 个人史
        past_history: "", //既往史
        family_history: "", // 家族史
        prophylactic_history: "", // 预防接种史
        examination: "", //检查
        auxiliary_examination: "", // 辅助检查
        diagnosis: "", //中医诊断
        diagnosis_xy: "", //西医诊断
        treat_advice: "", //处理意见
        sport_advice: "", // 运动建议
        dietary_advice: "" // 膳食建议
      },
      tplUseList: [],
      tplEditData: {
        category: 1,
        isCloud: 0,
        tplName: "",
        scope: 0,
        items: [],
        dosage: 0,
        doctor_remark: "",
        searchName: "",
        searchLists: [],
        searchListShow: false,
        currIndex: -1
      },
      tplType: [{name: "个人", scope: 1}, {name: "共享", scope: 0}],
      showLoading: false,
      firstTimer: null,
      temItemWidth: '',
      test: '胁肋疼痛，胸闷善太息，情志抑郁，易怒，脘腹胀满，脉弦，肝气郁滞证。胁肋疼痛，胸闷善太息，情志抑郁，易怒，脘腹胀满，脉弦，肝气郁。胁肋疼痛，胸闷善太息，情志抑郁，易怒，脘腹胀满，脉弦，肝气郁'
    };
  },
  computed: {
    ...mapState({
      tplChange: state => state.tplChange,
      age: state => state.patientData.age
    }),
    tplExamination: function () {
      if (this.recipeType == 0 && this.tplData.examination) {
        var e = JSON.parse(this.tplData.examination);
        var ret = "";
        (e.bloodpressure_num1 || e.bloodpressure_num2) &&
        (ret +=
          "血压" +
          e.bloodpressure_num1 +
          "/" +
          e.bloodpressure_num2 +
          "mmHg，");
        e.bloodglucose && (ret += "血糖" + e.bloodglucose + "mg/ml，");
        e.trioxypurine && (ret += "尿酸" + e.trioxypurine + "umol/L，");
        e.heartrate && (ret += "心率" + e.heartrate + "次/分，");
        e.breathe && (ret += "呼吸" + e.breathe + "次/分，");
        e.animalheat && (ret += "体温" + e.animalheat + "℃，");
        e.weight && (ret += "体重" + e.weight + "kg，");
        e.info && (ret += (ret ? "\n" : "") + e.info);
        return ret;
      } else {
        return "";
      }
    },
    herbalMedUsages: function () {
      return herbalMedUsages.filter(item => {
        return item.status === 1;
      });
    },
    ...mapGetters(["currRecipeData"]),
    recipeType: function () {
      return this.currRecipeData === undefined ? 0 : this.currRecipeData.type;
    },
    isCloud: function () {
      return this.currRecipeData === undefined ? 0 : (this.currRecipeData.data.is_cloud === undefined ? 0 : this.currRecipeData.data.is_cloud);
    },
    category: function () {
      return this.currRecipeData === undefined ? 1 : (this.currRecipeData.data.category === undefined ? 1 : this.currRecipeData.data.category);
    },
    therapyType: function () {
      return this.currRecipeData === undefined ? 1 : (this.currRecipeData.data.type === undefined ? 1 : this.currRecipeData.data.type);
    }
  },
  mounted() {
    this.firstSearch();
  },
  filters: {
    textEllipsis(val, width) {
      let lineNum = Math.floor((width - 20) / 14) - 1
      if (val) {
        if (val.length <= lineNum * 3) {
          return val
        } else {
          return val.slice(0, lineNum * 3 - 1) + '...'
        }
      } else {
        return '暂无填写主治症状'
      }
    }
  },
  watch: {
    // isCloud: function () {
    //   this.showTpl = false;
    //   this.showResult = false;
    //   this.firstSearch();
    // },
    recipeType: function () {
      this.showTpl = false;
      this.showResult = false;
      this.firstSearch();
    },
    category: function () {
      this.showTpl = false;
      this.showResult = false;
      this.firstSearch();
    },
    tplChange: function () {
      this.showResult = false;
      this.firstSearch();
    },
    "tplEditData.searchLists": {
      deep: true,
      handler: function () {
        if (this.tplEditData.searchLists.length >= 1) {
          this.tplEditData.searchListShow = true;
        }
      }
    },
    therapyType: function () {
      this.showTpl = false;
      this.showResult = false;
      this.firstSearch();
    }
  },
  methods: {
    ...mapActions(["add_new_medicine", "clean_recipe", "set_record_prop", "modify_recipe_detail"]),
    firstSearch: function () {
      clearTimeout(this.firstTimer)
      this.firstTimer = setTimeout(() => {
        this.searchTplName = ''
        this.tplSearch(1);
      }, 100)
    },
    changePage: function (flag) {
      if (flag == 0) {
        if (this.currPage <= 1) {
          this.currPage = 1;
        } else {
          this.currPage--;
          this.tplSearch(this.currPage)
        }
      } else if (flag == 1) {
        if (this.currPage >= this.page_num) {
          this.currPage = this.page_num;
        } else {
          this.currPage++;
          this.tplSearch(this.currPage)
        }
      }
    },
    tplSearch: function (page) {
      var self = this;
      self.currPage = page
      var params = {};
      if (this.recipeType != 6 && this.recipeType != 3) {
        this.showResult = true;
      } else {
        return
      }
      this.showLoading = true
      if (self.recipeType == 0) {
        self.page_size = window.screen.height > 960 || window.screen.width >= 1600 ? 10 : 8
      } else {
        self.page_size = window.screen.height > 960 || window.screen.width > 1600 ? 5 : (window.screen.height >= 900 ? 4 : 3)
      }
      switch (self.recipeType) {
        case 0: {
          params = {
            name: self.searchTplName,
            scope: 1,
            page: self.currPage,
            page_size: self.page_size
          };
          break;
        }
        case 1: {
          params = {
            name: self.searchTplName,
            page: self.currPage,
            page_size: self.page_size
          };
          break;
        }
        case 2: {
          params = {
            name: self.searchTplName,
            page: self.currPage,
            page_size: self.page_size
          };
          break;
        }
        case 4: {
          params = {
            name: self.searchTplName,
            type: self.therapyType,
            page: self.currPage,
            page_size: self.page_size
          };
          break;
        }
      }
      clearTimeout(this.timer);
      self.timer = setTimeout(() => {
        if (this.recipeType != 6 && this.recipeType != 3) {
          searchTpl(params, self.recipeType).then(function (res) {
            if (res.code == 1000) {
              self.showLoading = false
              self.temItemWidth = Number(self.getCurrentStyle(document.getElementById('tplList')).width.replace(/px/g, ''))
              self.tplSearchList = res.data;
              self.page_num = Math.ceil(res.total_num / self.page_size)
              self.showResult = true;
            } else {
              this.$Message.info(res.msg)
            }
          }).catch(error => {
            self.showLoading = false
            console.log(error)
          })
        }
      }, 300);
    },
    addTpl: function () {
      this.tplEditData = {
        category: this.category,
        isCloud: this.isCloud,
        tplName: "",
        scope: 0,
        items: [],
        dosage: 0,
        doctor_remark: "",
        searchName: "",
        searchLists: [],
        searchListShow: false
      };
      this.showAddTpl = true;
    },
    tplMedSearch: function () {
      var self = this;
      var params = {};
      if (self.tplEditData.searchName == "") {
        this.tplEditData.searchListShow = false;
        return;
      }
      switch (this.recipeType) {
        case 1: {
          params = {
            category: self.category,
            medicine_name: self.tplEditData.searchName,
            page: 1,
            status: 1
          };
          break;
        }
        case 2: {
          params = {
            medicine_name: self.tplEditData.searchName,
            status: 1,
            page: 1
          };
          break;
        }
        case 4: {
          params = {
            name: self.tplEditData.searchName,
            page: 1
          };
          break;
        }
      }
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        searchMed(params, self.recipeType, self.isCloud).then(
          function (res) {
            if (res.code == 1000) {
              self.tplEditData.searchLists = res.data;
            }
          },
          function (err) {
            console.log(err);
          }
        );
      });
    },
    editTplAddList: function (item) {
      var self = this;

      for (let i = 0, len = self.tplEditData.items.length; i < len; i++) {
        if (self.tplEditData.items[i].name == item.name) {
          self.$Message.info("该药品已在列表中")

          self.tplEditData.searchLists = [];
          self.tplEditData.searchListShow = false;
          self.tplEditData.searchName = "";
          return
        }
      }

      var newItem = {
        item_id: item.id,
        name: item.alias_name || item.clinic_alias_name || item.name,
        num: 0,
        unit: item.unit || item.unit_stock,
        unit_stock: item.unit_stock || item.unit,
        stock: item.stock,
        dose_once: item.dose_once,
        unit_stock: item.unit_stock,
        unit_sale: item.unit_sale,
        unit_dose: item.unit_dose,
        sale_dose_ratio: item.sale_dose_ratio,
        stock_sale_ratio: item.stock_sale_ratio,
        price: item.price || item.sale_price,
        sale_price: item.sale_price || item.price,
        usage: 0,
        spec: item.spec,
        alias_name: item.alias_name,
        clinic_alias_name: item.clinic_alias_name,
        status: item.status || 1,
        type: item.type,
        days: 0,
        default_sale_price: item.default_sale_price
      };
      self.tplEditData.items.push(newItem);
      self.tplEditData.searchListShow = false;
      self.tplEditData.searchLists = [];
      self.tplEditData.searchName = "";

    },
    delEditTplLists: function (index) {
      this.tplEditData.items.splice(index, 1);
    },
    saveTplAdd: function () {
      var self = this;
      var params = {};
      var flag = true;
      if (self.tplEditData.tplName == "") {
        alert("请填写模板名称");
        return;
      }
      if (self.tplEditData.items.length < 1) {
        alert("请输入至少一个药品/项目");
        return;
      }
      self.tplEditData.items.forEach(function (e) {
        if (e.num < 1) {
          flag = false;
        }
      });
      if (!flag) {
        alert("药品/项目数量必须大于零");
        return;
      }
      switch (this.recipeType) {
        case 1: {
          params = {
            name: self.tplEditData.tplName,
            scope: self.tplEditData.scope,
            items: self.tplEditData.items,
            dosage: self.tplEditData.dosage,
            doctor_remark: self.tplEditData.doctor_remark,
            category: self.category,
            is_cloud: self.isCloud
          };
          break;
        }
        case 2: {
          params = {
            name: self.tplEditData.tplName,
            scope: self.tplEditData.scope,
            items: self.tplEditData.items,
            dosage: self.tplEditData.dosage,
            doctor_remark: self.tplEditData.doctor_remark,
            category: 1,
            is_cloud: self.isCloud
          };
          break;
        }
        case 4: {
          params = {
            name: self.tplEditData.tplName,
            scope: self.tplEditData.scope,
            items: self.tplEditData.items,
            dosage: self.tplEditData.dosage,
            is_cloud: 0,
            doctor_remark: self.tplEditData.doctor_remark
          };
        }
      }
      saveMedTpl(params, this.recipeType).then(
        function (res) {
          if (res.code == 1000) {
            self.tplEditData = {
              category: self.category,
              tplName: "",
              scope: 0,
              items: [],
              dosage: 0,
              doctor_remark: "",
              searchName: "",
              searchLists: [],
              searchListShow: false
            };
            self.showAddTpl = false;
            self.firstSearch();
          } else {
            alert("添加失败，" + "res.msg");
          }
        },
        function (err) {
          console.log(err);
        }
      );
    },
    cancelTplAdd: function () {
      this.tplEditData.searchListShow = false;
      this.tplEditData.searchLists = [];
      this.showAddTpl = false;
    },
    tplShow: function (item) {
      let self = this;
      self.tplEditData.searchName = "";
      self.tplData = Object.assign(item, {
        items: item.component ? JSON.parse(item.component) : [],
      })
      self.showTpl = true;
    },
    tplHide: function () {
      this.showTpl = false;
    },
    useTpl: function () {
      var self = this;
      if (this.recipeType !== 0) {
        this.clean_recipe();
        self.tplUseList.forEach(function (item) {
          self.add_new_medicine({item: item, type: self.recipeType});
        });
        this.showUseTpl = false;
      } else {
        var data = {
          chief_complaint: self.tplData.chief_complaint || "",
          present_illness: self.tplData.present_illness || "",
          allergic_history: self.tplData.allergic_history || "",
          personal_history: self.tplData.personal_history || "",
          past_history: self.tplData.past_history || "",
          family_history: self.tplData.family_history || "",
          prophylactic_history: self.tplData.prophylactic_history || "",
          auxiliary_examination: self.tplData.auxiliary_examination || "",
          examinationInfo: self.tplData.examination
            ? JSON.parse(self.tplData.examination)
            : {},
          examination: self.tplData.examination
            ? JSON.parse(self.tplData.examination)
            : {},
          diagnosis: self.tplData.diagnosis != "" ? self.tplData.diagnosis + ";" : "",
          diagnosis_xy: self.tplData.diagnosis_xy != "" ? self.tplData.diagnosis_xy + ";" : "",
          diagnosis_input:
            self.tplData.diagnosis != "" ? self.tplData.diagnosis + ";" : "",
          diagnosis_xy_input:
            self.tplData.diagnosis_xy != "" ? self.tplData.diagnosis_xy + ";" : "",
          treat_advice: self.tplData.treat_advice || "",
          diagnosis_xy_labels: [],
          diagnosis_labels: [],
          sport_advice: self.tplData.sport_advice,
          dietary_advice: self.tplData.dietary_advice
        };
        let list = ['allergic_history', 'family_history', 'diagnosis', 'personal_history', 'prophylactic_history', 'sport_advice', 'past_history', 'examination', 'auxiliary_examination', 'dietary_advice']
        let record_list = []
        list.forEach(item => {
          if (data[item] && JSON.stringify(data[item]) != '{}') {
            record_list.push(item)
          }
        })
        self.set_record_prop({key: 'recordList', val: record_list})
        Object.keys(data).forEach(function (k) {
          self.set_record_prop({
            key: k,
            val: data[k]
          });
        });
        self.showUseTpl = false;
      }
    },
    useTplShow: function () {
      let self = this;
      if (this.recipeType === 0) {
        self.showUseTpl = true;
        return
      }
      let names = []
      let params = {}
      let items = JSON.parse(JSON.stringify(self.tplData.items));
      items.forEach(function (item) {
        names.push(item.name)
      });
      if (this.recipeType == 1) {
        params = {names: names, status: 1, category: Number(self.category)}
      } else if (this.recipeType == 4) {
        params = {names: names, status: 1, type: Number(self.therapyType)}
      } else {
        params = {names: names, status: 1}
      }
      let resultList = []

      searchMed(params, this.recipeType, self.isCloud).then(function (res) {
        if (res.code == 1000) {
          items.forEach((item) => {
            for (var i = 0, len = res.data.length; i < len; i++) {
              if (item.name == res.data[i].name || item.name == res.data[i].alias_name || item.name == res.data[i].clinic_alias_name) {
                if (self.recipeType == 1) {
                  let num = self.age > 12 ? Number(item.adult_num) : (item.kids_num !== '' ? Number(item.kids_num) : Number(item.adult_num))
                  resultList.push(Object.assign(res.data[i], {
                    num: res.data[i].unit_sale == item.unit ? Math.ceil(num / res.data[i].stock_sale_ratio) : 0,
                    name: item.name,
                    unit: res.data[i].unit_stock,
                    usage: item.usage,
                    is_match: 1
                  }))
                } else if (self.recipeType == 2) {
                  resultList.push(Object.assign(res.data[i], {
                    'name': item.name,
                    'num': item.spec == res.data[i].spec ? Number(item.num) : 0,
                    'frequency': item.frequency,
                    'usage': item.usage,
                    'unit': item.spec == res.data[i].spec ? item.unit : '',
                    'dose_once': Number(item.dose_once.toString().replace(/([^\d\.]*)/gim, '')),
                    'is_match': 1
                  }))
                } else {
                  resultList.push(Object.assign(res.data[i], {
                    'is_match': 1,
                    'name': item.name,
                    'num': item.num,
                    'remark': item.remark
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
          self.tplUseList = resultList
          self.showUseTpl = true;
        } else {
          self.$Message.info(res.msg)
        }
      });
    },
    useTplHide: function () {
      this.showUseTpl = false;
    },
    delTplShow: function () {
      this.showDelTpl = true;
    },
    delTplHide: function () {
      this.showDelTpl = false;
    },
    getCurrentStyle: function (node) {
      let style = null
      if (window.getComputedStyle) {
        style = window.getComputedStyle(node, null)
      } else {
        style = node.currentStyle
      }
      return style
    },
    delTpl: function () {
      var self = this;
      delTpl(self.tplData.id, {}, self.recipeType).then(function (res) {
        if (res.code == 1000) {
          self.showDelTpl = false;
          self.showTpl = false;
          self.firstSearch();
        } else {
          alert("删除失败 " + res.msg);
          self.showDelTpl = false;
        }
      });
    },
  }
};
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

  .add_prescription_btn {
    width: 100%;
    height: 2.5rem;
    line-height: 2.5rem;
    background: #eeae1d;
    color: #fff;
    font-size: 1rem;
    text-align: center;
    border-radius: 0.25rem;
    display: inline-block;
  }

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
    padding: 0 0 0.375rem;
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

  .prescription_detail_del {
    margin-left: 2%;
    width: 30%;
    height: 2rem;
    border: #fc3b3b solid 0.0625rem;
    border-radius: 1.875rem;
    text-align: center;
    color: #fc3b3b;
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

  .alert-back .del-tpl {
    background-color: #ffffff;
    box-shadow: 0 0.25rem 1rem 0.25rem rgba(0, 0, 0, 0.2);
    border-radius: 0.25rem;
    border-radius: 0.25rem;
    z-index: 1050;
    margin: 0 auto;
    position: relative;
    top: 8rem;
    width: 24rem;
    min-height: 12rem;
  }

  .alert-back .edit-tpl {
    background: #ffffff;
    box-shadow: 0 0.25rem 1rem 0.25rem rgba(0, 0, 0, 0.2);
    border-radius: 0.25rem;
    z-index: 1050;
    margin: 0 auto;
    position: relative;
    top: 50%;
    width: 68.75rem;
    font-size: 1rem;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
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


  .search-input {
    width: 75%;
    height: 2rem;
    border: #5096e0 solid 0.0625rem;
    border-radius: 0.25rem;
    margin-right: 0.25rem;
    text-indent: 0.625rem;
    outline: none;
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

  .add_prescription_btn {
    width: 100%;
    height: 2.5rem;
    line-height: 2.5rem;
    background: #eeae1d;
    color: #fff;
    font-size: 1rem;
    text-align: center;
    border-radius: 0.25rem;
    display: inline-block;
  }

  tr th {
    background-color: #f4fafe;
    padding: 0.625rem;
  }

  td,
  th {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }

  .diagnosis_input {
    width: 90%;
    height: 2rem;
    border: #5096e0 solid 0.0625rem;
    border-radius: 0.25rem;
    text-align: center;
  }

  tbody tr {
    border-bottom: #c1c1c1 solid 0.0625rem;
  }

  tbody td {
    padding: 0.325rem 0 !important;
  }

  .edit-tpl-foot {
    border-top: #ccc solid 0.0625rem;
    text-align: center;
    padding: 1.25rem 0;
  }

  .tpl-search-result {
    position: absolute;
    z-index: 4396;
    width: 45%;
    font-size: 0.875rem;
    background-color: white;
    box-shadow: 0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.2);
    border-radius: 0.25rem;
  }

  .tpl-search-list {
    max-height: 8rem;
    overflow: auto;
  }

  .tpl-btn {
    font-size: 0.875rem;
    width: 6rem;
  }

  .tpl-case-div {
    margin-right: 0.5rem;
    padding: 0.5rem 0;
    border-bottom: 0.0625rem solid #c1c1c1;
    border-top: 0.0625rem transparent;
  }

  .case-label {
    font-weight: bold;
    min-width: 4rem;
    display: inline-block;
  }

  .clear {
    clear: bottom;
  }

  .inline-block {
    display: inline-block;
  }

  .tpl-content {
    max-height: calc(100vh - 19rem);
    overflow-y: auto;
    font-size: 0.875rem;
  }

  .record-content {
    width: 100%;
    font-weight: normal;
    max-height: 50vh;
    overflow-y: auto;
  }

  .search-block {
    position: relative;
    height: 100%
  }

  .med-template {
    border: 1px solid #CCCCCC;
    border-radius: 4px;
    padding: 10px;
    min-height: 5.4375rem;
    max-height: 6.6875rem;
    margin-top: 0.625rem;
    cursor: pointer;
    overflow: hidden;
  }

  .med-template-title {
    color: #5096E0;
    font-weight: bold;
    font-size: 0.9375rem;
    margin-bottom: 0.375rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 18vw;
  }

  .med-template-content {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
</style>
