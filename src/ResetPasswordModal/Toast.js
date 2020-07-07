import { useToasts } from 'react-toast-notifications'

export const Toast = ( content ) => {
  const { addToast } = useToasts()
  return (
      addToast(content, {
      appearance: 'warning',
      autoDismiss: true,
    })
  )
}