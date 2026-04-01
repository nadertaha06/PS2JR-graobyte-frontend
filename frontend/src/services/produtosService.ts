// produtosService.ts

import api from './api';

// --- TIPOS ---

export interface Produto {
  _id: string;
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  disponivel: boolean;
  criado_em: string;
  atualizado_em: string;
}

// Partial<Omit<...>> = todos os campos são opcionais, exceto _id e datas
export type ProdutoInput = {
  nome: string;
  descricao?: string;
  preco: number;
  categoria: string;
  disponivel?: boolean;
};

export type ProdutoUpdate = Partial<ProdutoInput>;

// --- FUNÇÕES ---

export const listarProdutos = async (): Promise<Produto[]> => {
  const response = await api.get<Produto[]>('/produtos/');
  return response.data;
};

export const buscarProduto = async (id: string): Promise<Produto> => {
  const response = await api.get<Produto>(`/produtos/${id}`);
  return response.data;
};

export const criarProduto = async (dados: ProdutoInput): Promise<Produto> => {
  const response = await api.post<Produto>('/produtos/', dados);
  return response.data;
};

export const atualizarProduto = async (id: string, dados: ProdutoUpdate): Promise<{ mensagem: string }> => {
  const response = await api.put<{ mensagem: string }>(`/produtos/${id}`, dados);
  return response.data;
};

export const removerProduto = async (id: string): Promise<{ mensagem: string }> => {
  const response = await api.delete<{ mensagem: string }>(`/produtos/${id}`);
  return response.data;
};
