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

const peer = new Peer({
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
    });

    peer.on("call", function(call) {
        call.on("stream", function(stream) {
            cameraEl.srcObject = stream;
        });

        call.answer();
    });

    peer.connect(cameraId!);
});
