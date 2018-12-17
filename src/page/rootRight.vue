<template>
    <div style="margin-top: 2rem;">
        <div>
        <div class="prescript_title">病历模板</div>
        </div>
        <div class="mt5 ml6 mr6 mb5" style="position:relative;">
            <Input style="width:75%;" placeholder="药品名称/拼音简码" />
            <Button @click="showSearch" style="width:20%;float:right;" type="primary" class="ml8">搜索</Button>
            <div v-show="showSearchResult" class="searchResult ml16">

            </div>
        </div>
        <div class="mt5 ml6 mr6 mb5">
            <div class="prescript_list">添加模板</div>
            <div>
                <div class="prescript_list" v-for="(item,index) in prescript_list" :key='index'>{{item}}</div>
            </div>
        </div>
        <div v-show="prescript_list.length<1" >没有相关处方模板</div>
        <div style="text-align: center;">
            <Button class="ml10 mr10" type="primary" shape="circle" ghost>上一页</Button>
            <Button class="ml10 mr10" type="primary" shape="circle" ghost>下一页</Button>
        </div>
    </div>
</template>

<script>
    import {Input,Button} from 'iview'
    export default {
        name: "rootRight",
        data () {
            return {
                showSearchResult: false,
                prescript_list:["一二三四","一二三四","一二三四","一二三四","一二三四","一二三四","一二三四","一二三四","一二三四","一二三四","一二三四"],
            }
        },
        components:{
            Input,
            Button
        },

        methods: {
            showSearch () {
                this.showSearchResult=true;
            },
            hideSearch () {
                this.showSearchResult=false;
            }
        }
    }
</script>

<style scoped>
.prescript_title{
    width: 100%;
    height: 2rem;
    background-color: #4DBC89;
    color: white;
    font-weight: bold;
    font-size: 1rem;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    text-align: center;
    line-height: 2rem;
}
.prescript_list{
    margin: 0.3125rem 0;
    text-align: center;
    line-height: 2rem;    
    border-radius: 4px;
    border: 1px solid #5096E0;
    width: 100%;
    height: 2rem;
    font-size: 1rem;
}
.searchResult{
    position: absolute;
    width: 75%;
    height: 100px;
    z-index: 99;
    background-color: white;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.20);

}

</style>
