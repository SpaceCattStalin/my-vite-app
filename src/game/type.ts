import type { EventLinkedList } from "./linkedList";

export type Choice = {
    text: string,
    effects: Record<string, number>,
    jumpTo?: string;
};

export type EventNode = {
    id: string,
    // text: string,
    role: string,
    title: string,
    text: string | string[],
    image?: string,
    left: Choice | null,
    right: Choice | null,
    next: EventNode | null;
};

export type GameState = {
    // currentNode: EventNode | null,
    // stats: {
    //     kinhTe: number;
    //     doanKet: number;
    //     anNinh: number;
    //     niemTin: number;
    // },
    // applyChoice: (choice: Choice) => void;
    currentNode: EventNode | null;
    list: EventLinkedList;
    seen: Set<string>;
    role: "father" | "mother" | "any";

    stats: {
        kinhTe: number;
        doanKet: number;
        anNinh: number;
        niemTin: number;
    };

    setRole: (role: "father" | "mother") => void;
    addSeen: (node: EventNode) => void;
    applyChoice: (choice: Choice) => void;
};