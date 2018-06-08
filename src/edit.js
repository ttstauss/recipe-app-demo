import { initializeRecipePage, renderIngredients, generateLastEdited } from './views'
import { loadRecipes, removeRecipe, updateRecipe } from './recipes.js'
import { createIngredient } from './ingredients'
import { setIngredientsFilter } from './filters'

// set up selectors
const dateEl = document.querySelector('#last-edited')

// get recipe id from url
const recipeId = location.hash.substring(1)

// initialize recipe page
initializeRecipePage(recipeId)

// set up event listeners
document.querySelector('#recipe-title').addEventListener('input', e => {
  const recipe = updateRecipe(recipeId, {
    title: e.target.value
  })
  dateEl.textContent = generateLastEdited(recipe.updatedAt)
})

document.querySelector('#recipe-body').addEventListener('input', e => {
  const recipe = updateRecipe(recipeId, {
    instructions: e.target.value
  })
  dateEl.textContent = generateLastEdited(recipe.updatedAt)
})

document.querySelector('#hide-on-hand').addEventListener('change', e => {
  setIngredientsFilter({
    hideOnHand: e.target.checked
  })
  renderIngredients(recipeId)
})

document.querySelector('#new-ingredient').addEventListener('submit', e => {
  const text = e.target.elements.newIngredient.value.trim()
  e.preventDefault()

  if (text.length > 0) {
    const ingredient = createIngredient(text)
    const recipe = updateRecipe(recipeId, {}, ingredient)
    dateEl.textContent = generateLastEdited(recipe.updatedAt)
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