import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import api from '../../axiosConfig'; 
const handler = NextAuth({
    pages: {
        signIn: "/",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    
                    const response = await api.post("/api/users/login", credentials, {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    if(response.status === 200 ) return response.data.result;
                } catch (error) {
                    console.error("Authentication error:", error);
                    return null;
                }
            },
        }),
    ],
});

export { handler as GET, handler as POST };
