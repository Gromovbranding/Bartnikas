export interface IFile {
  id: number;
  name: string;
  url: string;
  custom_name: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface IBlog {
  id: number;
  title: string;
  description: string;
  text: string;
  images: IFile[];
  created_at: Date;
}

export interface IProject {
  id: number;
  title: string;
  description: string;
  images: IFile[];
  created_at: Date;
}

export interface IArticle {
  id: number;
  title: string;
  description: string;
  text: string;
  is_hot: boolean;
  images: IFile[];
  created_at: Date;
}

export interface IContact {
  id: number;
  name: string;
  email: string;
  comment: string;
  created_at: Date;
}

export interface IIndexSlider {
  id: number;
  name: string;
  active: boolean;
  images: IFile[];
  created_at: Date;
}
