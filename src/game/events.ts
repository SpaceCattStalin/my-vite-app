import { type EventNode } from "./type";

const event1: EventNode = {
    id: "1911_01",
    title: "Test 1",
    text: "Bác hàng xóm gõ cửa xin trú nhờ ban đêm. Bạn có cho vào không?",
    left: {
        text: "Cho vào",
        effects: { anNinh: -1, niemTin: +2 },
        jumpTo: "1911_02A"
    },
    right: {
        text: "Không cho",
        effects: { anNinh: +1, niemTin: -1 }
    },
    next: null
}

const event2: EventNode = {
    id: "1911_02A",
    title: "Test 1",
    text: "Đêm hôm đó, bác hàng xóm kể về phong trào cách mạng...",
    left: { text: "Nghe và giúp", effects: { niemTin: +2 }, jumpTo: "1911_03" },
    right: { text: "Lờ đi", effects: { niemTin: -2 } },
    next: null
};

export const events = [
    event1,
    event2
];