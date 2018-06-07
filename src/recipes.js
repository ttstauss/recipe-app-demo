import uuidv4 from 'uuid/v4'
import moment from 'moment'

// set initial recipe array
let recipes = []

// load recipes from localstorage
const loadRecipes = () => {
  const recipesJSON = localStorage.getItem('recipes')
  
  try {
    recipes = recipesJSON ? JSON.parse(recipesJSON) : []
  } catch (error) {
    recipes = []
  }  
}

// save recipes to localstorage
const saveRecipes = () => {
  localStorage.setItem('recipes', JSON.stringify(recipes))
}

// create new recipe
const createRecipe = () => {
  const id = uuidv4()
  const timestamp = moment().valueOf()

  recipes.push({
    id,
    createdAt: timestamp,
    updatedAt: timestamp,
    title: '',
    instructions: '',
    ingredients: []
  })
  saveRecipes()
  return id
}

// remove recipe
const removeRecipe = (id) => {
  const recipeIndex = recipes.findIndex(recipe => recipe.id === id)

  if (recipeIndex > -1) {
    recipes.splice(recipeIndex, 1)
    saveRecipes()
  }
}

// update recipe
const updateRecipe = (id, { title, instructions }, ingredient) => {
  const recipe = recipes.find(recipe => recipe.id === id)
  if (!recipe) {
    return
  }
  if (typeof title === 'string') {
    recipe.title = title
    recipe.updatedAt = moment().valueOf()
  }
  if (typeof instructions === 'string') {
    recipe.instructions = instructions
    recipe.updatedAt = moment().valueOf()
  }
  if (typeof ingredient === 'object') {
    recipe.ingredients.push(ingredient)
    recipe.updatedAt = moment().valueOf()
  }
  saveRecipes()
}

// expose recipes from module
const getRecipes = () => recipes

loadRecipes()

export { loadRecipes, getRecipes, createRecipe, removeRecipe, updateRecipe, saveRecipes }