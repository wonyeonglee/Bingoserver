const express = require('express')
var cors = require('cors');
const app = express()
const port = 3002


app.use(cors());

app.get('/', (req, res) => {
  res.send('hi zz sdsdsdsds!')
})


const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)
app.post("/api/v1/auth/google", async (req, res) => {
  console.log(req.body);
  const { token } = req.body
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID
  });
  const { name, email, picture } = ticket.getPayload();
  const user = await db.user.upsert({
    where: { email: email },
    update: { name, picture },
    create: { name, email, picture }
  })
  res.status(201)
  res.json(user)
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
