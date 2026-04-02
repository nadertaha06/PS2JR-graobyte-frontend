import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, PackageOpen, AlertCircle } from 'lucide-react'
import Navbar from '../../components/Navbar'
import ProductForm from '../../components/ProductForm'
import ConfirmDialog from '../../components/ConfirmDialog'
import Toast from '../../components/Toast'
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
  Message,
  SkeletonGrid,
  SkeletonCard,
  SkeletonLine,
  EmptyState,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateText,
  EmptyStateCTA,
  ErrorBanner
} from './styles'

type Produto = {
  _id: string
  nome: string
  descricao?: string
  preco: number
  categoria: string
  disponivel?: boolean
}

type ToastState = {
  message: string
  type: 'success' | 'error'
} | null

export default function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [produtoEmEdicao, setProdutoEmEdicao] = useState<Produto | null>(null)
  const [produtoParaDeletar, setProdutoParaDeletar] = useState<Produto | null>(null)
  const [deletando, setDeletando] = useState(false)
  const [toast, setToast] = useState<ToastState>(null)

  async function fetchProdutos() {
    try {
      setLoading(true)
      setErro('')
      const data = await listarProdutos()
      setProdutos(data)
    } catch {
      setErro('Não foi possível carregar os produtos. Tente novamente.')
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

  function handleFormSuccess() {
    const message = produtoEmEdicao
      ? 'Produto atualizado com sucesso!'
      : 'Produto adicionado com sucesso!'
    setToast({ message, type: 'success' })
    fetchProdutos()
  }

  function handleDelete(produto: Produto) {
    setProdutoParaDeletar(produto)
  }

  async function handleConfirmDelete() {
    if (!produtoParaDeletar) return

    try {
      setDeletando(true)
      setErro('')
      await removerProduto(produtoParaDeletar._id)
      setProdutoParaDeletar(null)
      setToast({ message: 'Produto excluído com sucesso!', type: 'success' })
      await fetchProdutos()
    } catch {
      setProdutoParaDeletar(null)
      setErro('Não foi possível excluir o produto. Tente novamente.')
    } finally {
      setDeletando(false)
    }
  }

  function handleCancelDelete() {
    setProdutoParaDeletar(null)
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
              <Plus size={18} />
              Novo produto
            </NewProductButton>
          </HeaderTop>
        </Header>

        {!loading && erro && (
          <ErrorBanner>
            <AlertCircle size={18} />
            {erro}
          </ErrorBanner>
        )}

        {loading && (
          <SkeletonGrid>
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i}>
                <SkeletonLine $width="60%" $height="20px" />
                <SkeletonLine $width="80%" $height="22px" />
                <SkeletonLine $width="100%" />
                <SkeletonLine $width="90%" />
                <SkeletonLine $width="70%" />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                  <SkeletonLine $width="30%" $height="20px" />
                  <SkeletonLine $width="25%" $height="20px" />
                </div>
              </SkeletonCard>
            ))}
          </SkeletonGrid>
        )}

        {!loading && !erro && produtos.length === 0 && (
          <EmptyState>
            <EmptyStateIcon>
              <PackageOpen size={32} />
            </EmptyStateIcon>
            <EmptyStateTitle>Nenhum produto cadastrado</EmptyStateTitle>
            <EmptyStateText>
              O cardápio está vazio. Adicione o primeiro produto para começar a
              gerenciar o menu da cafeteria.
            </EmptyStateText>
            <EmptyStateCTA type="button" onClick={handleOpenCreate}>
              <Plus size={18} />
              Adicionar primeiro produto
            </EmptyStateCTA>
          </EmptyState>
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
                    <Pencil size={14} />
                    Editar
                  </EditButton>

                  <DeleteButton type="button" onClick={() => handleDelete(produto)}>
                    <Trash2 size={14} />
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
            onSuccess={handleFormSuccess}
            initialData={produtoEmEdicao}
          />
        )}

        <ConfirmDialog
          isOpen={produtoParaDeletar !== null}
          title="Excluir produto"
          description="Esta ação não pode ser desfeita. Tem certeza que deseja excluir o produto:"
          itemName={produtoParaDeletar?.nome}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          loading={deletando}
        />

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </Content>

      {/* Error state displayed separately from content when not loading */}
      {loading && erro && <Message>{erro}</Message>}
    </Container>
  )
}
