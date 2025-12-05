import { create } from "zustand";
import { GameState } from "./gameState";
import linkedList from "./gameFlow";

export const useGameState = create<GameState>((set, get) => ({
    currentNode: linkedList.head,
    stats: {
        kinhTe: 5,
        doanKet: 5,
        anNinh: 5,
        niemTin: 5
    },
    eventCount: 0,
    resetGame: () => {
        set({
            currentNode: linkedList.head,
            stats: {
                kinhTe: 5,
                doanKet: 5,
                anNinh: 5,
                niemTin: 5
            },
            eventCount: 0,
            role: 'any',
            gameEnd: false,
            seen: new Set<string>(),
        });
    },

    role: 'any',
    setRole: (role: 'father' | 'mother') =>
        set({
            role,
        }),
    gameEnd: false,
    list: linkedList,
    seen: new Set<string>(),

    addSeen: (node) => {
        const { seen } = get();
        const newSeen = new Set(seen);
        newSeen.add(node.id);

        set({ seen: newSeen });
    },

    applyChoice: (choice) => {
        const { stats, currentNode, addSeen, list, seen, role, eventCount } = get();

        if (currentNode) {
            addSeen(currentNode);
        }
        const newCount = eventCount + 1;
        set({ eventCount: newCount });

        const newStats = { ...stats };

        for (const key in choice.effects) {
            if (key in newStats) {
                newStats[key as keyof typeof newStats] += choice.effects[key];
            }
        }

        if (newStats.kinhTe <= 0) {
            set({ stats: newStats, currentNode: list.nodes["END_KINHTE"], gameEnd: true });

            return;
        }
        if (newStats.doanKet <= 0) {
            set({ stats: newStats, currentNode: list.nodes["END_DOANKET"], gameEnd: true });
            return;
        }
        if (newStats.anNinh <= 0) {
            set({ stats: newStats, currentNode: list.nodes["END_ANNINH"], gameEnd: true });
            return;
        }
        if (newStats.niemTin <= 0) {
            set({ stats: newStats, currentNode: list.nodes["END_NIEMTIN"], gameEnd: true });
            return;
        }

        if (newCount >= 20) {
            set({
                stats: newStats,
                currentNode: list.nodes["END_EVENT_LIMIT"],
                gameEnd: true
            });
            return;
        }

        if (choice.jumpTo) {
            set({
                stats: newStats,
                currentNode: list.nodes[choice.jumpTo]
            });
        }

        const allIds = Object.keys(list.nodes);

        const validIds = allIds.filter(id => {
            const ev = list.nodes[id];
            return (
                !seen.has(id) &&
                !id.startsWith("END_") &&
                (ev.role === 'any' || ev.role === role)
            );
        });

        if (validIds.length === 0) {
            set({ stats: newStats, currentNode: null });
            return;
        }
        const randomId = validIds[Math.floor(Math.random() * validIds.length)];

        // const unseen = allIds.filter(x => !seen.has(x));

        // if (unseen.length === 0) {
        //     set({ stats: newStats, currentNode: null });
        //     return;
        // }

        // const randomId = unseen[Math.floor(Math.random() * unseen.length)];

        set({
            stats: newStats,

            //   currentNode: choice.jumpTo
            //     ? choice.jumpTo
            //     : currentNode?.next ?? null
            currentNode: list.nodes[randomId]
        });
    }
}));
