import { Peer } from 'peerjs';

const greeting: string = "hello";

console.log(greeting);

const cameraEl = document.getElementById("camera") as HTMLVideoElement;

const peer = new Peer();
