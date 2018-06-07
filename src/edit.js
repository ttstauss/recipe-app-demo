import { initializeRecipePage, renderIngredients } from './views'
import { loadRecipes, removeRecipe, updateRecipe } from './recipes.js'
import { createIngredient } from './ingredients'

// get recipe id from url
const recipeId = location.hash.substring(1)

// initialize recipe page
initializeRecipePage(recipeId)

// set up event listeners
document.querySelector('#recipe-title').addEventListener('input', e => {
  updateRecipe(recipeId, {
    title: e.target.value
  })  
})

document.querySelector('#recipe-body').addEventListener('input', e => {
  updateRecipe(recipeId, {
    instructions: e.target.value
  })
})

document.querySelector('#new-ingredient').addEventListener('submit', e => {
  const text = e.target.elements.newIngredient.value.trim()
  e.preventDefault()

  if (text.length > 0) {
    const ingredient = createIngredient(text)
    updateRecipe(recipeId, {}, ingredient)
    renderIngredients(recipeId)
    e.target.elements.newIngredient.value = ''
  }
})

document.querySelector('#save-recipe').addEventListener('click', () => {
  location.assign('/')
})

document.querySelector('#remove-recipe').addEventListener('click', () => {
  removeRecipe(recipeId)
  location.assign('/')
})

window.addEventListener('storage', e => {
  if (e.key === 'recipes') {
    loadRecipes()
    initializeRecipePage(recipeId)
  }
})