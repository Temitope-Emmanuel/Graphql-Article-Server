import {
    Connection,
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent
} from "typeorm"
import {User} from "./models/user.entity"

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
    constructor(connection:Connection){
        connection.subscribers.push(this);
    }

    beforeInsert(event:InsertEvent<User>){
        event.entity
    }
}