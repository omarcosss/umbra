import React from "react";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";

interface RouteItem {
  label: string;
  route: string;
}
type RouteList = RouteItem[];

export default function Perfil(){
    return(
        <>
            <Breadcrumbs routeList={[
                { label: "Membros", route: "/" },
                { label: "Fulana de Town", route: "/perfil" },
            ] as RouteList} />
            <div>perfil</div>
        </>
    );
}