import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import stopped from './../images/stopped.svg';
import location from '../images/location.png';
import Link from 'next/link';
import moment from 'moment';

const TrackingMap = ({ data, outerBounds, trackings }) => {
    console.log(1)
  const coor1 = [trackings[0], trackings[trackings.length-1]];
  debugger
  return <MapContainer center={[0, 0]} bounds={outerBounds} style={{ width: '100%', height: '100vh' }}>
    <TileLayer
       noWrap={false}
       url="https://maps.tteld.com/styles/osm-bright/{z}/{x}/{y}.png"
    />
    <Polyline pathOptions={{fillColor: 'red'}} positions={outerBounds} />
    {coor1.length > 0 && coor1.map((marker, i) => { 
        return <>
            <Marker position={[marker.coordinates.lat, marker.coordinates.lng]} icon={L.icon({
                  iconSize: [35, 35],
                  iconAnchor: i===0 && [17, 32],
                  iconUrl: i===1 ? `https://us.tteld.com/result/pin${marker.rotation}.png` : location.src,
               })}>
               <Popup>
                  <div className="IW_it">
                     <span className="left">Address:</span>
                     <span className="right">{marker.address}</span>
                  </div>
                  <div className="IW_it">
                     <span className="left">Odometr:</span>
                     <span className="right">{marker.odometr}</span>
                  </div>
                  <div className="IW_it">
                     <span className="left">Date:</span>
                     <span className="right">{moment(marker.date).format('DD-MM-YYYY hh:mm:ss A')}</span>
                  </div>
                  <div className="IW_it">
                 <span className="left">Speed:</span>
                 <span className="right">{ marker.speed }</span>
              </div>
                  <Link href={`https://www.google.com/maps/search/?api=1&query=${marker.coordinates.lat}%2C${marker.coordinates.lng}`} style={{marginTop: '10px'}}><a target="_blank">View on GoogleMap</a></Link>
               </Popup>
            </Marker>
        </>
    })}
    { data.stops.length > 0 && data.stops.map(loc => <>
        <Marker position={loc.coordinates} icon={L.icon({
              iconSize: [20, 20],
              iconUrl: stopped,
           })}>
           <Popup offset={[0, 0, 20, 0]}>
              <div className="IW_it">
                 <h3>
                    {loc.address}
                 </h3>
              </div>
              <div className="IW_it">
                 <span className="left">Stopped:</span>
                 <span className="right">{moment(loc.start_date).format('MMM DD, LT')} - {moment(loc.end_date).format('LT')}</span>
              </div>
              <div className="IW_it">
                 <span className="left">Duration:</span>
                 <span className="right">{moment.utc(loc.duration*1000).format(loc.duration > 3600 ? 'hh[h] mm[m] ss[s]' : 'mm[m] ss[s]')}</span>
              </div>
              <Link href={`https://www.google.com/maps/search/?api=1&query=${loc.coordinates.lat}%2C${loc.coordinates.lng}`} style={{marginTop: '10px'}}><a target="_blank">View on GoogleMap</a></Link>
           </Popup>
        </Marker>
    </>) }
  </MapContainer>
}

export default TrackingMap;
