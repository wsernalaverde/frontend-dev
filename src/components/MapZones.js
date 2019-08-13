import React, { useState } from 'react'
import { Map, Marker, TileLayer, Popup, GeoJSON } from 'react-leaflet'

function MapZone ({ data }) {
  const coordinates = [6.200045, -75.5767697]
  // const [zones, setZones] = useState(data.map(zone => zone.location))
  const zones = data.map(zone => zone.location)

  return(
    <Map center={coordinates} zoom={15}>
      <TileLayer attribution="<a href='http://wserna.com'>wserna.com</a>" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <GeoJSON data={zones} style={{fill:'#1BFBE3',border:"1px solid #1BFBE3"}} />
      <Marker position={coordinates}>
        <Popup>
          Mi lugar de trabajo
        </Popup>
      </Marker>
    </Map>
  )
}

export default MapZone
