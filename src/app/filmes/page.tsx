'use client';

import React, { useState, useEffect } from 'react';
import { Carousel } from 'primereact/carousel';
import { ProgressSpinner } from 'primereact/progressspinner';

// Use o mesmo arquivo de estilo
import "./styles.scss"; 
import Link from 'next/link';

export default function Filmes() {
    
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
    
    // --- ESTADOS DO COMPONENTE ---
    // Estados para armazenar as listas de cada categoria de filme
    const [filmesPopulares, setFilmesPopulares] = useState<ContentCardProps[]>([]);
    const [classicos, setClassicos] = useState<ContentCardProps[]>([]);
    const [iconesSlasher, setIconesSlasher] = useState<ContentCardProps[]>([]);
    const [terrorPsicologico, setTerrorPsicologico] = useState<ContentCardProps[]>([]);
    const [foundFootage, setFoundFootage] = useState<ContentCardProps[]>([]);
    const [horrorCorporal, setHorrorCorporal] = useState<ContentCardProps[]>([]);

    // Estados para controle de loading e erro
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // --- LÓGICA DE FETCH ---
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

                // 2. Filtra para obter APENAS os filmes
                const allFilmes = allContent.filter(item => item.type === 'filme');

                // Função auxiliar para montar a lista filtrando os filmes que pertencem a uma categoria
                const buildFilmesCategoryList = (categoryIds: string[]): ContentCardProps[] => {
                    return allFilmes
                        .filter(filme => categoryIds.includes(filme.id))
                        .map(filme => ({ content: { id: filme.id, name: filme.name, image: filme.image, type: filme.type } }));
                };
                
                // 3. Monta as listas para cada categoria de filme
                setFilmesPopulares(allFilmes.map(filme => ({ content: { id: filme.id, name: filme.name, image: filme.image, type: filme.type } })));
                setClassicos(buildFilmesCategoryList(data.categorias.classicos));
                setIconesSlasher(buildFilmesCategoryList(data.categorias.iconesSlasher));
                setTerrorPsicologico(buildFilmesCategoryList(data.categorias.terrorPsicologico));
                setFoundFootage(buildFilmesCategoryList(data.categorias.foundFootage));
                setHorrorCorporal(buildFilmesCategoryList(data.categorias.horrorCorporal));

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

    const responsiveOptions = [
        { breakpoint: '1400px', numVisible: 5, numScroll: 1 },
        { breakpoint: '1199px', numVisible: 4, numScroll: 1 },
        { breakpoint: '991px', numVisible: 3, numScroll: 1 },
        { breakpoint: '767px', numVisible: 2, numScroll: 1 },
        { breakpoint: '575px', numVisible: 1, numScroll: 1 }
    ];
    
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

    return (
        <div className='filmes-container'>
            <h3>Filmes Populares</h3>
            <Carousel value={filmesPopulares} numScroll={1} numVisible={6} responsiveOptions={responsiveOptions} itemTemplate={contentCard} circular showIndicators={false} />

            <h3 className="mt-5">Clássicos do Terror</h3>
            <Carousel value={classicos} numScroll={1} numVisible={6} responsiveOptions={responsiveOptions} itemTemplate={contentCard} circular showIndicators={false} />

            <h3 className="mt-5">Ícones do Slasher</h3>
            <Carousel value={iconesSlasher} numScroll={1} numVisible={6} responsiveOptions={responsiveOptions} itemTemplate={contentCard} circular showIndicators={false} />

            <h3 className="mt-5">Terror Psicológico</h3>
            <Carousel value={terrorPsicologico} numScroll={1} numVisible={6} responsiveOptions={responsiveOptions} itemTemplate={contentCard} circular showIndicators={false} />
            
            <h3 className="mt-5">Found Footage</h3>
            <Carousel value={foundFootage} numScroll={1} numVisible={6} responsiveOptions={responsiveOptions} itemTemplate={contentCard} circular showIndicators={false} />
            
            <h3 className="mt-5">Horror Corporal</h3>
            <Carousel value={horrorCorporal} numScroll={1} numVisible={6} responsiveOptions={responsiveOptions} itemTemplate={contentCard} circular showIndicators={false} />
        </div>
    );
}
