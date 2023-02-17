import { 
  FlatList, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View 
} from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'
import tw from 'tailwind-react-native-classnames'
import { useDispatch, useSelector } from 'react-redux'
import { selectOrigin, setDestination, setOrigin } from '../slices/navSlice'
import { useNavigation } from '@react-navigation/native'

const data = [
  {
    id: "123",
    icon: "home",
    location: "Home",
    destination: "Praha 5, Česko",
    coords: {
      lat: 50.0697589,
      lng: 14.3777983
    }
  },
  {
    id: "456",
    icon: "briefcase",
    location: "Work",
    destination: "Brno, Česko",
    coords: {
      lat: 49.1950602,
      lng: 16.6068371
    }
  }
]

const NavFavorites = ({ type }) => {

  const dispatch = useDispatch()
  const navigation = useNavigation()
  const origin = useSelector(selectOrigin)
    
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => (
        <View
          style={[tw`bg-gray-200`, { height: 0.5 }]}
        />
      )}
      renderItem={({ item: { location, destination, icon, coords,} }) => (
        <TouchableOpacity
          disabled={type === 'destination' && origin.description === destination}
          style={tw`flex-row items-center p-5`}
          onPress={() => {
            if (type === 'origin') {
              dispatch(
                setOrigin({
                  location: coords,
                  description: destination         
                })
              )
              dispatch(setDestination(null))
              navigation.navigate('Map')
            }
            else {
              dispatch(
                setDestination({
                  location: coords,
                  description: destination
                })
              )
              navigation.navigate('RideOptionsCard')
            }
          }}
        >
          <Icon
            style={tw`mr-4 rounded-full bg-gray-300 p-3`}
            name={icon}
            type='ionicon'
            color='white'
            size={18}
          />
          <View>
            <Text style={tw`font-semibold text-lg`}>{location}</Text>
            <Text style={tw`text-gray-500`}>{destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  )
}

export default NavFavorites