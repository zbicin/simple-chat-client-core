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
        this.socket.on('connect_timeout', () => {
            throw new Error(`Connection timeout while connecting to ${host}.`);
        });
    }

    public dispose(): void {
        this.usedEvents.forEach((eventName) => {
            this.socket.off(eventName);
        });
        this.socket.off('connect_error');
        this.socket.off('connect_timeout');
    }

    public async login(name: string): Promise<void> {
        this.socket.emit(MessageTypes.UserJoin, name);
        return Promise.resolve();
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

    public async sendImage(dataUrl: string): Promise<void> {
        let message: ImageChatMessage = {
            type: 'image',
            image: dataUrl
        };
        this.sendMessage(message);
        return Promise.resolve();
    }

    public async sendText(text: string): Promise<void> {
        let message: TextChatMessage = {
            type: 'text',
            text: text
        };
        this.sendMessage(message);
        return Promise.resolve();
    }

    private sendMessage(message: ChatMessage): void {
        this.socket.emit(MessageTypes.ChatMessage, message);
    }
}