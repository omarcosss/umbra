'use client';

import React, { useState, useEffect } from 'react';
import { Carousel } from 'primereact/carousel';
import { ProgressSpinner } from 'primereact/progressspinner';

// Importe o mesmo arquivo de estilo ou crie um novo
import "./styles.scss"; 
import Link from 'next/link';

export default function Series() {
    
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
        }
    };
    
    const [seriesPopulares, setSeriesPopulares] = useState<ContentCardProps[]>([]);
    const [sucessosNetflix, setSucessosNetflix] = useState<ContentCardProps[]>([]);
    const [misterioSuspense, setMisterioSuspense] = useState<ContentCardProps[]>([]);
    const [antologias, setAntologias] = useState<ContentCardProps[]>([]);
    const [aclamadasPelaCritica, setAclamadasPelaCritica] = useState<ContentCardProps[]>([]);
    const [terrorPsicologico, setTerrorPsicologico] = useState<ContentCardProps[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/dados.json');
                if (!response.ok) {
                    throw new Error(`Erro HTTP: ${response.status}`);
                }
                const data = await response.json();

                // 1. Mapeia todo o conteúdo para um array, adicionando o ID
                const allContent: ContentItem[] = Object.entries(data.conteudo).map(([id, details]) => ({
                    id,
                    ...(details as Omit<ContentItem, 'id'>)
                }));

                // 2. Filtra para obter APENAS as séries
                const allSeries = allContent.filter(item => item.type === 'serie');

                // Função auxiliar para montar a lista filtrando as séries que pertencem a uma categoria
                const buildSeriesCategoryList = (categoryIds: string[]): ContentCardProps[] => {
                    return allSeries
                        .filter(serie => categoryIds.includes(serie.id))
                        .map(serie => ({ content: { id: serie.id, name: serie.name, image: serie.image } }));
                };
                
                // 3. Monta as listas para cada categoria de série
                setSeriesPopulares(allSeries.map(serie => ({ content: { id: serie.id, name: serie.name, image: serie.image } })));
                setSucessosNetflix(buildSeriesCategoryList(data.categorias.sucessosNetflix));
                setMisterioSuspense(buildSeriesCategoryList(data.categorias.misterioESuspense));
                setAntologias(buildSeriesCategoryList(data.categorias.antologiasDeTerror));
                setAclamadasPelaCritica(buildSeriesCategoryList(data.categorias.aclamadosPelaCritica));
                setTerrorPsicologico(buildSeriesCategoryList(data.categorias.terrorPsicologico));

            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                    console.error("Erro ao buscar os dados:", err);
                } else {
                    setError("Erro desconhecido");
                    console.error("Erro ao buscar os dados:", err);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Template para cada item do Carousel
    const contentCard = (data: ContentCardProps) => {
        const { id, name, image } = data.content;
        const url = `/series/${id}`; // URL específica para séries

        return (
            <Link href={url} className="content-card" aria-label={`Ver detalhes de ${name}`}>
                <img 
                    src={image} 
                    alt={name} 
                    className={`cursor-pointer pr-4 cover cover-${id}`}
                    data-pr-tooltip={name}
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
    
    if (loading) {
        return (
            <div className='series-container flex justify-center items-center h-screen'>
                <ProgressSpinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className='series-container text-center'>
                <h2 className="text-red-500">Erro ao carregar os dados</h2>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className='series-container'>
            <h3>Séries Populares</h3>
            <Carousel value={seriesPopulares} numScroll={1} numVisible={6} responsiveOptions={responsiveOptions} itemTemplate={contentCard} circular showIndicators={false} />

            <h3 className="mt-5">Sucessos da Netflix</h3>
            <Carousel value={sucessosNetflix} numScroll={1} numVisible={6} responsiveOptions={responsiveOptions} itemTemplate={contentCard} circular showIndicators={false} />

            <h3 className="mt-5">Mistério e Suspense</h3>
            <Carousel value={misterioSuspense} numScroll={1} numVisible={6} responsiveOptions={responsiveOptions} itemTemplate={contentCard} circular showIndicators={false} />

            <h3 className="mt-5">Antologias de Terror</h3>
            <Carousel value={antologias} numScroll={1} numVisible={6} responsiveOptions={responsiveOptions} itemTemplate={contentCard} circular showIndicators={false} />
            
            <h3 className="mt-5">Aclamadas pela Crítica</h3>
            <Carousel value={aclamadasPelaCritica} numScroll={1} numVisible={6} responsiveOptions={responsiveOptions} itemTemplate={contentCard} circular showIndicators={false} />
            
            <h3 className="mt-5">Terror Psicológico</h3>
            <Carousel value={terrorPsicologico} numScroll={1} numVisible={6} responsiveOptions={responsiveOptions} itemTemplate={contentCard} circular showIndicators={false} />
        </div>
    );
}
