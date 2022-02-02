import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import MainLayout from "../../components/MainLayout";

const TrackingMap = dynamic(() => import('../../components/map'), {
    ssr: false
})

function Token() {
    const router = useRouter()
    const [data, setData] = useState(null);
    const [AllPolyline, setAllPolyline] = useState([]);
    
    useMemo(() => {
        async function load(id) {
            const res = await fetch(`https://dev.tteld.com/api/driverInfo/info?accessToken=${id}`)
            const json = await res.json()
            setData(json)
        }
        !(data && data.trackings.length > 0) && router.query.token && load(router.query.token);
        let AllPoly = [];
        data && data.trackings.forEach(pol => {
            AllPoly.push([pol.coordinates.lat, pol.coordinates.lng])
        })
        setAllPolyline(AllPoly);
    }, [router.query.token, data])
    return data && data.trackings.length > 0 && (<div>
        <MainLayout name={data.company.name} driver={data.driver} trackings={ data.trackings } company={data.company}>
            <TrackingMap data={data} outerBounds={[AllPolyline]} trackings={ data.trackings } />
        </MainLayout>
    </div>);
}
export default Token;
