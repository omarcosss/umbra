'use client';

import { useState, useEffect } from 'react';
import { Carousel } from 'primereact/carousel';
import { Tooltip } from 'primereact/tooltip';
import { ProgressSpinner } from 'primereact/progressspinner'; // Para o loading
import { Knife, Ghost, Gaslight } from '../components/CustomIcons/Knife'
import "./styles.scss";
import { KnifeIcon } from '@phosphor-icons/react';

type categoryButtonProps = {
    icon: React.ReactNode,
    name: string,
}
const CategoryButton = ({icon, name}: categoryButtonProps) => {
    return(
        <div className="category-button">
            {icon}
            {name}
        </div>
    );
};

export default function Explorar(){
    
    // Tipos para os dados do nosso JSON
    type ContentItem = {
        name: string;
        image: string;
        type: 'filme' | 'serie';
    };

    type ContentCardProps = {
        content: {
            name: string;
            image: string;
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
                        // O Carousel espera o formato { content: { name, image } }
                        return { content: { name: item.name, image: item.image } };
                    });
                };

                // Monta as listas para cada categoria e atualiza os estados
                setClassicos(buildCategoryList(data.categorias.classicos));
                setEmAlta(buildCategoryList(data.categorias.emAlta));
                setParaVoce(buildCategoryList(data.categorias.paraVoce));
                setBonecosAssassinos(buildCategoryList(data.categorias.bonecosAssassinos));
                setIconesSlasher(buildCategoryList(data.categorias.iconesSlasher));
                setMisterioSuspense(buildCategoryList(data.categorias.misterioESuspense));

            } catch (err: any) {
                setError(err.message);
                console.error("Erro ao buscar os dados:", err);
            } finally {
                setLoading(false); // Termina o loading, com sucesso ou erro
            }
        };

        fetchData();
    }, []); // O array vazio [] faz com que o useEffect rode apenas uma vez

    // Template para cada item do Carousel
    const contentCard = (data: ContentCardProps) => {
        return (
            <div className="content-card">
                <Tooltip target=".cover" mouseTrack mouseTrackLeft={10} />
                <img src={data.content.image} alt={data.content.name} className="w-40 cursor-pointer cover" data-pr-tooltip={data.content.name}/>
            </div>
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

    

    // --- RENDERIZAÇÃO PRINCIPAL ---
    return(
        <div className='explorar-container'>
            <div className="categories-container">
                <CategoryButton name="Slasher" icon={<Knife />} />
                <CategoryButton name="Sobrenatural" icon={<Ghost />} />
                <CategoryButton name="Psicológico" icon={<Gaslight />} />
            </div>
            <h3>Clássicos</h3>
            <Carousel value={classicos} numScroll={1} numVisible={6} responsiveOptions={responsiveOptions} itemTemplate={contentCard} />

            <h3 className="mt-5">Em Alta</h3>
            <Carousel value={emAlta} numScroll={1} numVisible={6} responsiveOptions={responsiveOptions} itemTemplate={contentCard} />
            
            <h3 className="mt-5">Ícones do Slasher</h3>
            <Carousel value={iconesSlasher} numScroll={1} numVisible={6} responsiveOptions={responsiveOptions} itemTemplate={contentCard} />

            <h3 className="mt-5">Mistério e Suspense</h3>
            <Carousel value={misterioSuspense} numScroll={1} numVisible={6} responsiveOptions={responsiveOptions} itemTemplate={contentCard} />

            <h3 className="mt-5">Bonecos(as) Assassinos</h3>
            <Carousel value={bonecosAssassinos} numScroll={1} numVisible={6} responsiveOptions={responsiveOptions} itemTemplate={contentCard} />

            <h3 className="mt-5">Para Você</h3>
            <Carousel value={paraVoce} numScroll={1} numVisible={6} responsiveOptions={responsiveOptions} itemTemplate={contentCard} />
        </div>
    );
}