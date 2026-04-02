import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import ConfirmDialog from '../../components/ConfirmDialog'
import Toast from '../../components/Toast'
import {
  listarFuncionarios,
  cadastrarFuncionario,
  removerFuncionario
} from '../../services/authService'
import {
  Container,
  Content,
  Header,
  Title,
  Subtitle,
  Layout,
  FormCard,
  ListCard,
  Form,
  FormGroup,
  Label,
  Input,
  PrimaryButton,
  ErrorMessage,
  List,
  ListItem,
  EmployeeInfo,
  EmployeeName,
  EmployeeEmail,
  EmployeeRole,
  RemoveButton,
  Message,
  SkeletonItem,
  SkeletonLine,
  SkeletonInfo
} from './styles'

type Funcionario = {
  _id: string
  nome: string
  email: string
  role: string
}

type ToastState = {
  message: string
  type: 'success' | 'error'
} | null

export default function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([])
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [funcionarioParaRemover, setFuncionarioParaRemover] = useState<Funcionario | null>(null)
  const [removendo, setRemovendo] = useState(false)
  const [toast, setToast] = useState<ToastState>(null)

  async function fetchFuncionarios() {
    try {
      setLoading(true)
      setErro('')
      const data = await listarFuncionarios()
      setFuncionarios(data)
    } catch {
      setErro('Erro ao carregar funcionários.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFuncionarios()
  }, [])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErro('')

    if (!nome.trim() || !email.trim() || !senha.trim()) {
      setErro('Preencha nome, email e senha.')
      return
    }

    setSubmitting(true)

    try {
      await cadastrarFuncionario({
        nome: nome.trim(),
        email: email.trim(),
        senha: senha.trim()
      })

      setNome('')
      setEmail('')
      setSenha('')
      setToast({ message: 'Funcionário cadastrado com sucesso!', type: 'success' })
      await fetchFuncionarios()
    } catch {
      setErro('Erro ao cadastrar funcionário.')
    } finally {
      setSubmitting(false)
    }
  }

  function handleRemove(funcionario: Funcionario) {
    setFuncionarioParaRemover(funcionario)
  }

  async function handleConfirmRemove() {
    if (!funcionarioParaRemover) return

    try {
      setRemovendo(true)
      setErro('')
      await removerFuncionario(funcionarioParaRemover._id)
      setFuncionarioParaRemover(null)
      setToast({ message: 'Funcionário removido com sucesso!', type: 'success' })
      await fetchFuncionarios()
    } catch {
      setFuncionarioParaRemover(null)
      setErro('Erro ao remover funcionário.')
    } finally {
      setRemovendo(false)
    }
  }

  function handleCancelRemove() {
    setFuncionarioParaRemover(null)
  }

  return (
    <Container>
      <Navbar />

      <Content>
        <Header>
          <Title>Funcionários</Title>
          <Subtitle>Gerencie os usuários internos da cafeteria</Subtitle>
        </Header>

        {erro && <ErrorMessage>{erro}</ErrorMessage>}

        <Layout>
          <FormCard>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  value={nome}
                  onChange={(event) => setNome(event.target.value)}
                  placeholder="Nome do funcionário"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Email do funcionário"
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
                  placeholder="Senha temporária"
                  required
                />
              </FormGroup>

              <PrimaryButton type="submit" disabled={submitting}>
                {submitting ? 'Cadastrando...' : 'Cadastrar funcionário'}
              </PrimaryButton>
            </Form>
          </FormCard>

          <ListCard>
            {loading && (
              <List>
                {Array.from({ length: 3 }).map((_, i) => (
                  <SkeletonItem key={i}>
                    <SkeletonInfo>
                      <SkeletonLine $width="55%" $height="16px" />
                      <SkeletonLine $width="75%" $height="13px" />
                    </SkeletonInfo>
                    <SkeletonLine $width="72px" $height="32px" />
                  </SkeletonItem>
                ))}
              </List>
            )}

            {!loading && funcionarios.length === 0 && (
              <Message>Nenhum funcionário encontrado.</Message>
            )}

            {!loading && funcionarios.length > 0 && (
              <List>
                {funcionarios.map((funcionario) => (
                  <ListItem key={funcionario._id}>
                    <EmployeeInfo>
                      <EmployeeName>{funcionario.nome}</EmployeeName>
                      <EmployeeEmail>{funcionario.email}</EmployeeEmail>
                      <EmployeeRole $admin={funcionario.role === 'admin'}>
                        {funcionario.role === 'admin' ? 'Admin' : 'Funcionário'}
                      </EmployeeRole>
                    </EmployeeInfo>

                    <RemoveButton
                      type="button"
                      onClick={() => handleRemove(funcionario)}
                    >
                      Remover
                    </RemoveButton>
                  </ListItem>
                ))}
              </List>
            )}
          </ListCard>
        </Layout>
      </Content>

      <ConfirmDialog
        isOpen={funcionarioParaRemover !== null}
        title="Remover funcionário"
        description="Esta ação não pode ser desfeita. Tem certeza que deseja remover o funcionário:"
        itemName={funcionarioParaRemover?.nome}
        confirmLabel="Remover"
        onConfirm={handleConfirmRemove}
        onCancel={handleCancelRemove}
        loading={removendo}
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </Container>
  )
}
