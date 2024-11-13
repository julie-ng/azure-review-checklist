export default function (item, suffix ='') {
  // const parts = item._path.split('/')
  // parts.shift()
  // parts.shift()
  // const checklistSlug = parts[0]
  // console.log('parts', parts)
  // const id = parts.pop().replace('_','')

  // const newStr = [checklistSlug]
  // parts.forEach((p) => {
  //   newStr.push(p.slice(0,3))
  // })
  // newStr.push(id)
  // const result = newStr.join('-')

  const result = item.guid // <-- easiest but has no semantic meaning :-(

  return (suffix === '')
    ? result
    : `${result}-${suffix}`
}