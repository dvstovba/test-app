import {Folder} from "../models/models";

export const getData = (): Promise<Folder[]> => {
  return fetch('./data.json').then(res => res.json())
}
