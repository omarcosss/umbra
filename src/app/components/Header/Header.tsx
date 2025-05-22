"use client"

import Image from "next/image";
import "./styles.scss";
import Link from "next/link";
import { BellSimpleIcon, CaretDownIcon, EyeIcon, UserCircleIcon, IconWeight } from "@phosphor-icons/react";
import { useState } from "react";
import { usePathname } from "next/navigation";


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

const NotificationsMenu = ({isOpen}: NotificationsMenuProps) => {
  return(
    <div className={"notifications-menu" + (isOpen ? ' open' : '')}>
      <span>Notificações</span>
      <div className="notification">
        <img className="notification-icon" src="https://picsum.photos/200" />
        <div className="notification-content">
          <div className="notification-content-text">
            User123 quer seguir você no Umbra
          </div>
          <div className="notification-content-date">23 dez. 2025</div>
        </div>
      </div>
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

const LogButton = () => {
  const [iconWeight, setIconWeight] = useState<IconWeight>('regular');
  return(
    <button className="log-button" onMouseEnter={() => setIconWeight('fill')} onMouseLeave={() => setIconWeight('regular')}>
      <EyeIcon size={15} weight={iconWeight} />
      <span>Marcar como assistido</span>
    </button>
  );
}

export default function Header(){
  const pathname = usePathname();
  return(
    <header>
      <div className="logo-container">
        <Link href={"/"}>
          <Image src="/logo.png" alt="" width={201.5} height={125} />
        </Link>
      </div>
      <div className="actions-container">
        <SearchInput />
        <nav>
          <NavLink href="/" label="Início" isActive={pathname === '/' ? true : false} />
          <NavLink href="/series" label="Séries" isActive={pathname === '/series' ? true : false}/>
          <NavLink href="/filmes" label="Filmes" isActive={pathname === '/filmes' ? true : false}/>
          <NavLink href="/explorar" label="Explorar" isActive={pathname === '/explorar' ? true : false}/>
          
        </nav>
        <LogButton />
        <NotificationsButton />
        <UserButton />
      </div>
    </header>
    
  )
}