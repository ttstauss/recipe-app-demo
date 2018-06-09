// In order to not expose keys, dev object is served for searches

import { data } from './data'

const getRecipesRequest = () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data.hits)
    }, 200);
  })
  return promise
}

export { getRecipesRequest }