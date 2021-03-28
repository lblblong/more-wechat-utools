import * as fs from "fs"

export function canAccess(file: string) {
  if (!file) return false
  try {
    fs.accessSync(file)
    return true
  } catch (e) {
    return false
  }
}

export function open(path: string, startCount: number) {
  for (let i = 0; i < startCount; i++) {
    utools.shellOpenItem(path)
  }
}
