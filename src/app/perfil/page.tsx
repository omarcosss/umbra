"use client"

import React from "react";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import TabsSection from "../components/TabsSection/TabsSection";
import Image from "next/image";
import "./styles.scss";
import { UserPlusIcon, ShareNetworkIcon , IconWeight } from "@phosphor-icons/react";

const ProfileMetrics = () => {
    return (
        <ul className="profile-metrics">
            <li>
                <span>520</span> seguindo
            </li>
            <li>
                <span>40k</span> seguidores
            </li>
            <li>
                <span>382</span> comentários
            </li>
        </ul>
    )
}

const ProfilePageHeader = () => {
    return(
        <section className="profile-header">
            <Image src="/profilepic.png" alt="" width={160} height={160} priority={true} />
            <div className="profile-content">
                <h1>Fulana de Town</h1>
                <p>Lover of all things spooky!</p>
                <hr/>
                <ProfileMetrics/>
            </div>
            <div className="profile-actions">
                <button>Seguir<UserPlusIcon size={15}/><UserPlusIcon size={15} weight="fill"/></button>
                <button>Compartilhar<ShareNetworkIcon size={15}/><ShareNetworkIcon size={15} weight="fill"/></button>
            </div>
        </section>
    )
}

const SectionStatistics = () => {
    return(
        <p>Estatísticas</p>
    )
}

const SectionLists = () => {
    return(
        <p>Listas</p>
    )
}

const SectionComments = () => {
    return(
        <p>Comentários</p>
    )
}

export default function Perfil(){
    return(
        <>
            <Breadcrumbs routeList={[
                { label: "Membros", route: "/" },
                { label: "Fulana de Town", route: "/perfil" },
            ]} />
            <ProfilePageHeader />
            <TabsSection alignment='center' tabs={[
                {label: "Estatísticas", content: <SectionStatistics/>},
                {label: "Listas", content: <SectionLists/>},
                {label: "Comentários", content: <SectionComments/>}
            ]} />
        </>
    );
}