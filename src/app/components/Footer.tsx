import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-200 py-4 mt-16">
      <div className="container mx-auto text-center">
        <p className="text-gray-600">
          &copy; 2024 Knirkefridesign. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
