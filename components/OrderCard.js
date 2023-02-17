import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'tailwind-react-native-classnames'
import { Image } from 'react-native-elements'

const OrderCard = () => {
  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <Text style={tw`text-center text-xl pb-3`}>Your driver is on its way.</Text>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center'
        }}
        >
          <Image
            style={{
              width: 100,
              height: 100,
              resizeMode: 'contain',
            }}
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
            }}
          />
        </View>
        <Text style={tw`text-center text-xl pb-3`}>Thanks for choosing our services.</Text>
      </View>
    </SafeAreaView>
  )
}

export default OrderCard