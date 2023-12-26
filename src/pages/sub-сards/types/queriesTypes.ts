export interface SetSubCategoryType {
  categoryId?: string;
  subCategoryId?: string;
  start: number;
  count: number;
  sort: string;
  reverse: boolean;
}

export interface SubCategoryErrorType {
  message: string;
}
