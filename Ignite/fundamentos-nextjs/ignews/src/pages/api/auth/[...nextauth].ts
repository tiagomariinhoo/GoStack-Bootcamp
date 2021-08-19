import NextAuth from 'next-auth'
import { query as q } from 'faunadb'
import Providers from 'next-auth/providers'

import { fauna } from '../../../services/fauna'

export default NextAuth({
    providers: [
        Providers.GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            scope: 'read:user'
        }),
    ],
    callbacks: {
        async signIn(user, account, profile) {
            console.log('User', user) // Github user profile returned by callback
            const { email } = user

            try {
                await fauna.query(
                    q.If(
                        q.Not(
                            q.Exists(
                                q.Match(
                                    q.Index('user_by_email'),
                                    q.Casefold(user.email)
                                )
                            )
                        ),
                        q.Create(
                            q.Collection('users'),
                            { data: { email } }
                        ),
                        q.Get( //select
                            q.Match(
                                q.Index('user_by_email'),
                                q.Casefold(user.email)
                            )
                        )
                    )
                )
            } catch {
                return false
            }


            return true
        }
    }
})

/**
 * FaunaDB -  HTTP
 *
 * Postgres, MongoDB
 *
 */