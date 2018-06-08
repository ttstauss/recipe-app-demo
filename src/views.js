import { getRecipes, sortRecipes } from './recipes'
import { getFilters, getIngredientsFilter } from './filters'
import { removeIngredient, toggleIngredient } from './ingredients'
import moment from 'moment'

// render application recipes
const renderRecipes = () => {
  const recipesEl = document.querySelector('#recipes')
  const { searchText, sortBy } = getFilters()
  const recipes = sortRecipes(sortBy)
  const filteredRecipes = recipes.filter(recipe => recipe.title.toLowerCase().includes(searchText.toLowerCase()))

  recipesEl.innerHTML = ''

  if (filteredRecipes.length > 0) {
    filteredRecipes.forEach(recipe => {
      const recipeEl = generateRecipeDOM(recipe)
      recipesEl.appendChild(recipeEl)
    })
  } else {
    const emptyMessage = document.createElement('p')
    emptyMessage.textContent = 'No recipes to show'
    emptyMessage.classList.add('empty-message')
    recipesEl.appendChild(emptyMessage)
  }
}

// generate the DOM structure for a recipe
const generateRecipeDOM = ({ id, title, instructions, ingredients }) => {
  const recipeEl = document.createElement('a')
  const titleEl = document.createElement('p')

  // setup recipe link
  recipeEl.setAttribute('href', `/recipe.html#${id}`)
  recipeEl.classList.add('list-item')

  // setup recipe title
  if (title.length > 0) {
    titleEl.textContent = title
    titleEl.classList.add('list-item__title')
  } else {
    titleEl.textContent = 'No Title'
    titleEl.classList.add('list-item__no-title')
  }
  recipeEl.appendChild(titleEl)

  // setup ingredient summary
  recipeEl.appendChild(generateSummaryDOM(ingredients))

  return recipeEl
}

// initialize recipe page
const initializeRecipePage = (recipeId) => {
  const pageTitleEl = document.querySelector('title')
  const dateEl = document.querySelector('#last-edited')
  const titleEl = document.querySelector('#recipe-title')
  const instructionsEl = document.querySelector('#recipe-body')
  const ingredientsEl = document.querySelector('#ingredients')
  const recipe = getRecipes().find(recipe => recipe.id === recipeId)

  if (!recipe) {
    location.assign('/')
  }

  pageTitleEl.textContent = recipe.title
  dateEl.textContent = generateLastEdited(recipe.updatedAt)
  titleEl.value = recipe.title
  instructionsEl.value = recipe.instructions
  renderIngredients(recipeId, ingredientsEl)
}

// render recipe ingredients
const renderIngredients = (recipeId) => {
  const ingredientsEl = document.querySelector('#ingredients')
  const recipe = getRecipes().find(recipe => recipe.id === recipeId)
  const { hideOnHand } = getIngredientsFilter()
  console.log('hideOnHand', hideOnHand)
  const filteredIngredients = recipe.ingredients.filter(ingredient => {
    return !hideOnHand || !ingredient.onHand
  })
  
  const notOnHandIngredients = recipe.ingredients.filter(ingredient => {
    return ingredient.onHand
  })

  ingredientsEl.innerHTML = ''
  ingredientsEl.appendChild(generateIngredientOnHandSummaryDOM(notOnHandIngredients))

  if (filteredIngredients.length > 0) {
    filteredIngredients.forEach(ingredient => {
      ingredientsEl.appendChild(generateIngredientDOM(recipe, ingredient))
    })
  } else {
    const messageEl = document.createElement('p')
    messageEl.textContent = 'No ingredients to show'
    messageEl.classList.add('empty-message', 'animated', 'zoomIn')
    ingredientsEl.appendChild(messageEl)
  }
}

// generate DOM structure for an ingredient
const generateIngredientDOM = (recipe, { id, text, onHand }) => {
  const dateEl = document.querySelector('#last-edited')
  const ingredientEl = document.createElement('label')
  const containerEl = document.createElement('div')
  const checkboxEl = document.createElement('input')
  const textEl = document.createElement('span')
  const buttonEl = document.createElement('button')

  // setup ingredient checkbox
  checkboxEl.setAttribute('type', 'checkbox')
  checkboxEl.checked = onHand
  checkboxEl.addEventListener('change', () => {
    toggleIngredient(recipe, id)
    dateEl.textContent = generateLastEdited(recipe.updatedAt)
    renderIngredients(recipe.id)
  })
  containerEl.appendChild(checkboxEl)

  // setup ingredient text
  textEl.textContent = text
  containerEl.appendChild(textEl)

  // setup container
  containerEl.classList.add('ingredient-list-item__container')
  ingredientEl.appendChild(containerEl)  

  // setup remove ingredient button
  buttonEl.textContent = 'remove'
  buttonEl.classList.add('button', 'button--text')
  ingredientEl.appendChild(buttonEl)

  ingredientEl.classList.add('ingredient-list-item')

  buttonEl.addEventListener('click', e => {
    removeIngredient(recipe, id)
    dateEl.textContent = generateLastEdited(recipe.updatedAt)
    renderIngredients(recipe.id)
  })

  return ingredientEl
}

// generate DOM structure for ingredient summary 
const generateSummaryDOM = (ingredients) => {
  const totalIngredients = ingredients.length
  const onHandIngredients = ingredients.filter(ingredient => ingredient.onHand).length
  const summaryEl = document.createElement('p')

  if (totalIngredients === 0) {
    summaryEl.textContent = 'No ingredients entered'
    summaryEl.classList.add('list-item__no-subtitle')
  } else if (totalIngredients === onHandIngredients) {
    summaryEl.textContent = 'You have all the ingredients'
    summaryEl.classList.add('list-item__subtitle')
  } else if (onHandIngredients > 0 && totalIngredients !== onHandIngredients) {
    summaryEl.textContent = 'You have some of the ingredients'
    summaryEl.classList.add('list-item__subtitle')
  } else if (onHandIngredients === 0) {
    summaryEl.textContent = 'You have none of the ingredients'
    summaryEl.classList.add('list-item__subtitle')
  } 
  
  return summaryEl
}

// generate DOM structure for ingredient on hand summary
const generateIngredientOnHandSummaryDOM = (notOnHandIngredients) => {
  const onHandSummaryEl = document.createElement('p')
  const plural = notOnHandIngredients.length === 1 ? '' : 's'
  onHandSummaryEl.classList.add('list-title')
  onHandSummaryEl.textContent = `You have ${notOnHandIngredients.length} ingredient${plural} on hand`
  return onHandSummaryEl
}

// generate last edited message
const generateLastEdited = timestamp => `Last edited ${moment(timestamp).fromNow()}`

export { renderRecipes, initializeRecipePage, renderIngredients, generateLastEdited }