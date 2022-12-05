export function findIndex<T>(
  arr: T[], fn: (v: T, i: number) => boolean
) {
  const i = arr.findIndex(fn)
  if (i !== -1) return i
}
