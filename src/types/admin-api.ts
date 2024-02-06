import type { UploadUserFile } from "element-plus";

export interface ILanguage {
  id: number;
  name: string;
  code: string;
  created_at: string;
  updated_at: string;
}

export type TranslateLang<T> = T & { language: ILanguage };

export interface IFile {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export type PartialFileAdminApiDto = Omit<
  IFile,
  "id" | "updated_at" | "created_at" | "url"
>;

export interface IBlogTranslate {
  title: string;
  description: string;
  text: string;
}

export interface IBlog {
  id: number;
  translate: TranslateLang<IBlogTranslate>[];
  image: IFile;
  created_at: string;
  updated_at: string;
}

export enum ListUnitSize {
  cm = "cm",
}

export interface IGeneralInfo {
  id: number;
  email_gallery: string;
  email_press: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface IProjectPressRelease {
  id: number;
  title: string;
  text: string;
  file: IFile;
  created_at: string;
  updated_at: string;
}

export interface IProjectCollab {
  id: number;
  collab_with: string;
  title: string;
  description: string;
  video: IFile;
  press_release: IProjectPressRelease[];
  created_at: string;
  updated_at: string;
}

export interface IProjectImageSizes {
  id: number;
  width: number;
  height: number;
  quantity: number;
  unit: ListUnitSize;
  created_at: string;
  updated_at: string;
}

export interface IProjectImageDetail {
  id: number;
  price: number;
  sizes: IProjectImageSizes[];
  is_active: boolean;
  is_show_poster: boolean;
  image: IFile;
  image_name: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface IProject {
  id: number;
  title: string;
  is_show_index_footer_card: boolean;
  description: string;
  details: IProjectImageDetail[];
  group: string | null;
  collab: IProjectCollab;
  created_at: string;
  updated_at: string;
}

export interface IArticleTranslate {
  title: string;
  description: string;
  text: string;
}

export interface IArticle {
  id: number;
  translate: TranslateLang<IArticleTranslate>[];
  is_hot: boolean;
  image: IFile;
  created_at: string;
  updated_at: string;
}

export interface IContact {
  id: number;
  name: string;
  email: string;
  comment: string;
  created_at: string;
  updated_at: string;
}

export interface IIndexSlider {
  id: number;
  name: string;
  active: boolean;
  image: IFile;
  created_at: string;
  updated_at: string;
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
  created_at: string;
  updated_at: string;
}

export interface IAwardsDegree {
  id: number;
  year: string | number;
  groups: IAwardsDegreeGroup[];
  created_at: string;
  updated_at: string;
}

export interface IAwards {
  id: number;
  awards_avatar: IFile;
  title: string;
  description: string;
  degress: IAwardsDegree[];
  created_at: string;
  updated_at: string;
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
  created_at: string;
  updated_at: string;
}

export interface IMediaCV {
  id: number;
  image: IFile;
  pdf: IFile;
  created_at: string;
  updated_at: string;
}

export interface IMediaExhibition {
  id: number;
  title: string;
  awards: string;
  image: IFile;
  created_at: string;
  updated_at: string;
}

export interface IMediaKit {
  id: number;
  pdf: IFile;
  image: IFile;
  created_at: string;
  updated_at: string;
}

export interface IMediaPresentation {
  id: number;
  title: string;
  pdf: IFile;
  image: IFile;
  created_at: string;
  updated_at: string;
}

export interface IMediaPublication {
  id: number;
  program: string;
  subtitle: string;
  url: string;
  date: Date;
  image: IFile;
  created_at: string;
  updated_at: string;
}

export interface IFaqTranslate {
  title: string;
  description: string;
}

export interface IFaq {
  id: number;
  translate: TranslateLang<IFaqTranslate>[];
  created_at: string;
  updated_at: string;
}

export interface ITermsStatic {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface IBioTranslate {
  description: string;
  sub_description: string;
}

export interface IBio {
  id: number;
  is_active: boolean;
  translate: TranslateLang<IBioTranslate>[];
  awatar: IFile;
  created_at: string;
  updated_at: string;
}

export interface IGreetingIndex {
  id: number;
  text: string;
  is_active: boolean;
  video: IFile;
  poster: IFile;
  created_at: string;
  updated_at: string;
}

export interface IBioTestimonials {
  id: number;
  name: string;
  job: string;
  testimonial: string;
  photo: IFile;
  created_at: string;
  updated_at: string;
}

export interface IProjectOrderByEmail {
  id: number;
  name: string;
  email: string;
  image_name: string;
  size: IProjectImageSizes;
  url: string;
  price: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface IFooterContact {
  id: number;
  socials: { link: string; icon: string }[];
  menu_links: { link: string; name: string }[];
  active: boolean;
  logo: IFile;
  created_at: string;
  updated_at: string;
}

export interface IndexCardFooter {
  id: number;
  active: boolean;
  title: string;
  text: string;
  button: { text: string; url: string };
  created_at: string;
  updated_at: string;
}

type Primitive = undefined | null | boolean | string | number | Function;

type ExcludeAdminApiCreated<T> = Omit<T, "id" | "updated_at" | "created_at">;

export type PartialAdminApiDto<T> = ExcludeAdminApiCreated<{
  [Key in keyof T]: T[Key] extends TranslateLang<T[Key]>
    ? Omit<T[Key] & { code: string }, "language">
    : T[Key] extends IFile
    ? UploadUserFile | PartialFileAdminApiDto | null
    : T[Key] extends IFile
    ? UploadUserFile[] | PartialFileAdminApiDto[]
    : T[Key] extends Primitive
    ? T[Key]
    : PartialAdminApiDto<T[Key]>;
}>;
