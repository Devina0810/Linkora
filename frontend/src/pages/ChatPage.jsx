import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";

import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";

import ChatLoader from "../components/ChatLoader";
import CallButton from "../components/CallButton";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const injectedChatStyles = `
  .str-chat {
    background-color: #0f172a !important;
    color: #f1f5f9 !important;
    font-family: 'Inter', sans-serif;
  }

  .str-chat__channel-header,
  .str-chat__message-input,
  .str-chat__input-flat,
  .str-chat__channel {
    background-color: #1e293b !important;
    border: none !important;
  }

  .str-chat__thread {
    background-color: #0f172a !important;
    border-left: 1px solid #334155;
  }

  .str-chat__message-simple__content {
    background-color: #3b82f6 !important;
    color: white !important;
    border-radius: 1rem !important;
  }

  .str-chat__message-simple__actions {
    color: #cbd5e1 !important;
  }

  .str-chat__input-flat {
    color: #f8fafc !important;
  }

  .str-chat__input-flat::placeholder {
    color: #94a3b8 !important;
  }

  .str-chat__message-list-scroll {
    background-color: #0f172a !important;
  }

  .str-chat__message-input__wrapper {
    background-color: #1e293b !important;
  }

  .str-chat__message,
  .str-chat__thread-start {
    background-color: transparent !important;
  }

  .str-chat__message--me .str-chat__message-simple__content {
    background-color: #2563eb !important;
  }

  .str-chat__avatar-sender,
  .str-chat__avatar {
    background-color: #1e293b !important;
  }

  .str-chat__channel-list,
  .str-chat__thread-list {
    background-color: #0f172a !important;
  }
`;

const ChatPage = () => {
  const { id: targetUserId } = useParams();
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  const { authUser } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    // Inject styles once
    if (!document.getElementById("chat-styles")) {
      const style = document.createElement("style");
      style.id = "chat-styles";
      style.innerHTML = injectedChatStyles;
      document.head.appendChild(style);
    }
  }, []);

  useEffect(() => {
    const initChat = async () => {
      if (!tokenData?.token || !authUser) return;

      try {
        const client = StreamChat.getInstance(STREAM_API_KEY);

        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
            image: authUser.profilePic,
          },
          tokenData.token
        );

        const channelId = [authUser._id, targetUserId].sort().join("-");

        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });

        await currChannel.watch();

        setChatClient(client);
        setChannel(currChannel);
      } catch (error) {
        console.error("Error initializing chat:", error);
        toast.error("Could not connect to chat. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    initChat();
  }, [tokenData, authUser, targetUserId]);

  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;
      channel.sendMessage({
        text: `I've started a video call. Join me here: ${callUrl}`,
      });
      toast.success("Video call link sent successfully!");
    }
  };

  if (loading || !chatClient || !channel) return <ChatLoader />;

  return (
    <div className="h-screen animated-bg text-white">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className="w-full relative h-full">
            <CallButton handleVideoCall={handleVideoCall} />
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
          </div>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};

export default ChatPage;
