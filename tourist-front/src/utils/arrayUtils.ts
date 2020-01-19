export const remove = <T>(array: T[], index: number, count: number = 1): T[] =>
    [
        ...array.slice(0, index),
        ...array.slice(index + count)
    ];
