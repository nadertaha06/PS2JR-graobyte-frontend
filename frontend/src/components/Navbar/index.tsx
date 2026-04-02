import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Container,
  Content,
  Brand,
  NavLinks,
  NavButton,
  UserSection,
  UserInfo,
  UserName,
  UserRole,
  LogoutButton
} from './styles'

type User = {
  nome: string
  role: string
}

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const [user] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user')

    if (!storedUser) {
      return null
    }

    try {
      return JSON.parse(storedUser) as User
    } catch {
      return null
    }
  })

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <Container>
      <Content>
        <Brand onClick={() => navigate('/produtos')}>Grão & Byte</Brand>

        <NavLinks>
          <NavButton
            type="button"
            $active={location.pathname === '/produtos'}
            onClick={() => navigate('/produtos')}
          >
            Produtos
          </NavButton>

          {user?.role === 'admin' && (
            <NavButton
              type="button"
              $active={location.pathname === '/funcionarios'}
              onClick={() => navigate('/funcionarios')}
            >
              Funcionários
            </NavButton>
          )}
        </NavLinks>

        <UserSection>
          <UserInfo>
            <UserName>{user?.nome || 'Usuário'}</UserName>
            <UserRole>{user?.role || 'sem perfil'}</UserRole>
          </UserInfo>

          <LogoutButton type="button" onClick={handleLogout}>
            Sair
          </LogoutButton>
        </UserSection>
      </Content>
    </Container>
  )
}