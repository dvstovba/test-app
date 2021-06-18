export const getExtendedListForCurrentFolder = (name, list) => {
  if (!name || !list) return null;
  const res = list.reduce((accum, current) => {
    const folderNames = current.split('/');
    if (folderNames[0] === name) {
      folderNames.shift();
      return [...accum, folderNames.join('/')]
    }
    return accum
  }, []);
  if (res.length) return res
  return null;
}

export const searchFile = (what, where) => {
  return where.reduce((accum, current) => {
    if (current.type === 'FILE' && current.name.includes(what)) {
      return [...accum, current]
    }
    if (current.type === 'FOLDER' && current.children) {
      const result = searchFile(what, current.children)
      if (result.length) {
        return [...accum, {
          ...current,
          children: result
        }]
      }
    }
    return [...accum]
  }, [])
}
