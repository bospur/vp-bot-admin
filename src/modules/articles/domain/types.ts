export interface Article {
  id: number;
  title: string;
  content: string;
  slug: string;
}

export interface ArticleFormValues {
  title: string;
  slug: string;
  content: string;
  categoryIds: number[];
}
