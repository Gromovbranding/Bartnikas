type IInputTypes =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week'
export type ITextFieldKeys = 'name' | 'mail' | 'address' | 'phone'

export interface ITextField {
  label: string
  placeholder: string
  key: ITextFieldKeys
  inputType: IInputTypes
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
