import ioClient from "socket.io-client";
const ENDPOINT = "http://localhost:3002";

const socket = ioClient(ENDPOINT)
export const io = socket
//@ts-ignore
export const AddUser = (user) => {
    socket.emit("addUser", user)
}
