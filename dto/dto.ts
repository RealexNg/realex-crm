interface Meta {
  total_items: number;
  total_pages: number;
  current_page: number;
}
export interface DataResObj<T> {
  status: number;
  message: string;
  time: Date | string;
  data: T;
  meta: Meta;
}
