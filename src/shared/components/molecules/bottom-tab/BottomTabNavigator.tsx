import rs from '@/shared/utilities/responsiveSize';
import React from 'react';
import { StyleSheet } from 'react-native';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@/theme';
import TabIcon from './TabIcon';
import routes from '@/navigation/routes';
import { Colors } from '@/theme/types/colors';
import { TabItem } from './type';

interface BottomTabProps {
  tabs: TabItem[];
}

const Tab = createBottomTabNavigator();

const TabBarIcon = ({
  item,
  focused,
  color,
  size,
  colors,
}: {
  item: TabItem;
  focused: boolean;
  color: string;
  size: number;
  colors: Colors;
}) => (
  <TabIcon
    name={focused && item.activeIcon ? item.activeIcon : item.icon}
    size={size}
    color={color}
    badge={item.badge}
    badgeColor={colors.error}
    badgeTextColor={colors.white}
  />
);

const getTabScreenOptions = (item: TabItem, styles: ReturnType<typeof bottomTabStyles>, colors: Colors) => {
  return {
    tabBarIcon: ({ focused, color, size }: { focused: boolean; color: string; size: number }) => (
      <TabBarIcon
        item={item}
        focused={focused}
        color={color}
        size={size}
        colors={colors}
      />
    ),
    tabBarLabel: item.label,
    lazy: true,
  };
};

// Move the tab bar component outside render
const CustomTabBar = (props: any) => <BottomTabBar {...props} />;

const BottomTab: React.FC<BottomTabProps> = ({ tabs }) => {
  const { colors } = useTheme();
  const styles = bottomTabStyles(colors);

  const screenOptions = {
    headerShown: false,
    tabBarShowLabel: false,
    tabBarActiveTintColor: colors.primary,
    tabBarInactiveTintColor: colors.gray1,
    tabBarHideOnKeyboard: true,
    tabBarStyle: [
      styles.tabBar,
      {
        height: rs(70),
      },
    ],
  };

  return (
    <Tab.Navigator
      initialRouteName={tabs[0]?.id || routes.home}
      backBehavior="initialRoute"
      screenOptions={screenOptions}
      tabBar={CustomTabBar}
    >
      {tabs.map((item, index) => (
        <Tab.Screen
          key={item.id || index}
          name={item.id}
          component={item.component}
          options={getTabScreenOptions(item, styles, colors)}
        />
      ))}
    </Tab.Navigator>
  );
};

const bottomTabStyles = (colors: Colors) =>
  StyleSheet.create({
    tabBar: {
      borderTopColor: colors.gray8,
      borderTopWidth: 0.5,
      paddingTop: rs(16),
    },
  });

export default BottomTab;
