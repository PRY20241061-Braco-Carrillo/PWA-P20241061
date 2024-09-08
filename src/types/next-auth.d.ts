import { DefaultUser } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: DefaultUser & {
      id: string;
      data?: {
        userId: string;
        roles: string;
        cancelReservation: number;
        acceptReservation: number;
        token: string;
        campusId: string;
        restaurantId: string | null;
      };
    } | null;
  }

  interface User extends DefaultUser {
    id: string;
    data?: {
      userId: string;
      roles: string;
      cancelReservation: number;
      acceptReservation: number;
      token: string;
      campusId: string;
      restaurantId: string | null;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
  }
}
