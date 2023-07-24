import { UploadUserFile } from "element-plus";

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
  image: IFile;
  created_at: Date;
  updated_at: Date;
}

export enum ListUnitSize {
  cm = "cm",
}

export interface IProjectPressRelease {
  id: number;
  title: string;
  text: string;
  file: IFile;
  created_at: Date;
  updated_at: Date;
}

export interface IProjectCollab {
  id: number;
  collab_with: string;
  title: string;
  description: string;
  video: IFile;
  press_release: IProjectPressRelease[];
  created_at: Date;
  updated_at: Date;
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
  is_active: boolean;
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
  group: string | null;
  collab: IProjectCollab;
  created_at: Date;
  updated_at: Date;
}

export interface IArticle {
  id: number;
  title: string;
  description: string;
  text: string;
  is_hot: boolean;
  image: IFile;
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
  image: IFile;
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
  year: string | number;
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
  url: string | null;
  file: IFile;
}

export interface IVideoCollection {
  id: number;
  title: string;
  video: IFile;
  project?: IProject;
  created_at: Date;
  updated_at: Date;
}

export interface IMediaCV {
  id: number;
  image: IFile;
  created_at: Date;
  updated_at: Date;
}

export interface IMediaExhibition {
  id: number;
  title: string;
  awards: string;
  image: IFile;
  created_at: Date;
  updated_at: Date;
}

export interface IMediaKit {
  id: number;
  pdf: IFile;
  image: IFile;
  created_at: Date;
  updated_at: Date;
}

export interface IMediaPresentation {
  id: number;
  title: string;
  pdf: IFile;
  image: IFile;
  created_at: Date;
  updated_at: Date;
}

export interface IMediaPublication {
  id: number;
  program: string;
  subtitle: string;
  url: string;
  date: Date;
  image: IFile;
  created_at: Date;
  updated_at: Date;
}

export interface IFaq {
  id: number;
  title: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

type Primitive = undefined | null | boolean | string | number | Function;

export interface IGreetingIndex {
  id: number;
  text: string;
  is_active: boolean;
  video: IFile;
  created_at: Date;
  updated_at: Date;
}

type ExcludeAdminApiCreated<T> = Omit<T, "id" | "updated_at" | "created_at">;

export type PartialAdminApiDto<T> = ExcludeAdminApiCreated<{
  [Key in keyof T]: T[Key] extends IFile
    ? UploadUserFile | PartialFileAdminApiDto | null
    : T[Key] extends IFile
    ? UploadUserFile[] | PartialFileAdminApiDto[]
    : T[Key] extends Primitive
    ? T[Key]
    : PartialAdminApiDto<T[Key]>;
}>;
