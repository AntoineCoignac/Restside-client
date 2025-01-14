"use client";

interface TabNavProps {
    tabs: string[];
    activeTab: number;
    setActiveTab: (index: number) => void;
}

export default function TabNav({tabs, activeTab, setActiveTab} : TabNavProps) {
    return (
      <div className="flex ai-center g-12">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`t-14 p-4 ${activeTab === index ? "c-white tw-600" : "c-grey tw-400 h-t-underline"}`}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </button>
        ))}
      </div>
    );
}