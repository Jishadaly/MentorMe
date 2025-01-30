import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useSelector } from 'react-redux';
import Feedback from '@/componets/modal/FeedbackModal';
import ReactDOM from 'react-dom';

export default function Room() {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const location = useLocation();
    const meetingRef = useRef(null);
    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

    const handleLeaveRoom = () => {
            setIsFeedbackOpen(true);
    };

    const myMeeting = async (element) => {
        const YOUR_APP_ID = 1892844379;
        const SERVER_SECRET = "94c9f1db477002fec47e8894f8b8e454";

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
                    url: `http://localhost:5173/meet/${roomId}`
                }
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall,
            },
            showPreJoinView:true,
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
            <Feedback isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)}  />
            }
        </div>
    );
}
