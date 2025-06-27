import React, { useState, useCallback, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { TabBar } from './TopBar';
import { BottomTabNavigatorProps } from './type';

const BottomTabNavigator: React.FC<BottomTabNavigatorProps> = ({ tabs, initialTab, onTabChange, ...tabBarProps }) => {
  const [activeTab, setActiveTab] = useState(initialTab || tabs[0]?.id || '');

  const handleTabPress = useCallback(
    (tabId: string) => {
      setActiveTab(tabId);
      onTabChange?.(tabId);
    },
    [onTabChange]
  );

  const activeTabComponent = useMemo(() => {
    const currentTab = tabs.find((tab) => tab.id === activeTab);
    return currentTab?.component;
  }, [tabs, activeTab]);

  if (!activeTabComponent) {
    return null;
  }

  const ActiveComponent = activeTabComponent;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ActiveComponent />
      </View>
      <TabBar
        {...tabBarProps}
        tabs={tabs}
        activeTab={activeTab}
        onTabPress={handleTabPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default BottomTabNavigator;
