import axios from 'axios';

export const searchFriendEmailController = async (emailHardCodeado : string | undefined, emailSearch : string)  => {
    const response = (await axios.get(`https://games-store-v.netlify.app/user/searchFriends?emailUser=${emailHardCodeado}&valurForSearch=${emailSearch}`)).data
    return response
  };
