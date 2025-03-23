import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import { createPiece, getPieces } from '@/utils/pieces';
import { Piece } from '@/interface/pieces';
const dataFile = path.join(process.cwd(), 'data', 'pieces.json');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.status(200).json(getPieces());
  }
  
  // création
  if (req.method === 'POST') {
    const { nom, auteur, description, type, date, lieu, photos } = req.body;
    const newPiece: Piece = {
      id: Date.now(),
      nom,
      auteur,
      description,
      type,
      date,
      lieu,
      photos,
    };

    return res.status(201).json(createPiece(newPiece));
  }

  return res.status(405).end(); // Method Not Allowed
}

