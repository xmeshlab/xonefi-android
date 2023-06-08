import { RouteConfigComponent } from '@react-navigation/core/lib/typescript/src/types';
import { GlobalRoute } from '../src/MainContainer';
import * as React from 'react';
import { RouteProp } from '@react-navigation/core/src/types';
import { WifiEntry } from 'react-native-wifi-reborn';
// export type RouteComponent<K extends keyof GlobalRoute> = RouteConfigComponent<GlobalRoute, K>['component']
export type RouteComponent<K extends keyof GlobalRoute> = React.ComponentType<{
    route: RouteProp<GlobalRoute, K>;
    navigation: any;
}>


export type WiFiLevel = 0| 1|2|3|4
export type WifiWithSignalLevel = WifiEntry & {
    signalLevel: WiFiLevel
}
