import express from 'express'
import passport from 'passport'
import { Strategy as GitHubStrategy } from 'passport-github'
import jwt from 'jsonwebtoken'

import User from '../db/models/User'

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, JWT_SECRET } = process.env

const router = express.Router()

passport.serializeUser((user: any, done) => {
  done(null, user.accessToken)
})

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:4200/auth/github/callback',
    },
    async (_, __, profile, cb) => {
      let user = await User.findOne({ githubId: profile.id })

      if (user) {
        user = await User.findOneAndUpdate(
          { githubId: profile.id },
          {
            name: profile.displayName,
            avatar: profile.photos && profile.photos[0].value,
          },
          { new: true },
        )
      } else {
        user = new User({
          name: profile.displayName,
          githubId: profile.id,
          avatar: profile.photos && profile.photos[0].value,
        })
        await user.save()
      }

      cb(null, { accessToken: jwt.sign({ userId: user?._id }, JWT_SECRET, { expiresIn: '1y' }) })
    },
  ),
)

router.get('/github', passport.authenticate('github', { session: false }))

router.get(
  '/github/callback',
  passport.authenticate('github', { session: false }),
  (req: any, res) => {
    res.redirect(`http://localhost:54321/auth/${req.user.accessToken}`)
  },
)

export default router
