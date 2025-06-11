"use client"

import React from "react";
import Image from "next/image";
import "./styles.scss";
import Link from "next/link";

interface RouteItem {
  label: string;
  route: string;
}
type RouteList = RouteItem[];

interface BreadcrumbsProps {
  routeList: RouteList;
}

export default function Breadcrumbs({ routeList }: BreadcrumbsProps) {
  return(
    <nav className="breadcrumbs">
      {routeList.map((item, index) => (
        <Link href={item.route}>
          {item.label}
        </Link>
      ))}
    </nav>
  )
}