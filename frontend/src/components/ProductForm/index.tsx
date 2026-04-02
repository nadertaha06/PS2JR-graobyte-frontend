import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { criarProduto, atualizarProduto } from '../../services/produtosService'
import {
  Overlay,
  Modal,
  Header,
  Title,
  CloseButton,
  Form,
  FormGroup,
  Label,
  RequiredMark,
  Input,
  TextArea,
  Select,
  CheckboxGroup,
  Checkbox,
  ErrorMessage,
  Actions,
  SecondaryButton,
  PrimaryButton
} from './styles'

type ProdutoFormData = {
  _id?: string
  nome?: string
  descricao?: string
  preco?: number
  categoria?: string
  disponivel?: boolean
}

type ProductFormProps = {
  onClose: () => void
  onSuccess: () => void
  initialData?: ProdutoFormData | null
}

export default function ProductForm({
  onClose,
  onSuccess,
  initialData = null
}: ProductFormProps) {
  const isEditing = Boolean(initialData?._id)

  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [preco, setPreco] = useState('')
  const [categoria, setCategoria] = useState('bebida_quente')
  const [disponivel, setDisponivel] = useState(true)
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    if (initialData) {
      setNome(initialData.nome || '')
      setDescricao(initialData.descricao || '')
      setPreco(
        typeof initialData.preco === 'number' ? String(initialData.preco) : ''
      )
      setCategoria(initialData.categoria || 'bebida_quente')
      setDisponivel(initialData.disponivel !== false)
      return
    }

    setNome('')
    setDescricao('')
    setPreco('')
    setCategoria('bebida_quente')
    setDisponivel(true)
  }, [initialData])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErro('')

    if (!nome.trim()) {
      setErro('O nome do produto é obrigatório.')
      return
    }

    const precoNormalizado = preco.replace(',', '.')
    if (!precoNormalizado || Number(precoNormalizado) <= 0 || isNaN(Number(precoNormalizado))) {
      setErro('Informe um preço válido. Ex.: 12,50')
      return
    }

    const payload = {
      nome: nome.trim(),
      descricao: descricao.trim() || undefined,
      preco: Number(precoNormalizado),
      categoria,
      disponivel
    }

    setLoading(true)

    try {
      if (isEditing && initialData?._id) {
        await atualizarProduto(initialData._id, payload)
      } else {
        await criarProduto(payload)
      }

      onSuccess()
      onClose()
    } catch {
      setErro(isEditing ? 'Erro ao atualizar produto.' : 'Erro ao criar produto.')
    } finally {
      setLoading(false)
    }
  }

  return createPortal(
    <Overlay>
      <Modal>
        <Header>
          <Title>{isEditing ? 'Editar produto' : 'Novo produto'}</Title>
          <CloseButton type="button" onClick={onClose} aria-label="Fechar formulário">
            <X size={18} />
          </CloseButton>
        </Header>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="nome">
              Nome <RequiredMark aria-hidden="true">*</RequiredMark>
            </Label>
            <Input
              id="nome"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              placeholder="Ex.: Cappuccino"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="descricao">Descrição</Label>
            <TextArea
              id="descricao"
              value={descricao}
              onChange={(event) => setDescricao(event.target.value)}
              placeholder="Descreva o produto"
              rows={4}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="preco">
              Preço <RequiredMark aria-hidden="true">*</RequiredMark>
            </Label>
            <Input
              id="preco"
              type="text"
              inputMode="decimal"
              value={preco}
              onChange={(event) => setPreco(event.target.value)}
              placeholder="Ex.: 12,50"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="categoria">
              Categoria <RequiredMark aria-hidden="true">*</RequiredMark>
            </Label>
            <Select
              id="categoria"
              value={categoria}
              onChange={(event) => setCategoria(event.target.value)}
            >
              <option value="bebida_quente">Bebida quente</option>
              <option value="bebida_gelada">Bebida gelada</option>
              <option value="doce">Doce</option>
              <option value="salgado">Salgado</option>
              <option value="sanduiche">Sanduíche</option>
            </Select>
          </FormGroup>

          <CheckboxGroup>
            <Checkbox
              id="disponivel"
              type="checkbox"
              checked={disponivel}
              onChange={(event) => setDisponivel(event.target.checked)}
            />
            <Label htmlFor="disponivel">Produto disponível</Label>
          </CheckboxGroup>

          {erro && <ErrorMessage>{erro}</ErrorMessage>}

          <Actions>
            <SecondaryButton type="button" onClick={onClose}>
              Cancelar
            </SecondaryButton>

            <PrimaryButton type="submit" disabled={loading}>
              {loading
                ? isEditing
                  ? 'Salvando...'
                  : 'Criando...'
                : isEditing
                  ? 'Salvar alterações'
                  : 'Salvar produto'}
            </PrimaryButton>
          </Actions>
        </Form>
      </Modal>
    </Overlay>,
    document.body
  )
}