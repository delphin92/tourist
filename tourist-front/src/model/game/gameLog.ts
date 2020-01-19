import {GameStateModification} from "model/game/gameState";

export interface GameLogMessage {
    text: string;
    style?: string;
    color?: string;
}

export interface GameLog {
    items: GameLogMessage[];
}

export const pushToGameLog = (message: GameLogMessage): GameStateModification => state => ({
    ...state,
    gameLog: {
        items: [...state.gameLog.items, message]
    }
});