//types for profile
export interface Profile {
    listings: any;
    name: string;
    email: string;
    bio: string;
    avatar: {
      url: string;
      alt: string;
    };
    banner: {
      url: string;
      alt: string;
    };
    credits: number;
    _count: {
      listings: number;
      wins: number;
    };
  }