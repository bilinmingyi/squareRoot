<template>
    <div style="margin-top: 2rem;">
    <div>
        <herbal-tag></herbal-tag>
    </div>
    </div>
</template>

<script>
  import herbalTag from './rootRight/herbalTag.vue'
  export default {
    name: "rootRight",
    components: {
      herbalTag
    },
    data(){
      return {

      }
    },
    methods:{
      
    }

  }
</script>

<style scoped>
.prescript_title{
    height: 2rem;
    background: rgba(225, 225, 225, 1);
    color: rgba(140, 140, 140, 1);
    font-weight: bold;
    font-size: 1rem;
    border-radius:0.5rem 0.5rem 0rem 0rem;
    text-align: center;
    line-height: 2rem;
}
.current_tab{
    background: rgba(77, 188, 137, 1);
    color: rgba(255, 255, 255, 1);
}
.prescript_list{
    margin: 0.3125rem 0;
    text-align: center;
    line-height: 2rem;    
    border-radius: 0.25rem;
    border: 1px solid #5096E0;
    width: 100%;
    height: 2rem;
    font-size: 1rem;
}
.search_result{
    display:flex;
    flex-wrap: wrap;
}
.search_result .search_result_li{
    width:30%;
    flex-grow: 1;
    text-align: center;
    border:1px solid #5096E0;
    border-radius: 0.25rem;
    margin:0.25rem 0.25rem;
    font-size: 1rem;
}

</style>
