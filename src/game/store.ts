import { create } from "zustand";
import { GameState } from "./gameState";
import linkedList from "./gameFlow";

export const useGameState = create<GameState>((set, get) => ({
    currentNode: linkedList.head,
    stats: {
        kinhTe: 0,
        doanKet: 0,
        anNinh: 0,
        niemTin: 0
    },
    list: linkedList,
    seen: new Set<string>(),

    addSeen: (node) => {
        const { seen } = get();
        const newSeen = new Set(seen);
        newSeen.add(node.id);

        set({ seen: newSeen });
    },

    applyChoice: (choice) => {
        const { stats, currentNode, addSeen, list, seen } = get();

        if (currentNode) {
            addSeen(currentNode);
        }

        const newStats = { ...stats };

        for (const key in choice.effects) {
            if (key in newStats) {
                newStats[key as keyof typeof newStats] += choice.effects[key];
            }
        }

        if (choice.jumpTo) {
            set({
                stats: newStats,
                currentNode: list.nodes[choice.jumpTo]
            });
        }

        const allIds = Object.keys(list.nodes);
        const unseen = allIds.filter(x => !seen.has(x));

        if (unseen.length === 0) {
            set({ stats: newStats, currentNode: null });
            return;
        }

        const randomId = unseen[Math.floor(Math.random() * unseen.length)];

        set({
            stats: newStats,

            //   currentNode: choice.jumpTo
            //     ? choice.jumpTo
            //     : currentNode?.next ?? null
            currentNode: list.nodes[randomId]
        });
    }
}));
