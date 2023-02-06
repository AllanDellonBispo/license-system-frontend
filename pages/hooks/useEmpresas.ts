import { api } from "../../services/api";
import { Contato } from "./useContatos";
import { Endereco } from "./useEndereco";
import { Modulo } from "./useModulos";

export interface Empresa {
    id: number;
    nomeFantasia: string;
    razaoSocial: string;
    cnpj: string;
    inscricaoEstadual: string;
    endereco: Endereco;
    contato: Contato;
    modulos: Modulo[];
    ultimaRenovacao: Date;
    vencimento: Date;
    ativo: boolean;
}

export const buscaEmpresa = async (id: number) => await api.get(`/empresa/${id}`)

export const buscaTotalEmpresa = async () => {
    const total = await api.get(`/empresa/total`)
        .then(e => e.data)

    return total;
}

export const Cadastra = async (nomeFantasia: string, razaoSocial: string, cnpj: string, inscricaoEstadual: string, endereco: Endereco, contato: Contato, ultimaRenovacao: Date, vencimento: Date, ativo: boolean) => {
    await api.post(`empresa`, {
        nomeFantasia,
        razaoSocial,
        cnpj,
        inscricaoEstadual,
        endereco,
        contato,
        ultimaRenovacao: new Date(),
        vencimento,
        ativo
    })
}

export const atualiza = async (nomeFantasia: string, razaoSocial: string, cnpj: string, inscricaoEstadual: string, endereco: Endereco, contato: Contato, ultimaRenovacao: Date, vencimento: Date, ativo: boolean) => {
    await api.put(`empresa`, {
        nomeFantasia,
        razaoSocial,
        cnpj,
        inscricaoEstadual,
        endereco,
        contato,
        ultimaRenovacao,
        vencimento,
        ativo
    })
}

export const atualizaAtivacao = async (id: number) => {
    await api.put(`empresa/status/${id}`);
}