import React from 'react'
import { useParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

export default function Room() {
    const { roomId } = useParams()

    console.log(roomId);

    const myMeeting = async (element) => {
        const YOUR_APP_ID = 1892844379
        const SERVER_SECRET = "94c9f1db477002fec47e8894f8b8e454"

        console.log("Session ID:", roomId);
        const userID = 'user' + new Date().getTime();
        const userName = 'User' + new Date().getTime();

        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            YOUR_APP_ID,
            SERVER_SECRET,
            roomId,
            userID,
            userName
        );

        const zp = ZegoUIKitPrebuilt.create(kitToken);

        zp.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: "copy link",
                    url: `http://localhost:5173/meet/${roomId}`
                }
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall,
            },
            showScreenSharingButton: true,
        });

    }

    return (
        <div >
            <div ref={myMeeting} />
        </div>
    )
}
