

import api from './api';

export interface LoginResponse {
  token: string;
  role: 'admin' | 'funcionario';
  nome: string;
}

export interface Funcionario {
  _id: string;
  nome: string;
  email: string;
  role: 'admin' | 'funcionario';
}

export interface CadastrarFuncionarioInput {
  nome: string;
  email: string;
  senha: string;
}

// --- FUNÇÕES ---

export const login = async (email: string, senha: string): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/login', { email, senha });
  return response.data;
};

export const listarFuncionarios = async (): Promise<Funcionario[]> => {
  const response = await api.get<Funcionario[]>('/auth/funcionarios');
  return response.data;
};

export const cadastrarFuncionario = async (dados: CadastrarFuncionarioInput): Promise<{ mensagem: string }> => {
  const response = await api.post<{ mensagem: string }>('/auth/cadastrar-funcionario', dados);
  return response.data;
};

export const removerFuncionario = async (id: string): Promise<{ mensagem: string }> => {
  const response = await api.delete<{ mensagem: string }>(`/auth/funcionarios/${id}`);
  return response.data;
};
