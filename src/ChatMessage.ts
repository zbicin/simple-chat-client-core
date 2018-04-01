export interface ChatMessage {
    type: 'image' | 'text';
}

export interface ImageChatMessage extends ChatMessage {
    type: 'image';
    image: string;
}

export interface TextChatMessage extends ChatMessage {
    type: 'text';
    text: string;
}