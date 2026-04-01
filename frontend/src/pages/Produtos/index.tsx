import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { listarProdutos } from '../../services/produtosService'
import {
  Container,
  Content,
  Title,
  Grid,
  Card,
  CardTitle,
  CardDescription,
  CardFooter,
  Price,
  Status,
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

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const data = await listarProdutos()
        setProdutos(data)
      } catch {
        setErro('Erro ao carregar produtos.')
      } finally {
        setLoading(false)
      }
    }

    fetchProdutos()
  }, [])

  return (
    <Container>
      <Navbar />

      <Content>
        <Title>Produtos</Title>

        {loading && <Message>Carregando produtos...</Message>}

        {erro && <Message>{erro}</Message>}

        {!loading && !erro && produtos.length === 0 && (
          <Message>Nenhum produto encontrado.</Message>
        )}

        <Grid>
          {produtos.map((produto) => (
            <Card key={produto._id}>
              <CardTitle>{produto.nome}</CardTitle>

              {produto.descricao && (
                <CardDescription>{produto.descricao}</CardDescription>
              )}

              <CardFooter>
                <Price>
                  R$ {produto.preco.toFixed(2)}
                </Price>

                <Status $active={produto.disponivel !== false}>
                  {produto.disponivel !== false ? 'Disponível' : 'Indisponível'}
                </Status>
              </CardFooter>
            </Card>
          ))}
        </Grid>
      </Content>
    </Container>
  )
}