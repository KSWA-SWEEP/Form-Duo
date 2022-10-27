// import NextAuth from "next-auth"
// import KakaoProvider from "next-auth/providers/kakao"
export default NextAuth({
    // Configure one or more authentication providers
    // providers: [
    //     KakaoProvider({
    //         clientId: process.env.KAKAO_ID,
    //         clientSecret: process.env.KAKAO_SECRET,
    //     }),
    //     // ...add more providers here
    // ],
    // callbacks: {
    //         async jwt({ token, account }) {
    //             // Persist the OAuth access_token to the token right after signin
    //             if (account) {
    //                 token.accessToken = account.access_token
    //             }
    //             return token
    //         },
    //         async session({ session, token, user }) {
    //             // Send properties to the client, like an access_token from a provider.
    //             session.accessToken = token.accessToken
    //             return session
    //         }
    // },
    // pages: {
    //     // signIn: '/api/auth/signin',
    //     // newUser: '/api/auth/test' // New users will be directed here on first sign in (leave the property out if not of interest)
    //   }
})
