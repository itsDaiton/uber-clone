import { 
  FlatList, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View
} from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectTravelTimeInfo } from '../slices/navSlice'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'tailwind-react-native-classnames'
import { Icon, Image } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import "intl"
import "intl/locale-data/jsonp/cs-CZ"

const data = [
  {
    id: "Uber-X-123",
    title: "UberX",
    multiplier: 1,
    image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_485,h_385/f_auto,q_auto/products/carousel/UberX.png"
  },
  {
    id: "Uber-XL-456",
    title: "Uber XL",
    multiplier: 1.2,
    image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_485,h_385/f_auto,q_auto/products/carousel/UberXL.png"
  },
  {
    id: "Uber-LUX-789",
    title: "Uber LUX",
    multiplier: 1.75,
    image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_485,h_385/f_auto,q_auto/products/carousel/Lux.png"
  },
]

const SURGE_CHARGE_RATE = 1.5
const EXCHANGE_RATE = 26.6

const RideOptionsCard = () => {

  const navigation = useNavigation()
  const [selected, setSelected] = useState(null)
  const travelTimeInfo = useSelector(selectTravelTimeInfo)

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View style={tw`pb-0`}>
        <TouchableOpacity
          onPress={() => navigation.navigate('NavigateCard')}
          style={tw`absolute left-5 z-50 p-1 rounded-full`}
        >  
          <Icon name='chevron-left' type='font-awesome'/>
        </TouchableOpacity>
        <Text style={tw`text-center text-xl pb-3`}>Select a Ride - {travelTimeInfo?.distance?.text} </Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: {id, title, multiplier, image}, item }) => (
          <TouchableOpacity
            style={tw`flex-row justify-between items-center px-10 ${id === selected?.id && "bg-gray-200"}`}
            onPress={() => setSelected(item)}
          >
            <Image
              style={{
                width: 85,
                height: 85,
                resizeMode: 'contain'
              }}
              source={{ uri: image }}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text>{travelTimeInfo?.duration?.text}</Text>
            </View>
            <Text style={tw`text-xl`}>
              {new Intl.NumberFormat('cs-cz', {
                style: 'currency',
                currency: 'CZK'
              }).format(
                (travelTimeInfo?.duration?.value * SURGE_CHARGE_RATE * multiplier) / 100 * EXCHANGE_RATE
              )}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View>
        <TouchableOpacity 
          style={tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`} 
          disabled={!selected}
          onPress={() => navigation.navigate('OrderCard')}
        >
          <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default RideOptionsCard