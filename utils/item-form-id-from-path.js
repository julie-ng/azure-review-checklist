// const route = useRoute()
// const slug = route.params.slug[0]

export default function (path) {
  const parts = path.split('/')
  // parts.shift() // empty
  // parts.shift() // remove base content directory, e.g. 'from-json'
  // return '#' + parts.join('-')

  return parts[2] + '-' + parts.pop().replace(/[._]/,'-')
}