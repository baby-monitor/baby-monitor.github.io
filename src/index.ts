import {Peer} from 'peerjs';

type State = {
    type: "home";
} | {
    type: "camera";
    id: string;
} | {
    type: "viewer"
    id: string;
};

const salty = "32d52c1c-5ea3-4ec2-8681-9f4808375501"; // TODO: Remove hardcoded ID and use generated QR code

let state: State;
const hash = window.location.hash;

function getStateFromHash(hash: string): State | undefined {
    //if 
    return undefined;
}

if (!hash) {
    window.location.hash = "#home";
}