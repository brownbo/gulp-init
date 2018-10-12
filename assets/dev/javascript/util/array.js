import {trim} from '../util/string'

export const findItemIndex = (array, item) => {
  let index = -1
  for (let i in array) {
    if (trim(array[i]) === trim(item)) {
      index = i
    }
  }
  return index
}