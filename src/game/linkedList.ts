import { type EventNode } from "./type";

export class EventLinkedList {
    head: EventNode | null = null;
    nodes: Record<string, EventNode> = {};

    add(node: EventNode) {
        if (!this.head) this.head = node;
        this.nodes[node.id] = node;
    }

    connectNext(currentNodeId: string, nodeToConnectId: string,) {
        this.nodes[currentNodeId].next = this.nodes[nodeToConnectId];
    }

    find(id: string) {
        return this.nodes[id];
    }
}