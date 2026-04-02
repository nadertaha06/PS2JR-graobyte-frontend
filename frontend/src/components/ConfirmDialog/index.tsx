import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Trash2 } from 'lucide-react'
import {
  Overlay,
  DialogBox,
  IconWrapper,
  DialogTitle,
  DialogDescription,
  ItemName,
  Actions,
  CancelButton,
  ConfirmButton
} from './styles'

type ConfirmDialogProps = {
  isOpen: boolean
  title: string
  description: string
  itemName?: string
  confirmLabel?: string
  onConfirm: () => void
  onCancel: () => void
  loading?: boolean
}

export default function ConfirmDialog({
  isOpen,
  title,
  description,
  itemName,
  confirmLabel = 'Excluir',
  onConfirm,
  onCancel,
  loading = false
}: ConfirmDialogProps) {
  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return createPortal(
    <Overlay onClick={onCancel}>
      <DialogBox
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
      >
        <IconWrapper>
          <Trash2 size={24} />
        </IconWrapper>

        <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>

        {itemName && <ItemName>"{itemName}"</ItemName>}

        <Actions>
          <CancelButton type="button" onClick={onCancel} disabled={loading}>
            Cancelar
          </CancelButton>

          <ConfirmButton type="button" onClick={onConfirm} disabled={loading}>
            {loading ? 'Excluindo...' : confirmLabel}
          </ConfirmButton>
        </Actions>
      </DialogBox>
    </Overlay>,
    document.body
  )
}
