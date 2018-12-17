<template>
  <div>
    <ul class="recipe_tab">
      <li v-for="(recipe,index) in recipeList" :class="{'currentLi':index === currRecipe}" @click.stop="change_curr_tab(index)">{{recipe.type|recipeType}}</li>
    </ul>
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex'

  export default {
    name: "rootMiddle",
    data() {
      return {}
    },
    computed: {
      ...mapState({
        recipeList: state => state.recipeList,
        currRecipe: state => state.currRecipe
      })
    },
    created(){
      this.addNewRecipt(1);
      this.addNewRecipt(2);
    },
    methods: {
      ...mapActions([
        'add_new_recipt',
        'change_curr_tab'
      ]),
      addNewRecipt(type) {
        let item = {};
        switch (type) {
          case 1://重要处方
            item = {
              type: 1,
              money: 0,
              data: {
                is_cloud: 0,
                category: "1",
                doctor_remark: "",
                dosage: 0,
                usage: "",
                frequency: "",
                extra_price: 0,
                extra_num: 0,
                extra_feetype_id: "",
                items: []
              }
            };
            break;
          case 2://中成药处方
            item = {
              type: 2,
              money: 0,
              data: {
                doctor_remark: "",
                items: []
              }
            };
            break;
          case 3://产品处方
            item = {
              type: 3,
              money: 0,
              data: {
                is_cloud: 0,
                doctor_remark: "",
                items: []
              }
            }
            break;
          case 4://项目处方
            item = {
              type: 5,
              money: 0,
              data: {
                doctor_remark: "",
                items: []
              }
            }
            break;
          case 5://附加服务
            item = {
              type: 5,
              money: 0,
              data: {
                doctor_remark: "",
                items: []
              }
            }
            break;
          case 6://材料处方
            item = {
              type: 6,
              money: 0,
              data: {
                doctor_remark: "",
                items: []
              }
            }
        }
        this.add_new_recipt(item)
      }

    }
  }
</script>

<style scoped>
  .recipe_tab{
    display: flex;
  }
  .recipe_tab li{
    background:rgba(225,225,225,1);
    border-radius:0.5rem 0.5rem 0rem 0rem;
    width:7.5rem;
    height:2.19rem;
    border-right: 0.0625rem solid #FFFFFF;
    font-size:1rem;
    font-weight:400;
    color:rgba(140,140,140,1);
    line-height:2.19rem;
    text-align: center;
  }
  .recipe_tab .currentLi{
    background:rgba(77,188,137,1);
    color:rgba(255,255,255,1);
    font-weight:600;
  }
</style>
