'use client';

import React, { useState, useEffect, useCallback } from 'react';
// import { Carousel } from 'primereact/carousel';
import { Carousel } from '../components/Carousel';
import { ProgressSpinner } from 'primereact/progressspinner';
import "./styles.scss"; 
import Link from 'next/link';

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


export default function Series() {

    const { numVisible, numScroll } = useResponsiveValues();
    
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
            <Carousel value={seriesPopulares} numScroll={numScroll} numVisible={numVisible} itemTemplate={contentCard} />

            <h3 className="mt-5">Sucessos da Netflix</h3>
            <Carousel value={sucessosNetflix} numScroll={numScroll} numVisible={numVisible} itemTemplate={contentCard} />

            <h3 className="mt-5">Mistério e Suspense</h3>
            <Carousel value={misterioSuspense} numScroll={numScroll} numVisible={numVisible} itemTemplate={contentCard} />

            <h3 className="mt-5">Antologias de Terror</h3>
            <Carousel value={antologias} numScroll={numScroll} numVisible={numVisible} itemTemplate={contentCard} />
            
            <h3 className="mt-5">Aclamadas pela Crítica</h3>
            <Carousel value={aclamadasPelaCritica} numScroll={numScroll} numVisible={numVisible} itemTemplate={contentCard} />
            
            <h3 className="mt-5">Terror Psicológico</h3>
            <Carousel value={terrorPsicologico} numScroll={numScroll} numVisible={numVisible} itemTemplate={contentCard} />
        </div>
    );
}
