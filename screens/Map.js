import { TouchableOpacity, View } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import MapComponent from '../components/MapComponent'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import NavigateCard from '../components/NavigateCard'
import RideOptionsCard from '../components/RideOptionsCard'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { setDestination, setOrigin } from '../slices/navSlice'
import OrderCard from '../components/OrderCard'

const Map = () => {

  const Stack = createNativeStackNavigator()
  const navigation = useNavigation()
  const dispatch = useDispatch()

  return (
    <View>
      <TouchableOpacity 
        style={tw`bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full shadow-lg`}
        onPress={() => {             
          dispatch(setDestination(null))   
          dispatch(setOrigin(null))    
          navigation.navigate('Home')
        }
        }
      >
        <Icon
          name='menu'
        />
      </TouchableOpacity>
      <View style={tw`h-1/2`}>
        <MapComponent/>
      </View>
      <View style={tw`h-1/2`}>
        <Stack.Navigator>
          <Stack.Screen
            name="NavigateCard"
            component={NavigateCard}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="RideOptionsCard"
            component={RideOptionsCard}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='OrderCard'
            component={OrderCard}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </View>
    </View>
  )
}

export default Map