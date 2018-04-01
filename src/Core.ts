import * as io from 'socket.io-client';

import { MessageTypes } from './MessageTypes';
import { ChatMessage, ImageChatMessage, TextChatMessage } from './ChatMessage';

export class SimpleChatClientCore {
    private socket: SocketIOClient.Socket;
    private usedEvents: MessageTypes[] = [];

    constructor(host: string) {
        this.socket = io(host);
        this.socket.on('connect_error', () => {
            throw new Error(`Cannot connect to ${host}.`);
        });
    }

    public dispose(): void {
        this.usedEvents.forEach((eventName) => {
            this.socket.off(eventName);
        });
        this.socket.off('connect_error');
    }

    public login(name: string): void {
        this.socket.emit(MessageTypes.UserJoin, name);
    }

    public off(eventName: MessageTypes): void {
        this.socket.off(eventName);
        this.usedEvents.splice(this.usedEvents.indexOf(eventName), 1);
    }

    public on(eventName: MessageTypes, callback: Function): void {
        if (this.usedEvents.indexOf(eventName) > -1) {
            this.off(eventName);
        }
        this.socket.on(eventName, callback);
        this.usedEvents.push(eventName);
    }

    public sendImage(dataUrl: string): void {
        let message: ImageChatMessage = {
            type: 'image',
            image: dataUrl
        };
        this.sendMessage(message);
    }

    public sendText(text: string): void {
        let message: TextChatMessage = {
            type: 'text',
            text: text
        };
        this.sendMessage(message);
    }

    private sendMessage(message: ChatMessage): void {
        this.socket.emit(MessageTypes.ChatMessage, message);
    }
}