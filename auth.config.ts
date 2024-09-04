import { NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import axios from 'axios';

const authConfig = {
  providers: [
    CredentialProvider({
      credentials: {
        username: { type: 'text' }, // Assuming your backend uses "username"
        password: { type: 'password' }
      },
      async authorize(credentials, req) {
        try {
          const response = await axios.post('http://localhost:3000/login', {
            username: credentials?.username,
            password: credentials?.password
          });

          if (response.data.token) {
            const user = {
              id: response.data.userId,
              name: credentials?.username,
              token: response.data.token // Optionally save the token
            };

            return user; // Return the user object for successful login
          } else {
            return null; // Return null if login failed
          }
        } catch (error) {
          console.error('Login failed:', error);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/' // Path to your custom sign-in page
  }
} satisfies NextAuthConfig;

export default authConfig;
