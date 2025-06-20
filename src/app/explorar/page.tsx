'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Carousel } from '@/app/components/Carousel';
import { ProgressSpinner } from 'primereact/progressspinner'; // Para o loading
import { Knife, Ghost, Gaslight, Scratch, Masks, HauntedHouse, Amulet, Bones } from '../components/CustomIcons/Knife';
import "./styles.scss";
import Link from 'next/link';

const useResponsiveValues = () => {
    const [values, setValues] = useState({ numVisible: 5, numScroll: 5 });

    const calculateValues = useCallback(() => {
        const width = window.innerWidth;
        if (width < 768) { // Telas pequenas (mobile)
            setValues({ numVisible: 3, numScroll: 3 });
        } else if (width < 991) { // Telas um pouco maiores (sm)
            setValues({ numVisible: 4, numScroll: 4 });
        } else if (width < 1199) { // Tablets (md)
            setValues({ numVisible: 5, numScroll: 5 });
        } else { // Desktops (lg e acima)
            setValues({ numVisible: 6, numScroll: 6 });
        }
    }, []);

    useEffect(() => {
        calculateValues();
        window.addEventListener('resize', calculateValues);
        return () => window.removeEventListener('resize', calculateValues);
    }, [calculateValues]);

    return values;
};

type categoryButtonProps = {
    icon: React.ReactNode,
    name: string,
}
const CategoryButton = ({icon, name}: categoryButtonProps) => {
    return(
        <div className="category-button">
            {icon}
            <span>{name}</span>
        </div>
    );
};

export default function Explorar(){

    const { numVisible, numScroll } = useResponsiveValues();

    
    // Tipos para os dados do nosso JSON
    type ContentItem = {
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
    // Estados para armazenar as listas de cada categoria
    const [classicos, setClassicos] = useState<ContentCardProps[]>([]);
    const [emAlta, setEmAlta] = useState<ContentCardProps[]>([]);
    const [paraVoce, setParaVoce] = useState<ContentCardProps[]>([]);
    const [bonecosAssassinos, setBonecosAssassinos] = useState<ContentCardProps[]>([]);
    const [iconesSlasher, setIconesSlasher] = useState<ContentCardProps[]>([]);
    const [misterioSuspense, setMisterioSuspense] = useState<ContentCardProps[]>([]);

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
                        // O Carousel espera o formato { content: { id, name, image, type } }
                        return { content: { id, name: item.name, image: item.image, type: item.type } };
                    });
                };

                // Monta as listas para cada categoria e atualiza os estados
                setClassicos(buildCategoryList(data.categorias.classicos));
                setEmAlta(buildCategoryList(data.categorias.emAlta));
                setParaVoce(buildCategoryList(data.categorias.paraVoce));
                setBonecosAssassinos(buildCategoryList(data.categorias.bonecosAssassinos));
                setIconesSlasher(buildCategoryList(data.categorias.iconesSlasher));
                setMisterioSuspense(buildCategoryList(data.categorias.misterioESuspense));

            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                    console.error("Erro ao buscar os dados:", err);
                } else {
                    setError("Erro desconhecido ao buscar os dados.");
                    console.error("Erro desconhecido ao buscar os dados:", err);
                }
            } finally {
                setLoading(false); // Termina o loading, com sucesso ou erro
            }
        };

        fetchData();
    }, []); // O array vazio [] faz com que o useEffect rode apenas uma vez

    // Template para cada item do Carousel
    const contentCard = (data: ContentCardProps) => {
        const { id, name, image, type } = data.content;
        const url = `/${type}s/${id}`; 

        return (
            <Link href={url} className="content-card" aria-label={`Ver detalhes de ${name}`}>
                <img 
                    src={image} 
                    alt={name} 
                    className={`cursor-pointer pr-4 cover cover-${id}`}
                    data-tooltip={name}
                />
            </Link>
        );
    };

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

    

    // --- RENDERIZAÇÃO PRINCIPAL ---
    return(
        <div className='explorar-container'>
            <h1>Mergulhe no horror</h1>
            <div className='categories-container'>
                <CategoryButton name="Slasher" icon={<Knife />} />
                <CategoryButton name="Sobrenatural" icon={<Ghost />} />
                <CategoryButton name="Psicológico" icon={<Gaslight />} />
                <CategoryButton name="Criaturas" icon={<Scratch />} />
                <CategoryButton name="Comédia de Terror" icon={<Masks />} />
                <CategoryButton name="Home Invasion" icon={<HauntedHouse />} />
                <CategoryButton name="Sci-Fi" icon={<Amulet />} />
                <CategoryButton name="Body Horror" icon={<Bones />} />
            </div>
            <h3>Clássicos</h3>
            <Carousel value={classicos} numScroll={numScroll} numVisible={numVisible} itemTemplate={contentCard} />

            <h3 className="mt-5">Em Alta</h3>
            <Carousel value={emAlta} numScroll={numScroll} numVisible={numVisible} itemTemplate={contentCard} />
            
            <h3 className="mt-5">Ícones do Slasher</h3>
            <Carousel value={iconesSlasher} numScroll={numScroll} numVisible={numVisible} itemTemplate={contentCard} />

            <h3 className="mt-5">Mistério e Suspense</h3>
            <Carousel value={misterioSuspense} numScroll={numScroll} numVisible={numVisible} itemTemplate={contentCard} />

            <h3 className="mt-5">Bonecos(as) Assassinos</h3>
            <Carousel value={bonecosAssassinos} numScroll={numScroll} numVisible={numVisible} itemTemplate={contentCard} />

            <h3 className="mt-5">Para Você</h3>
            <Carousel value={paraVoce} numScroll={numScroll} numVisible={numVisible} itemTemplate={contentCard} />
        </div>
    );
}