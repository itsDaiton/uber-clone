import React, { useEffect, useRef } from 'react'
import MapView, { Marker } from 'react-native-maps';
import tw from 'tailwind-react-native-classnames'
import { useDispatch, useSelector } from 'react-redux'
import { selectDestination, selectOrigin, setTravelTimeInfo } from '../slices/navSlice'
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from "@env"

const MapComponent = () => {

  const origin = useSelector(selectOrigin)
  const destination = useSelector(selectDestination)
  const mapRef = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!origin || !destination) return
    const timer = setTimeout(() => {
      mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
        edgePadding: { 
          top: 100,
          right: 50,
          bottom: 50,
          left: 50 
        }
      })
    }, 10);
    return () => clearTimeout(timer)
  }, [origin, destination])

  useEffect(() => {
    if (!origin || !destination) return

    const getTravelTime = async()  => {
      fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?
      units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`)
      .then((res) => res.json())
      .then(data => {
        dispatch(setTravelTimeInfo(data.rows[0].elements[0]))    
      })
    }

    getTravelTime()
  }, [origin, destination, GOOGLE_MAPS_APIKEY])

  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1`}
      mapType="standard"
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeColor='black'
          strokeWidth={3}
        />
      )}
      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,        
          }}
          title="Origin"
          description={origin.description}
          identifier="origin"
        />
      )}
      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title="Destination"
          description={destination.description}
          identifier="destination"
        />
      )}
    </MapView>
  )
}

export default MapComponent