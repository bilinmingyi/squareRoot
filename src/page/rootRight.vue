<template>
    <div style="margin-top: 2rem;">
        <div style="display: flex;">
            <div v-if="prescript_type===1" 
            style="flex: 1;" class="prescript_title current_tab">病历模板</div>
            <div v-if="prescript_type===2||prescript_type===3" 
            style="flex: 1;" :class="['prescript_title',{'current_tab':in_first_tab}]" @click.stop="in_first">药品搜索</div>
            <div v-if="prescript_type===4" 
            style="flex: 1;" :class="['prescript_title',{'current_tab':in_first_tab}]" @click.stop="in_first">项目搜索</div>
            <div v-if="prescript_type===2||prescript_type===3||prescript_type===4" 
            style="flex: 1;" :class="['prescript_title',{'current_tab':in_second_tab}]" @click.stop="in_second">处方模板</div>
            <div v-if="prescript_type===5" 
            style="flex: 1;" class="prescript_title current_tab">材料搜索</div>
            <div v-if="prescript_type===6" 
            style="flex: 1;" class="prescript_title current_tab">附加服务</div>
        </div>
        <div v-show="prescript_type===2||prescript_type===3" class="mt5 ml6 mr6 mb5">
            <Input style="width:75%;" placeholder="药品名称/拼音简码" />
            <Button style="width:20%;float:right;" type="primary" class="ml8">搜索</Button>
        </div>
        <div class="search_result">
            <div class="search_result_li" v-for="(item,index) in searchList" :key='index'>
                {{item.name}}<br/>
                {{item.spec}}
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
                in_first_tab: true,
                in_second_tab: false,
                prescript_type: 2,//1病历 2中药 3成药 4项目 5材料 6附加服务
                prescript_list:["一二三四","一二三四","一二三四","一二三四","一二三四","一二三四","一二三四","一二三四","一二三四","一二三四","一二三四"],
                searchList:[{name:'生姜',spec:'2g/包'},{name:'半夏',spec:'2g/包'},{name:'甘草',spec:'2g/包'},{name:'甘草',spec:'2g/包'},]
            }
        },
        components:{
            Input,
            Button
        },

        methods: {
            in_first(){
                this.in_first_tab=true;
                this.in_second_tab=false;
            },
            in_second(){
                this.in_second_tab=true;
                this.in_first_tab=false;
            }
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
