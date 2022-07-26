export interface Post {
  id: number|undefined|null;
  title: string;
  content: string|null;
  code: string|null;
  creationDate: string|undefined|null;
  lastUpdateDate: string|undefined|null;
  userId: number|undefined|null;
  forumId: number;
  note: number|undefined|null;
}
