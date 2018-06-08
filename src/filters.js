// set initial recipe filters
const filters = {
  searchText: '',
  sortBy: 'byEdited'
}

// expose recipe filters from module
const getFilters = () => filters

// set recipe filter search text and sort by
const setFilters = ({ searchText, sortBy }) => {
  if (typeof searchText === 'string') {
    filters.searchText = searchText
  }
  if (typeof sortBy === 'string') {
    filters.sortBy = sortBy
  }
  return filters
}

// set initial ingredients filter
const ingredientFilter = {
  hideOnHand: false
}

// expose ingredients filter from module
const getIngredientsFilter = () => ingredientFilter

// set ingredients filter hide completed
const setIngredientsFilter = ({ hideOnHand }) => {
  if (typeof hideOnHand === 'boolean') {
    ingredientFilter.hideOnHand = hideOnHand
  }
}

export { getFilters, setFilters, getIngredientsFilter, setIngredientsFilter }