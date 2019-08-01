<template>
  <div class="search-block">
    <f-loader v-if="showLoading" :fixed="false"></f-loader>
    <div class="mb6 displayFlex">
      <div class="flexOne mr10">
        <Input placeholder="请输入模板名称" tabindex="-1" v-model="query" @input="queryByInput()"/>
      </div>
      <div>
        <button class="search-btn" @click.stop="queryByname">搜索</button>
      </div>
    </div>
    <section>
      <div class="prescript-list" v-for="item in dataList" @click.stop="getQuestion(item)">{{item.name}}</div>
    </section>
    <div class="t-h-btn-group pt15">
      <button
        :class="['t-h-btn', 't-h-btn-active', {'t-h-btn-disable':page <= 1}]"
        :disabled="page <= 1"
        @click.stop="changeType(1)"
      >上一页
      </button>
      <button
        :class="['t-h-btn', 't-h-btn-active', {'t-h-btn-disable':page >= Math.ceil(totalNum/pageSize)}]"
        :disabled="page >= Math.ceil(totalNum/pageSize)"
        @click.stop="changeType(2)"
      >下一页
      </button>
    </div>
  </div>
</template>

<script>
import {Input, Button} from "iview";
import fLoader from "@/components/fLoader";
import {fetchQuestionList, fetchQuestion, addTreatAnswer} from "@/fetch/api.js";
import {mapState, mapActions} from "vuex";

export default {
  name: "outpatientTable",
  components: {
    Input,
    Button,
    fLoader
  },
  data() {
    return {
      showLoading: false,
      query: '',
      page: 1,
      pageSize: window.screen.height > 960 || window.screen.width >= 1600 ? 10 : 8,
      totalNum: 0,
      dataList: [],
      timer: null,
      patientId: '',
      outpatientList: []
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    this.$nextTick(() => {
      this.patientId = this.$store.state.patientData.id
    })
  },
  methods: {
    ...mapActions([
      'set_record_prop',
    ]),
    getData() {
      this.showLoading = true
      fetchQuestionList({
        name: this.query,
        page: this.page,
        page_size: this.pageSize
      }).then(res => {
        this.showLoading = false
        if (res.code === 1000) {
          this.dataList = res.data
          this.totalNum = res.total_num
        } else {
          this.$Message.info(res.msg)
        }
      }).catch(error => {
        this.showLoading = false
        console.log(error)
      })
    },
    changeType(type) {
      let pageNum = Math.ceil(this.totalNum / this.pageSize)
      if (type == 1) {
        if (this.page > 1) {
          this.page--
        } else {
          return
        }
      } else if (type == 2) {
        if (this.page < pageNum) {
          this.page++
        } else {
          return
        }
      }
      this.getData()
    },
    queryByname() {
      this.page = 1
      this.getData()
    },
    queryByInput() {
      let self = this
      self.page = 1
      clearTimeout(self.timer)
      self.timer = setTimeout(() => {
        self.getData()
      }, 300)
    },
    async getQuestion(item) {
      let self = this
      self.outpatientList = JSON.parse(JSON.stringify(self.$store.state.recordData.outpatient_table))
      this.showLoading = true
      let res = await fetchQuestion(item.id)
      try {
        if (res.code == 1000) {
          let content = []
          res.data.forEach(subject => {
            switch (subject.type) {
              case 'input':
                content.push(Object.assign(subject, {answer: '', comment: ''}))
                break
              case 'radio':
                content.push(Object.assign(subject, {answer: '', comment: ''}))
                break
              case 'checkbox':
                content.push(Object.assign(subject, {answer: [], comment: ''}))
                break
            }
          })

          let resp = await addTreatAnswer({
            'question_id': item.id,
            'content': JSON.stringify(content),
            'patient_id': this.patientId
          })
          this.showLoading = false
          if (resp.code === 1000) {
            self.outpatientList.push({
              "patient_answer_id": resp.data,
              "name": item.name,
              "content": JSON.stringify(content)
            })
            console.log(self.outpatientList)
            self.set_record_prop({key: 'outpatient_table', val: self.outpatientList})
          } else {
            this.$Message.info(resp.msg)
          }
        } else {
          this.showLoading = false
          this.$Message.info(res.msg)
        }
      } catch (e) {
        this.showLoading = false
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>
  .search-block {
    margin: 0.3125rem 0.375rem;
    position: relative;
    height: 98%
  }

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
</style>
