import type { EventLinkedList } from "./linkedList";
import { type Choice, type EventNode } from "./type";

export class GameState {
    currentNode: EventNode | null = null;
    list: EventLinkedList;
    
    stats: {
        kinhTe: number;
        doanKet: number;
        sucKhoe: number;
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
            sucKhoe: 0
        }
        this.list = list
    }

    applyChoice(choice: Choice) {
        for (const key in choice.effects) {
            if (key in this.stats) {
                this.stats[key as keyof typeof this.stats] += choice.effects[key];
            }
        }

        if (choice.jumpTo) {

        } else if (this.currentNode?.next) {
            this.currentNode = this.currentNode.next;
        } else {
            this.currentNode = null
        }
    }
}