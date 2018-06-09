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

const sortRecipes = (sortBy) => {
  if (sortBy === 'byEdited') {
    return recipes.sort((a, b) => b.updatedAt - a.updatedAt)
  } else if (sortBy === 'byCreated') {
    return recipes.sort((a, b) => a.updatedAt - b.updatedAt)
  } else if (sortBy === 'alphabetical') {
    return recipes.sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1
      } else if ( a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1
      } else {
        return 0
      }
    })
  } else {
    return recipes
  }
}

// update recipe
const updateRecipe = (id, { title, instructions }, ingredient, ingredientsArray) => {
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
  if (Array.isArray(ingredientsArray)) {
    recipe.ingredients = ingredientsArray
    recipe.updatedAt = moment().valueOf()
  }
  saveRecipes()
  return recipe
}

// expose recipes from module
const getRecipes = () => recipes

loadRecipes()

export { loadRecipes, getRecipes, createRecipe, sortRecipes, removeRecipe, updateRecipe, saveRecipes }