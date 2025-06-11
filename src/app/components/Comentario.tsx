import React from "react";
import { ChatTextIcon, ThumbsDownIcon, ThumbsUpIcon } from "@phosphor-icons/react/dist/ssr";
import "./Comentario.scss";

// Define the props interface for the Comentario component
interface ComentarioProps {
  avatarSrc: string;
  userName: string;
  timeAgo: string;
  commentText: string;
  likes: number;
  dislikes: number;
  hashtags?: string[]; // Optional array of hashtags
}

export const genericHorrorComments: ComentarioProps[] = [
  {
    // UI Avatars: Generates "TN" avatar
    avatarSrc: "https://ui-avatars.com/api/?name=Terror+Noturno_87&background=random&color=fff",
    userName: "TerrorNoturno_87",
    timeAgo: "10min atrás",
    commentText: "Essa cena me deixou arrepiado! O design de som é impecável.",
    likes: 55,
    dislikes: 2,
    hashtags: ["Horror", "Suspense"],
  },
  {
    // UI Avatars: Generates "GE" avatar
    avatarSrc: "https://ui-avatars.com/api/?name=Grito+Na+Escuridão&background=random&color=fff",
    userName: "GritoNaEscuridão",
    timeAgo: "30min atrás",
    commentText: "O que vocês acharam da reviravolta? Não esperava por isso!",
    likes: 80,
    dislikes: 5,
    hashtags: ["PlotTwist", "TerrorPsicologico"],
  },
  {
    // UI Avatars: Generates "PV" avatar
    avatarSrc: "https://ui-avatars.com/api/?name=Pesadelos+Vivos&background=random&color=fff",
    userName: "PesadelosVivos",
    timeAgo: "1h atrás",
    commentText: "A atmosfera é tão densa que dá pra sentir o medo. Perfeito para uma noite chuvosa.",
    likes: 120,
    dislikes: 8,
    hashtags: ["AmbienteSinistro", "FilmeDeTerror"],
  },
  {
    // UI Avatars: Generates "MD" avatar
    avatarSrc: "https://ui-avatars.com/api/?name=Medo+Profundo&background=random&color=fff",
    userName: "MedoProfundo",
    timeAgo: "2h atrás",
    commentText: "Aquela criatura... ugh, vai me dar pesadelos por semanas!",
    likes: 95,
    dislikes: 3,
    hashtags: ["Monstro", "Criatura"],
  },
  {
    // UI Avatars: Generates "FC" avatar
    avatarSrc: "https://ui-avatars.com/api/?name=Fobia+Coletiva&background=random&color=fff",
    userName: "FobiaColetiva",
    timeAgo: "4h atrás",
    commentText: "Esse filme/série realmente explora os medos primordiais. Muito inteligente!",
    likes: 60,
    dislikes: 1,
    hashtags: ["TerrorInteligente", "Psicologico"],
  },
  {
    // UI Avatars: Generates "CZ" avatar
    avatarSrc: "https://ui-avatars.com/api/?name=Coragem+Zero&background=random&color=fff",
    userName: "CoragemZero",
    timeAgo: "6h atrás",
    commentText: "Assisti com as luzes acesas, e mesmo assim me assustei várias vezes. Recomendo!",
    likes: 70,
    dislikes: 0,
    hashtags: ["JumpScare", "Recomendacao"],
  },
  {
    // UI Avatars: Generates "SDT" avatar
    avatarSrc: "https://ui-avatars.com/api/?name=Sobrevivente+Do+Terror&background=random&color=fff",
    userName: "SobreviventeDoTerror",
    timeAgo: "1 dia atrás",
    commentText: "A trilha sonora é um personagem à parte, aumenta a tensão demais!",
    likes: 110,
    dislikes: 6,
    hashtags: ["TrilhaSonora", "Tensao"],
  },
  {
    // UI Avatars: Generates "CDA" avatar
    avatarSrc: "https://ui-avatars.com/api/?name=Cacador+De+Assombracoes&background=random&color=fff",
    userName: "CaçadorDeAssombrações",
    timeAgo: "2 dias atrás",
    commentText: "Será que teremos mais temporadas? Estou viciado nessa história!",
    likes: 45,
    dislikes: 1,
    hashtags: ["SerieDeTerror", "Expectativas"],
  },
  {
    // UI Avatars: Generates "FDG" avatar
    avatarSrc: "https://ui-avatars.com/api/?name=Fa+Do+Gore&background=random&color=fff",
    userName: "FãDoGore",
    timeAgo: "3 dias atrás",
    commentText: "Para quem gosta de um terror mais visceral, é um prato cheio. Sem censura!",
    likes: 30,
    dislikes: 0,
    hashtags: ["Gore", "TerrorVisceral"],
  },
  {
    // UI Avatars: Generates "MEP" avatar
    avatarSrc: "https://ui-avatars.com/api/?name=Mente+Em+Panico&background=random&color=fff",
    userName: "MenteEmPânico",
    timeAgo: "4 dias atrás",
    commentText: "Não consigo parar de pensar nesse final! Totalmente perturbador.",
    likes: 75,
    dislikes: 2,
    hashtags: ["FinalChocante", "Perturbador"],
  },
];

export default function Comentario({
  avatarSrc,
  userName,
  timeAgo,
  commentText,
  likes,
  dislikes,
  hashtags,
}: ComentarioProps) {
  return (
    <div className="comentario-container">
      <div className="cabecalho">
        <img
          src={avatarSrc}
          alt={`${userName}'s Avatar`}
          className="avatar"
        />
        <div className="info-usuario">
          <span className="nome-usuario">@{userName}</span>
          <span className="tempo">• {timeAgo}</span>
        </div>
      </div>

      <div className="texto-comentario">
        {commentText}
        {hashtags && hashtags.length > 0 && (
          <div className="hashtags">
            {hashtags.map((tag, index) => (
              <span key={index} className="hashtag">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="rodape">
        <button className="botao-interacao">
          <ThumbsUpIcon size={16} />
          <span>{likes}</span>
        </button>
        <button className="botao-interacao">
          <ThumbsDownIcon size={16} />
          <span>{dislikes}</span>
        </button>
        <button className="botao-responder">
          <ChatTextIcon size={14} />
          <span>Responder</span>
        </button>
      </div>
    </div>
  );
}