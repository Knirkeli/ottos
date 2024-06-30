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
