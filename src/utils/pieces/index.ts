import fs from 'fs';
import path from 'path';
import { Piece } from '@/interface/pieces';

const dataFile = path.join(process.cwd(), 'data', 'pieces.json');

export const getPieces = () => {
    const pieces: Piece[] = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
    return pieces
}

export const getPieceById = (id: number) => {
    const pieces: Piece[] = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
    const pieceIndex = pieces.findIndex((p) => p.id === id);
    if (pieceIndex === -1) {
        return null
    }
    return pieces[pieceIndex]
}

export const createPiece = (piece: Piece) => {
    const pieces: Piece[] = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
    pieces.push(piece)
    fs.writeFileSync(dataFile, JSON.stringify(pieces, null, 2));
    return piece
}

export const modifyPiece = (piece: Piece) => {
    const pieces: Piece[] = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
    const pieceIndex = pieces.findIndex((p) => p.id === piece.id);
    if (pieceIndex === -1) {
        return null
    }
    const { nom, auteur, type, date, lieu, photos } = piece;
    const updatedPiece = { ...pieces[pieceIndex], nom, auteur, type, date, lieu, photos };
    pieces[pieceIndex] = updatedPiece;
    fs.writeFileSync(dataFile, JSON.stringify(pieces, null, 2));
    return updatedPiece
}

export const deletePieceById = (id: number) => {
    const pieces: Piece[] = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
    const pieceIndex = pieces.findIndex((p) => p.id === id);
    if (pieceIndex === -1) {
        return -1
    }
    const updatedPieces = pieces.filter((p) => p.id !== id);
    fs.writeFileSync(dataFile, JSON.stringify(updatedPieces, null, 2));
    return 0
}