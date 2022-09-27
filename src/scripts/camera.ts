import { Peer } from 'peerjs';

const greeting: string = "hello";

console.log(greeting);

const hash = document.location.hash;
let id: string | null = null;
if (!hash || hash == "#") {
    while (id == null) {
        id = window.prompt("Enter an ID:");
    }
} else {
    id = hash.substring(1);
}
document.location.hash = id;

const cameraEl = document.getElementById("camera") as HTMLVideoElement;

const peer = new Peer(id, {
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

    peer.on("connection", function(connection) {
        const viewerId = connection.peer;
        peer.call(viewerId, audioStream);
    });
});
