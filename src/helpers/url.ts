export const resourceId = (url: string) => {
  const segs = url.split('/')
  const last = segs[segs.length - 1]
  const secondLast = segs[segs.length - 2]
  
  if (last.length === 0) {
    return secondLast
  }
  return last
}
