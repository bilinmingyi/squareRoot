<template>
  <div>
    <section class="herbal_head">
      <RadioGroup v-model="currentData.data.category" class="herbal_head_left">
        <Radio label="1" size="large">
          <span>饮片</span>
        </Radio>
        <Radio label="2" size="large">
          <span>颗粒</span>
        </Radio>
      </RadioGroup>
      <div>
        <button class="btn btn_cancel" @click.stop="cancelRecipe">删除</button>
        <button class="btn">打印处方</button>
        <button class="btn btn_print">存为模板</button>
      </div>
    </section>
    <section>
      <table class="recipe_table">
        <thead>
        <tr>
          <th>序号</th>
          <th>药名</th>
          <th>规格</th>
          <th>药量</th>
          <th>常用量</th>
          <th>用法</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>1</td>
          <td>柴胡</td>
          <td>1克</td>
          <td>
            <Input style="width:3.125rem" type="text"/>
          </td>
          <td>1</td>
          <td>
            <Select style="width:6.25rem">
              <Option v-for="item in herbalMedUsages" :value="item.name" :key="item.id">{{ item.name }}</Option>
            </Select>
          </td>
          <td>
            <a>删除</a>
          </td>
        </tr>
        </tbody>
      </table>
    </section>
    <section>
      <div class="pl10 pt20">
        <span class="input_label"> 处方金额：{{currentData.money}}元</span>
      </div>
      <div class="displayFlex pl10 pr10 pt10">
        <div class="width-240">
          <span class="input_label"> 剂数：</span>
          <Input type="text" class="input_120" v-model="currentData.data.dosage"/>
          <span class="input_label">剂</span>
        </div>
        <div class="width-240">
          <span class="input_label">频次：</span>
          <Select class="input_120" v-model="currentData.data.frequency">
            <Option v-for="item in medFrequency" :value="item.name" :key="item.name">{{ item.name }}</Option>
          </Select>
        </div>
        <div class="width-240">
          <span class="input_label"> 用法：</span>
          <Select class="input_120" v-model="currentData.data.usage">
            <Option v-for="item in herbalRpUsages" :value="item.name" :key="item.id">{{ item.name }}</Option>
          </Select>
        </div>
      </div>
      <div class="displayFlex p10">
        <div class="width-240">
          <span class="input_label"> 附加：</span>
          <Select class="input_120" v-model="currentData.data.extra_feetype">
            <Option v-for="item in extraFeeTypes" :value="item.name" :key="item.id">{{ item.name }}</Option>
          </Select>
        </div>
        <div class="width-240">
          <span class="input_label">数量：</span>
          <Input type="text" class="input_120" v-model="currentData.data.extra_num"/>
        </div>
        <div class="width-240">
          <span class="input_label"> 用量：</span>
          <Input type="text" class="input_120" v-model="currentData.data.eachDose"/>
          <span class="input_label">ml</span>
        </div>
      </div>
      <div class="displayFlex pl10 pt10 width-620">
        <span class="input_label pr4">医嘱：</span>
        <Input class="flexOne" type="textarea" :autosize="{minRows: 3,maxRows: 3}" placeholder="医嘱提示" v-model="currentData.data.doctor_remark" />
      </div>
    </section>
  </div>
</template>

<script>
  import {RadioGroup, Radio, Select, Option, Input} from 'iview'
  import {mapActions, mapGetters} from 'vuex'
  import {herbalMedUsages, herbalRpUsages, extraFeeTypes,medFrequency} from '@/assets/js/mapType'

  export default {
    name: "herbalRecipe",
    data() {
      return {
        medFrequency:medFrequency
      };
    },
    components: {
      RadioGroup,
      Radio,
      Select,
      Option,
      Input
    },
    computed: {
      ...mapGetters({
        currentData:'currRecipeData'
      }),
      herbalMedUsages: function () {
        return herbalMedUsages.filter(item => {
          return item.status === 1
        })
      },
      herbalRpUsages: function () {
        return herbalRpUsages.filter(item => {
          return item.status === 1
        })
      },
      extraFeeTypes:function () {
        return extraFeeTypes.filter(item =>{
          return item.status === 1
        })
      }
    },
    methods: {
      ...mapActions([
        'cancel_recipe'
      ]),
      cancelRecipe(){
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
    },

  }
</script>

<style scoped>
  .btn {
    border: 0.0625rem solid #5096E0;
    border-radius: 1.875rem;
    font-size: 1rem;
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

  .herbal_head {
    display: flex;
    padding: 0.625rem;
  }

  .herbal_head_left {
    flex: 1;
    align-self: center;
  }
</style>
