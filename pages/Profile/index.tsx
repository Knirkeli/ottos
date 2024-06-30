"use client";
import React from "react";
import useUserProfile from "../../src/app/hooks/useUserProfile";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../../src/components/ui/popover";
import NewAvatar from "../../src/app/components/NewAvatar";
import CreateListingForm from "@/app/components/CreateListing";
import UserListing from "@/app/components/UserListing";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
const UserProfile = () => {
  const profile = useUserProfile();

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="p-4 max-w-screen-lg mx-auto mb-16 shadow-xl">
        <h1 className="text-2xl font-bold mb-2">{profile.name}</h1>
        <p className="text-sm mb-2">{profile.email}</p>
        <p className="text-sm mb-2">{profile.bio}</p>
        <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
          <Avatar>
            <AvatarImage src={profile.avatar.url} alt={profile.avatar.alt} />
            <AvatarFallback delayMs={600}>User</AvatarFallback>
          </Avatar>
          <Popover>
            <PopoverTrigger asChild>
              <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Update Avatar
              </button>
            </PopoverTrigger>
            <PopoverContent sideOffset={5} className="w-64">
              <NewAvatar />
            </PopoverContent>
          </Popover>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <p className="text-sm">Credits: {profile.credits}</p>
          <p className="text-sm">Listings: {profile._count.listings}</p>
          <p className="text-sm">Wins: {profile._count.wins}</p>
        </div>
        <div className="mt-4">
          <div>
            <UserListing listings={profile.listings} />
          </div>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <button className="mt-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              List Item
            </button>
          </PopoverTrigger>
          <PopoverContent sideOffset={5} className="w-64">
            <CreateListingForm />
          </PopoverContent>
        </Popover>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;
