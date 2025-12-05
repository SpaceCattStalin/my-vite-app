export type Choice = {
    text: string,
    effects: Record<string, number>,
    jumpTo?: string;
};

export type EventNode = {
    id: string,
    // text: string,
    title: string,
    text: string | string[],
    image?: string,
    left: Choice,
    right: Choice,
    next: EventNode | null;
};

export type GameState = {
    currentNode: EventNode | null,
    stats: {
        kinhTe: number;
        doanKet: number;
        anNinh: number;
        niemTin: number;
    },
    applyChoice: (choice: Choice) => void;
};