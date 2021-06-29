// Delete
export interface ICustomerInfo {
  id: string
  image: string
  firstName: string
  lastName: string
  email: string
  type: string
  pending: boolean
}
export interface ItempCardInfo {
  id: string
  number: string
  type: string
}
// Delete


export interface IModal {
  show: boolean
  handleClose: React.Dispatch<React.SetStateAction<boolean>>
}
export interface IDetailModal extends IModal {
  data?: ICustomerInfo
}

export interface IinvitationModal extends IModal {
  email: string
}

export interface ICardModal extends IModal {
  data?: ItempCardInfo
}
