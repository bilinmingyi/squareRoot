<template>
  <div>
    <component :is="currRecipe===-1?'patientrRcord':componentList[Number(recipeList[currRecipe].type)-1]"></component>
    <print-prescription v-if="currRecipe!==-1"></print-prescription>
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex'
  import herbalRecipe from '@/components/rootMiddle/herbalRecipe.vue'
  import westernRecipe from '@/components/rootMiddle/westernRecipe.vue'
  import therapyRecipe from '@/components/rootMiddle/therapyRecipe.vue'
  import materialRecipe from '@/components/rootMiddle/materialRecipe.vue'
  import patientrRcord from '@/components/patientrRcord.vue'
  import printPrescription from '@/components/rootMiddle/printPrescription.vue'

  export default {
    name: "rootMiddle",
    data() {
      return {
        componentList:['herbalRecipe','westernRecipe','','therapyRecipe','','materialRecipe']
      }
    },
    components: {
      herbalRecipe,
      westernRecipe,
      therapyRecipe,
      materialRecipe,
      patientrRcord,
      printPrescription
    },
    computed: {
      ...mapState({
        recipeList: state => state.recipeList,
        currRecipe: state => state.currRecipe,
      })
    },
    created() {
      let temCurrRecipe=this.currRecipe;
      if(this.recipeList.length===0){
        this.addNewRecipt(1);
        this.addNewRecipt(2);
        this.addNewRecipt(4);
        this.change_curr_tab(temCurrRecipe);
      }
    },
    methods: {
      ...mapActions([
        'add_new_recipt',
        'change_curr_tab'
      ]),
      addNewRecipt(type) {
        this.add_new_recipt(type)
      }
    }
  }
</script>

<style scoped>
  .recipe_tab {
    display: flex;
    flex-wrap: wrap;
    background: #F5F5F5;
  }

  .recipe_tab .tab_li {
    background: rgba(225, 225, 225, 1);
    border-radius: 0.5rem 0.5rem 0rem 0rem;
    width: 7.5rem;
    height: 2.19rem;
    border-right: 0.0625rem solid #FFFFFF;
    font-size: 1rem;
    font-weight: 400;
    color: rgba(140, 140, 140, 1);
    line-height: 2.19rem;
    text-align: center;
  }

  .recipe_tab .currentLi {
    background: rgba(77, 188, 137, 1);
    color: rgba(255, 255, 255, 1);
    font-weight: 600;
  }

  .recipe_add {
    width: 3.75rem;
    height: 2.19rem;
    line-height: 2.19rem;
    background: rgba(225, 225, 225, 1);
    border-radius: 0.5rem 0.5rem 0rem 0rem;
    color: rgba(140, 140, 140, 1);
    font-weight: bold;
    font-size: 1.6rem;
    border: none;
  }
</style>
