import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../environments/environment';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  // Our map! :)
  private map: mapboxgl.Map;

  loading = true;

  // Component attributes
  // Map theme
  @Input() style = 'mapbox://styles/mapbox/streets-v8';

  // Ask for location and fly to it
  @Input() geolocation = false;

  @Input() center: [Number, Number] = [-122.412660, 37.758790];

  @Input() sw: [Number, Number] = [-122.430670, 37.736913];

  @Input() ne: [Number, Number] = [-122.400200, 37.773207];

  constructor() {
    // Setup mapbox public key
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  ngOnInit() {
    this.initializeMap();
  }

  private initializeMap() {
    // Ask for location.
    if (this.geolocation && navigator.geolocation) {
      // Get coordinates
      navigator.geolocation.getCurrentPosition(position => {
        // 🛩
        this.map.flyTo({
          center: [position.coords.longitude, position.coords.latitude]
        });
      });
    }
    this.buildMap();
  }

  private buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 1,
      center: this.center,
      maxBounds: [this.sw, this.ne]
    });

    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());

    // Toggle loading symbol
    this.map.on('load', (event) => {
      this.loading = false;
      
      // Add line for parade
      this.map.addLayer({
        "id": "parade",
        "type": "line",
        "source": {
          "type": "geojson",
          "data": {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "LineString",
              "coordinates": [
                [-122.411904, 37.752642],
                [-122.418434, 37.752236],
                [-122.419868, 37.766687],
                [-122.413295, 37.767095]
              ]
            }
          }
        },
        "layout": {
          "line-join": "round",
          "line-cap": "round"
        },
        "paint": {
          "line-color": "rgba(0, 148, 50, 0.5)",
          "line-width": 8
        }
      });

      // Add line for Festival
      this.map.addLayer({
        "id": "festival",
        "type": "line",
        "source": {
          "type": "geojson",
          "data": {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "LineString",
              "coordinates": [
                [-122.411904, 37.752642],
                [-122.413192, 37.765445]
              ]
            }
          }
        },
        "layout": {
          "line-join": "round",
          "line-cap": "round"
        },
        "paint": {
          "line-color": "rgba(6, 82, 221, 0.5)",
          "line-width": 8
        }
      });

      // Add line for Destaging Area
      this.map.addLayer({
        "id": "destage",
        "type": "line",
        "source": {
          "type": "geojson",
          "data": {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "LineString",
              "coordinates": [
                [-122.413295, 37.767095],
                [-122.413192, 37.765445],
                [-122.412564, 37.766856]
              ]
            }
          }
        },
        "layout": {
          "line-join": "round",
          "line-cap": "round"
        },
        "paint": {
          "line-color": "rgba(255, 196, 18, 0.5)",
          "line-width": 8
        }
      });

      // Add line for Staging Area
      this.map.addLayer({
        "id": "stage1",
        "type": "line",
        "source": {
          "type": "geojson",
          "data": {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "LineString",
              "coordinates": [
                [-122.410384, 37.764326],
                [-122.408748, 37.748486],  
              ]
            }
          }
        },
        "layout": {
          "line-join": "round",
          "line-cap": "round"
        },
        "paint": {
          "line-color": "rgba(237, 76, 103, 0.5)",
          "line-width": 8
        }
      });
      this.map.addLayer({
        "id": "stage2",
        "type": "line",
        "source": {
          "type": "geojson",
          "data": {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "LineString",
              "coordinates": [
                [-122.408216, 37.752867], 
                [-122.411904, 37.752642]
              ]
            }
          }
        },
        "layout": {
          "line-join": "round",
          "line-cap": "round"
        },
        "paint": {
          "line-color": "rgba(237, 76, 103, 0.5)",
          "line-width": 8
        }
      });
      
      this.map.addLayer({ //
        "id": "testpoly",
        "type": "fill",
        "source": {
          "type": "geojson",
          "data": {
            "type": "FeatureCollection",
            "features": [{
              "type": "Feature",
              "geometry": {
                "type": "Polygon",
                "coordinates": [
                  [
                    [-122.419667, 37.765068], //16xValencia NW
                    [-122.417572, 37.765195], //16xVan Ness NE
                    [-122.417384, 37.763588], //SW
                    [-122.419532, 37.763456] //SE
                  ]
                ]
              }
            }, {
              "type": "Feature",
              "geometry": {
                "type": "Polygon",
                "coordinates": [
                  [
                    [-122.419512, 37.763431],
                    [-122.417452, 37.763511],
                    [-122.417237, 37.762051],
                    [-122.419297, 37.761948]
                  ]
                ]
              }
            }] //end of features
          },
        }, //end of source
        "paint": {
          "fill-color": "#888888",
          "fill-opacity": 0.8
        }
      }); //end of layer


      //venue layers from below this point
      this.map.addLayer({ //entrances layer
        "id": "entrances",
        "type": "fill",
        "source": {
          "type": "geojson",
          "data": {
            "type": "FeatureCollection",
            "features": [{
              "type": "Feature",
              "geometry": {
                "type": "Polygon",
                "coordinates": [
                  [
                    [-122.4131930, 37.7650498], //Harrison & Treat
                    [-122.4131837, 37.7649846],
                    [-122.4129791, 37.7649984],
                    [-122.4129872, 37.7650641],
                    [-122.4131930, 37.7650498]
                  ]
                ]
              }
            }, {
              "type": "Feature",
              "geometry": {
                "type": "Polygon",
                "coordinates": [
                  [
                    [-122.4139705, 37.7622690], //Treat St & 18th
                    [-122.4139381, 37.7620600],
                    [-122.4138335, 37.7620663],
                    [-122.4138684, 37.7622741],
                    [-122.4139705, 37.7622690]
                  ]
                ]
              }
            }, {
              "type": "Feature",
              "geometry": {
                "type": "Polygon",
                "coordinates": [
                  [
                    [-122.4135731, 37.7588767], //20th & Treat Ave
                    [-122.4134746, 37.7588810],
                    [-122.4134900, 37.7590590],
                    [-122.4135932, 37.7590527],
                    [-122.4135731, 37.7588767]
                  ]
                ]
              }
            }, {
              "type": "Feature",
              "geometry": {
                "type": "Polygon",
                "coordinates": [
                  [
                    [-122.4131338, 37.7542714], //23rd & Treat Ave
                    [-122.4131043, 37.7540678],
                    [-122.4130011, 37.7540728],
                    [-122.4130315, 37.7542760],
                    [-122.4131338, 37.7542714]
                  ]
                ]
              }
            }, {
              "type": "Feature",
              "geometry": {
                "type": "Polygon",
                "coordinates": [
                  [
                    [-122.4120851, 37.7528054], //Harrison & 24th
                    [-122.4120702, 37.7527093],
                    [-122.4117501, 37.7527300],
                    [-122.4117642, 37.7528253],
                    [-122.4120851, 37.7528054]
                  ]
                ]
              }
            }] //end of features
          },
        }, //end of source
        "paint": {
          "fill-color": "#EA2027",
          "fill-opacity": 0.8
        }
      }); //end of entrances layer


      this.map.addLayer({ //exhibits layer
        "id": "exhibits",
        "type": "fill",
        "source": {
          "type": "geojson",
          "data": {
            "type": "FeatureCollection",
            "features": [{
              "type": "Feature",
              "geometry": {
                "type": "Polygon",
                "coordinates": [
                  [
                    //s1 marposa & 18th
                    [-122.41296, 37.76278],
                    [-122.41281, 37.76279],
                    [-122.41277, 37.76232],
                    [-122.41291, 37.76231]
                  ]
                ]
              }
            }, {
              "type": "Feature",
              "geometry": {
                "type": "Polygon",
                "coordinates": [
                  [
                    //s2 18th & 18th
                    [-122.41290, 37.76212],
                    [-122.41275, 37.76213],
                    [-122.41271, 37.76172],
                    [-122.41286, 37.76171]
                  ]
                ]
              }
            }, {
              "type": "Feature",
              "geometry": {
                "type": "Polygon",
                "coordinates": [
                  [
                    //s3 18th & 19th
                    [-122.41282, 37.76136],
                    [-122.41267, 37.76137],
                    [-122.412596, 37.760567],
                    [-122.41274, 37.76056]
                  ]
                ]
              }
            }, {
              "type": "Feature",
              "geometry": {
                "type": "Polygon",
                "coordinates": [
                  [
                    //s4 19th & 20th
                    [-122.41269, 37.76013],
                    [-122.41255, 37.76014],
                    [-122.412494, 37.75956],
                    [-122.412633, 37.759555]
                  ]
                ]
              }
            }, {
              "type": "Feature",
              "geometry": {
                "type": "Polygon",
                "coordinates": [
                  [
                    //s4 mistral & 20th
                    [-122.41263, 37.759503],
                    [-122.41249, 37.75951],
                    [-122.41247, 37.75930],
                    [-122.41261, 37.759294]
                  ]
                ]
              }
            }, {
              "type": "Feature",
              "geometry": {
                "type": "Polygon",
                "coordinates": [
                  [
                    //s4 mistral & 20th (small south)
                    [-122.412603, 37.75921],
                    [-122.412463, 37.759218],
                    [-122.412456, 37.759138],
                    [-122.412595, 37.75913]
                  ]
                ]
              }
            }, {
              "type": "Feature",
              "geometry": {
                "type": "Polygon",
                "coordinates": [
                  [
                    //s4 front of Mission Rec
                    [-122.41252, 37.75834],
                    [-122.41238, 37.758346],
                    [-122.41236, 37.758137],
                    [-122.41250, 37.75813]
                  ]
                ]
              }
            }] //end of features
          },
        }, //end of source
        "paint": {
          "fill-color": "#ED4C67",
          "fill-opacity": 0.8
        }
      }); //end of exhibits layer

      this.map.addLayer({ //sponsors layer
        "id": "sponsors",
        "type": "fill",
        "source": {
          "type": "geojson",
          "data": {
            "type": "FeatureCollection",
            "features": [{
              "type": "Feature",
              "geometry": {
                "type": "Polygon",
                "coordinates": [
                  [
                    //s1 18th & harrison sponsor west side
                    [-122.41291, 37.76231],
                    [-122.41277, 37.76232],
                    [-122.412763, 37.762246],
                    [-122.412904, 37.76224]
                  ]
                ]
              }
            }, {
              "type": "Feature",
              "geometry": {
                "type": "Polygon",
                "coordinates": [
                  [
                    //s1 mariposa & harrison sponsor
                    [-122.41297, 37.76286],
                    [-122.41282, 37.76287],
                    [-122.41281, 37.76279],
                    [-122.41296, 37.76278]
                  ]
                ]
              }
            }, {
              "type": "Feature",
              "geometry": {
                "type": "Polygon",
                "coordinates": [
                  [
                    //s2 18th & 18th sponsor
                    [-122.412907, 37.762193],
                    [-122.412756, 37.76220],
                    [-122.41275, 37.76213],
                    [-122.41290, 37.76212]
                  ]
                ]
              }
            }, {
              "type": "Feature",
              "geometry": {
                "type": "Polygon",
                "coordinates": [
                  [
                    //s2 18th & harrison east side sponsor
                    [-122.41286, 37.76171],
                    [-122.41271, 37.76172],
                    [-122.412703, 37.761638],
                    [-122.41285, 37.76163]
                  ]
                ]
              }
            }, {
              "type": "Feature",
              "geometry": {
                "type": "Polygon",
                "coordinates": [
                  [
                    //s3 18th & harrison sponsor
                    [-122.41283, 37.76146],
                    [-122.41268, 37.76147],
                    [-122.41267, 37.76137],
                    [-122.41282, 37.76136]

                  ]
                ]
              }
            }, {
              "type": "Feature",
              "geometry": {
                "type": "Polygon",
                "coordinates": [
                  [
                    //s3 18th & harrison east side sponsor
                    [-122.41274, 37.76056],
                    [-122.412596, 37.760567],
                    [-122.412586, 37.760458],
                    [-122.41273, 37.76045]
                  ]
                ]
              }
            }, {
              "type": "Feature",
              "geometry": {
                "type": "Polygon",
                "coordinates": [
                  [
                    //s4 19th & harrison sponsor
                    [-122.41270, 37.760215],
                    [-122.412558, 37.760223],
                    [-122.41255, 37.760132],
                    [-122.41269, 37.76013]
                  ]
                ]
              }
            }, {
              "type": "Feature",
              "geometry": {
                "type": "Polygon",
                "coordinates": [
                  [
                    //s4 mistral & 20th sponsor
                    [-122.41261, 37.759294],
                    [-122.41247, 37.75930],
                    [-122.412463, 37.759218],
                    [-122.412603, 37.75921]
                  ]
                ]
              }
            }, {
              "type": "Feature",
              "geometry": {
                "type": "Polygon",
                "coordinates": [
                  [
                    //s4 20th and harrison (mission rec)
                    [-122.41258, 37.75894],
                    [-122.412436, 37.758948],
                    [-122.41238, 37.75839],
                    [-122.412523, 37.758385]
                  ]
                ]
              }
            }] //end of features
          },
        }, //end of source
        "paint": {
          "fill-color": "#0652DD",
          "fill-opacity": 0.8
        }
      }); //end of sponsors layer

      this.map.addLayer({ //bathrooms layer
        "id": "bathrooms",
        "type": "line",
        "source": {
          "type": "geojson",
          "data": {
            "type": "FeatureCollection",
            "features": [{
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "LineString",
                "coordinates": [
                  //treat and harrison north
                  [-122.41326, 37.76526],
                  [-122.41331, 37.76509]
                ]
              }
            }, {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "LineString",
                "coordinates": [
                  //17th and harrison east
                  [-122.41287, 37.76424],
                  [-122.41266, 37.76425]
                ]
              }
            }, {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "LineString",
                "coordinates": [
                  //17th and harrison west
                  [-122.41340, 37.76404],
                  [-122.41327, 37.76410]
                ]
              }
            }, {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "LineString",
                "coordinates": [
                  //17th and treat
                  [-122.413596, 37.76373],
                  [-122.41365, 37.76349]
                ]
              }
            }, {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "LineString",
                "coordinates": [
                  //Mariposa
                  [-122.41265, 37.762907],
                  [-122.41239, 37.76292]
                ]
              }
            }, {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "LineString",
                "coordinates": [
                  //18th and Harrison
                  [-122.41332, 37.76219],
                  [-122.41295, 37.76221]
                ]
              }
            }, {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "LineString",
                "coordinates": [
                  //18th and Harrison(west)
                  [-122.41367, 37.76217],
                  [-122.41341, 37.762185]
                ]
              }
            }, {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "LineString",
                "coordinates": [
                  //19th west
                  [-122.41318, 37.760627],
                  [-122.41294, 37.76064]
                ]
              }
            }, {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "LineString",
                "coordinates": [
                  //19th east
                  [-122.41247, 37.760367],
                  [-122.41219, 37.76038]
                ]
              }
            }, {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "LineString",
                "coordinates": [
                  //Mistral
                  [-122.41313, 37.760028],
                  [-122.41287, 37.760043]
                ]
              }
            }, {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "LineString",
                "coordinates": [
                  //Mistral (indoors)
                  [-122.41345, 37.759798],
                  [-122.41326, 37.75981]
                ]
              }
            }, {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "LineString",
                "coordinates": [
                  //20th (west most)
                  [-122.41316, 37.75901],
                  [-122.41297, 37.75902]
                ]
              }
            }, {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "LineString",
                "coordinates": [
                  //20th (west)
                  [-122.41282, 37.759057],
                  [-122.41259, 37.75907]
                ]
              }
            }, {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "LineString",
                "coordinates": [
                  //20th (east)
                  [-122.41217, 37.75908],
                  [-122.41206, 37.759086]
                ]
              }
            }, {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "LineString",
                "coordinates": [
                  //21st (west)
                  [-122.41292, 37.75739],
                  [-122.41260, 37.757406]
                ]
              }
            }, {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "LineString",
                "coordinates": [
                  //21st (east)
                  [-122.41220, 37.757468],
                  [-122.41198, 37.75748]
                ]
              }
            }, {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "LineString",
                "coordinates": [
                  //21st & 22nd (beer garden)
                  [-122.41234, 37.75666],
                  [-122.412334, 37.75660]
                ]
              }
            }, {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "LineString",
                "coordinates": [
                  //22nd and Harrison (small)
                  [-122.41227, 37.75597],
                  [-122.4122657, 37.75592]
                ]
              }
            }, {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "LineString",
                "coordinates": [
                  //22nd and Harrison (east)
                  [-122.41200, 37.75587],
                  [-122.41186, 37.755878]
                ]
              }
            }, {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "LineString",
                "coordinates": [
                  //23rd and Harrison (small)
                  [-122.41237, 37.75424],
                  [-122.41220, 37.75425]
                ]
              }
            }]
          },
        },
        "layout": {
          "line-join": "round",
          "line-cap": "butt"
        },
        "paint": {
          "line-color": "#12CBC4",
          "line-width": 5
        }
      });












      //all features above
    });
  }
}
