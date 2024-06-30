// import React, { useState } from "react";

// const NewAvatar: React.FC = () => {
//   const [avatarUrl, setAvatarUrl] = useState("");

//   const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setAvatarUrl(event.target.value);
//   };

//   const handleUpdateClick = () => {
//     // Perform update logic here
//     console.log("Updating avatar URL:", avatarUrl);
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={avatarUrl}
//         onChange={handleUrlChange}
//         title="Avatar URL"
//       />
//       <button onClick={handleUpdateClick}>Update</button>
//     </div>
//   );
// };

// export default NewAvatar;

import React, { useState } from "react";
import { apiRequest, API_PROFILE } from "../shared/apis"; // Adjust the import path as necessary

const NewAvatar: React.FC = () => {
  const [avatarUrl, setAvatarUrl] = useState("");

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAvatarUrl(event.target.value);
  };

  const handleUpdateClick = async () => {
    // Function to get the value of a cookie by name
    const getCookieValue = (name) => {
      const nameString = name + "=";
      const value = document.cookie
        .split("; ")
        .find((row) => row.startsWith(nameString));
      if (value) {
        return value.split("=")[1];
      }
      return null;
    };

    // Get the user cookie and parse it
    const userCookie = getCookieValue("user"); // Assuming the cookie name is "user"
    let userName = "";
    if (userCookie) {
      try {
        const userObj = JSON.parse(decodeURIComponent(userCookie));
        userName = userObj.name; // Extract the name property
      } catch (error) {
        console.error("Error parsing user cookie:", error);
      }
    }

    if (!userName) {
      console.error("Username not found in cookies");
      return;
    }

    const endpoint = `${API_PROFILE}/${userName}`;

    try {
      await apiRequest(endpoint, "PUT", {
        avatar: { url: avatarUrl, alt: "Profile Avatar" },
      });
      console.log("Avatar updated successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error updating avatar:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <input
        type="text"
        value={avatarUrl}
        onChange={handleUrlChange}
        title="Avatar URL"
        className="px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleUpdateClick}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Update
      </button>
    </div>
  );
};

export default NewAvatar;
