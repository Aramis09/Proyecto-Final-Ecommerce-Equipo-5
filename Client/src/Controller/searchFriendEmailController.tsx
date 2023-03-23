import axios from 'axios';

export const searchFriendEmailController = async (emailHardCodeado : string | undefined, emailSearch : string)  => {
    const response = (await axios.get(`https://grupo-cinco-production.up.railway.app/user/searchFriends?emailUser=${emailHardCodeado}&valurForSearch=${emailSearch}`)).data
    return response
  };
