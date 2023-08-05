import React, { FC, useEffect, useMemo, useState } from "react";
import { GlobalStyle, Wrapper } from "./App.styles";
import { IMapState } from "models/IMapState";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { IMarker } from "redux/reducers/markersReducers";
import { markerControls } from "MarkerControls";

declare global {
    interface Window {
        ymaps: any;
    }
}

let ymaps = window.ymaps;

const App: FC = () => {

    const markers = useSelector((state: RootState) => state.markers);
    const [selectedMarker, setSelectedMarker] = useState<number[] | null>(null);

    const mapState = useMemo<IMapState>(() => ({
        center: [56.484645, 84.947649],
        zoom: 12,
        controls: ["routePanelControl"]
    }), []);

    useEffect(() => {

        ymaps.ready(() => {
            const myMap = new window.ymaps.Map("map", mapState);
            const control = myMap.controls.get("routePanelControl");

            //Определение геолокации пользователя
            ymaps.geolocation.get().then((result) => {
                const routePanelState = {
                    type: "auto",
                    fromEnabled: true,
                    from: result.geoObjects.position,
                    toEnabled: true,
                    to: selectedMarker
                };
                control.routePanel.state.set(routePanelState);
            });

            //Добавление маркеров на карту
            markers.forEach((marker: IMarker) => {
                let newMarker = new ymaps.Placemark(
                    marker.coordinates,
                    {
                        hintContent: marker.hintContent,
                        balloonContent: marker.balloonContent
                    },
                    {
                        iconLayout: "default#image",
                        iconImageHref: marker.iconImageHref,
                        iconImageSize: marker.iconImageSize,
                        iconImageOffset: marker.iconImageOffset,
                    }
                )

                //Построение маршрута от геопозиции пользователя до маркера по клику
                newMarker.events.add("click", () => {
                    setSelectedMarker(marker.coordinates);

                    ymaps.geolocation.get().then((result) => {
                        const fromTo = {
                            fromEnabled: true,
                            from: result.geoObjects.position,
                            toEnabled: true,
                            to: marker.coordinates
                        };
                        control.routePanel.state.set(fromTo);
                    });
                });

                //Убрать лишние контролы со страницы
                markerControls.forEach((control: string) => {
                    myMap.controls.remove(control);
                });

                myMap.geoObjects.add(newMarker);
            })
        })
    }, [mapState, markers]);

    return (
        <>
            <GlobalStyle />
            <Wrapper>
                <h1>Интересные места Томска</h1>
                <div id="map" />
            </Wrapper>
        </>
    );
}

export default App;
