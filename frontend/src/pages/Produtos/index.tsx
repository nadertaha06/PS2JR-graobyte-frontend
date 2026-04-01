import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import ProductForm from '../../components/ProductForm'
import { listarProdutos, removerProduto } from '../../services/produtosService'
import {
  Container,
  Content,
  Header,
  HeaderTop,
  Title,
  Subtitle,
  NewProductButton,
  Grid,
  Card,
  CardCategory,
  CardTitle,
  CardDescription,
  CardFooter,
  Price,
  Status,
  CardActions,
  EditButton,
  DeleteButton,
  Message
} from './styles'

type Produto = {
  _id: string
  nome: string
  descricao?: string
  preco: number
  categoria: string
  disponivel?: boolean
}

export default function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [produtoEmEdicao, setProdutoEmEdicao] = useState<Produto | null>(null)

  async function fetchProdutos() {
    try {
      setLoading(true)
      setErro('')
      const data = await listarProdutos()
      setProdutos(data)
    } catch {
      setErro('Erro ao carregar produtos.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProdutos()
  }, [])

  function formatarCategoria(categoria: string) {
    return categoria
      .replace(/_/g, ' ')
      .replace(/^./, (letra) => letra.toUpperCase())
  }

  function handleOpenCreate() {
    setProdutoEmEdicao(null)
    setIsFormOpen(true)
  }

  function handleOpenEdit(produto: Produto) {
    setProdutoEmEdicao(produto)
    setIsFormOpen(true)
  }

  function handleCloseForm() {
    setIsFormOpen(false)
    setProdutoEmEdicao(null)
  }

async function handleDelete(produto: Produto) {
  const confirmed = window.confirm(
    `Tem certeza que deseja excluir o produto "${produto.nome}"?`
  )

  if (!confirmed) {
    return
  }

  try {
    setErro('')
    await removerProduto(produto._id)
    await fetchProdutos()
  } catch {
    setErro('Erro ao excluir produto.')
  }
}

  return (
    <Container>
      <Navbar />

      <Content>
        <Header>
          <HeaderTop>
            <div>
              <Title>Produtos</Title>
              <Subtitle>Gerencie os itens do cardápio da cafeteria</Subtitle>
            </div>

            <NewProductButton type="button" onClick={handleOpenCreate}>
              Novo produto
            </NewProductButton>
          </HeaderTop>
        </Header>

        {loading && <Message>Carregando produtos...</Message>}

        {!loading && erro && <Message>{erro}</Message>}

        {!loading && !erro && produtos.length === 0 && (
          <Message>Nenhum produto encontrado.</Message>
        )}

        {!loading && !erro && produtos.length > 0 && (
          <Grid>
            {produtos.map((produto) => (
              <Card key={produto._id}>
                <CardCategory>{formatarCategoria(produto.categoria)}</CardCategory>

                <CardTitle>{produto.nome}</CardTitle>

                <CardDescription>
                  {produto.descricao || 'Sem descrição cadastrada.'}
                </CardDescription>

                <CardFooter>
                  <Price>R$ {produto.preco.toFixed(2)}</Price>

                  <Status $active={produto.disponivel !== false}>
                    {produto.disponivel !== false ? 'Disponível' : 'Indisponível'}
                  </Status>
                </CardFooter>

                <CardActions>
                  <EditButton type="button" onClick={() => handleOpenEdit(produto)}>
                    Editar
                  </EditButton>

                  <DeleteButton type="button" onClick={() => handleDelete(produto)}>
                    Excluir
                  </DeleteButton>
                </CardActions>
              </Card>
            ))}
          </Grid>
        )}

        {isFormOpen && (
          <ProductForm
            onClose={handleCloseForm}
            onSuccess={fetchProdutos}
            initialData={produtoEmEdicao}
          />
        )}
      </Content>
    </Container>
  )
}