export interface CardType {
  id: string;
  start: number;
  count: number;
  sort: string;
  reverse: boolean;
}

export interface CatalogStateType {
  obj: CategoriesType[];
}

export interface CategoriesType {
  id: string;
  name: string;
  subCategories: SubCategoryType[];
}

export interface SubCategoryType {
  id: string;
  name: string;
}

export interface SetSortPriceType {
  payload: {
    start: string;
    end: string;
  };
  type: string;
}
