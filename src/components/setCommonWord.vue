<template>
  <div class="prescription_tab">
    <!--设置常用词-->
    <div class="mb10">
      <div class="prescription_tab_head_title">{{DiagnosisItem.typeName}}常用词编辑</div>
    </div>
    <div>
      <div class="dispaly-flex mb10">
        <div class="mr20">
          <input type="text" class="CommonEdit_input" placeholder="常用词（8个字以内）" v-model="commonword">
        </div>
        <div class="mr20">
          <div class="CommonEdit_add" @click="addCommonWord()">增加</div>
        </div>
        <div class="mr20">
          <span class="CommonEdit_span">最多可设置50个常用词</span>
        </div>
      </div>
      <div class="flex-wrap mb10" style="max-height: 200px;overflow-y: scroll;">
        <div
          class="prescription_tab_content_item flex-no-wrap"
          v-for="(item,index) in DiagnosisItem.dataList"
          draggable="true"
          @dragend="dragEnd()"
          @dragstart="dragStart($event,index)"
          @dragover="allowDrop($event)"
          @dragenter="dropEnter($event)"
          :data-id="index"
        >
          <div class="flex-1" :data-id="index">{{item}}</div>
          <Icon
            type="md-close"
            class="prescription_tab_content_itemIcon"
            @click="delCommonWord(index)"
            :data-id="index"
          />
        </div>
      </div>
    </div>
    <div class="mb10">
      <div class="CommonEdit_back" @click="backCommonWord()">返回录入</div>
    </div>
    <!--设置常用词-->
  </div>
</template>

<script>
import { Icon } from "iview";
export default {
  props: ["data"],
  components: {
    Icon
  },
  data() {
    return {
      commonword: "", //设置常用词
      firstId: -1,
      lastId: -1
    };
  },
  computed: {
    DiagnosisItem() {
      return this.data;
    }
  },
  methods: {
    addCommonWord: function() {
      if (this.commonword == "") {
        this.$Message.warning("常用词不能为空!");
        return;
      }
      if (this.commonword.length > 8) {
        this.$Message.warning("常用词长度不能超过八个");
        return;
      }
      if (this.DiagnosisItem.dataList.length >= 50) {
        this.$Message.warning("常用词数量不能超过五十个");
        return;
      }
      this.$emit("add", this.commonword);
      this.commonword = "";
    },
    delCommonWord(index) {
      this.$emit("delete", index);
    },
    backCommonWord() {
      this.$emit("close");
    },
    dragStart(event, index) {
      let realIndex = index;
      this.firstId = realIndex;
    },
    allowDrop(event) {
      event.preventDefault();
    },
    dropEnter(event) {
      let realIndex = Number(event.target.dataset.id);
      this.lastId = realIndex;
    },
    dragEnd() {
      this.$emit("dragEnd", {
        firstId: this.firstId,
        lastId: this.lastId
      });
    }
  }
};
</script>

<style scoped>
.prescription_tab_head_title {
  color: #4c4c4c;
  font-size: 1rem;
  font-weight: bold;
}
.CommonEdit_input {
  width: 9.8125;
  height: 2.5rem;
  line-height: 2.5rem;
  border: #5096e0 solid 1px;
  background: #fff;
  border-radius: 0.25rem;
  text-indent: 0.3125rem;
  font-size: 0.875rem;
  color: #515a6e;
}
.CommonEdit_input::-webkit-input-placeholder {
  font-size: 0.875rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #c5c8ce;
  line-height: 2.5rem;
}
.CommonEdit_add {
  width: 7.25rem;
  height: 2.5rem;
  line-height: 2.5rem;
  border-radius: 1.875rem;
  background: #5096e0;
  text-align: center;
  color: #fff;
  font-size: 1rem;
}
.CommonEdit_span {
  color: #4c4c4c;
  font-size: 0.875rem;
  line-height: 2.5rem;
  height: 2.5rem;
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
.prescription_tab_content_itemIcon {
  color: #5096e0;
  font-size: 1.125rem;
  padding: 0 0.25rem;
  cursor: pointer;
  line-height: 2.5rem;
}
.CommonEdit_back {
  width: 7.5rem;
  height: 2.1875rem;
  border: #5096e0 solid 1px;
  color: #5096e0;
  border-radius: 1.875rem;
  background: #fff;
  text-align: center;
  line-height: 2.1875rem;
  font-size: 0.9375rem;
}

.dispaly-flex {
  display: flex;
}
.flex-1 {
  flex: 1;
}
.flex-wrap {
  display: flex;
  flex-wrap: wrap;
}
.flex-no-wrap {
  display: flex;
  flex-wrap: nowrap;
}
</style>