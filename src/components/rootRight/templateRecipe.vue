<template>
  <div>
    <div class="prescription_detail_btn" @click.stop="cancel">返回</div>
    <div class="search-result-title">
      <span>测试</span>
    </div>
    <div class="search-result-indications">
      {{test}}
    </div>
    <div class="search-result-line"></div>
    <section v-if="recipeType===1">
      <div class="checkbox-block">
        <CheckboxGroup>
          <div class="mb10">
            <Checkbox label=""><span class="label-text">若疼痛甚者</span></Checkbox>
          </div>
          <div class="mb10">
            <Checkbox label=""><span class="label-text">若气短、体倦乏力者</span></Checkbox>
          </div>
          <div>
            <Checkbox label=""><span class="label-text">若胸闷、疼痛着</span></Checkbox>
          </div>
        </CheckboxGroup>
      </div>
      <div class="search-result-line"></div>
    </section>
    <div class="search-result mt12 ml5 mr5">
      <div
        :class="[{'herbal-result-li':recipeType===1},{'search-result-li':recipeType!=1}]"
      >
        <span v-show="recipeType===1">
          测试
          <br>
          （1g）
        </span>
        <span v-show="recipeType===2">
          测试
          xxx
        </span>
      </div>
    </div>
    <div class="clear"></div>
    <div class="pb10 mt12">
      <button class="prescription_detail_save mr2">引用方剂</button>
    </div>
  </div>
</template>

<script>
import {CheckboxGroup, Checkbox} from "iview";
import {mapState, mapGetters, mapActions} from "vuex";

export default {
  name: "templateRecipe",
  data() {
    return {
      test: '胁肋疼痛，胸闷善太息，情志抑郁，易怒，脘腹胀满，脉弦，肝气郁滞证。胁肋疼痛，胸闷善太息，情志抑郁，易怒，脘腹胀满，脉弦，肝气郁。胁肋疼痛，胸闷善太息，情志抑郁，易怒，脘腹胀满，脉弦，肝气郁',
    }
  },
  components: {
    CheckboxGroup,
    Checkbox
  },
  computed: {
    ...mapGetters(["currRecipeData"]),
    recipeType: function () {
      return this.currRecipeData === undefined ? 0 : this.currRecipeData.type;
    },
  },
  methods: {
    cancel() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
  .prescription_detail_btn {
    width: 100%;
    height: 1.875rem;
    line-height: 1.875rem;
    font-size: 0.9375rem;
    text-align: center;
    border-radius: 0.25rem;
    color: #fff;
    background: #eeae1d;
    cursor: pointer;
  }

  .search-result-title {
    color: #4c4c4c;
    font-size: 0.9375rem;
    font-weight: bold;
    margin-left: 0.875rem;
    padding: 1rem 0 0.375rem;
  }

  .search-result-indications {
    margin-left: 0.875rem;
    line-height: 1.25rem;
    font-size: 0.875rem;
  }

  .search-result-line {
    padding-bottom: 0.5625rem;
    border-bottom: 0.0625rem solid #CCCCCC;
  }

  .checkbox-block {
    padding: 11px 10px 3px;
  }

  .label-text {
    font-size: 0.875rem;
    margin-left: 0.5rem;
  }

  .search-result .herbal-result-li {
    width: 31.5%;
    height: 3.75rem;
    border: #CCCCCC solid 0.0625rem;
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

  .search-result .search-result-li {
    width: 100%;
    height: 2.5rem;
    border: #CCCCCC solid 0.0625rem;
    border-radius: 0.25rem;
    float: left;
    margin-right: 1%;
    margin-bottom: 0.25rem;
    text-align: center;
    justify-content: center;
    display: flex;
    align-items: center;
    font-size: 0.875rem;
    cursor: pointer;
  }
  .prescription_detail_save {
    margin-left: 2%;
    width: 30%;
    height: 2rem;
    border: #5096e0 solid 0.0625rem;
    border-radius: 1.875rem;
    text-align: center;
    color: #5096e0;
    float: left;
    background-color: transparent;
  }
</style>
