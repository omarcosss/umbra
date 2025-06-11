"use client"

import React, { useState, ReactNode } from "react";
import "./styles.scss";

interface TabItem {
  label: string;
  content: ReactNode;
}
interface TabsSectionProps {
  tabs: TabItem[],
  alignment: 'start' | 'center' | 'end';
}

export default function TabsSection ({ tabs, alignment='center' }: TabsSectionProps) {
    const [currentTab, setCurrentTab] = useState<TabItem>(tabs[0]);
    
    const switchTabs = (tab: TabItem) => {
        setCurrentTab(tab)
    }

    return(
        <>
            <nav className={`tabs-section-nav ${alignment}`}>
                {tabs.map((tab, index) => (
                    <button key={index} className={`tabs-section-button${currentTab == tab ? " active" : ""}`}
                        onClick={() => (switchTabs(tab))}>
                        {tab.label}
                    </button>
                ))}
            </nav>
            <div className="tabs-section-container">
                {tabs.map((tab, index) => (
                    <section key={index} className={`tabs-section${currentTab == tab ? " active" : ""}`}>
                        {tab.content}
                    </section>
                ))}
            </div>
        </>
    )
}