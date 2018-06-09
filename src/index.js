import { loadRecipes, createRecipe } from './recipes'
import { renderRecipes } from './views'
import { setFilters } from './filters'

// render recipe list
renderRecipes()

// set up event listeners
document.querySelector('#create-recipe').addEventListener('click', () => {
  const id = createRecipe()
  location.assign(`recipe.html#${id}`)
})

document.querySelector('#find-recipe').addEventListener('click', () => {
  location.assign('find.html')
})

document.querySelector('#search').addEventListener('input', e => {
  setFilters({
    searchText: e.target.value
  })
  renderRecipes()
})

document.querySelector('#filter-by').addEventListener('change', e => {
  setFilters({
    sortBy: e.target.value
  })
  renderRecipes()
})

window.addEventListener('storage', e => {
  if(e.key === 'recipes') {
    loadRecipes()
    renderRecipes()
  }
})