import type { NextApiRequest, NextApiResponse } from 'next'
import { Empresa } from '../../hooks/useEmpresas';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Empresa>
) {
    const { empresaId } = req.query;

    //res.status(200).json({ empresas: '' });
}