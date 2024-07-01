import { Tabs } from "expo-router";
import Icon from "@src/components/ui/Icon";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#363430",
        tabBarInactiveTintColor: "#363430",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <Icon
              name={
                focused ? "navbar-home-selected" : "navbar-home-notselected"
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="together"
        options={{
          headerTitle: "Ongoing Challenges",
          title: "Together",
          tabBarIcon: ({ focused }) => (
            <Icon
              name={
                focused
                  ? "navbar-together-selected"
                  : "navbar-together-notselected"
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          headerTitle: "Analytics",
          title: "Analytics",
          tabBarIcon: ({ focused }) => (
            <Icon
              name={
                focused
                  ? "navbar-analytics-selected"
                  : "navbar-analytics-notselected"
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <Icon
              name={
                focused
                  ? "navbar-profile-selected"
                  : "navbar-profile-notselected"
              }
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
