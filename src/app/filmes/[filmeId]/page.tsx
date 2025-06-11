'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Tag } from 'primereact/tag';
import { Image } from 'primereact/image';
import { Rating } from "primereact/rating";
import { PlusIcon, SkullIcon, ShareIcon } from '@phosphor-icons/react';
import Button from '@/app/components/Button';
import './styles.scss'; // Reutilize o mesmo estilo da página de série, se aplicável

// Interface para o objeto de conteúdo
interface ContentItem {
    name: string;
    image: string;
    type: 'filme' | 'serie';
    description: string;
}

export default function FilmeDetalhe() {
    const params = useParams();
    const filmeId = params.filmeId as string; // Extrai o ID do filme da URL

    const [filme, setFilme] = useState<ContentItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [rating, setRating] = useState(4);

    useEffect(() => {
        const fetchFilmeData = async () => {
            if (!filmeId) return;

            const decodedFilmeId = decodeURIComponent(filmeId);
            setLoading(true);
            try {
                const response = await fetch('/dados.json');
                if (!response.ok) {
                    throw new Error('Falha ao carregar o banco de dados.');
                }
                const data = await response.json();
                
                // Busca o filme específico no objeto 'conteudo'
                const filmeData = data.conteudo[decodedFilmeId];

                if (filmeData && filmeData.type === 'filme') {
                    setFilme(filmeData);
                } else {
                    throw new Error('Filme não encontrado.');
                }

            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFilmeData();
    }, [filmeId]); // O efeito roda novamente se o ID na URL mudar

    if (loading) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <ProgressSpinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className='container mx-auto p-4 text-center'>
                <h2 className="text-2xl text-red-500 font-bold mb-4">Erro</h2>
                <p>{error}</p>
                <Link href="/filmes" className="mt-4 inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                    Voltar para Filmes
                </Link>
            </div>
        );
    }

    if (!filme) {
        return null;
    }

    return (
        <div className="">
            <div className="filme-details">
                <div className="filme-details__poster">
                    <Image src={filme.image} alt={`Pôster de ${filme.name}`} width="100%" preview />
                </div>
                <div className="filme-details__info">
                    <h1>{filme.name}</h1>
                    <Rating value={rating} onChange={(e) => setRating(e.value ?? 0)}
                        cancel={false}
                        className="mb-4"
                        onIcon={<SkullIcon size={24} weight='fill' />}
                        offIcon={<SkullIcon size={24} />}
                    />
                    <p>{filme.description}</p>
                    <hr />
                    <div className="serie-details__info__availability">
                        <p>Disponivel em:</p>
                        <div className="streamings"></div>
                    </div>
                </div>
                <div className="filme-details__actions">
                    <Button title='Adicionar à lista' icon={PlusIcon} />
                    <Button title='Compartilhar' icon={ShareIcon} />
                </div>
            </div>
        </div>
    );
}
