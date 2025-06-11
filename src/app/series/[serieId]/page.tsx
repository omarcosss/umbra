'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Image } from 'primereact/image';
import './styles.scss';
import { Rating } from "primereact/rating";
import { PlusIcon, SkullIcon, ShareIcon } from '@phosphor-icons/react';
import Button from '@/app/components/Button';
import { useParams } from 'next/navigation';
import { TabView, TabPanel } from 'primereact/tabview';
import Breadcrumbs from '@/app/components/Breadcrumbs/Breadcrumbs';
import EpisodeCard from '@/app/components/EpisodeCard';
import { Carousel } from 'primereact/carousel';
import Comentario, {genericHorrorComments} from '@/app/components/Comentario';
import CommentInput from '@/app/components/ComponentInput';

// Interface para o objeto de conteúdo
interface ContentItem {
    name: string;
    image: string;
    type: 'filme' | 'serie';
    description: string;
}

export default function SerieDetalhe() {
    const params = useParams();
    const serieId = params.serieId as string; // Extrai o ID da série

    const [serie, setSerie] = useState<ContentItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [rating, setRating] = useState(4);

    const qntEpisodios = Array.from({ length: 12 }, (_, index) => index);

    const handleCommentPost = (commentText: string) => {
        console.log('New comment posted:', commentText);
    };

    useEffect(() => {
        // Função para buscar os dados apenas desta série
        const fetchSerieData = async () => {
            // Decodifica o ID caso ele tenha caracteres especiais (ex: %20)
            const decodedSerieId = decodeURIComponent(serieId);
            setLoading(true);
            try {
                const response = await fetch('/dados.json');
                if (!response.ok) {
                    throw new Error('Falha ao carregar o banco de dados.');
                }
                const data = await response.json();
                
                // Busca a série específica no objeto 'conteudo'
                const serieData = data.conteudo[decodedSerieId];

                if (serieData && serieData.type === 'serie') {
                    setSerie(serieData);
                } else {
                    throw new Error('Série não encontrada.');
                }

            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                    console.error("Erro:", err);
                } else {
                    setError('Ocorreu um erro desconhecido.');
                    console.error("Erro desconhecido:", err);
                }
            } finally {
                setLoading(false);
            }
        };

        if (serieId) {
            fetchSerieData();
        }
    }, [serieId]); // O efeito roda novamente se o ID na URL mudar

    if (loading) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <ProgressSpinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className=''>
                <h2 className="">Erro</h2>
                <p>{error}</p>
                <Link href="/series" className="mt-4 inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                    Voltar para Séries
                </Link>
            </div>
        );
    }

    if (!serie) {
        return null; // Não renderiza nada se a série ainda não foi encontrada
    }

    return (
        <div className="">
            <Breadcrumbs routeList={[
                { label: "Séries", route: "/series" },
                { label: serie.name, route: `/series/${serieId}` },
            ]} />
            <div className="serie-details">
                <div className="serie-details__poster">
                    <Image src={serie.image} alt={`Pôster de ${serie.name}`} width="100%" preview />
                </div>
                <div className="serie-details__info">
                    <h1 className="">{serie.name}</h1>
                    <Rating value={rating} onChange={(e) => setRating(e.value ?? 0)}
                        cancel={false}
                        onIcon={<SkullIcon size={24} weight='fill' />}
                        offIcon={<SkullIcon size={24} />}
                    />
                    <p className="">{serie.description}</p>
                    <hr />
                    <div className="serie-details__info__availability">
                        <p>Disponivel em:</p>
                        <div className="streamings"></div>
                    </div>
                </div>
                <div className="serie-details__actions">
                    <Button title='Adicionar à lista' icon={PlusIcon} />
                    <Button title='Compartilhar' icon={ShareIcon} />
                </div>
            </div>
            <div className="episodes">
                <TabView>
                    <TabPanel header="Temporada 1" className=''>
                        <Carousel 
                            value={qntEpisodios} 
                            numScroll={1} 
                            numVisible={3} 
                            itemTemplate={EpisodeCard}
                            showIndicators={false}

                            // responsiveOptions={responsiveOptions}
                        />
                    </TabPanel>
                    <TabPanel header="Temporada 2">
                        <Carousel 
                            value={qntEpisodios} 
                            numScroll={1} 
                            numVisible={3} 
                            itemTemplate={EpisodeCard}
                            showIndicators={false}

                            // responsiveOptions={responsiveOptions}
                        />
                    </TabPanel>
                    <TabPanel header="Temporada 3">
                        <Carousel 
                            value={qntEpisodios} 
                            numScroll={1} 
                            numVisible={3} 
                            itemTemplate={EpisodeCard}
                            showIndicators={false}

                            // responsiveOptions={responsiveOptions}
                        />
                    </TabPanel>
                </TabView>
                <CommentInput onPost={handleCommentPost} />
                {genericHorrorComments.map((comment, index) => (
                    <Comentario
                        key={index} // Idealmente, cada comentário teria um ID único do backend
                        avatarSrc={comment.avatarSrc}
                        userName={comment.userName}
                        timeAgo={comment.timeAgo}
                        commentText={comment.commentText}
                        likes={comment.likes}
                        dislikes={comment.dislikes}
                        hashtags={comment.hashtags}
                    />
                ))}
            </div>
        </div>
    );
}
