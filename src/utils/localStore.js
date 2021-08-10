export const loadData = () => {
  try {
    const suggestions = localStorage.getItem('suggestions')
    if (suggestions) return JSON.parse(suggestions)
    return []
  } catch (error) {
    console.log(error)
  }
}

export const saveData = (data) => {
  console.log(data)
  try {
    const previousSuggestions = loadData()

    if (previousSuggestions.includes(data)) return

    console.log(previousSuggestions)
    previousSuggestions.push(data)
    localStorage.setItem('suggestions', JSON.stringify(previousSuggestions))
  } catch (error) {
    console.log(error)
  }
}

export const removeData = () => {
  try {
    localStorage.removeItem('suggestions')
  } catch (error) {
    console.log(error)
  }
}
