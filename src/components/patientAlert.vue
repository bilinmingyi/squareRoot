<template>
  <div class="prescription_tab_bg">
    <!--主诉-->
    <div v-if="DiagnosisItem.type==2" class="prescription_tab">
      <div v-show="!DiagnosisItem.CommonEdit">
        <div class="display-flex mb10">
          <div class="prescription_tab_head_title">{{DiagnosisItem.typeName}}编辑</div>
          <div class="prescription_tab_head_close mr10" @click.stop="deleteContent()">删除</div>
          <div class="prescription_tab_head_close" @click.stop="Initialization()">重置</div>
        </div>
        <div class="mb10">
          <Input
            type="textarea"
            :rows="3"
            placeholder="请输入文字"
            v-model="DiagnosisItem.contentText"
            @click.stop="clickword(item)"
          ></Input>
        </div>
        <div class="mb10">
          <div class="display-flex flex-wrap">
            <div
              class="prescription_tab_content_item cursor_pointer"
              v-for="item in DiagnosisItem.currList"
              @click.stop="clickword(item)"
            >{{item}}
            </div>
          </div>
          <div class="display-flex">
            <div
              class="prescription_tab_num"
              v-for="item in numList"
              @click.stop="clickword(item)"
            >{{item}}
            </div>
          </div>
          <div class="display-flex mt10">
            <div
              class="prescription_tab_num"
              v-for="item in timeList"
              @click.stop="clickword(item)"
            >{{item}}
            </div>
          </div>
        </div>
        <div class="display-flex">
          <div class="display-flex flex-1">
            <div class="prescription_tab_page mr30" style="width: 48px;">
              <span class="active" v-show="DiagnosisItem.page>1" @click.stop="changeCurrPage(2)">上一页</span>
              <span class="disable" v-show="DiagnosisItem.page<=1">上一页</span>
            </div>
            <div class="prescription_tab_page mr30" style="width: 48px;">
              <span
                class="active"
                v-show="DiagnosisItem.page<DiagnosisItem.totalNum"
                @click.stop="changeCurrPage(1)"
              >下一页</span>
              <span class="disable" v-show="DiagnosisItem.page>=DiagnosisItem.totalNum">下一页</span>
            </div>
            <div class="prescription_set_common_world_btn" @click="setCommonWord()">设置常用词</div>
          </div>
          <div class="display-flex">
            <div class="prescription_tab_save mr20" @click.stop="saveEdit()">确定</div>
            <div class="prescription_tab_cancel" @click="clinicClose()">关闭</div>
          </div>
        </div>
      </div>
    </div>
    <!--主诉-->
    <!--病史-->
    <div v-if="DiagnosisItem.type==4" class="prescription_tab">
      <div v-show="!DiagnosisItem.CommonEdit">
        <div class="display-flex mb10">
          <div class="prescription_tab_head_title">{{DiagnosisItem.typeName}}编辑</div>
          <div class="prescription_tab_head_close mr10" @click.stop="deleteContent()">删除</div>
          <div class="prescription_tab_head_close" @click.stop="Initialization()">重置</div>
        </div>
        <div class="display-flex mb10">
          <Input
            type="textarea"
            :rows="4"
            placeholder="请输入文字"
            v-model="DiagnosisItem.contentText"
            @click.stop="clickword(item)"
          ></Input>
        </div>
        <div class="display-flex flex-wrap mb10">
          <div
            class="prescription_tab_content_item cursor_pointer"
            v-for="item in DiagnosisItem.currList"
            @click.stop="clickword(item)"
          >{{item}}
          </div>
        </div>
        <div class="display-flex">
          <div class="display-flex flex-1">
            <div class="prescription_tab_page mr30" style="width: 48px;">
              <span v-show="DiagnosisItem.page>1" class="active" @click.stop="changeCurrPage(2)">上一页</span>
              <span v-show="DiagnosisItem.page<=1" class="disable">上一页</span>
            </div>
            <div class="prescription_tab_page mr30" style="width: 48px;">
              <span
                v-show="DiagnosisItem.page<DiagnosisItem.totalNum"
                class="active"
                @click.stop="changeCurrPage(1)"
              >下一页</span>
              <span v-show="DiagnosisItem.page>=DiagnosisItem.totalNum" class="disable">下一页</span>
            </div>
            <div class="prescription_set_common_world_btn" @click="setCommonWord()">设置常用词</div>
          </div>
          <div class="display-flex">
            <div class="prescription_tab_save mr20" @click.stop="saveEdit()">确定</div>
            <div class="prescription_tab_cancel" @click="clinicClose()">关闭</div>
          </div>
        </div>
      </div>
      <div
        v-show="DiagnosisItem.CommonEdit"
      >#{include file="common/treatCommon/setCommonWord.html"/}
      </div>
    </div>
    <!--病史-->
    <!--过敏史-->
    <div v-if="DiagnosisItem.type==1" class="prescription_tab">
      <div v-show="!DiagnosisItem.CommonEdit">
        <div class="display-flex mb10">
          <div class="prescription_tab_head_title">{{DiagnosisItem.typeName}}编辑</div>
          <div class="prescription_tab_head_close mr10" @click.stop="deleteContent()">删除</div>
          <div class="prescription_tab_head_close" @click.stop="Initialization()">重置</div>
        </div>
        <div class="mb10">
          <Input type="textarea" :rows="4" placeholder="请输入文字" v-model="DiagnosisItem.contentText"></Input>
        </div>
        <div class="display-flex flex-wrap mb10">
          <div
            class="prescription_tab_content_item cursor_pointer"
            v-for="item in DiagnosisItem.currList"
            @click.stop="clickword(item)"
          >{{item}}
          </div>
        </div>
        <div class="display-flex">
          <div class="display-flex flex-1">
            <div class="prescription_tab_page mr30" style="width: 48px;">
              <span v-show="DiagnosisItem.page>1" class="active" @click.stop="changeCurrPage(2)">上一页</span>
              <span v-show="DiagnosisItem.page<=1" class="disable">上一页</span>
            </div>
            <div class="prescription_tab_page mr30" style="width: 48px;">
              <span
                v-show="DiagnosisItem.page<DiagnosisItem.totalNum"
                class="active"
                @click.stop="changeCurrPage(1)"
              >下一页</span>
              <span v-show="DiagnosisItem.page>=DiagnosisItem.totalNum" class="disable">下一页</span>
            </div>
            <div class="prescription_set_common_world_btn" @click="setCommonWord()">设置常用词</div>
          </div>
          <div class="display-flex">
            <div class="prescription_tab_save mr20" @click.stop="saveEdit()">确定</div>
            <div class="prescription_tab_cancel" @click="clinicClose()">关闭</div>
          </div>
        </div>
      </div>
      <div
        v-show="DiagnosisItem.CommonEdit"
      >#{include file="common/treatCommon/setCommonWord.html"/}
      </div>
    </div>
    <!--过敏史-->
    <!--既往史-->
    <div v-if="DiagnosisItem.type==0" class="prescription_tab">
      <div v-show="!DiagnosisItem.CommonEdit">
        <div class="display-flex mb10">
          <div class="prescription_tab_head_title">{{DiagnosisItem.typeName}}编辑</div>
          <div class="prescription_tab_head_close mr10" @click.stop="deleteContent()">删除</div>
          <div class="prescription_tab_head_close" @click.stop="Initialization()">重置</div>
        </div>
        <div class="mb10">
          <Input type="textarea" :rows="4" placeholder="请输入文字" v-model="DiagnosisItem.contentText"></Input>
        </div>
        <div class="flex-wrap mb10">
          <div
            class="prescription_tab_content_item cursor_pointer"
            v-for="item in DiagnosisItem.currList"
            @click.stop="clickword(item)"
          >{{item}}
          </div>
        </div>
        <div class="display-flex">
          <div class="display-flex flex-1">
            <div class="prescription_tab_page mr30" style="width: 48px;">
              <span class="active" v-show="DiagnosisItem.page>1" @click.stop="changeCurrPage(2)">上一页</span>
              <span class="disable" v-show="DiagnosisItem.page<=1">上一页</span>
            </div>
            <div class="prescription_tab_page mr30" style="width: 48px;">
              <span
                class="active"
                v-show="DiagnosisItem.page<DiagnosisItem.totalNum"
                @click.stop="changeCurrPage(1)"
              >下一页</span>
              <span class="disable" v-show="DiagnosisItem.page>=DiagnosisItem.totalNum">下一页</span>
            </div>
            <div class="prescription_set_common_world_btn" @click="setCommonWord()">设置常用词</div>
          </div>
          <div class="display-flex">
            <div class="prescription_tab_save mr20" @click.stop="saveEdit()">确定</div>
            <div class="prescription_tab_cancel" @click="clinicClose()">关闭</div>
          </div>
        </div>
      </div>
    </div>
    <!--既往史-->
    <!--检查-->
    <div v-if="DiagnosisItem.type==3" class="prescription_tab">
      <div class="display-flex mb10">
        <div class="prescription_tab_head_title">{{DiagnosisItem.typeName}}编辑</div>
        <div class="prescription_tab_head_close" @click.stop="Initialization()">重置</div>
      </div>
      <div>
        <div class="prescription-blue-title">固定检查信息</div>
        <div class="prescription_tab_check">
          <div class="display-flex mb5">
            <div class="flex-1">
              <span class="check_name">血压</span>
              <span>
                <input
                  type="number"
                  class="check_num"
                  v-model="DiagnosisItem.check.bloodpressure_num1"
                >
              </span>
              <span>/</span>
              <span>
                <input
                  type="number"
                  class="check_num"
                  v-model="DiagnosisItem.check.bloodpressure_num2"
                >
              </span>
              <span>mmHg</span>
            </div>
            <div class="flex-1">
              <span class="check_name">血糖</span>
              <span>
                <input type="number" class="check_num" v-model="DiagnosisItem.check.bloodglucose">
              </span>
              <span>mg/ml</span>
            </div>
            <div class="flex-1"></div>
          </div>
          <div class="displayFlex mb5">
            <div class="flex-1">
              <span class="check_name">尿酸</span>
              <span>
                <input type="number" class="check_num" v-model="DiagnosisItem.check.trioxypurine">
              </span>
              <span>umol/L</span>
            </div>
            <div class="flex-1">
              <span class="check_name">心率</span>
              <span>
                <input type="number" class="check_num" v-model="DiagnosisItem.check.heartrate">
              </span>
              <span>次/分</span>
            </div>
            <div class="flex-1">
              <span class="check_name">呼吸</span>
              <span>
                <input type="number" class="check_num" v-model="DiagnosisItem.check.breathe">
              </span>
              <span>次/分</span>
            </div>
          </div>
          <div class="display-flex mb5">
            <div class="flex-1">
              <span class="check_name">体温</span>
              <span>
                <input type="number" class="check_num" v-model="DiagnosisItem.check.animalheat">
              </span>
              <span>℃</span>
            </div>
            <div class="flex-1">
              <span class="check_name">体重</span>
              <span>
                <input type="number" class="check_num" v-model="DiagnosisItem.check.weight">
              </span>
              <span>kg</span>
            </div>
            <div class="flex-1"></div>
          </div>
        </div>
      </div>
      <div class="clearfix">
        <div class="prescription-blue-title">检查信息编辑</div>
        <Input type="textarea" :rows="3" placeholder="请输入文字" v-model="DiagnosisItem.check.info"></Input>
      </div>
      <div class="display-flex mt10" style="justify-content: flex-end;">
        <div class="prescription_tab_save mr20" @click.stop="saveEdit()">确定</div>
        <div class="prescription_tab_cancel" @click="clinicClose()">关闭</div>
      </div>
    </div>
    <!--检查-->
    <set-common-word
      v-show="DiagnosisItem.CommonEdit"
      :data="DiagnosisItem"
      @close="DiagnosisItem.CommonEdit = false"
      @add="addCommonWord"
      @delete="delCommonWord"
      @dragEnd="dragEnd"
    ></set-common-word>
  </div>
</template>

<script>
import {mapState, mapActions} from "vuex";
import {Input} from "iview";
import {
  setCaseHistory
} from "@/fetch/api.js";
import setCommonWord from "./setCommonWord";

export default {
  props: {
    diagnosisTypeProp: {
      type: Number,
      default: -1
    },
    caseHistoryProp: {
      type: Object,
      default: {},
    },
    timeStamp: {
      type: Number,
      default: 0,
    }
  },
  components: {
    Input,
    setCommonWord
  },
  data() {
    return {
      DiagnosisItem: {},
      DiagnosisTypeList: [
        {
          type: 0,
          typeCode: "personal_history",
          typeName: "个人史",
          dataList: [],
          currList: [],
          totalNum: 0,
          page: 1,
          pageSize: 16,
          contentText: "",
          CommonEdit: false
        },
        {
          type: 1,
          typeCode: "allergic_history",
          typeName: "过敏史",
          dataList: [],
          currList: [],
          totalNum: 0,
          page: 1,
          pageSize: 16,
          contentText: "",
          CommonEdit: false
        },
        {
          type: 2,
          typeCode: "chief_complaint",
          typeName: "主诉",
          dataList: [],
          currList: [],
          totalNum: 0,
          page: 1,
          pageSize: 16,
          contentText: "",
          CommonEdit: false
        },
        {
          type: 3,
          typeCode: "examination",
          typeName: "检查",
          dataList: [],
          currList: [],
          totalNum: 0,
          page: 1,
          pageSize: 16,
          check: {
            bloodpressure_num1: "", //血压
            bloodpressure_num2: "",
            bloodglucose: "", //血压
            trioxypurine: "", //尿酸
            heartrate: "", //心率
            breathe: "", //呼吸
            animalheat: "", //体温
            weight: "", //体重
            info: ""
          },
          contentText: "",
          CommonEdit: false
        },
        {
          type: 4,
          typeCode: "present_illness",
          typeName: "病史",
          dataList: [],
          currList: [],
          totalNum: 0,
          page: 1,
          pageSize: 16,
          contentText: "",
          CommonEdit: false
        }
      ],
      numList: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "，", "。"],
      timeList: ["小时", "天", "周", "月", "年", "早上", "下午", "晚上"],
      showSetCommonWord: false,
    };
  },
  computed: {
    ...mapState({
      DiagnosisCurrIndex: state => state.currRecipe,
      recordData: state => state.recordData
    }),
    diagnosisType() {
      return this.diagnosisTypeProp;
    },
    caseHistory() {
      return this.caseHistoryProp;
    }
  },
  watch: {
    timeStamp(newVal) {
      this.DiagnosisItem = this.DiagnosisTypeList[this.diagnosisType];
      this.Initialization();
      this.getCaseHistoryFn();
    }
  },
  methods: {
    ...mapActions(["set_record_prop"]),
    Initialization() {
      if (this.DiagnosisItem.type == 0) {
        this.DiagnosisItem.contentText = this.recordData.personal_history;
      } else if (this.DiagnosisItem.type == 1) {
        this.DiagnosisItem.contentText = this.recordData.allergic_history;
      } else if (this.DiagnosisItem.type == 2) {
        this.DiagnosisItem.contentText = this.recordData.chief_complaint;
      } else if (this.DiagnosisItem.type == 3) {
        this.DiagnosisItem.check = JSON.parse(
          JSON.stringify(this.recordData.examination)
        );
      } else if (this.DiagnosisItem.type == 4) {
        this.DiagnosisItem.contentText = this.recordData.present_illness;
      }
    },
    getCaseHistoryFn() {
      // getCaseHistory().then(res => {
      //   if (res.code == 1000) {
      let res = {};
      res.data = this.caseHistory;
      if (
        res.data.past_history != undefined &&
        res.data.past_history != null &&
        JSON.parse(res.data.past_history).length != 0
      ) {
        this.DiagnosisTypeList[0].dataList = JSON.parse(
          res.data.past_history
        );
      } else {
        this.DiagnosisTypeList[0].dataList = [
          "否认",
          "高血压",
          "糖尿病",
          "心血管病",
          "慢性肺炎",
          "恶性肿瘤",
          "结核病"
        ];
      }
      this.DiagnosisTypeList[0].totalNum = Math.ceil(
        this.DiagnosisTypeList[0].dataList.length /
        this.DiagnosisTypeList[0].pageSize
      );

      if (
        res.data.allergic_history != undefined &&
        res.data.allergic_history != null &&
        JSON.parse(res.data.allergic_history).length != 0
      ) {
        this.DiagnosisTypeList[1].dataList = JSON.parse(
          res.data.allergic_history
        );
      } else {
        this.DiagnosisTypeList[1].dataList = [
          "否认",
          "青霉素",
          "阿奇霉素",
          "链霉素",
          "头孢类",
          "磺胺类",
          "解热镇痛类"
        ];
      }
      this.DiagnosisTypeList[1].totalNum = Math.ceil(
        this.DiagnosisTypeList[1].dataList.length /
        this.DiagnosisTypeList[1].pageSize
      );

      if (
        res.data.chief_complaint != undefined &&
        res.data.chief_complaint != null &&
        JSON.parse(res.data.chief_complaint).length != 0
      ) {
        this.DiagnosisTypeList[2].dataList = JSON.parse(
          res.data.chief_complaint
        );
      } else {
        this.DiagnosisTypeList[2].dataList = [
          "发热",
          "头痛",
          "头晕",
          "鼻塞",
          "流涕",
          "声嘶",
          "咽痛",
          "咽轻红",
          "咽充血",
          "咳嗽",
          "咳喘",
          "咳痰",
          "呼吸困难",
          "腹痛",
          "腹泻",
          "腹胀",
          "恶心",
          "乏力",
          "呕吐",
          "反酸",
          "便秘",
          "胸闷",
          "胸痛",
          "心悸",
          "腰痛",
          "腰背痛",
          "关节痛",
          "尿频",
          "尿急",
          "尿痛"
        ];
      }
      this.DiagnosisTypeList[2].totalNum = Math.ceil(
        this.DiagnosisTypeList[2].dataList.length /
        this.DiagnosisTypeList[2].pageSize
      );

      if (
        res.data.present_illness != undefined &&
        res.data.present_illness != null
      ) {
        this.DiagnosisTypeList[4].dataList = JSON.parse(
          res.data.present_illness
        );
        this.DiagnosisTypeList[4].totalNum = Math.ceil(
          this.DiagnosisTypeList[4].dataList.length /
          this.DiagnosisTypeList[4].pageSize
        );
      }

      this.changePage(1);
      //   } else {
      //     console.log(res.msg);
      //   }
      // });
    },
    changePage(page) {
      this.DiagnosisItem.page = page;
      this.updateCurrList();
    },
    updateCurrList() {
      var pagesize = this.DiagnosisItem.pageSize;
      var page = this.DiagnosisItem.page;
      this.DiagnosisItem.currList = this.DiagnosisItem.dataList.slice(
        Number((page - 1) * pagesize),
        Number(page * pagesize)
      );
      if (page > 1 && this.DiagnosisItem.currList.length == 0) {
        this.DiagnosisItem.page--;
        this.updateCurrList();
      }
    },

    clinicClose() {
      this.$emit("close");
    },

    saveEdit() {
      if (this.DiagnosisItem.type == 3) {
        this.set_record_prop({
          key: this.DiagnosisItem.typeCode,
          val: this.DiagnosisItem.check
        });
      } else {
        this.set_record_prop({
          key: this.DiagnosisItem.typeCode,
          val: this.DiagnosisItem.contentText
        });
      }
      this.clinicClose();
    },

    changeCurrPage(type) {
      if (type == 1) {
        this.DiagnosisItem.page++;
      } else if (type == 2) {
        this.DiagnosisItem.page--;
      }
      this.updateCurrList();
    },

    clickword(text) {
      if (
        this.DiagnosisItem.typeName == "既往史" ||
        this.DiagnosisItem.typeName == "过敏史"
      ) {
        this.DiagnosisItem.contentText += text + "；";
      } else {
        this.DiagnosisItem.contentText += text;
      }
    },

    deleteContent() {
      this.DiagnosisItem.contentText = this.DiagnosisItem.contentText.slice(
        0,
        this.DiagnosisItem.contentText.length - 1
      );
    },

    setCommonWord() {
      this.DiagnosisItem.page = 1;
      this.updateCurrList();
      this.DiagnosisItem.CommonEdit = true;
    },

    addCommonWord(commonword) {
      this.DiagnosisItem.dataList.push(commonword);
      this.DiagnosisItem.totalNum = Math.ceil(
        this.DiagnosisItem.dataList.length / this.DiagnosisItem.pageSize
      );
      this.DiagnosisItem.page = this.DiagnosisItem.totalNum;
      this.updateCurrList();
      this.setCaseHistoryFn();
    },
    setCaseHistoryFn() {
      setCaseHistory({
        past_history: JSON.stringify(this.DiagnosisTypeList[0].dataList),
        allergic_history: JSON.stringify(this.DiagnosisTypeList[1].dataList),
        chief_complaint: JSON.stringify(this.DiagnosisTypeList[2].dataList),
        examination: "",
        present_illness: JSON.stringify(this.DiagnosisTypeList[4].dataList),
        diagnosis: JSON.stringify([])
      }).then(res => {
        if (res.code == 1000) {

        } else {
          console.log(res.msg);
        }
      });
    },

    delCommonWord(index) {
      var realIndex = index;
      this.DiagnosisItem.dataList.splice(realIndex, 1);
      this.DiagnosisItem.totalNum = Math.ceil(
        this.DiagnosisItem.dataList.length / this.DiagnosisItem.pageSize
      );
      this.updateCurrList();
      this.setCaseHistoryFn();
    },

    dragEnd({firstId = -1, lastId = -1}) {
      let temp = "";
      temp = this.DiagnosisItem.dataList[firstId].toString();
      if (firstId < lastId) {
        this.DiagnosisItem.dataList.splice(firstId, 1);
        this.DiagnosisItem.dataList.splice(lastId - 1, 0, temp);
      } else if (firstId > lastId) {
        this.DiagnosisItem.dataList.splice(firstId, 1);
        this.DiagnosisItem.dataList.splice(lastId, 0, temp);
      }
      this.updateCurrList();
      this.setCaseHistoryFn();
    }
  }
};
</script>

<style scoped>
  .prescription_tab_bg {
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.5);
    z-index: 500;
    position: fixed;
    top: 0;
    left: 0;
  }

  .prescription_tab {
    z-index: 998;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    left: 50%;
    width: 760px;
    height: auto;
    background: #f6fbfe;
    padding: 15px;
    box-shadow: 0 4px 16px 4px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  .prescription_tab_head {
    display: flex;
  }

  .prescription_tab_head_title {
    color: #4c4c4c;
    font-size: 1rem;
    flex: 1;
    font-weight: bold;
  }

  .prescription_tab_head_close {
    color: #5096e0;
    font-size: 0.875rem;
    text-decoration: underline;
    cursor: pointer;
  }

  .prescription_tab_content_item {
    width: 24.3%;
    border: #5096e0 solid 1px;
    border-radius: 0.25rem;
    background: #fff;
    color: #4c4c4c;
    height: 2.5rem;
    line-height: 2.5rem;
    text-align: center;
    margin-right: 0.3125rem;
    margin-bottom: 0.625rem;
    font-size: 0.9375rem;
  }

  .prescription_tab_num {
    width: 6.5%;
    height: 2.5rem;
    line-height: 2.5rem;
    border: #5096e0 solid 1px;
    color: #4c4c4c;
    float: left;
    border-radius: 0.25rem;
    background: #fff;
    text-align: center;
    margin-right: 0.75rem;
  }

  .prescription_change_page_btn {
    font-size: 1rem;
    height: 2.5rem;
    line-height: 2.5rem;
  }

  .prescription_tab_page .active {
    font-size: 1rem;
    color: #5096e0;
    text-decoration: underline;
    cursor: pointer;
    height: 2.5rem;
    line-height: 2.5rem;
  }

  .prescription_tab_page .disable {
    font-size: 1rem;
    color: #cccccc;
    text-decoration: none;
    cursor: no-drop;
    height: 2.5rem;
    line-height: 2.5rem;
  }

  .prescription_set_common_world_btn {
    color: #5096e0;
    font-size: 1rem;
    height: 2.5rem;
    line-height: 2.5rem;
    text-decoration: underline;
    cursor: pointer;
  }

  .prescription_tab_save {
    width: 8rem;
    height: 2.5rem;
    line-height: 2.5rem;
    border-radius: 1.875rem;
    background: #5096e0;
    color: #fff;
    text-align: center;
    font-size: 0.9375rem;
  }

  .prescription_tab_cancel {
    width: 8rem;
    height: 2.5rem;
    line-height: 2.5rem;
    border-radius: 1.875rem;
    background: #fff;
    color: #5096e0;
    border: #5096e0 solid 1px;
    text-align: center;
    font-size: 0.9375rem;
  }

  .prescription_tab_check {
    width: 100%;
    border: #5096e0 solid 1px;
    height: auto;
    background: #fff;
    border-radius: 0.25rem;
    padding: 0.3125rem 0.625rem;
    font-size: 0.875rem;
  }

  .prescription-blue-title {
    color: #5096e0;
    font-weight: bold;
    font-size: 1rem;
    margin-bottom: 10px;
  }

  .check_name {
    width: 2.5rem;
    line-height: 30px;
    display: inline-block;
  }

  .check_num {
    width: 3.125rem;
    line-height: 1.875rem;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: #4c4c4c solid 1px;
    outline: none;
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

  .cursor_pointer {
    cursor: pointer;
  }
</style>
