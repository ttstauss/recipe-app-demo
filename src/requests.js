const getRecipesRequest = async (text) => {
  try {
    const response = await fetch(`/recipe-search?search=${text}`)
    if (response.status === 200) {
      const jsonData = await response.json()
      const data = JSON.parse(jsonData)
      return data.hits
    }
  } catch (error) {
    console.log(`Error: ${error}`)
  }
}

export { getRecipesRequest }