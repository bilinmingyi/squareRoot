const getters = {
  currRecipeData:state=>{
    return state.recipeList[state.currRecipe]
  }
};
export default getters
