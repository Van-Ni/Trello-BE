interface Attachment {
    value: string;
}

interface Comment {
    value: string;
}

export interface Card {
    _id: string;
    boardId: string;
    columnId: string;
    title: string;
    description: string | null;
    cover: string | null;
    memberIds: string[];
    comments: Comment[];
    attachments: Attachment[];
}

export interface Column {
    _id: string;
    boardId: string;
    title: string;
    cardOrderIds: string[];
    cards: Card[];
}

export interface Board {
    _id: string;
    title: string;
    description: string;
    type: 'public' | 'private';
    ownerIds: string[];
    memberIds: string[];
    columnOrderIds: string[];
    columns: Column[];
}

export interface BoardResponse extends Board {
    cards?: Card[];
}

