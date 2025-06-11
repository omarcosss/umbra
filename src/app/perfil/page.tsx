import React from "react";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import TabsSection from "../components/TabsSection/TabsSection";

const ProfilePageHeader = () => {
    return(
        <p>Abba</p>
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
            <TabsSection tabs={[
                {label: "Estatísticas", content: <SectionStatistics/>},
                {label: "Listas", content: <SectionLists/>},
                {label: "Comentários", content: <SectionComments/>}
            ]} />
        </>
    );
}