import { w3cwebsocket as W3cWebSocket } from 'websocket';

const url: string = location.origin.split('/')[2];

const Websocket = new W3cWebSocket(`wss://${url}`);

export default Websocket;
