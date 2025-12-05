import type { EventLinkedList } from "./linkedList";
import { type Choice, type EventNode } from "./type";

export class GameState {
    currentNode: EventNode | null = null;
    list: EventLinkedList;
    seen: Set<string>;
    stats: {
        kinhTe: number;
        doanKet: number;
        anNinh: number;
        niemTin: number;
    };

    constructor(startNode: EventNode, list: EventLinkedList) {
        this.currentNode = startNode;
        this.stats = {
            doanKet: 0,
            anNinh: 0,
            kinhTe: 0,
            niemTin: 0,
        };
        this.list = list;
        this.seen = new Set<string>();
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