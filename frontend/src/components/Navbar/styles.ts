import styled from 'styled-components'

type NavButtonProps = {
  $active?: boolean
}

export const Container = styled.header`
  width: 100%;
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  position: sticky;
  top: 0;
  z-index: 100;
`

export const Content = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  min-height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: 0 ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0 ${({ theme }) => theme.spacing.md};
    gap: ${({ theme }) => theme.spacing.sm};
  }
`

export const Brand = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.cta};
  padding: 0;
  flex-shrink: 0;
  transition: color ${({ theme }) => theme.transitions.base};

  &:hover {
    color: ${({ theme }) => theme.colors.ctaHover};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.secondary};
    outline-offset: 4px;
    border-radius: ${({ theme }) => theme.radii.sm};
  }
`

export const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex: 1;
  justify-content: center;
`

export const NavButton = styled.button<NavButtonProps>`
  height: 40px;
  padding: 0 ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radii.full};
  border: 1px solid ${({ $active, theme }) =>
    $active ? theme.colors.cta : theme.colors.border};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.cta : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.surface : theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;
  transition: background ${({ theme }) => theme.transitions.base},
              border-color ${({ theme }) => theme.transitions.base},
              color ${({ theme }) => theme.transitions.base};

  &:hover {
    border-color: ${({ theme }) => theme.colors.cta};
    color: ${({ $active, theme }) =>
      $active ? theme.colors.surface : theme.colors.cta};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.secondary};
    outline-offset: 3px;
  }
`

export const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  flex-shrink: 0;
`

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`

export const UserName = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
`

export const UserRole = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.textMuted};
`

export const LogoutButton = styled.button`
  height: 40px;
  padding: 0 ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.full};
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;
  transition: background ${({ theme }) => theme.transitions.base},
              border-color ${({ theme }) => theme.transitions.base},
              color ${({ theme }) => theme.transitions.base};

  &:hover {
    border-color: ${({ theme }) => theme.colors.error};
    color: ${({ theme }) => theme.colors.errorText};
    background: ${({ theme }) => theme.colors.errorBg};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.secondary};
    outline-offset: 3px;
  }
`
