<template>
  <div class="search-block">
    <f-loader v-if="showLoading" :fixed="false"></f-loader>
    <div class="mb6 displayFlex">
      <div class="col70 mr10">
        <Input placeholder="请输入模板名称" v-model="query" @input="queryByInput()"/>
      </div>
      <div class="col30">
        <Button long @click.stop="queryByname">搜索</Button>
      </div>
    </div>
    <section>
      <div class="prescript-list" v-for="item in dataList" @click.stop="getQuestion(item)">{{item.name}}</div>
    </section>
    <div class="btn-block">
      <Button
        shape="circle"
        type="primary"
        ghost
        class="mr10"
        :disabled="page <= 1"
        @click.stop="changeType(1)"
      >上一页
      </Button>
      <Button
        shape="circle"
        type="primary"
        ghost
        :disabled="page >= Math.ceil(totalNum/pageSize)"
        @click.stop="changeType(2)"
      >下一页
      </Button>
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
      pageSize: 10,
      totalNum: 0,
      dataList: [],
      timer: null,
      patientId: '',
      outpatientList: []
    }
  },
  created() {
    this.patientId = this.$store.state.patientData.id
    this.outpatientList = this.$store.state.recordData.outpatient_table
    this.getData()
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
        page_szie: this.pageSize
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
      this.showLoading = true
      let res = await fetchQuestion(item.id)
      try {
        if (res.code == 1000) {
          let content = []
          res.data.forEach(subject => {
            switch (subject.type) {
              case 'input':
                content.push(Object.assign(subject, {answer: ''}))
                break
              case 'radio':
                content.push(Object.assign(subject, {answer: ''}))
                break
              case 'checkbox':
                content.push(Object.assign(subject, {answer: []}))
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
            this.outpatientList.push({
              "patient_answer_id": resp.data,
              "name": item.name,
              "content": JSON.stringify(content)
            })
            this.set_record_prop({key: 'outpatient_table', val: this.outpatientList})
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
    height: 100%
  }

  .btn-block {
    text-align: center;
    padding-top: 15px;
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
  }
</style>
