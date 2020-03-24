import {makeRouteAreaName, Route} from "model/game/route/route";
import {simpleWay} from "model/game/stubs/routes/simpleWay";
import {Area, Areas} from "model/game/route/area";
import {commonAreas} from "model/game/stubs/routes/commonAreas";
import { mapValues, values, flow } from "lodash";

export const routes: Record<string, Route> = {
    simpleWay
};

export const allAreas: Areas = {
    ...commonAreas,
    ...mapValues(routes, route =>
        values(route.areas)
            .reduce((all, area) =>
                flow(
                    () => makeRouteAreaName(area, route),
                    areaName => ({
                        ...all,
                        [areaName]: ({
                            ...area,
                            name: areaName
                        })
                    })
                ),
            {} as Area)
    )
};