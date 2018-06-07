import uuidv4 from 'uuid/v4'
import moment from 'moment'
import { saveRecipes } from './recipes'

// create ingredient
const createIngredient = (text) => {
  const id = uuidv4()
  const timestamp = moment().valueOf()

  return {
    id,
    createdAt: timestamp,
    text
  }
}

// remove ingredient
const removeIngredient = (recipe, id) => {
  const ingredientIndex = recipe.ingredients.findIndex(recipe => recipe.id === id)
  if (ingredientIndex > -1) {
    recipe.ingredients.splice(ingredientIndex, 1)
    saveRecipes()
  }
}

// toggle ingredient on hand
const toggleIngredient = (recipe, id) => {
  const ingredient = recipe.ingredients.find(ingredient => ingredient.id === id)

  if (ingredient) {
    ingredient.onHand = !ingredient.onHand
    saveRecipes()
  }
}

export { createIngredient, removeIngredient, toggleIngredient }