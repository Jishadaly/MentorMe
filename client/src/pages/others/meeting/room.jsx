import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useSelector } from 'react-redux';
import Feedback from '@/componets/modal/FeedbackModal';

export default function Room() {
    const { roomId } = useParams();
    const user = useSelector((state) => state.auth.user);
    const meetingRef = useRef(null);
    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

    const handleLeaveRoom = () => {
        setIsFeedbackOpen(true);
    };

    const myMeeting = async (element) => {
        const YOUR_APP_ID = Number(import.meta.env.VITE_ZEGO_APP_ID);
        const SERVER_SECRET = import.meta.env.VITE_ZEGO_SERVER_SECRET;


        if (!YOUR_APP_ID || !SERVER_SECRET) {
            console.error("Zego App ID or Server Secret is not defined.");
            return;
        }
        if (!roomId) {
            console.error("Room ID is not defined.");
            return;
        }
        if (!user) {
            console.error("User information is not available.");
            return;
        }

        const userID = user.id;
        const userName = user.name;

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
                    url: `${import.meta.env.VITE_API_CLIENT_URL}/meet/${roomId}`
                }
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall,
            },
            showPreJoinView: true,
            preJoinViewConfig: {
                title: "Mentorme One:One"
            },
            branding: {
                logoURL: "mentorMe"
            },
            showScreenSharingButton: true,
            showRoomTimer: true,
            turnOnCameraWhenJoining: true,
            turnOnMicrophoneWhenJoining: false,
            showLeaveRoomConfirmDialog: false,
            onLeaveRoom: handleLeaveRoom
        });
    };

    useEffect(() => {
        if (meetingRef.current) {
            myMeeting(meetingRef.current);
        }
    }, [meetingRef]);

    return (
        <div className="relative h-screen w-screen">
            <div ref={meetingRef} className="h-full w-full" />
            {isFeedbackOpen &&
                <Feedback isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
            }
        </div>
    );
}
