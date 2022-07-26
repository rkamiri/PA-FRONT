export interface Comment {
  id: number|null;
  content: string;
  commentParentId: number|null;
  userId: number|null;
  code: String|null;
  postId: number;
  creationDate: string|null;
  lastUpdateDate: string|null;
}
