export interface Folder {
    children: Array<Folder | File>;
    name: string;
    type: 'FOLDER';
}

export interface File {
    mime: string;
    name: string;
    type: 'FILE';
}
