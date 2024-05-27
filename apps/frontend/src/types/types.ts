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
export type ITextFieldKeys = 'name' | 'email' | 'address' | 'phone'

export interface ITextField {
  label: string
  placeholder: string
  key: ITextFieldKeys
  inputType: IInputTypes
}

export type IPaymentType = 'stripe' | 'robokassa'

type TextFieldData = {
  [key in ITextFieldKeys]: string
}

export type IFormData = TextFieldData & {
  type: IPaymentType
}

export interface IExclusiveRate {
  title: string
  benefits: string[]
  footer: {
    description: string
    text: string
  }
}

export type IBlockType = Element | ComponentPublicInstance | null
