import { useEffect, useRef } from "react";

const videoCall = ({socket, selectedUser})=>{
    const myVideo = useRef()
    const userVdeo = useRef()

    let peer;
    let stream;

    useEffect(()=>{
        startCall();
    }, [])

    const startCall = async() =>{
        stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        })
        myVideo.current.srcObject = stream;

        peer = new RTCPeerConnection({
            iceServers:[{urls:"stun: stun.l.google.com:19302"}]
        })

        stream.getTracks().forEach((track)=>{
            peer.addTrack(track, stream)
        })
        peer.ontrack = (event)=>{
            userVdeo.current.srcObject = event.streams[0]
        }
        peer.onicecandidate = (event) =>{
            if(event.candidate){
                socket.emit("ice-candidate", {
                    to: selectedUser._id,
                    candidate: event.candidate,
                })
            }
        }
        const offer = await peer.createOffer()
        await peer.setLocalDescription(offer)

        socket.emit("offer", {
            to: selectedUser._id,
            offer,
        })
    }
    return(
        <div>
            <video ref={myVideo} autoPlay muted width="200"/>
            <video ref={userVdeo} autoPlay width="200"/>
        </div>
    )
}
export default videoCall