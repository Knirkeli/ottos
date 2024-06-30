// useEditUserProfile.ts
import { useCallback } from "react";
import { apiRequest, API_PROFILE } from "../shared/apis";

const useEditUserProfile = () => {
  const editAvatar = useCallback(async (userName: string, avatarUrl: string) => {
    const endpoint = `${API_PROFILE}/${userName}/editAvatar`;
    try {
      await apiRequest(endpoint, 'POST', { avatarUrl });
      // Handle success (e.g., show a success message, refresh the profile data)
    } catch (error) {
      console.error('Error updating avatar', error);
      // Handle error (e.g., show an error message)
    }
  }, []);

  // Add more editing functions as needed

  return { editAvatar };
};

export default useEditUserProfile;