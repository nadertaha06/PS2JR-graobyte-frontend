import styled, { keyframes, css } from 'styled-components'

type ToastTypeProps = {
  $type: 'success' | 'error'
}

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(calc(100% + 24px));
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

export const ToastWrapper = styled.div<ToastTypeProps>`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 500;
  min-width: 280px;
  max-width: 380px;
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  border-left: 4px solid;

  ${({ $type, theme }) =>
    $type === 'success'
      ? css`
          background: ${theme.colors.successBg};
          border-color: ${theme.colors.success};
          color: ${theme.colors.successText};
        `
      : css`
          background: ${theme.colors.errorBg};
          border-color: ${theme.colors.error};
          color: ${theme.colors.errorText};
        `}

  @media (prefers-reduced-motion: no-preference) {
    animation: ${slideInRight} ${({ theme }) => theme.transitions.base} both;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    bottom: 16px;
    right: 16px;
    left: 16px;
    max-width: none;
    min-width: unset;
  }
`

export const ToastContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
`

export const ToastIcon = styled.span`
  flex-shrink: 0;
  display: flex;
  align-items: center;
`

export const ToastMessage = styled.p`
  flex: 1;
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: 1.4;
`

export const ToastCloseButton = styled.button`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.radii.sm};
  color: inherit;
  opacity: 0.7;
  transition: opacity ${({ theme }) => theme.transitions.fast},
              background ${({ theme }) => theme.transitions.fast};

  &:hover {
    opacity: 1;
    background: rgba(0, 0, 0, 0.08);
  }

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
`
