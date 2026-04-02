import { useEffect, useState, type ComponentType } from 'react'
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
  Sandwich,
  CheckCircle,
  XCircle,
  X,
  CircleDashed
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
  SkeletonGrid,
  SkeletonCard,
  SkeletonLine,
  SkeletonCardFooter,
  EmptyState,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateText,
  EmptyStateCTA,
  ErrorBanner,
  FilterSection,
  FilterRow,
  FilterRowLabel,
  FilterWrapper,
  FilterBar,
  FilterButton,
  FilterCount,
  ResultsBar,
  ResultsText,
  ClearFiltersButton
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

/** Tipo unificado para qualquer opção de filtro */
type FiltroOpcao = {
  valor: string
  label: string
  Icon: ComponentType<{ size?: number }>
}

const CATEGORIAS: FiltroOpcao[] = [
  { valor: 'todos',         label: 'Todas',         Icon: LayoutGrid },
  { valor: 'bebida_quente', label: 'Bebida quente', Icon: Coffee     },
  { valor: 'bebida_gelada', label: 'Bebida gelada', Icon: GlassWater },
  { valor: 'doce',          label: 'Doce',          Icon: Cookie     },
  { valor: 'salgado',       label: 'Salgado',       Icon: Utensils   },
  { valor: 'sanduiche',     label: 'Sanduíche',     Icon: Sandwich   },
]

const DISPONIBILIDADES: FiltroOpcao[] = [
  { valor: 'todos',        label: 'Todos',        Icon: CircleDashed },
  { valor: 'disponivel',   label: 'Disponível',   Icon: CheckCircle  },
  { valor: 'indisponivel', label: 'Indisponível', Icon: XCircle      },
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
  const [disponibilidadeFiltro, setDisponibilidadeFiltro] = useState('todos')

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


  useEffect(() => {
    if (categoriaFiltro === 'todos') return
    const categoriaAindaExiste = produtos.some(
      (p) => p.categoria === categoriaFiltro
    )
    if (!categoriaAindaExiste) {
      setCategoriaFiltro('todos')
    }
  }, [produtos, categoriaFiltro])

  /* ── Lógica de filtragem cruzada ─────────────────── */

  /** Produtos após aplicar APENAS o filtro de disponibilidade */
  const produtosPorDisponibilidade =
    disponibilidadeFiltro === 'todos'
      ? produtos
      : produtos.filter((p) =>
          disponibilidadeFiltro === 'disponivel'
            ? p.disponivel !== false
            : p.disponivel === false
        )

  /** Produtos após aplicar AMBOS os filtros */
  const produtosFiltrados =
    categoriaFiltro === 'todos'
      ? produtosPorDisponibilidade
      : produtosPorDisponibilidade.filter(
          (p) => p.categoria === categoriaFiltro
        )

  /** Categorias com ao menos 1 produto no filtro de disponibilidade ativo */
  const categoriasDisponiveis = CATEGORIAS.filter(
    (cat) =>
      cat.valor === 'todos' ||
      produtosPorDisponibilidade.some((p) => p.categoria === cat.valor)
  )

  /** Conta produtos por categoria respeitando o filtro de disponibilidade */
  function contarPorCategoria(valor: string) {
    if (valor === 'todos') return produtosPorDisponibilidade.length
    return produtosPorDisponibilidade.filter((p) => p.categoria === valor).length
  }

  /** Conta produtos por disponibilidade respeitando o filtro de categoria */
  function contarPorDisponibilidade(valor: string) {
    const base =
      categoriaFiltro === 'todos'
        ? produtos
        : produtos.filter((p) => p.categoria === categoriaFiltro)
    if (valor === 'todos') return base.length
    if (valor === 'disponivel') return base.filter((p) => p.disponivel !== false).length
    return base.filter((p) => p.disponivel === false).length
  }

  const filtrosAtivos =
    categoriaFiltro !== 'todos' || disponibilidadeFiltro !== 'todos'

  function handleLimparFiltros() {
    setCategoriaFiltro('todos')
    setDisponibilidadeFiltro('todos')
  }

  /* ── Helpers de formatação ───────────────────────── */

  function formatarCategoria(categoria: string) {
    return categoria
      .replace(/_/g, ' ')
      .replace(/^./, (letra) => letra.toUpperCase())
  }

  /* ── Handlers do CRUD ───────────────────────────── */

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
    const isCreating = !produtoEmEdicao
    const message = isCreating
      ? 'Produto adicionado com sucesso!'
      : 'Produto atualizado com sucesso!'

    setToast({ message, type: 'success' })


    if (isCreating) {
      setCategoriaFiltro('todos')
      setDisponibilidadeFiltro('todos')
    }

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

  /* ── Render ──────────────────────────────────────── */

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
          <FilterSection>
            {/* Linha 1: Categoria */}
            <FilterRow>
              <FilterRowLabel>Categoria</FilterRowLabel>
              <FilterWrapper>
                <FilterBar>
                  {categoriasDisponiveis.map((cat) => (
                    <FilterButton
                      key={cat.valor}
                      type="button"
                      $active={categoriaFiltro === cat.valor}
                      onClick={() => setCategoriaFiltro(cat.valor)}
                    >
                      <cat.Icon size={15} />
                      {cat.label}
                      <FilterCount $active={categoriaFiltro === cat.valor}>
                        {contarPorCategoria(cat.valor)}
                      </FilterCount>
                    </FilterButton>
                  ))}
                </FilterBar>
              </FilterWrapper>
            </FilterRow>

            {/* Linha 2: Disponibilidade */}
            <FilterRow>
              <FilterRowLabel>Disponibilidade</FilterRowLabel>
              <FilterWrapper>
                <FilterBar>
                  {DISPONIBILIDADES.map((disp) => (
                    <FilterButton
                      key={disp.valor}
                      type="button"
                      $active={disponibilidadeFiltro === disp.valor}
                      onClick={() => setDisponibilidadeFiltro(disp.valor)}
                    >
                      <disp.Icon size={15} />
                      {disp.label}
                      <FilterCount $active={disponibilidadeFiltro === disp.valor}>
                        {contarPorDisponibilidade(disp.valor)}
                      </FilterCount>
                    </FilterButton>
                  ))}
                </FilterBar>
              </FilterWrapper>
            </FilterRow>
          </FilterSection>
        )}

        {/* Barra de resultados */}
        {!loading && !erro && produtos.length > 0 && (
          <ResultsBar>
            <ResultsText>
              {filtrosAtivos ? (
                <>
                  Exibindo <strong>{produtosFiltrados.length}</strong> de{' '}
                  <strong>{produtos.length}</strong>{' '}
                  {produtos.length === 1 ? 'produto' : 'produtos'}
                </>
              ) : (
                <>
                  <strong>{produtos.length}</strong>{' '}
                  {produtos.length === 1 ? 'produto' : 'produtos'} no cardápio
                </>
              )}
            </ResultsText>

            {filtrosAtivos && (
              <ClearFiltersButton type="button" onClick={handleLimparFiltros}>
                <X size={14} />
                Limpar filtros
              </ClearFiltersButton>
            )}
          </ResultsBar>
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
                <SkeletonCardFooter>
                  <SkeletonLine $width="30%" $height="20px" />
                  <SkeletonLine $width="25%" $height="20px" />
                </SkeletonCardFooter>
              </SkeletonCard>
            ))}
          </SkeletonGrid>
        )}

        {/* Estado vazio — cardápio sem nenhum produto */}
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

        {/* Estado vazio — filtros sem resultado */}
        {!loading && !erro && produtos.length > 0 && produtosFiltrados.length === 0 && (
          <EmptyState>
            <EmptyStateIcon>
              <PackageOpen size={32} />
            </EmptyStateIcon>
            <EmptyStateTitle>Nenhum produto encontrado</EmptyStateTitle>
            <EmptyStateText>
              Nenhum produto corresponde aos filtros selecionados. Tente
              ajustar os filtros ou limpe a seleção atual.
            </EmptyStateText>
            <EmptyStateCTA type="button" onClick={handleLimparFiltros}>
              <X size={18} />
              Limpar filtros
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
                  <Price>{produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Price>

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
    </Container>
  )
}
