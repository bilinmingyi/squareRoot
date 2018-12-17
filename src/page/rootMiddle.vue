<template>
  <div>
    这是中间
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
        recipeList: state => state.recipeList
      })
    },
    created(){
      this.addNewRecipt(1);
      this.addNewRecipt(2);
    },
    methods: {
      ...mapActions([
        'add_new_recipt'
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

</style>
