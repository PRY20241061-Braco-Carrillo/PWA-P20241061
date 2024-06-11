import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";


export default NextAuth({
    providers: [
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            username: { label: "Username", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
      
            const res = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                body: JSON.stringify(credentials),
                headers: { "Content-Type": "application/json" }
                })
            const user = await res.json()
            if (user) {
              return user
            } else {
              // If you return null then an error will be displayed advising the user to check their details.
              return null
      
              // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
            }
          }
        })
      ]
})