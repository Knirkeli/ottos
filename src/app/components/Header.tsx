// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import React from "react";

// const Header = () => {
//   return (
//     <header className="flex justify-between items-end">
//       <div>
//         <a href="/" className="no-underline text-current">
//           <h1 className="mb-4 mt-3 ml-4 text-6xl">Tt-Auctions</h1>
//         </a>
//         <a href="/" className="no-underline text-current">
//           <h2 className="mb-4 ml-5 text-5xl">Roll the dice</h2>
//         </a>
//       </div>
//       <nav className="bg-light">
//         <div className="container mx-auto flex justify-between">
//           <div className="ml-auto">
//             <a className="text-xl font-semibold mr-4" href="listings.html">
//               Listings
//             </a>
//             <a id="log-in-nav" className="text-xl font-semibold mr-4" href="#">
//               Log In
//             </a>
//             <a id="sign-up-nav" className="text-xl font-semibold" href="#">
//               Sign Up
//             </a>
//           </div>
//         </div>
//       </nav>

//       <a
//         href="profile.html"
//         className="no-underline text-current mb-2 mt-2 mr-1"
//       >
//         <div className="rotate">
//           <div className="octagon">
//             <svg
//               preserveAspectRatio="none"
//               viewBox="0 0 100 100"
//               width="115.2px"
//             >
//               <defs>
//                 <pattern
//                   id="img1"
//                   patternUnits="userSpaceOnUse"
//                   width="100"
//                   height="100"
//                 >
//                   <image href="https://i.pinimg.com/originals/e4/ae/05/e4ae053eaf232b4f90e23b38b43d7faf.jpg" />
//                 </pattern>
//               </defs>
//               <path
//                 d="M25,2
//                          L75,2
//                          L98,25
//                          L98,75
//                          L75,98
//                          L25,98
//                          L2,75
//                          L2,25z"
//                 fill="url(#img1)"
//                 stroke-width="1"
//                 stroke="black"
//               ></path>
//             </svg>
//           </div>
//         </div>
//       </a>
//     </header>
//   );
// };

// export default Header;

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import React from "react";
import LoginForm from "./Login";
import SignupForm from "./SignupForm";
import Logout from "./LogOut";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Header = () => {
  return (
    <header className="shadow-xl mb-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-evenly items-end flex-wrap">
          <div className="text-center w-full lg:w-auto">
            <a href="/" className="no-underline text-current">
              <h1 className="text-4xl lg:text-6xl mb-4 mt-3">
                Otto`s Treasure Chest
              </h1>
            </a>
          </div>
          <div className="relative z-20 flex flex-row items-center mt-4 lg:mt-0">
            <Tabs defaultValue="account">
              <TabsList className="flex justify-between">
                <TabsTrigger value="login" className="px-4 py-2">
                  Log in
                </TabsTrigger>
                <TabsTrigger value="signup" className="px-4 py-2">
                  Sign up
                </TabsTrigger>
                <TabsTrigger value="logout" className="px-4 py-2">
                  Log out
                </TabsTrigger>
              </TabsList>
              <div className="absolute w-full">
                <TabsContent value="login">
                  <LoginForm />
                </TabsContent>
                <TabsContent value="signup">
                  <SignupForm />
                </TabsContent>
                <TabsContent value="logout">
                  <Logout />
                </TabsContent>
              </div>
            </Tabs>
            <Link href="/Profile">
              <Button className="ml-4 mt-4 lg:mt-0 lg:ml-4">Profile</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

// <header className="shadow-xl mb-4">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row justify-evenly items-end">
//           <div className="text-center">
//             <a href="/" className="no-underline text-current">
//               <h1 className="text-4xl lg:text-6xl mb-4 mt-3">
//                 Otto`s Tressure Chest
//               </h1>
//             </a>
//           </div>
//           <div className="relative z-20 flex flex-col lg:flex-row items-center mt-4 lg:mt-0">
//             <Tabs defaultValue="account" className="w-full lg:w-[400px]">
//               <TabsList className="flex justify-between">
//                 <TabsTrigger value="login" className="px-4 py-2">
//                   Log in
//                 </TabsTrigger>
//                 <TabsTrigger value="signup" className="px-4 py-2">
//                   Sign up
//                 </TabsTrigger>
//                 <TabsTrigger value="logout" className="px-4 py-2">
//                   Log out
//                 </TabsTrigger>
//               </TabsList>
//               <div className="absolute w-full">
//                 <TabsContent value="login">
//                   <LoginForm />
//                 </TabsContent>
//                 <TabsContent value="signup">
//                   <SignupForm />
//                 </TabsContent>
//                 <TabsContent value="logout">
//                   <Logout />
//                 </TabsContent>
//               </div>
//             </Tabs>
//             <Button className="ml-4 mt-4 lg:mt-0 lg:ml-4">Profile</Button>
//           </div>
//         </div>
//       </div>
//     </header>
