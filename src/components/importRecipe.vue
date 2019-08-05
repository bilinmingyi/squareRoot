<template>
  <div class="prescription_tab_bg">
    <div class="prescription_tab">
      <div class="alert-title mb20">处方导入</div>
      <div>
        <RadioGroup v-model="formatType">
          <div class="mb10">
            <Radio label='1'>格式1（药名 xx克 药名 xx克）</Radio>
          </div>
          <div class="mb10">
            <Radio label='2'>格式2（药名：xx克 药名：xx克）</Radio>
          </div>
        </RadioGroup>
        <Input type="textarea" :autosize="{minRows: 6,maxRows: 8}" placeholder="请输入所选格式文本..." v-model="dataStr"/>
      </div>
      <div class="tc mt30">
        <button class="saveBtn mr20" @click.stop="checkData">确定</button>
        <button class="saveBtn cancelBtn" @click.stop="cancel">取消</button>
      </div>
    </div>
    <f-loader v-if="showLoading"></f-loader>
  </div>
</template>

<script>
import {RadioGroup, Radio, Input} from 'iview'
import fLoader from '@/components/fLoader.vue'
import {mapActions, mapState} from 'vuex'
import {getHerbalList} from '@/fetch/api.js'

export default {
  name: "importRecipe",
  components: {
    RadioGroup,
    Radio,
    Input,
    fLoader
  },
  data() {
    return {
      formatType: '1',
      showLoading: false,
      dataStr: '',
      checkList: []
    }
  },
  computed: {
    currentData: function () {
      return JSON.parse(JSON.stringify(this.$store.getters.currRecipeData))
    },
  },
  methods: {
    ...mapActions(["clean_recipe", "add_new_medicine"]),
    checkData() {
      let self = this
      self.checkList = []
      let firstList = []
      let lastList = []
      if (!self.dataStr) {
        self.$Message.info("请先填写导入药品文本模板")
        return
      }
      self.showLoading = true
      if (self.formatType === '1') {
        firstList = self.dataStr.match(/\s*(\S+)\s*(\d+)(克|g)/igm)
        firstList.forEach(item => {
          /\s*(\S+)\s*(\d+)(克|g)/igm.test(item)
          lastList.push({
            name: RegExp.$1,
            num: RegExp.$2,
            unit: RegExp.$3
          })
        })
      } else if (self.formatType === '2') {
        firstList = self.dataStr.match(/\s*(\S+)(\s|:|：)*(\d+)(克|g)/igm)
        firstList.forEach(item => {
          /\s*(\S+?)(\s|:|：)*(\d+)(克|g)/igm.test(item)
          lastList.push({
            name: RegExp.$1,
            num: RegExp.$3,
            unit: RegExp.$4
          })
        })
      }

      let resultList = lastList.map(item => item.name)
      let isCloud = self.currentData.data.is_cloud
      getHerbalList({
        'names': resultList,
        'status': 1,
        'category': self.currentData.data.category
      }, isCloud)
        .then(res => {
          if (res.code === 1000) {
            lastList.forEach(item => {
              var existence = {};
              for (var i = 0, len = res.data.length; i < len; i++) {
                if (item.name == res.data[i].name || item.name == res.data[i].clinic_alias_name || item.name == res.data[i].alias_name) {
                  existence = res.data[i];
                  break
                }
              }
              if (i === len) {
                this.checkList.push({
                  "id": '',
                  "clinic_alias_name": '',
                  "name": item.name,
                  "num": item.num,
                  "price": '',
                  "unit": item.unit,
                  "default_sale_price": '',
                  "sale_price": '',
                  "spec": '',
                  "unit_stock": '',
                  "unit_sale": '',
                  "usage": '',
                  "stock": '',
                  "is_match": 0,
                  "stock_sale_ratio": '',
                  "status": 0,
                  "remark": ""
                })
              } else {
                this.checkList.push({
                  "id": existence.id,
                  "clinic_alias_name": existence.clinic_alias_name || existence.alias_name,
                  "name": existence.name,
                  "num": existence.unit_sale == item.unit ? Math.ceil(item.num/existence.stock_sale_ratio) : 0,
                  "unit": existence.unit_stock,
                  "default_sale_price": isCloud == 1 ? existence.default_sale_price : existence.sale_price,
                  "sale_price": isCloud == 1 ? existence.default_sale_price : existence.sale_price,
                  "spec": existence.spec,
                  "unit_stock": existence.unit_stock,
                  "unit_sale": existence.unit_sale,
                  "usage": '',
                  "is_match": 1,
                  "stock": existence.stock,
                  "stock_sale_ratio": existence.stock_sale_ratio,
                  "status": 1,
                  "remark": ""
                })
              }
            })
            let type = self.currentData.type
            this.clean_recipe();
            this.checkList.forEach(item => {
              this.add_new_medicine({item, type});
            })
            self.showLoading = false
            self.cancel()
          } else {
            self.showLoading = false
            self.$Message.info(res.msg)
          }
        }).catch(e => {
        self.showLoading = false
        console.log(e)
      })
    },
    cancel() {
      this.$emit('close')
    }
  }
}
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
    width: 600px;
    height: auto;
    background: #fff;
    padding: 1.5rem 3rem 2rem;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  .alert-title {
    text-align: center;
    font-weight: 900;
    font-size: 1rem;
    color: #5f95da;
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
</style>
