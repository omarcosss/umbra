import React, { useState, useEffect, useCallback } from 'react';

interface CarouselProps<T> {
  value: T[];
  numScroll: number;
  numVisible: number;
  itemTemplate: (item: T) => React.ReactNode;
  header?: React.ReactNode;
}

const ChevronIcon = ({ direction }: { direction: 'left' | 'right' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`transform ${direction === 'right' ? 'rotate-180' : ''}`}
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

export function Carousel<T>({
  value,
  numScroll,
  numVisible,
  itemTemplate,
  header,
}: CarouselProps<T>) {
  // Estado para controlar o índice do primeiro item visível
  const [startIndex, setStartIndex] = useState(0);

  // Memoizando as funções de navegação para evitar recriações desnecessárias
  const prev = useCallback(() => {
    setStartIndex((prevIndex) => {
      const newIndex = prevIndex - numScroll;
      return Math.max(0, newIndex); // Garante que o índice não seja menor que 0
    });
  }, [numScroll]);

  const next = useCallback(() => {
    setStartIndex((prevIndex) => {
      const newIndex = prevIndex + numScroll;
      // Garante que não rolemos além do último conjunto possível de itens
      const maxIndex = value.length - numVisible;
      return Math.min(newIndex, maxIndex);
    });
  }, [numScroll, numVisible, value.length]);

  // Esconde os botões se todos os itens estiverem visíveis
  const showNavigators = value.length > numVisible;

  // Lógica para desabilitar os botões quando no início ou no fim
  const isPrevDisabled = startIndex === 0;
  const isNextDisabled = startIndex >= value.length - numVisible;
  
  // Resetar o índice se as props mudarem
  useEffect(() => {
      setStartIndex(0);
  }, [value, numVisible, numScroll]);


  return (
    <div className="w-full max-w-6xl mx-auto my-8">
      {/* Cabeçalho do carrossel */}
      {header && <div className="mb-4">{header}</div>}

      <div className="flex items-center justify-center">
        {/* Botão de Navegação: Anterior */}
        {showNavigators && (
          <button
            onClick={prev}
            disabled={isPrevDisabled}
            aria-label="Item anterior"
            className={`cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed z-10`}
          >
            <ChevronIcon direction="left" />
          </button>
        )}

        {/* Viewport: A área que esconde os itens que não estão visíveis */}
        <div className="overflow-hidden mx-4 w-full">
          {/* Container dos Itens: Move-se para criar o efeito de rolagem */}
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              // A mágica acontece aqui: movemos o container para a esquerda
              // com base no 'startIndex' e na largura de cada item.
              transform: `translateX(-${(startIndex * 100) / numVisible}%)`,
            }}
          >
            {/* Renderiza cada item */}
            {value.map((item, index) => (
              <div
                key={index}
                className="flex-shrink-0"
                style={{
                  // Cada item ocupa uma porcentagem do container visível
                  width: `${100 / numVisible}%`,
                }}
              >
                <div className="p-2 h-full">
                  {/* Usa a função itemTemplate para renderizar o conteúdo */}
                  {itemTemplate(item)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botão de Navegação: Próximo */}
        {showNavigators && (
          <button
            onClick={next}
            disabled={isNextDisabled}
            aria-label="Próximo item"
            className="cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed z-10`"
          >
            <ChevronIcon direction="right" />
          </button>
        )}
      </div>
    </div>
  );
}