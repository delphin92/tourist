import {Route} from "model/game/route/route";

export const simpleWay: Route = {
    length: 3000,
    wayPoints: [{
        position: 100,
        startArea: ['forest', 'goodForestPath']
    }, {
        position: 1000,
        startArea: 'badForestPath',
        endArea: 'goodForestPath'
    }, {
        position: 2000,
        endArea: 'forest'
    }]
};