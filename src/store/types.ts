export interface IPageStore {
  onLoad?: () => any;
  onUnload?: () => any;
}

export interface IListStore {
  next: (page: number, size?: number) => Promise<Array<any>>;
}

export interface IFormStore {
  onFormItemChange: (name: string, value: any) => any;
}
