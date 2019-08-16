import React, { Component } from 'react'
import { Map, TileLayer, FeatureGroup } from 'react-leaflet'
import L from 'leaflet'
import { EditControl } from 'react-leaflet-draw'

// work around broken icons when using webpack, see https://github.com/PaulLeCam/react-leaflet/issues/255

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-shadow.png',
})

let polyline

export default class createZone extends Component {
  state = {
    editable: ''
  }

  _onCreated = e => {
    const layer = e.layer
    // this.setState({editable:e.TileLayer.toGeoJSON()})
    this.props.setZone(layer.toGeoJSON().geometry)
  }

  _onDeleted = e => {
    console.log(e.layers)
    this.props.setZone(null)
  }

  _onEdited = e => {
    console.log(e.layers)
    e.layers.eachLayer((layer) => {
      this.props.setZone(layer.toGeoJSON().geometry)
    })
  }

  render () {
    return(
      <Map center={[6.200045, -75.5767697]} zoom={13} zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />

        <FeatureGroup>
          <EditControl 
            position='topright'
            onEdited={this._onEdited}
            onCreated={this._onCreated}
            onDeleted={this._onDeleted}
            draw={{
              rectangle:false
            }}
          />
        </FeatureGroup>
      </Map>
    )
  }

  _onChange = () => {
    // this._editableFG contains the edited geometry, which can be manipulated through the leaflet API
    const { onChange } = this.props

    if(!this.state.editable || !onChange) return

    const geojsonData = this.state.editable.toGeoJSON()

    onChange(geojsonData)
  }
}
