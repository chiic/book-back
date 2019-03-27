export var filterList = function (data) {
  var objSet = {}
  data.forEach(element => {
    if (element.key) {
      if (!objSet[element.key]) {
        objSet[element.key] = [element]
      } else {
        objSet[element.key].push(element)
      }
    }
  })
  return objSet
}
