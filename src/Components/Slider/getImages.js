export default async function getImages(url) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const json = await response.json()
  const urls = await json.map((e) => e.urls.full)
  const paths = await urls.map(async (url) => {
    const res = await fetch(url)
    const blob = await res.blob()
    const path = URL.createObjectURL(blob)
    const img = new Image()
    img.onload = (e) => console.log('async', img.naturalWidth, img.complete)
    img.src = path
    return path
  })
  return await Promise.all(paths)
}
