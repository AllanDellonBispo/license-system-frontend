import { AxiosError } from "axios";
import { api } from "../../services/api";

export interface Modulo {
    id: number;
    nome: string;
    descricao: string;
    valor: string;
}


export const cadastraModulo = async (Object: Modulo) => {
    await api.post(`modulo/cadastra`, Object)
}

export const utilizacao = async () => {
    const res = await api.get(`empresa/modulos/utilizados`)
        .then(response => response.data);
    return res;
}