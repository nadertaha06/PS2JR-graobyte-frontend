import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { CheckCircle, AlertCircle, X } from 'lucide-react'
import {
  ToastWrapper,
  ToastContent,
  ToastIcon,
  ToastMessage,
  ToastCloseButton
} from './styles'

type ToastProps = {
  message: string
  type: 'success' | 'error'
  onClose: () => void
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500)
    return () => clearTimeout(timer)
  }, [onClose])

  return createPortal(
    <ToastWrapper $type={type} role="alert" aria-live="polite">
      <ToastContent>
        <ToastIcon>
          {type === 'success' ? (
            <CheckCircle size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
        </ToastIcon>

        <ToastMessage>{message}</ToastMessage>

        <ToastCloseButton
          type="button"
          onClick={onClose}
          aria-label="Fechar notificação"
        >
          <X size={16} />
        </ToastCloseButton>
      </ToastContent>
    </ToastWrapper>,
    document.body
  )
}
