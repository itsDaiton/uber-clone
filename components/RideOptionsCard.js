import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectDestination, selectOrigin } from '../slices/navSlice'

const RideOptionsCard = () => {

  const origin = useSelector(selectOrigin)
  const destination = useSelector(selectDestination)

  return (
    <View>
      <Text>{origin.description}</Text>
      <Text>{destination.description}</Text>
    </View>
  )
}

export default RideOptionsCard

const styles = StyleSheet.create({})