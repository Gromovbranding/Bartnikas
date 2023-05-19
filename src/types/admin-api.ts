export interface IFile {
  id: number;
  name: string;
  url: string;
  created_at: Date;
  updated_at: Date;
}

export type PartialFileAdminApiDto = Omit<
  IFile,
  "id" | "updated_at" | "created_at" | "url"
>;

export interface IBlog {
  id: number;
  title: string;
  description: string;
  text: string;
  images: IFile[];
  created_at: Date;
  updated_at: Date;
}

export enum ListUnitSize {
  cm = "cm",
}

export interface IProjectImageSizes {
  id: number;
  width: number;
  height: number;
  unit: ListUnitSize;
  created_at: Date;
  updated_at: Date;
}

export interface IProjectImageDetail {
  id: number;
  price: number;
  sizes: IProjectImageSizes[];
  image: IFile;
  image_name: string;
  created_at: Date;
  updated_at: Date;
}

export interface IProject {
  id: number;
  title: string;
  description: string;
  details: IProjectImageDetail[];
  created_at: Date;
  updated_at: Date;
}

export interface IArticle {
  id: number;
  title: string;
  description: string;
  text: string;
  is_hot: boolean;
  images: IFile[];
  created_at: Date;
  updated_at: Date;
}

export interface IContact {
  id: number;
  name: string;
  email: string;
  comment: string;
  created_at: Date;
  updated_at: Date;
}

export interface IIndexSlider {
  id: number;
  name: string;
  active: boolean;
  images: IFile[];
  created_at: Date;
  updated_at: Date;
}

export enum ListDegree {
  Gold = "Gold",
  Silver = "Silver",
  Bronze = "Bronze",
}

export interface IAwardsDegreeGroup {
  id: number;
  type: ListDegree;
  images: IFile[];
  created_at: Date;
  updated_at: Date;
}

export interface IAwardsDegree {
  id: number;
  year: string;
  groups: IAwardsDegreeGroup[];
  created_at: Date;
  updated_at: Date;
}

export interface IAwards {
  id: number;
  awards_avatar: IFile;
  title: string;
  description: string;
  degress: IAwardsDegree[];
  created_at: Date;
  updated_at: Date;
}

export interface ITestimonial {
  id: number;
  title: string;
  additional_info: string;
  file: IFile;
}

export interface IVideoCollectionGroup {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface IVideoCollection {
  id: number;
  title: string;
  video: IFile;
  group: IVideoCollectionGroup | null;
  created_at: Date;
  updated_at: Date;
}

export type PartialAdminApiDto<T> = Omit<T, "id" | "updated_at" | "created_at">;
