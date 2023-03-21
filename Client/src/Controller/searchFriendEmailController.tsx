import axios from 'axios';

export const searchFriendEmailController = async (emailHardCodeado : string | undefined, emailSearch : string)  => {
    const response = (await axios.get(`http://localhost:3001/user/searchFriends?emailUser=${emailHardCodeado}&valurForSearch=${emailSearch}`)).data
    return response
  };
