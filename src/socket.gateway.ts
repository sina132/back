import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";


@WebSocketGateway({
    cors:{
        origin:"*",
        methods:["GET","POST"],
        credentials:true
    },
    transports: ['websocket', 'polling'],
    namespace: '/',
})
export class SocketGateway{
    @WebSocketServer()
    server:Server;

    @SubscribeMessage("new")
    handleNewOrder():void{
        this.server.emit("new");
        //console.log("emitted");
    }
}