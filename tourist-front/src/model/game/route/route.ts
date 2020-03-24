import {WayPoint} from "model/game/route/wayPoint";
import {Area, Areas, endArea, startArea} from "model/game/route/area";
import {GameStateModification} from "model/game/gameState";
import { flow } from "lodash";
import {NEUTRAL_GAME_STATE_MODIFICATION, when} from "model/game/utils";
import {routes} from "model/game/stubs/routes";

export interface Route {
    name: string;
    length: number;
    wayPoints: WayPoint[];
    areas?: Areas;
}

export interface RouteState {
    name: string;
    position: number;
    nextWayPointIndex: number;
}

const MOVE_SPEED = 55; // meters  per minute

export const makeRouteAreaName = (area: Area, route: Route): string =>
    route.name + '_' + area.name;

export const getRoute = (name: string): Route =>
    routes[name];

const checkWayPoints: GameStateModification = state => {
    const {route} = state;
    const routeConfig = getRoute(route.name);
    const nextWayPoint = routeConfig.wayPoints[route.nextWayPointIndex];

    if (nextWayPoint && route.position >= nextWayPoint.position) {
        const newState = {
            ...state,
            route: {
                ...route,
                nextWayPointIndex: route.nextWayPointIndex + 1,
            }
        };

        return flow(
            nextWayPoint.endArea ? endArea(route.name, nextWayPoint.endArea) : NEUTRAL_GAME_STATE_MODIFICATION,
            nextWayPoint.startArea ? startArea(route.name, nextWayPoint.startArea) : NEUTRAL_GAME_STATE_MODIFICATION
        )(newState);
    } else {
        return state;
    }
};

export const move: GameStateModification =
    flow(
        state => ({
            ...state,
            route: {
                ...state.route,
                position: state.route.position + MOVE_SPEED
            }
        }),
        checkWayPoints,
        when(state => state.route.position >= getRoute(state.route.name).length)(
            state => ({
                ...state,
                route: {
                    ...state.route,
                    position: getRoute(state.route.name).length
                }
            })
        )
    );

export const loadRoute = (route: Route): GameStateModification =>
    state => ({
        ...state,
        route: {
            name: route.name,
            position: 0,
            nextWayPointIndex: 0
        }
    });