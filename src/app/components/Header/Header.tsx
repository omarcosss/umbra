"use client"

import Image from "next/image";
import "./styles.scss";
import Link from "next/link";
import { BellSimpleIcon, CaretDownIcon, EyeIcon, UserCircleIcon, MagnifyingGlassIcon, IconWeight } from "@phosphor-icons/react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Modal from "../Dialogs/Modal";
import Input from "../Input/Input";

function SearchInput(){
    return(
        <div className="search-input-container">
            <input type="search" name="search" id="search" className="search-input" placeholder=" "/>
            <label htmlFor="search" className="search-input-label">Buscar</label>
        </div>
    );
}

interface NavLinkProps{
  href: string;
  label: string;
  isActive?: boolean;
}

const NavLink = ({ href, label, isActive }: NavLinkProps) =>{
  return (
    <Link href={href} className={"nav-link" + (isActive ? ' active' : ' ')}>
      {label}
    </Link>
  );
}

interface UserMenuProps{
  isOpen: boolean;
}

const UserMenu = ({isOpen}: UserMenuProps) => {
  return(
    <div className={"user-menu" + (isOpen ? ' open' : '')}>
      <span>Olá, Marcos!</span>
      <Link href={"/perfil"}>Meu Perfil</Link>
      <Link href={"/configurações"}>Configurações</Link>
      <Link href={"/login"}>Sair</Link>
    </div>
  );
}

type MobileSearchButtonProps = {
  searchIsOpen: boolean;
  setSearchIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobileSearchButton = ({searchIsOpen, setSearchIsOpen}: MobileSearchButtonProps) => {
  const [iconWeight, setIconWeight] = useState<IconWeight>('regular');
  const toggleMobileSearch = () => {
    setSearchIsOpen(!searchIsOpen);
  }
  return(
    <button 
      className="search-menu-button"
      onMouseEnter={() => setIconWeight('bold')}
      onClick={toggleMobileSearch}
    >
      <MagnifyingGlassIcon size={24} weight={iconWeight} />
      <CaretDownIcon size={10} weight={iconWeight} />
    </button>
  );
}

const UserButton = () => {
  const [iconWeight, setIconWeight] = useState<IconWeight>('regular');
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }
  return(
    <button 
      className="user-menu-button"
      onMouseEnter={() => setIconWeight('bold')}
      onMouseLeave={() => { setIconWeight('regular'); setIsOpen(false); }} 
      onClick={toggleMenu}
    >
      <UserMenu isOpen={isOpen} />
      <UserCircleIcon size={24} weight={iconWeight} />
      <CaretDownIcon size={10} weight={iconWeight} />
    </button>
  );
}

interface NotificationsMenuProps{
  isOpen: boolean;
}

const Notification = ({icon, text, date}: {icon: string, text: string, date: string}) => {
  return (
    <div className="notification">
      <img className="notification-icon" src={icon} alt="Notification Icon" />
      <div className="notification-content">
        <div className="notification-content-text">{text}</div>
        <div className="notification-content-date">{date}</div>
      </div>
    </div>
  );
}

const NotificationsMenu = ({isOpen}: NotificationsMenuProps) => {
  return(
    <div className={"notifications-menu" + (isOpen ? ' open' : '')}>
      <span>Notificações</span>
      <Notification 
        icon="https://picsum.photos/id/616/300/300" 
        text="Você tem um novo seguidor!" 
        date="Hoje às 14:30"
      />
      <Notification
        icon="https://picsum.photos/id/666/300/300"
        text="Seu amigo @terror_fanatic acabou de assistir 'A Bruxa' e deu 5 estrelas!"
        date="Hoje às 21:00"
      />

      <Notification
        icon="https://picsum.photos/id/13/300/300"
        text="Alguém comentou na sua análise de 'Pânico'!"
        date="Hoje às 19:45"
      />

      <Notification
        icon="https://picsum.photos/id/888/300/300"
        text="'Halloween Ends' acabou de ser adicionado à sua lista de observação!"
        date="Ontem às 18:00"
      />

      <Notification
        icon="https://picsum.photos/id/999/300/300"
        text="O usuário @filmes_assustadores começou a te seguir!"
        date="Ontem às 15:30"
      />

      <Notification
        icon="https://picsum.photos/id/777/300/300"
        text="Uma nova lista de 'Os 10 Filmes de Terror Mais Perturbadores' foi criada por @mestre_do_horror!"
        date="5 de Junho às 11:00"
      />
    </div>
  );
}

const NotificationsButton = () => {
  const [iconWeight, setIconWeight] = useState<IconWeight>('regular');
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }
  return(
    <button 
      className="notifications-menu-button"
      onMouseEnter={() => setIconWeight('bold')}
      onMouseLeave={() => { setIconWeight('regular'); setIsOpen(false); }} 
      onClick={toggleMenu}
    >
      <NotificationsMenu isOpen={isOpen} />
      <BellSimpleIcon size={24} weight={iconWeight} />
      <CaretDownIcon size={10} weight={iconWeight} />

    </button>
  );
}

type LogButtonProps = {
  setShowLogModal: (show: boolean) => void;
}
const LogButton = ({ setShowLogModal }: LogButtonProps) => {
  const [iconWeight, setIconWeight] = useState<IconWeight>('regular');
  return(
    <button onClick={() => setShowLogModal(true)} className="log-button" onMouseEnter={() => setIconWeight('fill')} onMouseLeave={() => setIconWeight('regular')}>
      <EyeIcon size={15} weight={iconWeight} />
      <span>Marcar como assistido</span>
    </button>
  );
}

export default function Header(){
  const [showLogModal, setShowLogModal] = useState(false);
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const pathname = usePathname();
  return(
    <header>
      <div className="container">
        <div className={`logo-container${searchIsOpen ? " show-search" : ""}`}>
          <Link href={"/"}>
            <Image src="/logo.png" alt="" width={201.5} height={125} priority={true} />
          </Link>
          <SearchInput />
        </div>
        <div className="actions-container">
          <nav>
            <NavLink href="/" label="Início" isActive={pathname === '/' ? true : false} />
            <NavLink href="/series" label="Séries" isActive={pathname === '/series' ? true : false}/>
            <NavLink href="/filmes" label="Filmes" isActive={pathname === '/filmes' ? true : false}/>
            <NavLink href="/explorar" label="Explorar" isActive={pathname === '/explorar' ? true : false}/>
            
          </nav>
          <LogButton setShowLogModal={setShowLogModal} />
          <div className="user-container">
            <MobileSearchButton searchIsOpen={searchIsOpen} setSearchIsOpen={setSearchIsOpen} />
            <NotificationsButton />
            <UserButton />
          </div>
        </div>
      </div>
      <Modal
        isOpen={showLogModal}
        onClose={() => setShowLogModal(false)}
        title="Marcar como assistido"
        className=""
        overlayClassName=" "
        disableOverlayClick
      >
        <Input placeholder="Digite o nome da série ou filme" type="text"/>
      </Modal>
    </header>
    
  )
}