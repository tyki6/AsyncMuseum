import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import { deletePieceById, getPieceById, modifyPiece } from '@/utils/pieces';
import { Piece } from '@/interface/pieces';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const pieceId = parseInt(id as string);

  if (req.method === 'GET') {
    return res.status(200).json(getPieceById(pieceId));
  }

  // modifcation
  if (req.method === 'PUT') {
    return res.status(200).json(modifyPiece(req.body as Piece));
  }

  // suppresion
  if (req.method === 'DELETE') {
    deletePieceById(pieceId)
    return res.status(200).json({ message: 'Pièce supprimée' });
  }

  return res.status(405).end();
}
