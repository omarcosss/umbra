// import Image from "next/image";
'use client';
import { Carousel } from 'primereact/carousel';
import React, { useState, useEffect } from 'react';
import { Tooltip } from 'primereact/tooltip';
import { ProgressSpinner } from 'primereact/progressspinner'; // Para o loading
import "./styles.scss"
import Link from 'next/link';

export default function Home() {

 type ContentItem = {
        name: string;
        image: string;
        type: 'filme' | 'serie';
        description: string;
    };

   type ContentCardProps = {
        content: {
            id: string;
            name: string;
            image: string;
            type: 'filme' | 'serie';
            description: string,
        }
    };
    // Estados para armazenar as listas de cada categoria
    const [emAlta, setEmAlta] = useState<ContentCardProps[]>([]);
    const [assistindoAgora, setAssistindoAgora] = useState <ContentCardProps[]>([]);
    const [semAssistirHaUmTempo, setSemAssistirHaUmTempo] = useState <ContentCardProps[]>([]);
    // Estados para controle de loading e erro
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // --- LÓGICA DE FETCH ---
    useEffect(() => {
        // Função assíncrona para buscar e processar os dados
        const fetchData = async () => {
            try {
                // Busca o arquivo JSON da pasta public
                const response = await fetch('/dados.json');
                if (!response.ok) {
                    throw new Error(`Erro HTTP: ${response.status}`);
                }
                const data = await response.json();

                // Função auxiliar para montar a lista no formato que o Carousel espera
                const buildCategoryList = (ids: string[]): ContentCardProps[] => {
                    return ids.map(id => {
                        const item: ContentItem = data.conteudo[id];
                        // O Carousel espera o formato { content: { name, image, description } }
                        return { content: { id, name: item.name, image: item.image, type: item.type, description: item.description } };
                    });
                };
                // Monta as listas para cada categoria e atualiza os estados
                setEmAlta(buildCategoryList(data.categorias.emAlta));
                setAssistindoAgora(buildCategoryList(data.categorias.assistindoAgora));
                setSemAssistirHaUmTempo(buildCategoryList(data.categorias.semAssistirHaUmTempo));
                 } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                    console.error("Erro ao buscar os dados:", err);
                } else {
                    setError('Erro desconhecido');
                    console.error("Erro ao buscar os dados:", err);
                }
            } finally {
                setLoading(false); // Termina o loading, com sucesso ou erro
            }
        };

        fetchData();
    }, []); // O array vazio [] faz com que o useEffect rode apenas uma vez

     // Template para cada item do Carousel
    const highlightsCard = (data: ContentCardProps) => {
        const { id, name, image, type } = data.content;
        const url = `/${type}s/${id}`;

        return (
            <div className="highlights-slide">
                <Tooltip target=".cover" mouseTrack mouseTrackLeft={10} />
                <img src={image} alt={name} className="highlights-image-element"/>

                {/* Overlay para escurecer o fundo e dar legibilidade ao texto */}
                <div className="highlights-overlay"></div>

                {/* Conteúdo de texto sobre a imagem */}
                <div className="highlights-content">
                    <h1 className="highlights-title">{name}</h1>
                    <p className="highlights-description">
                        {data.content.description || 'opa.'}
                    </p>
                    <Link href={url} className="highlights-button">Vai encarar?</Link>
                </div>
            </div>
        );
    };
    
    const contentCard = (data: ContentCardProps) => {
        const { id, name, image, type } = data.content;
        const url = `/${type}s/${id}`; 

        return (
            <Link href={url} className="content-card" aria-label={`Ver detalhes de ${name}`}>
                <img 
                    src={image} 
                    alt={name} 
                    className='cursor-pointer cover cover-${id}' // Classe única para o Tooltip
                    data-tooltip={name}
                />
            </Link>
        );
    };

    const responsiveOptions = [
        { breakpoint: '1400px', numVisible: 5, numScroll: 1 },
        { breakpoint: '1199px', numVisible: 4, numScroll: 1 },
        { breakpoint: '991px', numVisible: 3, numScroll: 1 },
        { breakpoint: '767px', numVisible: 2, numScroll: 1 },
        { breakpoint: '575px', numVisible: 1, numScroll: 1 }
    ];
    // --- RENDERIZAÇÃO CONDICIONAL ---
    if (loading) {
        return (
            <div className='explorar-container flex justify-center items-center h-screen'>
                <ProgressSpinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className='explorar-container text-center'>
                <h2 className="text-red-500">Erro ao carregar os dados</h2>
                <p>{error}</p>
                <p>Verifique o console para mais detalhes e se o arquivo `dados.json` está na pasta `public`.</p>
            </div>
        );
    }
    
  return (
    <div className='home-container'>
        <div className='highlights-container'>
            <Carousel value={emAlta} numScroll={1} numVisible={1} itemTemplate={highlightsCard}
        autoplayInterval={5000} circular/>
        </div>
        <div className='secao-inferior'>
            <div>
                <h3>Assistindo agora</h3>
                <Carousel value={assistindoAgora} numScroll={1} numVisible={3} responsiveOptions={responsiveOptions} itemTemplate={contentCard} showIndicators={false} />
            </div>
            <div>
               <h3>Sem assistir há um tempo</h3>
                <Carousel value={semAssistirHaUmTempo} numScroll={1} numVisible={4} responsiveOptions={responsiveOptions} itemTemplate={contentCard} showIndicators={false} />
            </div>
        </div>            
    </div>
  );
}
