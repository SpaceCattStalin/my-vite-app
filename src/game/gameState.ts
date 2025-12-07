import type { EventLinkedList } from "./linkedList";
import { type Choice, type EventNode } from "./type";

export class GameState {
    currentNode: EventNode | null = null;
    list: EventLinkedList;
    seen: Set<string>;
    role: "father" | "mother" | "any" = "any";
    setRole: (role: "father" | "mother") => void;
    resetGame: () => void;
    stats: {
        kinhTe: number;
        doanKet: number;
        niemTin: number;
    };
    gameEnd: boolean;
    eventCount: number;

    constructor(startNode: EventNode, list: EventLinkedList) {
        this.currentNode = startNode;
        this.stats = {
            doanKet: 0,
            kinhTe: 0,
            niemTin: 0,
        };
        this.list = list;
        this.seen = new Set<string>();
        this.setRole = (role) => {
            this.role = role;
        };
        this.gameEnd = false;
        this.eventCount = 0;
        this.resetGame = () => {
            this.currentNode = this.list.head;
            this.stats = {
                kinhTe: 5,
                doanKet: 5,
                niemTin: 5
            };
            this.eventCount = 0;
            this.role = "any";
            this.gameEnd = false;
            this.seen = new Set<string>();
        };

    }

    addSeen(currentNode: EventNode) {
        this.seen.add(currentNode.id);
    }

    applyChoice(choice: Choice) {
        for (const key in choice.effects) {
            if (key in this.stats) {
                this.stats[key as keyof typeof this.stats] += choice.effects[key];
            }
        }

        if (this.currentNode?.id == 'e-16') {
            // choice.jumpTo('es-1');
        } else if (this.currentNode?.next) {
            this.currentNode = this.currentNode.next;
        } else {
            this.currentNode = null;
        }
    }
}