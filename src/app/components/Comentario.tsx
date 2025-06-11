import { ChatTextIcon, ThumbsDownIcon, ThumbsUpIcon } from "@phosphor-icons/react/dist/ssr"
import "./Comentario.scss"

export default function Comentario() {
  return (
    <div className="comentario-container">
      <div className="cabecalho">
        <img 
          src="https://img.freepik.com/vetores-premium/ilustracao-plana-vetorial-em-escala-de-cinza-avatar-perfil-de-usuario-icone-de-pessoa-imagem-de-perfil-de-silhueta-neutra-de-genero-adequado-para-perfis-de-midia-social-icones-protetores-de-tela-e-como-um-modelo-x9xa_719432-2210.jpg" 
          alt="Avatar"
          className="avatar"
        />
        <div className="info-usuario">
          <span className="nome-usuario">@Seriefanático_Terror</span>
          <span className="tempo">• 20min atrás</span>
        </div>
      </div>

      <div className="texto-comentario">
        NÃO RESPIRO DESDE O FINAL DA TEMPORADA PASSADA! Começar com a Tabitha naquele hospital (?) e o Boyd ouvindo a voz da Abby (?) foi MALDADE PURA! Esse episódio só serviu pra me deixar mais perdido e ansioso. Que ligação foi aquela no final? E o que eram aquelas coisas novas na floresta? SOCORRO! Preciso de respostas URGENTE! #From #FromT3 #TeoriasFrom
        <div className="hashtags">
          <span className="hashtag">#From</span>
          <span className="hashtag">#FromT3</span>
          <span className="hashtag">#TeoriasFrom</span>
        </div>
      </div>

      <div className="rodape">
        <button className="botao-interacao">
          <ThumbsUpIcon size={16} />
          <span>40</span>
        </button>
        <button className="botao-interacao">
          <ThumbsDownIcon size={16} />
          <span>4</span>
        </button>
        <button className="botao-responder">
          <ChatTextIcon size={14} />
          <span>Responder</span>
        </button>
      </div>
    </div>
  )
}