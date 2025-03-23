import { useRouter } from 'next/router';
import { Button } from "@/components/ui/button";
import { Piece } from "@/interface/pieces";
import useSWR from 'swr';
import { fetcher } from '@/utils';
import Head from 'next/head';
import Image from 'next/image'
export default function OeuvrePage() {
  const router = useRouter();
  const { id } = router.query; // On récupère l'id de l'URL
  const { data, error, isLoading } = useSWR<Piece>(`/api/pieces/${id}`, fetcher)
 
  if (error) return <div>échec du chargement</div>
  if (isLoading || data === undefined) return <div></div>

  return (
    <><Head>
          <title>{data.nom}</title>
          <meta name="description" content={data.nom} />
      </Head><div className="bg-gray-100 flex flex-col items-center lg:h-screen lg:py-8">
              <div className="flex w-full max-w-6xl bg-white lg:rounded-xl shadow-lg overflow-hidden">
                  {/* Partie gauche: Image */}
                  <div className="w-full md:w-1/2 h-screen">
                      <Image
                          src={data.photos}
                          alt={data.nom}
                          className="object-cover w-full h-full"
                          width={500}
                          height={500} />
                  </div>

                  {/* Partie droite: Détails de l'œuvre */}
                  <div className="w-full md:w-1/2 p-6 flex flex-col justify-start">
                      <h1 className="text-4xl font-extrabold text-gray-800 mb-4">{data.nom}</h1>
                      <p className="text-lg font-semibold text-gray-600 mb-2">{data.auteur}</p>
                      <p className="text-sm text-gray-500 italic mb-4">{data.lieu}</p>
                      <p className="text-md text-gray-600 mb-4">{data.description}</p>

                      {/* Informations additionnelles */}
                      <div className="text-sm text-gray-500">
                          <p>{data.type}</p>
                          <p>{new Date(data.date).toLocaleDateString()}</p>
                      </div>

                      <Button onClick={() => router.push('/')} className="mt-6">Retour à la galerie</Button>
                  </div>
              </div>
          </div></>
  );
}
