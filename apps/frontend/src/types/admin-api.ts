import type { UploadUserFile } from 'element-plus'

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
  'id' | 'updated_at' | 'created_at' | 'url'
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
  cm = 'cm',
}

export interface IGeneralInfo {
  id: number;
  email_gallery: string;
  email_press: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface IProjectPressReleaseTranslate {
  title: string;
  text: string;
}

export interface IProjectPressRelease {
  id: number;
  translate: TranslateLang<IProjectPressReleaseTranslate>[];
  file: IFile;
  created_at: string;
  updated_at: string;
}

export interface IProjectCollabTranslate {
  collab_with: string;
  title: string;
  description: string;
}

export interface IProjectCollab {
  id: number;
  translate: TranslateLang<IProjectCollabTranslate>[];
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

export interface IProjectTranslate {
  title: string;
  description: string;
}

export interface IProject {
  id: number;
  translate: TranslateLang<IProjectTranslate>[];
  is_show_index_footer_card: boolean;
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
  Gold = 'Gold',
  Silver = 'Silver',
  Bronze = 'Bronze',
  PeopleChoice = "People's choice Awards",
  Honorable = 'Honorable mention',
  Remarkable = 'Remarkable artwork',
  First = '1 place',
  Second = '2 place',
  Third = '3 place',
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

export interface IAwardsTranslate {
  title: string;
  description: string;
}

interface IAboutAdvantage {
  value: string;
  text: string;
}

interface IAboutAchievements {
  text: string;
  // image: IFile
}

interface IAboutRecognitionTickerCity {
  name: string;
  // image: IFile
}

export interface IAboutTranslate {
  title: string;

  subtitle: string;

  advantages: IAboutAdvantage[];

  concept_title: string;

  concept_text: string;

  ticker_title: string;

  ticker_text: string;

  recognition_title: string;

  recognition_text: string;

  recognition_cities: IAboutRecognitionTickerCity[];

  achievements: IAboutAchievements[];
}

export interface IAbout {
  id: number;
  is_active: boolean;
  translate: TranslateLang<IAboutTranslate>[];
  created_at: string;
  updated_at: string;
}

export interface IService {
  title: string;
  text: string;
  btn: { text: string; url: string; };
  // image: IFile;
}

export interface IServicesTranslate {
  title: string;
  services: IService[];
}

export interface IServices {
  id: number;
  is_active: boolean;
  translate: TranslateLang<IServicesTranslate>[];
  created_at: string;
  updated_at: string;
}

interface IPlaceOfPowerExclusiveRate {
  title: string;
  benefits: string;
  footer: {
    description: string;
    text: string;
  }
}

export interface IPlaceOfPowerTranslate {
  title: string;

  subtitle: string;

  quote_text: string;

  quote_author: string;

  transformation_title: string;

  list_title: string;

  list_items: string;

  artefact_title: string;

  artefact_text: string;

  exclusive_title: string;

  exclusive_head_text: string;

  exclusive_subtitle: string;

  exclusive_rates: IPlaceOfPowerExclusiveRate[];

  exclusive_footer_info: string;

  exclusive_footer_btn: string;

  popup_title: string;

  popup_subtitle: string;

  popup_note: string;

  popup_btn: string;

  agreement: string;
}

export interface IPlaceOfPower {
  id: number;
  is_active: boolean;
  translate: TranslateLang<IPlaceOfPowerTranslate>[];
  // transformationSlides: IFile[];
  created_at: string;
  updated_at: string;
}

export interface IPhotoportalTranslate {
  intro_title: string;

  intro_subtitle: string;

  intro_action: string;

  peculiarities_title: string;

  peculiarities_list: string;

  influence_title: string;

  influence_quote_text: string;

  influence_quote_accent_text: string;

  influence_quote_author: string;

  for_what_title: string;

  for_what_list: string;

  popup_title: string;

  popup_subtitle_accent: string;

  popup_subtitle: string;

  popup_btn: string;

  agreement: string;

  special_title: string;

  special_description: string;

  special_footer_text: string;

  special_action: string;
}

export interface IPhotoportal {
  id: number;
  is_active: boolean;
  translate: TranslateLang<IPhotoportalTranslate>[];
  created_at: string;
  updated_at: string;
}

export interface IAwards {
  id: number;
  awards_avatar: IFile;
  translate: TranslateLang<IAwardsTranslate>[];
  degress: IAwardsDegree[];
  created_at: string;
  updated_at: string;
}

export interface ITestimonialTranslate {
  title: string;
  additional_info: string;
}

export interface ITestimonial {
  id: number;
  url: string | null;
  translate: TranslateLang<ITestimonialTranslate>[];
  file: IFile;
}

export interface IVideoCollectionTranslate {
  title: string;
}

export interface IVideoCollection {
  id: number;
  video: IFile;
  translate: TranslateLang<IVideoCollectionTranslate>[];
  group: string;
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

export interface IMediaExhibitionTranslate {
  title: string;
  awards: string;
}

export interface IMediaExhibition {
  id: number;
  translate: TranslateLang<IMediaExhibitionTranslate>[];
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

export interface IMediaPresentationTranslate {
  title: string;
}

export interface IMediaPresentation {
  id: number;
  translate: TranslateLang<IMediaPresentationTranslate>[];
  pdf: IFile;
  image: IFile;
  created_at: string;
  updated_at: string;
}

export interface IMediaPublicationTranslate {
  program: string;
  subtitle: string;
}

export interface IMediaPublication {
  id: number;
  translate: TranslateLang<IMediaPublicationTranslate>[];
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

export interface ITermsStaticTranslate {
  title: string;
  description: string;
}

export interface ITermsStatic {
  id: number;
  translate: TranslateLang<ITermsStaticTranslate>[];
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

export interface IGreetingIndexTranslate {
  text: string;
}

export interface IGreetingIndex {
  id: number;
  is_active: boolean;
  translate: TranslateLang<IGreetingIndexTranslate>[];
  video: IFile;
  poster: IFile;
  created_at: string;
  updated_at: string;
}

export interface IBioTestimonialsTranslate {
  name: string;
  job: string;
  testimonial: string;
}

export interface IBioTestimonials {
  id: number;
  translate: TranslateLang<IBioTestimonialsTranslate>[];
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

export interface IFooterContactTranslate {
  menu_links: { link: string; name: string }[];
  socials: { link: string; icon: string }[];
}

export interface IFooterContact {
  id: number;
  translate: TranslateLang<IFooterContactTranslate>[];
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

type ExcludeAdminApiCreated<T> = Omit<T, 'id' | 'updated_at' | 'created_at'>;

export type PartialAdminApiDto<T> = ExcludeAdminApiCreated<{
  [Key in keyof T]: T[Key] extends TranslateLang<T[Key]>
    ? Omit<T[Key] & { code: string }, 'language'>
    : T[Key] extends IFile
    ? UploadUserFile | PartialFileAdminApiDto | null
    : T[Key] extends IFile
    ? UploadUserFile[] | PartialFileAdminApiDto[]
    : T[Key] extends Primitive
    ? T[Key]
    : PartialAdminApiDto<T[Key]>;
}>;
