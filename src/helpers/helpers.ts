import {File, Folder} from "../models/models";

export const searchFile = (what: string, where: Array<Folder | File>): Array<Folder | File> => {
  console.log(what)
  return where.reduce((accum: Array<Folder | File>, current: Folder | File): Array<Folder | File> => {
    if (current.type === 'FILE' && current.name.includes(what)) {
      return [...accum, current]
    }
    if (current.type === 'FOLDER' && current.children) {
      const result = searchFile(what, current.children)
      if (result.length) {
        return [
          ...accum, {
            ...current,
            children: result,
          }]
      }
    }
    return [...accum]
  }, [])
}
