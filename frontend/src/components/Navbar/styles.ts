import styled from 'styled-components'

type NavButtonProps = {
  $active?: boolean
}

export const Container = styled.header`
  width: 100%;
  border-bottom: 1px solid rgba(111, 78, 55, 0.12);
  background: #fffaf3;
  position: sticky;
  top: 0;
  z-index: 100;
`

export const Content = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 0 24px;
`

export const Brand = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: #6f4e37;
  padding: 0;
`

export const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  justify-content: center;
`

export const NavButton = styled.button<NavButtonProps>`
  height: 42px;
  padding: 0 18px;
  border-radius: 999px;
  border: 1px solid ${({ $active }) => ($active ? '#6f4e37' : '#d7c3ae')};
  background: ${({ $active }) => ($active ? '#6f4e37' : 'transparent')};
  color: ${({ $active }) => ($active ? '#fffaf3' : '#4a3428')};
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    border-color: #6f4e37;
    color: ${({ $active }) => ($active ? '#fffaf3' : '#6f4e37')};
  }
`

export const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

export const UserName = styled.span`
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  color: #3e2c23;
`

export const UserRole = styled.span`
  font-family: 'DM Sans', sans-serif;
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #8b735c;
`

export const LogoutButton = styled.button`
  height: 42px;
  padding: 0 18px;
  border: none;
  border-radius: 999px;
  background: #c08b5c;
  color: #fffaf3;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background: #a87448;
  }
`