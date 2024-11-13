export default function (path) {
  const parts = path.split('/')
  parts.shift() // empty
  parts.shift() // remove base content directory, e.g. 'from-json'
  return '#' + parts.join('-')
}