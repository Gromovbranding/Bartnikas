export type ITextFieldKeys = 'name' | 'mail' | 'address' | 'phone'

export interface ITextField {
  label: string
  placeholder: string,
  key: ITextFieldKeys
}

export type IFormData = {
  [key in ITextFieldKeys]: string
}

export interface IExclusiveRate {
  title: string
  benefits: string[]
  footer: {
    description: string
    text: string
  }
}
