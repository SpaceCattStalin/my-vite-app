import { EventLinkedList } from './linkedList';
import data from '../events.json';

const linkedList = new EventLinkedList();

for (const event of data) {
    linkedList.add(event);
}


export default linkedList;