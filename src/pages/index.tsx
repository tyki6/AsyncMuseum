import "./globals.css";
import * as React from "react";
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from 'next/link';
import { Piece } from "@/interface/pieces";
import useSWR from 'swr';
import { fetcher } from '@/utils';
import Head from 'next/head';

export function CarouselMuseum() {
  const { data, error, isLoading } = useSWR<Piece[]>(`/api/pieces`, fetcher);

  if (error) return <div>échec du chargement</div>;
  if (isLoading || data === undefined) return <div></div>;

  return (
    <>
      <Head>
        <title>Acceuil</title>
        <meta name="description" content="Acceuil de mon magnifique musée" />
      </Head>
      <div className="min-h-screen bg-gray-800 flex flex-col items-center">
        <header className="w-full text-center py-10 bg-gray-800 text-white">
          <h1 className="text-4xl font-extrabold">Le Tiktok Musée</h1>
          <p className="text-lg mt-4 max-w-3xl mx-auto">
            Bienvenue dans notre musée virtuel, où l&apos;art rencontre l&apos;histoire. Découvrez des œuvres emblématiques qui ont marqué des époques et des cultures à travers les siècles.
          </p>
        </header>
        <Carousel className="w-full py-12 bg-white">
          <CarouselContent className="-ml-2 md:-ml-4">
            {data.map((piece, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 p-0">
                <Card className="flex flex-col shadow-lg rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-102 hover:shadow-lg hover:shadow-gray-400">
                  <Link href={`/oeuvres/${piece.id}`}>
                    <div className="w-full" style={{ height: '200px' }}>
                    <Image
                        src={piece.photos}
                        alt={piece.nom}
                        className="object-cover w-full h-full rounded-t-xl"
                      />
                    </div>
                    <CardContent className="h-1/2 p-4 bg-white flex flex-col justify-between rounded-b-xl">
                      {/* Nom de l'œuvre */}
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">{piece.nom}</h2>
                      {/* Auteur et lieu */}
                      <div className="flex flex-col gap-2 text-sm text-gray-600">
                        <p className="text-md font-semibold">{piece.auteur}</p>
                        <div className="flex justify-between mt-4 text-xs text-gray-500">
                          <p className="text-md italic">{piece.lieu}</p>
                          <p>{new Date(piece.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        {/* Footer */}
        <footer className="w-full py-8 bg-gray-800 text-white">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-lg">
              Ce site est dédié à <Link href="https://www.youtube.com/@Gravenilvectuto">l&apos;Async League du Youtuber Graven</Link> et réalisé pour le TikTokeur <Link href="https://www.tiktok.com/@tyki6">Tyki6</Link>.
            </p>
            <p className="mt-2 text-sm">
              Développé avec ❤️ par <Link href="https://www.tiktok.com/@tyki6">Tyki6</Link> | Powered by Next.js et Tailwind CSS
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default CarouselMuseum;
