import {WayPoint} from "model/game/route/wayPoint";
import {Areas, endArea, startArea} from "model/game/route/area";
import {GameStateModification} from "model/game/gameState";
import { flow } from "lodash";
import {NEUTRAL_GAME_STATE_MODIFICATION, when} from "model/game/utils";

export interface Route {
    length: number;
    wayPoints: WayPoint[];
    areas?: Areas;
}

export interface RouteState {
    position: number;
    nextWayPointIndex: number;
}

const MOVE_SPEED = 55; // meters  per minute

const checkWayPoints: GameStateModification = state => {
    const {route, gameConfig} = state;
    const nextWayPoint = gameConfig.route.wayPoints[route.nextWayPointIndex];

    if (nextWayPoint && route.position >= nextWayPoint.position) {
        const newState = {
            ...state,
            route: {
                ...route,
                nextWayPointIndex: route.nextWayPointIndex + 1,
            }
        };

        return flow(
            nextWayPoint.startArea ? startArea(nextWayPoint.startArea) : NEUTRAL_GAME_STATE_MODIFICATION,
            nextWayPoint.endArea ? endArea(nextWayPoint.endArea) : NEUTRAL_GAME_STATE_MODIFICATION
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
        when(state => state.route.position >= state.gameConfig.route.length)(
            state => ({
                ...state,
                route: {
                    ...state.route,
                    position: state.gameConfig.route.length
                }
            })
        )
    );

export const loadRoute = (route: Route): GameStateModification =>
    state => ({
        ...state,
        route: {
            position: 0,
            nextWayPointIndex: 0
        },
        gameConfig: {
            ...state.gameConfig,
            areas: {
                ...state.gameConfig.areas,
                ...route.areas
            },
            route
        }
    });