import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import type { TabItem } from '../../types';

interface TabManagerProps {
  tabs: TabItem[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  orientation?: 'horizontal' | 'vertical';
}

const TabManager: React.FC<TabManagerProps> = ({
  tabs,
  activeTab: controlledActiveTab,
  onTabChange,
  orientation = 'horizontal'
}) => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState(controlledActiveTab || tabs[0]?.id);
  const [indicatorStyle, setIndicatorStyle] = useState({
    position: orientation,
    top: 0,
    left: 0,
    width: 0,
    height: 0
  });
  
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    if (controlledActiveTab) {
      setActiveTab(controlledActiveTab);
    }
  }, [controlledActiveTab]);

  useEffect(() => {
    const currentTab = tabRefs.current[activeTab];
    if (currentTab) {
      if (orientation === 'horizontal') {
        setIndicatorStyle({
          position: orientation,
          left: currentTab.offsetLeft,
          width: currentTab.offsetWidth,
          top: 0,
          height: 0
        });
      } else {
        setIndicatorStyle({
          position: orientation,
          top: currentTab.offsetTop,
          height: currentTab.offsetHeight,
          left: 0,
          width: 0
        });
      }
    }
  }, [activeTab, orientation]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  return (
    <div className="space-y-4">
      <div
        className={`relative ${orientation === 'horizontal' ? 'flex space-x-4' : 'flex flex-col space-y-2'}`}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            ref={(el) => (tabRefs.current[tab.id] = el)}
            onClick={() => handleTabClick(tab.id)}
            className={`relative px-4 py-2 text-sm font-medium transition-colors
              ${activeTab === tab.id 
                ? 'text-blue-600 bg-blue-50' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}
              rounded-lg
            `}
          >
            <div className="flex items-center space-x-2">
              {tab.icon && <div className="w-5 h-5">{tab.icon}</div>}
              <span>{tab.label}</span>
            </div>
          </button>
        ))}

        <motion.div
          className="absolute bg-blue-500"
          style={{
            height: orientation === 'horizontal' ? '2px' : indicatorStyle.height,
            width: orientation === 'horizontal' ? indicatorStyle.width : '2px',
            bottom: orientation === 'horizontal' ? 0 : undefined,
            right: orientation === 'vertical' ? 0 : undefined,
            left: orientation === 'horizontal' ? indicatorStyle.left : undefined,
            top: orientation === 'vertical' ? indicatorStyle.top : undefined,
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
      >
        {tabs.find(tab => tab.id === activeTab)?.content}
      </motion.div>
    </div>
  );
};

export default TabManager;