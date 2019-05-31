<template>
  <div>
    <div class="content" v-show="!classicPage">
      <div class="displayFlex">
        <div class="col70 mr10">
          <Input placeholder="请输入经典方剂名称" @input="searchClassic" v-model="queryName"/>
        </div>
        <div class="col30">
          <Button long @click.stop="searchClassic">搜索</Button>
        </div>
      </div>
      <div>
        <div @click.stop="showClassicDetail(item)" class="prescript-list" v-for="(item, index) in dataList">
          {{item.name}}
        </div>
      </div>
      <div class="tc">
        <Button
          shape="circle"
          type="primary"
          ghost
          class="mr10"
          :disabled="page==1"
          @click="changePage(1)"
        >上一页
        </Button>
        <Button
          shape="circle"
          type="primary"
          ghost
          :disabled="page>=Math.ceil(totalNum/page)"
          @click="changePage(2)"
        >下一页
        </Button>
      </div>
    </div>
    <div class="content" v-show="classicPage">
      <button class="prescription_detail_btn" @click.stop="hideClassicDetail">返回</button>
      <div class="pl5 pr5">
        <div class="classic_item_title mt10 mb10">
          <div>方剂名称：{{classicDetail.name}}</div>
          <div>方剂出处：{{classicDetail.source}}</div>
        </div>
        <div>
          <div class="herbal-result-li" v-for="item in classicDetail.component">
            {{item.name}}<br>
            ({{item.dosage+''+item.spec}})
          </div>
          <div class="clear"></div>
        </div>

        <div class="classic_item_content mt5">
          <div class="mb10 displayFlex">
            <span class="font-bold">主要功效：</span>
            <span class="flexOne">{{classicDetail.efficacy}}</span>
          </div>
          <div class="mb10 displayFlex">
            <span class="font-bold">适应症状：</span>
            <span class="flexOne">{{classicDetail.indications}}</span>

          </div>
          <div class="mb10 displayFlex">
            <span class="font-bold">方剂用法：</span>
            <span class="flexOne">{{classicDetail.usage}}</span>
          </div>
        </div>
        <div class="tc pb20 pt20">
          <button class="prescription_detail_save" @click.stop="showDeterminePage">引用方剂</button>
        </div>
      </div>
    </div>
    <div class="h-r-prescription_tab_bg" v-if="determinePage">
      <div class="d_sure_prescription">
        <div class="d_sure_prescription_title">确定引入处方？</div>
        <div class="mb10 font-bold font-15">
          导入处方将覆盖之前的编辑的信息，
          <span class="text_red">暂无药品</span>需要自行更改。
        </div>
        <div class="mb10 font-bold font-15">
          方剂名称：{{classicDetail.name}}
        </div>
        <div class="mb10 font-bold font-15">
          方剂出处：{{classicDetail.source}}
        </div>
        <div class="use-list">
          <div class="use-list-li" v-for="checkItem in checkList">
            {{checkItem.name}}({{checkItem.num+''+checkItem.unit}})
            <span v-if="checkItem.status == 0" class="text_red">暂无此药</span>
          </div>
        </div>
        <div class="tc mt20">
          <button class="saveBtn mr20" @click="quoteClassic()">确认</button>
          <button class="saveBtn cancelBtn" @click="hideDeterminePage()">取消</button>
        </div>
      </div>
    </div>
    <f-loader v-if="showLoader"></f-loader>
  </div>
</template>

<script>
  import {Input, Button} from 'iview'
  import {queryClassic, getHerbalList} from '@/fetch/api.js'
  import {mapState, mapActions} from "vuex";
  import fLoader from "@/components/fLoader";

  export default {
    name: "classic",
    components: {
      Input,
      Button,
      fLoader
    },
    data() {
      return {
        page: 1,
        pageSize: 10,
        queryName: '',
        totalNum: 0,
        dataList: [],
        classicDetail: {
          name: "",
          efficacy: "",
          indications: "",
          source: "",
          usage: "",
          component: []
        },
        classicPage: false,
        determinePage: false,
        checkList: [],
        showLoader: false
      }
    },
    created() {
      this.getData()
    },
    computed: {
      ...mapState({
        currRecipe: state => state.currRecipe,
        recipeList: state => state.recipeList
      })
    },
    methods: {
      ...mapActions(["clean_recipe", "add_new_medicine"]),
      async getData() {
        let params = {
          name: this.queryName,
          page: this.page,
          page_size: this.pageSize
        };

        let res = await queryClassic(params);
        if (res.code === 1000) {
          this.dataList = res.data;
          this.totalNum = res.total_num;
        } else {
          this.$Message.info(res.msg)
        }
      },
      changePage(type) {
        if (type === 1) {
          this.page--;
          this.getData();
        } else if (type === 2) {
          this.page++;
          this.getData();
        } else {
          return
        }
      },
      searchClassic(){
        this.page = 1;
        this.getData();
      },
      showClassicDetail(item) {
        this.classicDetail.name = item.name;
        this.classicDetail.efficacy = item.efficacy;
        this.classicDetail.indications = item.indications;
        this.classicDetail.source = item.source;
        this.classicDetail.usage = item.usage;
        this.classicDetail.component = item.component ? JSON.parse(item.component) : [];
        this.classicPage = true;
      },
      hideClassicDetail() {
        this.classicPage = false;
      },
      async showDeterminePage() {
        this.checkList = [];
        let names = this.classicDetail.component.map(item => {
          return item.name
        });
        let params = {
          "category": this.recipeList[this.currRecipe].data.category,
          "names": names,
          "status": 1
        }
        this.showLoader = true;
        let res = await getHerbalList(params, this.recipeList[this.currRecipe].data.is_cloud);
        if (res.code === 1000) {
          this.classicDetail.component.forEach(item => {
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
                "num": item.dosage,
                "price": '',
                "unit": item.spec,
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
                "num": existence.unit_stock == "g" || existence.unit_stock == "克" ? item.dosage : 0,
                "unit": existence.unit_stock,
                "default_sale_price": existence.sale_price,
                "sale_price": existence.sale_price,
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

          });
          this.showLoader = false;
          this.determinePage = true;
        } else {
          this.showLoader = false;
          this.$Message.info(res.msg)
        }

      },
      hideDeterminePage() {
        this.determinePage = false;
      },
      quoteClassic() {
        this.clean_recipe();
        let type = this.recipeList[this.currRecipe].type;
        this.checkList.forEach(item => {
          this.add_new_medicine({item,type});
        })
        this.hideDeterminePage();
      }
    }
  }
</script>

<style scoped>
  .content {
    padding: 0.3125rem 0.375rem;
  }

  .prescript-list {
    margin: 0.3125rem 0;
    text-align: center;
    line-height: 2.5rem;
    border-radius: 0.25rem;
    border: 1px solid #5096e0;
    width: 100%;
    height: 2.5rem;
    font-size: 0.875rem;
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
    border: none;
  }

  .classic_item_title {
    font-size: 0.9375rem;
    line-height: 1.5rem;
    font-weight: bold;
  }

  .herbal-result-li {
    width: 31.5%;
    height: 3.75rem;
    border: #5096e0 solid 0.0625rem;
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

  .classic_item_content {
    font-size: 0.9375rem;
  }

  .prescription_detail_save {
    min-width: 40%;
    height: 2rem;
    border: #5096e0 solid 0.0625rem;
    border-radius: 1.875rem;
    text-align: center;
    color: #5096e0;
    background-color: transparent;
    font-size: 1rem;
  }

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
    height: auto;
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translate(-50%, -50%);
    padding: 20px 50px;
  }

  .d_sure_prescription_title {
    font-size: 16px;
    font-weight: bold;
    color: #5096e0;
    text-align: center;
    margin-bottom: 20px;
  }

  .text_red {
    color: red;
  }

  .saveBtn {
    font-size: 16px;
    color: #ffffff;
    font-weight: bold;
    width: 140px;
    text-align: center;
    padding: 9px 0;
    background: #5096e0;
    border-radius: 100px;
    border: none;
  }

  .cancelBtn {
    background: #ffffff;
    border: 1px solid #5096e0;
    color: #5096e0;
  }

  .use-list {
    display: flex;
    flex-wrap: wrap;
  }

  .use-list .use-list-li {
    width: 33.3%;
    font-size: 0.875rem;
  }
</style>
