"use client"

import React, { useCallback, useEffect, useState } from "react";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import TabsSection from "../components/TabsSection/TabsSection";
import Image from "next/image";
import "./styles.scss";
import { UserPlusIcon, ShareNetworkIcon, SkullIcon, ChatIcon } from "@phosphor-icons/react";
import { Carousel } from '@/app/components/Carousel';
import { ProgressSpinner } from "primereact/progressspinner";
import Link from "next/link";
import { Rating } from "primereact/rating";
import { HeartIcon } from "lucide-react";

type ContentItem = {
    id: string; 
    name: string;
    image: string;
    type: 'filme' | 'serie';
};

type ContentCardProps = {
    content: {
        id: string;
        name: string;
        image: string;
        type: 'filme' | 'serie';
    }
};


const useResponsiveValues = () => {
    const [values, setValues] = useState({ numVisible: 5, numScroll: 5 });

    const calculateValues = useCallback(() => {
        const width = window.innerWidth;
        if (width < 640) { // Telas pequenas (mobile)
            setValues({ numVisible: 1, numScroll: 1 });
        } else if (width < 768) { // Telas um pouco maiores (sm)
            setValues({ numVisible: 2, numScroll: 1 });
        } else if (width < 1024) { // Tablets (md)
            setValues({ numVisible: 3, numScroll: 1 });
        } else { // Desktops (lg e acima)
            setValues({ numVisible: 5, numScroll: 1 });
        }
    }, []);

    useEffect(() => {
        calculateValues();
        window.addEventListener('resize', calculateValues);
        return () => window.removeEventListener('resize', calculateValues);
    }, [calculateValues]);

    return values;
};

const contentCard = (data: ContentCardProps) => {
    const { id, name, image, type } = data.content;
    const url = `/${type}s/${id}`; 

    return (
        <Link href={url} className="content-card" aria-label={`Ver detalhes de ${name}`}>
            <img 
                src={image} 
                alt={name} 
                className={`w-40 cursor-pointer cover cover-${id}`} // Classe única para o Tooltip
                data-tooltip={name}
            />
        </Link>
    );
};

type ProfileMetricsProps = {
    metrics: {
        following: number | string;
        followers: number | string;
        comments: number | string;
    };
};

const ProfileMetrics = ({metrics}: ProfileMetricsProps) => {
    return (
        <ul className="profile-metrics">
            <li>
                <span>{metrics.following}</span> seguindo
            </li>
            <li>
                <span>{metrics.followers}</span> seguidores
            </li>
            <li>
                <span>{metrics.comments}</span> comentários
            </li>
        </ul>
    )
}

type User = {
    name: string;
    bio: string;
    metrics: {
        following: number | string;
        followers: number | string;
        comments: number | string;
    };
};

const ProfilePageHeader = ({user}: { user: User }) => {
    return(
        <section className="profile-header">
            <Image src="/profilepic.png" alt="" width={160} height={160} priority={true} />
            <div className="profile-content">
                <h1>{user.name}</h1>
                <p>{user.bio}</p>
                <hr/>
                <ProfileMetrics metrics={user.metrics} />
            </div>
            <div className="profile-actions">
                <button>Seguir<UserPlusIcon size={15}/><UserPlusIcon size={15} weight="fill"/></button>
                <button>Compartilhar<ShareNetworkIcon size={15}/><ShareNetworkIcon size={15} weight="fill"/></button>
            </div>
        </section>
    )
}

const SectionStatistics = ({atividadeRecente}: { atividadeRecente: ContentCardProps[] }) => {
    const { numVisible, numScroll } = useResponsiveValues();

    return(
        <>
            <div className="media-stats-container">
                <div className="media-stat-card">
                <h3>⏱ Tempo vendo filmes</h3>
                <div className="card-values">
                    <div className="card-value-item">
                    <strong>4</strong>
                    <span>meses</span>
                    </div>
                    <div className="card-value-item">
                    <strong>2</strong>
                    <span>dias</span>
                    </div>
                    <div className="card-value-item">
                    <strong>1</strong>
                    <span>hora</span>
                    </div>
                </div>
                </div>

                <div className="media-stat-card">
                <h3>⏱ Tempo vendo séries</h3>
                <div className="card-values">
                    <div className="card-value-item">
                    <strong>5</strong>
                    <span>meses</span>
                    </div>
                    <div className="card-value-item">
                    <strong>12</strong>
                    <span>dias</span>
                    </div>
                    <div className="card-value-item">
                    <strong>8</strong>
                    <span>horas</span>
                    </div>
                </div>
                </div>

                <div className="media-stat-card">
                <h3>⏱ Episódios assistidos</h3>
                <div className="card-values">
                    <div className="card-value-item">
                    <strong>5.341</strong>
                    <span>episódios</span>
                    </div>
                    <div className="card-value-item">
                    <strong>32</strong>
                    <span>séries</span>
                    </div>
                </div>
                </div>
            </div>
            <h3>Atividade Recente</h3>
            <Carousel value={atividadeRecente} numScroll={numScroll} numVisible={numVisible} itemTemplate={contentCard} />
        </>
    )
}

type SectionListsProps = {
    filmesFavoritos: ContentCardProps[];
    seriesFavoritas: ContentCardProps[];
};

const SectionLists = ({filmesFavoritos, seriesFavoritas}: SectionListsProps) => {
    const { numVisible, numScroll } = useResponsiveValues();

    return(
        <>
            <h3>Filmes Favoritos</h3>
            <Carousel value={filmesFavoritos} numScroll={numScroll} numVisible={numVisible} itemTemplate={contentCard} />
            <h3>Séries Favoritas</h3>
            <Carousel value={seriesFavoritas} numScroll={numScroll} numVisible={numVisible} itemTemplate={contentCard} />
        </>
    )
}

const SectionComments = ({filmes}: { filmes: ContentCardProps[] }) => {
    return(
        <>
            <UserReview card={filmes[0]} reviewData={{
                date: "2025-04-21",
                rating: 4,
                description: "Este é o texto de um comentário. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget ligula eu lectus lobortis condimentum. Aliquam nonummy auctor massa.",
                likes: 34,
                comments: 4
            }} />
            <UserReview card={filmes[50]} reviewData={{
                date: "2025-04-16",
                rating: 3,
                description: "Este é o texto de um comentário. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget ligula eu lectus lobortis condimentum. Aliquam nonummy auctor massa.",
                likes: 26,
                comments: 8
            }} />
            <UserReview card={filmes[24]} reviewData={{
                date: "2025-04-04",
                rating: 5,
                description: "Este é o texto de um comentário. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget ligula eu lectus lobortis condimentum. Aliquam nonummy auctor massa.",
                likes: 102,
                comments: 12
            }} />
            <UserReview card={filmes[59]} reviewData={{
                date: "2025-03-29",
                rating: 5,
                description: "Este é o texto de um comentário. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget ligula eu lectus lobortis condimentum. Aliquam nonummy auctor massa.",
                likes: 86,
                comments: 5
            }} />
        </>
    )
}

type UserReviewProps = {
    card: ContentCardProps;
    reviewData: {
        date: string;
        rating: number;
        description: string;
        likes: number;
        comments: number;
    };
};

const UserReview = ({card, reviewData}: UserReviewProps) => {
    const { id, name, image, type } = card.content;
    const url = `/${type}s/${id}`;

    function formatDate (inputDate: string) {
        const date = new Date(`${inputDate}T00:00:00`)

        const formattedDate = date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
        return formattedDate;
    }

    return (
        <div className="user-review">
            <Link href={url} className="content-card" aria-label={`Ver detalhes de ${name}`}>
                <img 
                    src={image} 
                    alt={name} 
                    className={`w-40 cursor-pointer cover cover-${id}`} // Classe única para o Tooltip
                    data-tooltip={name}
                />
            </Link>
            <div className="user-review-info">
                <h3>
                    {name}
                    {type == 'serie' && (
                        <span>T1 E1</span>
                    )}
                </h3>
                <Rating value={reviewData.rating}
                    cancel={false}
                    className="mb-4"
                    onIcon={<SkullIcon size={24} weight='fill' />}
                    offIcon={<SkullIcon size={24} />}
                />
                <div className="review-date">
                    {formatDate(reviewData.date)}
                    <Image src="/profilepic.png" alt="" width={24} height={24} priority={true} />
                </div>
                <p>{reviewData.description}</p>
                <div className="review-interactions">
                    <span><HeartIcon size={24}/>{reviewData.likes}</span>
                    <span><ChatIcon size={24}/>{reviewData.comments}</span>
                </div>
            </div>
        </div>
    )
}

export default function Perfil(){
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [atividadeRecente, setAtividadeRecente] = useState<ContentCardProps[]>([]);
    const [filmesFavoritos, setFilmesFavoritos] = useState<ContentCardProps[]>([]);
    const [seriesFavoritas, setSeriesFavoritas] = useState<ContentCardProps[]>([]);

    const user = {
        name: "Fulana de Town",
        bio: "Lover of all things spooky!",
        metrics: {
            followers: '40k',
            following: 520,
            comments: 382
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/dados.json');
                if (!response.ok) {
                    throw new Error(`Erro HTTP: ${response.status}`);
                }
                const data = await response.json();
                const allContent: ContentItem[] = Object.entries(data.conteudo).map(([id, details]) => ({
                    id,
                    ...(details as Omit<ContentItem, 'id'>)
                }));
                const allFilmes = allContent.filter(item => item.type === 'filme');
                const allSeries = allContent.filter(item => item.type === 'serie');
                
                setAtividadeRecente(allContent.map(filme => ({ content: { id: filme.id, name: filme.name, image: filme.image, type: filme.type } })));
                setFilmesFavoritos(allFilmes.map(filme => ({ content: { id: filme.id, name: filme.name, image: filme.image, type: filme.type } })));
                setSeriesFavoritas(allSeries.map(serie => ({ content: { id: serie.id, name: serie.name, image: serie.image, type: serie.type } })));
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                    console.error("Erro ao buscar os dados:", err);
                } else {
                    setError("Erro desconhecido ao buscar os dados.");
                    console.error("Erro desconhecido ao buscar os dados:", err);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className='filmes-container flex justify-center items-center h-screen'>
                <ProgressSpinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className='filmes-container text-center'>
                <h2 className="text-red-500">Erro ao carregar os dados</h2>
                <p>{error}</p>
            </div>
        );
    }

    return(
        <>
            <Breadcrumbs routeList={[
                { label: "Membros", route: "/" },
                { label: "Fulana de Town", route: "/perfil" },
            ]} />
            <ProfilePageHeader user={user} />
            <TabsSection alignment='center' tabs={[
                {label: "Estatísticas", content: <SectionStatistics atividadeRecente={atividadeRecente}/>},
                {label: "Listas", content: <SectionLists filmesFavoritos={filmesFavoritos} seriesFavoritas={seriesFavoritas} />},
                {label: "Comentários", content: <SectionComments filmes={atividadeRecente}/>}
            ]} />
        </>
    );
}