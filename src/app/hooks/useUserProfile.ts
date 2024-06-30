import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { apiRequest, API_PROFILE } from "../shared/apis";
import { Profile } from "../types/profile";

const useUserProfile = (): Profile | null => {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const userCookie = Cookies.get("user");
      if (!userCookie) {
        console.error('User cookie not found');
        return;
      }
      let user;
      try {
        user = JSON.parse(decodeURIComponent(userCookie));
      } catch (error) {
        console.error('Error parsing user cookie', error);
        return;
      }
      const userName = user.name;
      const endpoint = `${API_PROFILE}/${userName}`;
      try {
        const data = await apiRequest(endpoint);
        setProfile(data.data);
      } catch (error) {
        console.error('Error fetching profile data', error);
      }
    };

    fetchProfile();
  }, []);

  return profile;
};

export default useUserProfile;