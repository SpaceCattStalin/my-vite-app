import { create } from "zustand";
import { GameState } from "./gameState";
import linkedList from "./gameFlow";

export const useGameState = create<GameState>((set, get) => ({
    currentNode: linkedList.head,
    stats: {
        doanKet: 0,
        anNinh: 0,
        kinhTe: 0,
        niemTin: 0,
        sucKhoe: 0
    },
    list: linkedList,

    applyChoice: (choice) => {
        const { stats, currentNode } = get();

        const newStats = { ...stats };

        for (const key in choice.effects) {
            if (key in newStats) {
                newStats[key as keyof typeof newStats] += choice.effects[key];
            }
        }

        set({
            stats: newStats,
            //   currentNode: choice.jumpTo
            //     ? choice.jumpTo
            //     : currentNode?.next ?? null
            currentNode: currentNode?.next ?? null
        });
    }
}));
