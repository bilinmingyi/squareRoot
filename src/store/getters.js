const getters = {
  currRecipeData:state=>{
    return state.recipeList[state.currRecipe]
  },
  totalPrice: state => {
    let recipeList = state.recipeList;
    return recipeList.reduce((prePrice, item) => {
      return Number(prePrice) + Number(item.money);
    }, state.treatPrice ? state.treatPrice : 0);
  }
};
export default getters
