import { EventLinkedList } from './linkedList';
import { events } from './events';

const linkedList = new EventLinkedList();

for (const event of events) {
    linkedList.add(event);
}

linkedList.connectNext('1911_01', '1911_02A')

export default linkedList;