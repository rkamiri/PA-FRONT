
export interface IContent {
  id: number|undefined|null;
  content: string;
  postId: number|null;
  type: number;
  position: number;
  language: string | null;
}

export class Content implements IContent {
  id: number|undefined|null;
  content: string;
  postId: number|null;
  type: number;
  position: number;
  language: string | null;

  constructor(id: number|undefined|null, content: string, postId: number|null, type: number, position: number, language: string | null) {
    this.id = id;
    this.content = content;
    this.postId = postId;
    this.type = type;
    this.position = position;
    this.language = language;
  }
}

