<template>
  <div>
    <section class="herbal_head">
      <div class="herbal_head_left">
        <f-radio value=0 :name="'herCate'" :currVal="currentData.data.is_cloud" @change="changeCategory($event)">诊所药房
        </f-radio>
        <f-radio value=1 :name="'herCate'" :currVal="currentData.data.is_cloud" @change="changeCategory($event)"
                 v-if="currentCloud ? currentCloud.name != '' : 0">{{currentCloud ? currentCloud.name : ''}}
        </f-radio>
      </div>
      <div>
        <button class="btn btn_cancel" @click.stop="cancelRecipe">删除</button>
        <button class="btn btn_yb_check" @click.stop="examineYB" v-if="isYB">医保处方审核</button>
        <button class="btn" @click="print_pre()">打印处方</button>
        <button class="btn btn_print" @click.stop="saveTplData">存为模板</button>
      </div>
    </section>
    <section>
      <table class="recipe_table">
        <thead>
        <tr>
          <th>序号</th>
          <th style="width: 15%">药名</th>
          <th>规格</th>
          <th>总量</th>
          <th>单位</th>
          <th>单价</th>
          <th>用法</th>
          <th>每次用量</th>
          <th>频次</th>
          <th>天数</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in currentData.data.items">
          <td>{{index+1}}</td>
          <td style="width: 15%">{{item.name}}</td>

          <template v-if="item.is_match===1">
            <td>{{item.spec}}</td>
            <td>
              <InputNumber style="width:3.2rem;" :value="item.num"
                           @on-change="modify_medicine({key:'num',val:$event,index:index})"/>
            </td>
            <td>
              <Select style="width:3.125rem" :value="item.unit"
                      @on-change="change_unit($event,index)">
                <Option :value="item.unit_stock" key="item.unit_stock">{{item.unit_stock}}</Option>
                <Option :value="item.unit_sale" key="item.unit_sale">{{item.unit_sale}}</Option>
              </Select>
            </td>
            <td>
              {{item.sale_price|priceFormat}}
            </td>
            <td>
              <Select style="max-width:4.5rem" :value="item.usage"
                      @on-change="modify_medicine({key:'usage',val:$event,index:index})">
                <Option v-for="item in westernMedUsages" :value="item.name" :key="item.id">{{ item.name }}</Option>
              </Select>
            </td>
            <td>
              <InputNumber style="max-width:3.2rem" :value="Number(item.dose_once)"
                           @on-change="modify_medicine({key:'dose_once',val:$event,index:index})"/>
              <span class="unitText">{{item.unit_dose}}</span>
            </td>
            <td>
              <Select style="max-width:5.5rem" :value="item.frequency"
                      @on-change="modify_medicine({key:'frequency',val:$event,index:index})">
                <Option v-for="item in medFrequency" :value="item.name" :key="item.name">{{ item.name }}</Option>
              </Select>
            </td>
            <td>
              <InputNumber style="max-width:3.2rem" :value="item.days"
                           @on-change="modify_medicine({key:'days',val:$event,index:index})"/>
            </td>
          </template>
          <template v-else>
            <td colspan="7" style="color: red;">系统内没有匹配到该药名</td>
          </template>

          <td>
            <a @click.stop="cancel_medicine(index)">删除</a>
          </td>
        </tr>
        <tr v-if="currentData.data.items.length==0">
          <td colspan="11">
            右侧选择添加药品
          </td>
        </tr>
        </tbody>
      </table>
    </section>
    <section class="mb50">
      <div class="pl10 pt20">
        <span class="input_label"> 处方金额：{{currentData.money | priceFormat}}元</span>
      </div>
      <div class="displayFlex pl10 pt10 width-620">
        <span class="input_label pr4">医嘱：</span>
        <Input class="flexOne" type="textarea" :autosize="{minRows: 3,maxRows: 3}" placeholder="医嘱提示"
               :value="currentData.data.doctor_remark"
               @on-change="modify_recipe_detail({key:'doctor_remark',val:$event.target.value})"/>
      </div>
    </section>
    <save-tpl v-if="showAddTpl" @hideTpl="hideTplShow"></save-tpl>
    <wisdomYb :url="windowUrl" @close="hideWis" v-if="wisdomShow"></wisdomYb>
  </div>
</template>

<script>
  import {westernMedUsages, medFrequency, userName, userId} from '@/assets/js/mapType'
  import fRadio from '@/components/fRadio.vue'
  import saveTpl from '@/components/rootMiddle/saveRecipeTpl'
  import wisdomYb from '@/components/wisdomyb.vue'
  import {mapActions, mapState} from 'vuex'
  import {Select, Option, Input, InputNumber} from 'iview'
  import {wisdomyb} from '@/fetch/api.js'

  export default {
    name: "westernRecipe",
    data() {
      return {
        medFrequency: medFrequency,
        showAddTpl: false,
        windowUrl: '',
        wisdomShow: false
      }
    },
    components: {
      Select,
      Option,
      Input,
      saveTpl,
      InputNumber,
      wisdomYb,
      fRadio
    },
    computed: {
      ...mapState({
        'isYB': state => state.isYB,
        'recordData': state => state.recordData,
        'clinicId': state => state.clinicId,
        'doctorId': state => state.doctorId,
        'appointOrderSeqno': state => state.appointOrderSeqno,
        'ybCardNo': state => state.ybCardNo,
        'cloudShopList': state => state.cloudShopList
      }),
      westernMedUsages: function () {
        return westernMedUsages.filter(item => {
          return item.status === 1;
        })
      },
      currentData: function () {
        return JSON.parse(JSON.stringify(this.$store.getters.currRecipeData))
      },
      currentCloud: function () {
        let list = this.cloudShopList
        let type = this.currentData.type
        let category
        if (type == 1) {
          category = this.currentData.data.category
        }
        let result = list.filter(item => {
          return item.type == type
        }).filter(item => {
          if (item.type == 1) {
            return item.category == category
          } else {
            return item
          }
        })
        return result[0]
      }
    },
    watch: {
      'currentData.data.items': {
        deep: true,
        handler: function (newVal, oldVal) {
          let allPrice = 0;
          newVal.map((item, index) => {
            if (item.unit === item.unit_stock) {
              allPrice += Number(item.sale_price) * Number(item.num);
            } else if (item.unit === item.unit_sale) {
              allPrice += Number(item.sale_price * 1.0 / item.stock_sale_ratio) * Number(item.num);
            } else {
              allPrice += Number(item.sale_price) * Number(item.num);
            }
          })
          setTimeout(() => {
            this.modify_recipe({key: 'money', val: Number(allPrice).toFixed(2)})
          })
        }
      },
    },
    methods: {
      ...mapActions([
        'change_curr_tab',
        'cancel_recipe',
        'modify_medicine',
        'cancel_medicine',
        'modify_recipe_detail',
        'clean_recipe',
        'modify_recipe',
        'change_print_pre',
      ]),
      print_pre: function () {
        this.change_print_pre();
      },
      changeCategory(event) {
        if (this.currentData.data.items.length === 0) {
          this.modify_recipe_detail({key: 'is_cloud', val: Number(event.target.value)})
        } else {
          this.$Modal.confirm({
            title: '提示',
            content: '<p>切换药品来源将清空已选的药，确认要切换?</p>',
            onOk: () => {
              this.modify_recipe_detail({key: 'is_cloud', val: Number(event.target.value)})
              this.clean_recipe();
            },
            onCancel: () => {
              this.$forceUpdate()
            }
          })
        }
      },
      cancelRecipe() {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定删除该处方？</p>',
          onOk: () => {
            this.cancel_recipe();
          },
          onCancel: () => {
            console.log("88")
          }
        });
      },
      change_unit(event, index) {
        let currItems = this.currentData.data.items[index];
        this.modify_medicine({key: 'unit', val: event, index: index})
        if (currItems.num !== '' && currItems.num !== 0) {
          if (event === currItems.unit_stock) {
            this.modify_medicine({
              key: 'num',
              val: Math.ceil(currItems.num * 1.0 / currItems.stock_sale_ratio),
              index: index
            })
          } else if (event === currItems.unit_sale) {
            this.modify_medicine({key: 'num', val: Math.ceil(currItems.num * currItems.stock_sale_ratio), index: index})
          }
        }

      },
      saveTplData() {
        if (this.currentData.data.items.length === 0) {
          this.$Message.info("请先至少添加一个药品！");
          return
        }
        let itemList = this.currentData.data.items;
        for (var i = 0; i < itemList.length; i++) {
          if (itemList[i].num === '' || itemList[i].num === 0) {
            this.$Message.info("药品【" + itemList[i].name + "】的药量为空！")
            return
          }
        }
        this.showAddTpl = true;
      },

      hideTplShow() {
        this.showAddTpl = false;
      },
      examineYB() {
        if (this.recordData.diagnosis_xy === '') {
          this.change_curr_tab(-1)
          this.$Message.info("请先选择西医诊断!");
          return
        }
        let diagnoses = this.recordData.diagnosis_xy_labels.map((item) => {
          return {
            "diagnose_code": item.code,
            "diagnose_desc": item.name
          }
        })
        let itemList = this.currentData.data.items
        for (let i = 0, len = itemList.length; i < len; i++) {
          if (itemList[i].yb_code === '') {
            this.$Message.info("药品" + itemList[i].name + "不属于医保范畴!")
            return;
          }
        }

        let medList = itemList.map(med => {
          let fre = {}
          if (this.currentData.data.frequency) {
            fre = this.findInFre(this.currentData.data.frequency)
          } else {
            fre = {code: 'qd', name: '每天一次', ratio: 1}
          }
          return {
            "yb_code": med.yb_code,
            "medicine_id": med.item_id,
            "name": med.name,
            "price": med.price,
            "num": med.num,
            "dose_unit": med.unit_dose,
            "amount": Number(med.price) * Number(med.num),
            "use_day": Number(med.days ? med.days : 1),
            "single_dose_number": med.dose_once,
            "single_dose_unit": med.unit_dose,
            "single_take_number": med.dose_once,
            "single_take_unit": med.unit_dose,
            "take_medical_number": med.num,
            "take_medical_unit": med.unit,
            "frequence": fre.code
          }
        })

        let params = {
          "clinic_id": this.clinicId,
          "doctor_id": this.doctorId,
          "user_id": userId,
          "user_name": userName,
          "appoint_order_seqno": this.appointOrderSeqno,
          "card_no": this.ybCardNo,
          "recipe_id": new Date().getTime().toString() + Math.ceil(Math.random() * 1000).toString(),
          "diagnoses": diagnoses,
          "medicines": medList
        }
        wisdomyb(params).then(res => {
          if (res.code === 1000) {
            if (res.data.success == 'F') {
              this.$Message.info(res.data.error_msg)
            } else if (res.data.success == 'T' && res.data.result.length == 0) {
              this.$Message.info("审核通过！")
            } else if (res.data.success == 'T' && res.data.result.length != 0) {
              this.wisdomShow = true
              this.windowUrl = res.data.window_url
            }
          } else {
            this.$Message.info(res.msg)
          }
        }).catch(error => {
          console.log(error)
          this.$Message.info('网络出错！')
        })
      },
      findInFre(val) {
        let list = [
          {code: 'qd', name: '每天一次', ratio: 1},
          {code: 'bid', name: '每天两次', ratio: 2},
          {code: 'tid', name: '每天三次', ratio: 3},
          {code: 'qid', name: '每天四次', ratio: 4},
          {code: 'qod', name: '两天一次', ratio: 0.5},
          {code: 'qw', name: '每周一次', ratio: 1 / 7},
          {code: '', name: '饭前', ratio: 3},
          {code: '', name: '饭后', ratio: 3},
          {code: 'hs', name: '睡前', ratio: 1},
          {code: 'OTH', name: '医嘱', ratio: 1}
        ]
        for (let i = 0, len = list.length; i < len; i++) {
          if (list[i].name == val) {
            return list[i]
          }
        }
        return {}
      },
      hideWis() {
        this.wisdomShow = false
      }
    }
  }
</script>

<style scoped>
  .btn {
    border: 0.0625rem solid #5096E0;
    border-radius: 1.875rem;
    font-size: 0.875rem;
    color: #5096E0;
    background: none;
    line-height: 1.875rem;
    min-width: 5.125rem;
  }

  .btn_cancel {
    border-color: #FC3B3B;
    color: #FC3B3B;
  }

  .btn_print {
    border-color: #4DBC89;
    color: #4DBC89;
  }

  .btn_yb_check {
    padding: 0 0.625rem;
  }

  .herbal_head {
    display: flex;
    padding: 0.625rem;
    padding-top: 0;
  }

  .herbal_head_left {
    flex: 1;
    align-self: center;
  }

  .unitText {
    min-width: 2rem;
    display: inline-block;
    text-align: left;
  }
</style>
