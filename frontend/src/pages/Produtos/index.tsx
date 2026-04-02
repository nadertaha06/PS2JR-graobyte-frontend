import { useEffect, useState } from 'react'
import {
  Plus,
  Pencil,
  Trash2,
  PackageOpen,
  AlertCircle,
  LayoutGrid,
  Coffee,
  GlassWater,
  Cookie,
  Utensils,
  Sandwich
} from 'lucide-react'
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
  ErrorBanner,
  FilterWrapper,
  FilterBar,
  FilterButton,
  FilterCount
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

type CategoriaFiltro = {
  valor: string
  label: string
  icon: React.ReactNode
}

const CATEGORIAS: CategoriaFiltro[] = [
  { valor: 'todos',         label: 'Todos',          icon: <LayoutGrid size={15} /> },
  { valor: 'bebida_quente', label: 'Bebida quente',  icon: <Coffee      size={15} /> },
  { valor: 'bebida_gelada', label: 'Bebida gelada',  icon: <GlassWater  size={15} /> },
  { valor: 'doce',          label: 'Doce',           icon: <Cookie      size={15} /> },
  { valor: 'salgado',       label: 'Salgado',        icon: <Utensils    size={15} /> },
  { valor: 'sanduiche',     label: 'Sanduíche',      icon: <Sandwich    size={15} /> },
]

export default function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [produtoEmEdicao, setProdutoEmEdicao] = useState<Produto | null>(null)
  const [produtoParaDeletar, setProdutoParaDeletar] = useState<Produto | null>(null)
  const [deletando, setDeletando] = useState(false)
  const [toast, setToast] = useState<ToastState>(null)
  const [categoriaFiltro, setCategoriaFiltro] = useState('todos')

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

  /* Filtragem client-side — sem novas chamadas de API */
  const produtosFiltrados =
    categoriaFiltro === 'todos'
      ? produtos
      : produtos.filter((p) => p.categoria === categoriaFiltro)

  /* Exibe apenas categorias que têm ao menos um produto */
  const categoriasDisponiveis = CATEGORIAS.filter(
    (cat) =>
      cat.valor === 'todos' ||
      produtos.some((p) => p.categoria === cat.valor)
  )

  function contarPorCategoria(valor: string) {
    if (valor === 'todos') return produtos.length
    return produtos.filter((p) => p.categoria === valor).length
  }

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

        {/* Filtros — aparecem só quando há produtos carregados */}
        {!loading && !erro && produtos.length > 0 && (
          <FilterWrapper>
            <FilterBar>
              {categoriasDisponiveis.map((cat) => (
                <FilterButton
                  key={cat.valor}
                  type="button"
                  $active={categoriaFiltro === cat.valor}
                  onClick={() => setCategoriaFiltro(cat.valor)}
                >
                  {cat.icon}
                  {cat.label}
                  <FilterCount $active={categoriaFiltro === cat.valor}>
                    {contarPorCategoria(cat.valor)}
                  </FilterCount>
                </FilterButton>
              ))}
            </FilterBar>
          </FilterWrapper>
        )}

        {/* Skeleton de carregamento */}
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

        {/* Estado vazio — cardápio sem produtos */}
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

        {/* Estado vazio — filtro sem resultados */}
        {!loading && !erro && produtos.length > 0 && produtosFiltrados.length === 0 && (
          <EmptyState>
            <EmptyStateIcon>
              <PackageOpen size={32} />
            </EmptyStateIcon>
            <EmptyStateTitle>Nenhum produto nesta categoria</EmptyStateTitle>
            <EmptyStateText>
              Não há produtos cadastrados em{' '}
              <strong>
                {CATEGORIAS.find((c) => c.valor === categoriaFiltro)?.label}
              </strong>
              . Adicione um novo produto ou escolha outra categoria.
            </EmptyStateText>
            <EmptyStateCTA type="button" onClick={() => setCategoriaFiltro('todos')}>
              <LayoutGrid size={18} />
              Ver todos os produtos
            </EmptyStateCTA>
          </EmptyState>
        )}

        {/* Grid de produtos */}
        {!loading && !erro && produtosFiltrados.length > 0 && (
          <Grid>
            {produtosFiltrados.map((produto) => (
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

      {loading && erro && <Message>{erro}</Message>}
    </Container>
  )
}
