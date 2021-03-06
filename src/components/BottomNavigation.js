import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

//import assets icons
import Home from '../assets/images/home.svg';
import HomeActive from '../assets/images/homeActive.svg';
import Shop from '../assets/images/cart.svg';
import ShopActive from '../assets/images/cartActive.svg';
import Bag from '../assets/images/bag.svg';
import BagActive from '../assets/images/bagActive.svg';
import Favorites from '../assets/images/favorite.svg';
import FavoritesActive from '../assets/images/favoriteActive.svg';
import Profile from '../assets/images/profile.svg';
import ProfileActive from '../assets/images/profileActive.svg';

const BottomNavigation = ({state, descriptors, navigation}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const Icon = () => {
          if (label === 'Home') {
            return isFocused ? <HomeActive /> : <Home />;
          }
          if (label === 'Shop') {
            return isFocused ? <ShopActive /> : <Shop />;
          }
          if (label === 'Bag') {
            return isFocused ? <BagActive /> : <Bag />;
          }
          if (label === 'Favorites') {
            return isFocused ? <FavoritesActive /> : <Favorites />;
          }
          if (label === 'Profile') {
            return isFocused ? <ProfileActive /> : <Profile />;
          }
          return <Home />;
        };

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.iconTab}>
            <Icon />
            <Text style={styles.text(isFocused)}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingVertical: 13,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  iconTab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: (isFocused) => ({
    color: isFocused ? '#32C33B' : '#C8C8C8',
    fontSize: 13,
    marginTop: 5,
  }),
});
