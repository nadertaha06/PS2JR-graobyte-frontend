import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../services/authService'
import {
  Container,
  Card,
  Header,
  Logo,
  Title,
  Subtitle,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  ErrorMessage
} from './styles'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErro('')
    setLoading(true)

    try {
      const data = await login(email, senha)

      localStorage.setItem('token', data.token)
      localStorage.setItem(
        'user',
        JSON.stringify({
          nome: data.nome,
          role: data.role
        })
      )

      navigate('/produtos')
    } catch (error) {

      setErro('Email ou senha inválidos.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <Card>
        <Header>
          <Logo>Grão & Byte</Logo>
          <Title>Entrar</Title>
          <Subtitle>Acesse a gestão interna da cafeteria</Subtitle>
        </Header>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Digite seu email"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="senha">Senha</Label>
            <Input
              id="senha"
              type="password"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              placeholder="Digite sua senha"
              required
            />
          </FormGroup>

          {erro && <ErrorMessage>{erro}</ErrorMessage>}

          <Button type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </Form>
      </Card>
    </Container>
  )
}