import React, { FunctionComponent, memo, useCallback, useMemo, useState } from 'react';
import GoogleMapReact from 'google-map-react';

import { TimeLine } from '@/components/TimeLine/TimeLine';
import ModalAirport from '@/components/ModalAirport/ModalAirport';
import Marker from '@/components/Marker/Marker';
import { IAirport } from '@/App';
import { myStyles, POLYLINE_OPTIONS } from './mapConfig';

const center = {
    lat : 48.969,
    lng : 2.441,
};

interface IMap {
    airports : Array<IAirport>;
}

export interface ICoords {
    lat : number,
    lng : number
}

export const Map : FunctionComponent<IMap> = memo(({ airports }) => {
    const [infos, setInfos] = useState<any>(null);
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [activeAirport, setActiveAirport] = useState<any>(null);
    const [polys, setPolys] = useState<Array<any>>([]);
    const [gMap, setGmap] = useState<any>();
    const [gMaps, setGmaps] = useState<any>();
    const [current, setCurrent] = useState<number>(0)

    const handleMapLoad = useCallback((map : any, maps : any) => {
        setGmap(map);
        setGmaps(maps);
    }, []);

    const createFlightPaths = useCallback((dep : ICoords, dest : ICoords) => {
        const poly = new gMaps.Polyline({
            path : [
                dep,
                dest
            ],
            ...POLYLINE_OPTIONS.DASHED
        });
        const newPolys = [...polys, poly];

        poly.setMap(gMap);
        setPolys(newPolys);
    }, [gMaps, gMap, polys]);

    const resetPolys = useCallback(() => {
        polys.forEach((poly) => {
            poly.visible = false;
            poly.setMap(gMap);
        });
        setPolys([]);
    }, [polys, gMap]);

    const handleOnChange = useCallback((map : any) => {
        setInfos(map);
    }, []);

    const handleModalIsOpen = useCallback((airport : any) => {
        setModalIsOpen(true);
        setActiveAirport(airport);
    }, []);

    const handleModalClose = useCallback(() => {
        setModalIsOpen(false);
        setActiveAirport(null);
    }, []);

    const renderAirports = useMemo(() => {
        if (!infos)
            return null;
        return airports.map((airport, idx) => {
            const { center : { lat, lng }, zoom } = infos;
            const latCheck = parseFloat(airport.laltitude_decimal_degress) - lat;
            const longCheck = parseFloat(airport.longitude_decimal_degress) - lng;
            const canRender = (latCheck > -2.5 && latCheck < 2.5) && (longCheck > -2.5 && longCheck < 2.5) && zoom >= 6;
            return canRender && <Marker
                key={ JSON.stringify(airport) }
                airport={ airport }
                handleModalIsOpen={ handleModalIsOpen }
                lat={ parseFloat(airport.laltitude_decimal_degress) }
                lng={ parseFloat(airport.longitude_decimal_degress) }/>;
        });
    }, [airports, infos, handleModalIsOpen]);

    return (
        <div style={ { height : '90vh', width : '100%' } }>
            <GoogleMapReact
                bootstrapURLKeys={ {
                    key : process.env.REACT_APP_GOOGLE_MAP_KEY || '',
                    libraries : ['geometry']
                } }
                defaultCenter={ center }
                defaultZoom={ 10 }
                yesIWantToUseGoogleMapApiInternals
                resetBoundsOnResize
                onChange={ handleOnChange }
                options={ { styles : myStyles } }
                onGoogleApiLoaded={ ({ map, maps }) => handleMapLoad(map, maps) }
            >
                { renderAirports }
            </GoogleMapReact>
            <ModalAirport isVisible={ modalIsOpen } onClose={ handleModalClose } airport={ activeAirport }/>
            {/*<button onClick={ () => createFlightPaths({ lat : 37, lng : 1 }, { lat : 42, lng : 2.1 }) }>ok</button>
            <button onClick={ resetPolys }>reset</button>*/}
            <TimeLine />
        </div>
    );
});