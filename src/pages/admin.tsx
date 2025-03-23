import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Piece } from '@/interface/pieces';


const AjouterOeuvre = () => {
  const [formData, setFormData] = useState<Piece>({
    id: 0,
    nom: '',
    auteur: '',
    type: '',
    date: '',
    lieu: '',
    photos: '',
    description: ''
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/pieces', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Échec de l\'ajout de l\'œuvre');
      }
  
      const data = await response.json();
      console.log('Oeuvre ajoutée avec succès:', data);
      router.push('/');
  
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'œuvre:', error);
    }
  };
  

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Ajouter une Oeuvre</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nom" className="block text-sm font-semibold">Nom de l&apos;œuvre</label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="auteur" className="block text-sm font-semibold">Auteur</label>
          <input
            type="text"
            id="auteur"
            name="auteur"
            value={formData.auteur}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-semibold">Type d&apos;œuvre</label>
          <input
            type="text"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-semibold">Date de création</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="lieu" className="block text-sm font-semibold">Lieu de l&apos;œuvre</label>
          <input
            type="text"
            id="lieu"
            name="lieu"
            value={formData.lieu}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="photos" className="block text-sm font-semibold">URL de la photo</label>
          <input
            type="url"
            id="photos"
            name="photos"
            value={formData.photos}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-semibold">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            rows={4}
            required
          ></textarea>
        </div>

        <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded mt-4">
          Ajouter l&apos;œuvre
        </button>
      </form>
    </div>
  );
};

export default AjouterOeuvre;
