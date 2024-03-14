
import { useContext } from 'react';
import './chatOnline.scss';
import { ChatContext } from '../../context/chatContext';
import { AuthContext } from '../../context/authContext';
import { makeRequest } from '../../axios';
import { useQuery } from '@tanstack/react-query';
import User from '../../assets/user.png';

function ChatOnline() {
  const { onlineUser, setCurrentChat } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  const { error, isLoading, data } = useQuery({
    queryKey: ['relationship'],
    queryFn: async () => {
      try {
        const response = await makeRequest.get('/relationships');
        return response.data.filter((r) => r.followerUserId === currentUser._id);
      } catch (error) {
        throw new Error('Failed to fetch relationships');
      }
    },
  });

  const { data : conversationData } = useQuery({
    queryKey: ["conversations"],
    queryFn: async () => {
      try {
        const response = await makeRequest.get(`conversations/${currentUser._id}`);
        return response.data;
        
      } catch (error) {
        throw new Error("Failed to fetch likes");
      }
    },
  });


  const handleClick = (userId) => {
    const userConversation = conversationData?.find((c) => c.members.some(m=> m._id === userId));
    if (userConversation) {
      setCurrentChat(userConversation);
    }
  }

  return (
    <div className="chatOnline">
      {error ? (
        'Something went wrong!'
      ) : isLoading ? (
        'Loading...'
      ) : (
        <>
          {data && data.length > 0 ? (
            data.map((r) =>
              onlineUser.some((u) => u.userId === r.followedUserId._id) ? (
                <div className="chatOnlineFriend" key={r._id} onClick={() => handleClick(r.followedUserId._id)}>
                  <div className="chatOnlineImgContainer">
                    <img
                      className="chatOnlineImg"
                      src={r.followedUserId.profilePic ? `/upload/${r.followedUserId.profilePic}` : User}
                      alt="user"
                    />
                    <div className="chatOnlineBadge" />
                  </div>
                  <span>{r.followedUserId.name}</span>
                </div>
              ) : (
                <div style={{ margin: '20px 0' }} key={r._id}>
                  <span>No Online Friend available</span>
                </div>
              )
            )
          ) : (
            <div>No data available</div>
          )}
        </>
      )}
    </div>
  );
}

export default ChatOnline;

