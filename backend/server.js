const express = require('express')
const cors = require('cors')
const app = express()
const axios = require('axios')
app.use(cors())
app.use(express.json())
app.get('/jobs_list', async function (req, res) {
  const skill = req.query.skill;
  axios.get(`https://jobs.github.com/positions.json?search=${skill}`)
    .then(function (response) {
      // handle success
      res.send(response.data)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
})

app.listen(process.env.PORT || 5000)