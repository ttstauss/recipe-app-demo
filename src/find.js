import debounce from 'lodash.debounce'
import { getRecipesRequest } from './requests'
import { createRecipe, updateRecipe } from './recipes'
import { createIngredient } from './ingredients'

// set initial recipe array
let foundRecipes = []

// save recipes to localstorage
const saveFoundRecipes = () => {
  localStorage.setItem('found-recipes', JSON.stringify(foundRecipes))
}

const renderFoundRecipes = () => {
  if (location.hash !== '') {
    const foundRecipe = JSON.parse(localStorage.getItem('found-recipes'))[location.hash.substring(1)].recipe
    generateFoundRecipeDOM(foundRecipe)
  } else {
    foundRecipes = JSON.parse(localStorage.getItem('found-recipes'))

    const recipesEl = document.querySelector('#recipes')
    document.querySelector('.commands').classList.add('hide')

    recipesEl.innerHTML = ''

    if (foundRecipes !== null && foundRecipes.length > 0) {
      foundRecipes.forEach((recipe, index) => {
        const recipeEl = generateFoundRecipesDOM(recipe, index)
        recipesEl.appendChild(recipeEl)
      })
    } else {
      const startSearch = document.createElement('p')
      startSearch.textContent = 'No recipes to show. Search for new recipes!'
      startSearch.classList.add('empty-message')
      recipesEl.appendChild(startSearch)
    }
  }  
}

const generateFoundRecipesDOM = ({ recipe }, index) => {
  const { label, ingredientLines } = recipe
  const recipeEl = document.createElement('a')
  const titleEl = document.createElement('p')

  // setup found recipe link
  recipeEl.addEventListener('click', () => {
    location.assign(`find.html#${index}`)
    generateFoundRecipeDOM(recipe)
  })
  recipeEl.classList.add('list-item')

  // setup found recipe title
  titleEl.textContent = label
  titleEl.classList.add('list-item__title')
  recipeEl.appendChild(titleEl)

  // setup found recipe ingredient summary
  recipeEl.appendChild(generateFoundSummaryDOM(ingredientLines))

  return recipeEl
}

const generateFoundSummaryDOM = (ingredients) => {
  const summaryEl = document.createElement('p')
  const plural = ingredients.length === 1 ? '' : 's'
  summaryEl.textContent = `${ingredients.length} ingredient${plural} total`
  summaryEl.classList.add('list-item__subtitle')

  return summaryEl
}

const generateFoundRecipeDOM = ({ label, source, url, ingredientLines }) => {
  document.querySelector('.actions').classList.add('hide')

  const recipesEl = document.querySelector('#recipes')
  recipesEl.innerHTML = ''

  const labelEl = document.createElement('h2')
  labelEl.textContent = label
  labelEl.classList.add('recipe__title')
  recipesEl.appendChild(labelEl)

  const instructionsEl = document.createElement('p')
  instructionsEl.textContent = `Recipe instructions can be found at `
  instructionsEl.classList.add('attribution')

  const attributeEl = document.createElement('a')
  attributeEl.textContent = source
  attributeEl.setAttribute('href', url)
  attributeEl.setAttribute('target', '_blank')
  attributeEl.setAttribute('rel', 'noopener')

  instructionsEl.appendChild(attributeEl)
  recipesEl.appendChild(instructionsEl)

  const titleEl = document.createElement('h4')
  titleEl.textContent = 'Ingredients Needed'
  recipesEl.appendChild(titleEl)

  const ingredients = document.createElement('div')
  ingredientLines.forEach(ingredient => {
    const containerEl = document.createElement('div')
    const ingredientEl = document.createElement('p')
    ingredientEl.textContent = ingredient
    containerEl.classList.add('ingredient-list-item')
    containerEl.appendChild(ingredientEl)
    ingredients.appendChild(containerEl)
  })
  recipesEl.appendChild(ingredients)

  document.querySelector('.commands').classList.remove('hide')

  return recipesEl
}

renderFoundRecipes()

document.querySelector('#find').addEventListener('input', debounce(async (e) => {
  foundRecipes = await getRecipesRequest(e.target.value)
  saveFoundRecipes()  
  renderFoundRecipes()
}, 800))

document.querySelector('#clear').addEventListener('click', () => {
  localStorage.removeItem('found-recipes')
  renderFoundRecipes()
})

document.querySelector('#back-to-search').addEventListener('click', () => {
  location.assign('find.html')
})

document.querySelector('#save-recipe').addEventListener('click', () => {
  const foundRecipe = JSON.parse(localStorage.getItem('found-recipes'))[location.hash.substring(1)].recipe
  const ingredientsArray = []
  foundRecipe.ingredientLines.forEach(ingredient => {
    ingredientsArray.push(createIngredient(ingredient))
  })
  const id = createRecipe()
  const recipe = updateRecipe(id, {
    title: foundRecipe.label,
    instructions: `Recipe instructions can be found at:\n\n${foundRecipe.url}`
  }, undefined, ingredientsArray)
  location.assign(`recipe.html#${id}`)
})

window.addEventListener('hashchange', () => {
  document.querySelector('.actions').classList.remove('hide')
  renderFoundRecipes()
})