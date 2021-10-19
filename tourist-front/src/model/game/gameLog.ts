import {GameStateModification} from "model/game/gameState";

export interface GameLogMessage {
    text: string;
    style?: string;
    color?: string;
}

export interface GameLog {
    items: GameLogMessage[];    // reversed - first item is last message
}

export const pushToGameLog = (message: GameLogMessage): GameStateModification => state => ({
    ...state,
    gameLog: {
        items: [message, ...state.gameLog.items]
    }
});