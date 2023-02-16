import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAPS_APIKEY } from "@env"
import { useDispatch } from 'react-redux'
import { setDestination } from '../slices/navSlice'
import { useNavigation } from '@react-navigation/native'
import NavFavorites from './NavFavorites'
import { Icon } from 'react-native-elements'

const NavigateCard = () => {

  const dispatch = useDispatch()
  const navigation = useNavigation()

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center pt-5 text-xl`}>Good Morning, David.</Text>
      <View>
        <View>
          <GooglePlacesAutocomplete
            fetchDetails={true}
            placeholder='Where to?'
            debounce={400}
            nearbyPlacesAPI="GooglePlacesSearch"
            styles={toInputBoxStyles}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: "cs"
            }}
            enablePoweredByContainer={false}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                })
              )
              navigation.navigate('RideOptionsCard')
            }}
            minLength={2}
          />
        </View>
        <NavFavorites/>
      </View>
      <View style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
        <TouchableOpacity 
          style={tw`flex flex-row justify-between bg-black w-24 px-3 py-3 rounded-full`}
          onPress={() => navigation.navigate('RideOptionsCard')}
        >
          <Icon 
            name='car'
            type='font-awesome'
            color='white'
            size={20}
          />
          <Text style={tw`text-white text-center`}>Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}>
          <Icon 
            name='fast-food-outline'
            type='ionicon'
            color='white'
            size={20}
          />
          <Text style={tw`text-white text-center`}>Eats</Text>
        </TouchableOpacity>       
      </View>
    </SafeAreaView>
  )
}

export default NavigateCard

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: '#DDDDDF',
    borderRadius: 0,
    fontSize: 18,
    borderRadius: 20
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
})