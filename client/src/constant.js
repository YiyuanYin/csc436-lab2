import { v4 as uuidv4 } from 'uuid'

export const initialToDoLists = [
    {
        id: uuidv4(),
        title: 'buy a bottle of milk',
        description: 'organic',
        author: 'Default',
        dateCreated: new Date('2020-05-12T23:50:21.817Z'),
        complete: true,
        dateCompleted: new Date('2020-05-14T13:50:21.817Z'),
    },
    {
        id: uuidv4(),
        title: 'close the door',
        description: '',
        author: 'Default',
        dateCreated: new Date('2023-10-09T13:50:21.817Z'),
        complete: true,
        dateCompleted: new Date('2023-10-10T21:50:21.817Z'),
    },
    {
        id: uuidv4(),
        title: 'submit homework',
        description: 'csc436',
        author: 'Default',
        dateCreated: new Date('2023-10-08T13:50:21.817Z'),
        complete: false,
        dateCompleted: '',
    },
]
