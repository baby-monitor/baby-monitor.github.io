import { Peer } from 'peerjs';

const greeting: string = "hello";

console.log(greeting);

const hash = document.location.hash;
let cameraId: string | null = null;
if (!hash || hash == "#") {
    while (cameraId == null) {
        cameraId = window.prompt("Enter an ID:");
    }
} else {
    cameraId = hash.substring(1);
}
document.location.hash = cameraId;

const cameraEl = document.getElementById("camera") as HTMLVideoElement;

const peer = new Peer(cameraId, {
    config: {
        "iceServers": [], // This makes it local only
        "sdpSemantics": "unified-plan",
    },
});

peer.on("open", async function(id) {
    const audioStream = await navigator.mediaDevices.getUserMedia({
        video: {
            "facingMode": "environment",
        },
        audio: true,
    });
    cameraEl.srcObject = audioStream;
    cameraEl.play();

    peer.on("connection", function(connection) {
        const viewerId = connection.peer;
        peer.call(viewerId, audioStream);
    });
});

const fullscreenBtn = document.getElementById("fullscreen") as HTMLButtonElement;
fullscreenBtn.addEventListener("click", function(event) {
    const fullscreenFn = cameraEl.requestFullscreen || (<any>cameraEl).webkitRequestFullscreen;
    if (cameraEl.requestFullscreen) {
        cameraEl.requestFullscreen();
    } else if ((<any>cameraEl).webkitEnterFullscreen) { // Really, Apple, really???
        (<any>cameraEl).webkitEnterFullscreen();
    }
});