import Swal from 'sweetalert2'

const colors: { [x: string]: string } = {
  confirmButtonColor: '#212754',
  blackButton: '#333333',
}

interface SweetAlertProps {
  title?: string
  html?: string
  icon?: 'success' | 'error' | 'warning' | 'info' | 'question' | undefined
}

export const confirmAlert = ({
  title = '',
  html = '',
  icon = 'question',
}: SweetAlertProps) => {
  return Swal.fire({
    title,
    html,
    icon,
    showCancelButton: true,
    confirmButtonColor: colors.confirmButtonColor,
    cancelButtonColor: colors.blackButton,
    confirmButtonText: 'Yes',
  })
}

export const simpleAlert = ({
  title = '',
  html = '',
  icon = 'info',
}: SweetAlertProps) => {
  return Swal.fire({
    title,
    html,
    icon,
    confirmButtonColor: colors.blackButton,
    confirmButtonText: 'Close',
  })
}

export const loaderAlert = ({
  title = '',
  html = '',
}: SweetAlertProps): void => {
  Swal.fire({
    title,
    html,
    onBeforeOpen: () => {
      Swal.showLoading()
    },
  })
}
