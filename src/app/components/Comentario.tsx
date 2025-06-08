import { ChatTextIcon, ThumbsDownIcon, ThumbsUpIcon } from "@phosphor-icons/react/dist/ssr"
import "./Comentario.scss"
export default function Comentario(){
    return (<div>
        <div className="Usuario"> <img src="https://img.freepik.com/vetores-premium/ilustracao-plana-vetorial-em-escala-de-cinza-avatar-perfil-de-usuario-icone-de-pessoa-imagem-de-perfil-de-silhueta-neutra-de-genero-adequado-para-perfis-de-midia-social-icones-protetores-de-tela-e-como-um-modelo-x9xa_719432-2210.jpg?semt=ais_hybrid&w=740" alt="" />
            @Seriefanático_Terror ° 20m atrás
        </div>
        <div>COMENTARIO  COMENTARIOCOMENTARIOCOMENTARIOCOMENTARIOCOMENTARIOCOMENTARIOCOMENTARIOCOMENTARIOCOMENTARIOCOMENTARIOCOMENTARIOCOMENTARIOCOMENTARIOCOMENTARIOCOMENTARIOCOMENTARIO</div>
        <div className="Likes"> 
            <ThumbsUpIcon size={18}/> 
            <ThumbsDownIcon size={18}/>
            <ChatTextIcon size={15}/>
            Responder
        </div>







    </div>)
}
