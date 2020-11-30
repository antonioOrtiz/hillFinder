import React, { Component } from "react";
import { withLeaflet, MapControl } from "react-leaflet";
import L from "leaflet";
import { OpenStreetMapProvider,GeoSearchControl } from "leaflet-geosearch";

class GeoSearch extends MapControl {
  constructor(props, context) {
    super(props);
  }


  createLeafletElement(opts) {
    var {markerData, startIcon, endIcon} = this.props.markerInfo;

    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider: provider,
      position: "topleft",
      showMarker: true,
      keepResult: true, // optional: true|false  - default false
      marker: {
        icon:  markerData.length === 0 ? startIcon : endIcon,
        draggable: true,
      },
      // maxMarkers: 2,
    });
    return searchControl;
  }

  componentDidMount() {
    const { map  } = this.props.leaflet;

    console.log("this.props ", this.props);
    var {markerInfo} = this.props;

    map.addControl(this.leafletElement);


    const containerDiv = this.leafletElement.getContainer();
    L.DomEvent.disableClickPropagation(containerDiv);
  }


  componentDidUpdate(){
    const { map  } = this.props.leaflet;

    var { markerInfo }= this.props
    console.log("map ", map);
    map.on('drag', function(e){ console.log('marker click', e)});
 map.on('geosearch/showlocation', function(e){ console.log('marker', e.marker)});    // map.on('geosearch/showlocation', function(e){ console.log("e ", e); markerInfo.handleOnClickSetMarkers(e)});
  }

}

export default withLeaflet(GeoSearch);



// import React, { Component } from "react";
// import { withLeaflet, MapControl } from "react-leaflet";
// import L from "leaflet";
// import { OpenStreetMapProvider,GeoSearchControl } from "leaflet-geosearch";

// class GeoSearch extends MapControl {
//   constructor(props, context) {
//     super(props);
//   }


//   createLeafletElement(opts) {
//     var {markerData, startIcon, endIcon} = this.props.markerInfo;

//     const provider = new OpenStreetMapProvider();
//     const searchControl = new GeoSearchControl({
//       provider: provider,
//       position: "topleft",
//       showMarker: false,
//       keepResult: true, // optional: true|false  - default false

//     });
//     return searchControl;
//   }

//   componentDidMount() {
//     const { map  } = this.props.leaflet;

//     var {markerInfo} = this.props;

//     map.addControl(this.leafletElement);


//     const containerDiv = this.leafletElement.getContainer();
//     // L.DomEvent.disableClickPropagation(containerDiv);
//   }


//   componentDidUpdate(){
//     const { map  } = this.props.leaflet;

//     var { markerInfo }= this.props
//     map.on('geosearch/showlocation', function(e){ console.log("e ", e); markerInfo.handleOnClickSetMarkers(e)});
//   }

//   componentWillUnmount() {
//     this.destroyRouting();
//   }

//   destroyRouting() {
//     const { map  } = this.props.leaflet;
//     if (map) {
//       map.leafletElement.removeControl(this.routing);
//     }
//   }

// }

// export default withLeaflet(GeoSearch);
