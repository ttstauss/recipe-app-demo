// set initial filters array
const filters = {
  searchText: ''
}

// expose filters from module
const getFilters = () => filters

// set filter search text
const setFilters = ({ searchText }) => {
  if(typeof searchText === 'string') {
    filters.searchText = searchText
  }
  return filters
}

export { getFilters, setFilters }