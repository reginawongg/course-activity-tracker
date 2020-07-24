const express = require('express')
const app = express()
const cors = require('cors')
const port = 4001
const canvasAPI = require('node-canvas-api')
const { getDiscussions, flattenTopicAndReplies } = require('./canvasDiscussions')
const readCSV = require('./readCSV')

app.use(cors())

app.get('/', (req, res) => res.send('Hello World!'))

//API call to Canvas API
canvasAPI.getSelf()
  .then(self => console.log(self))

//Endpoint for getSelf - personal information
app.get('/getSelf', async (req, res) => {
    // makes call to the Canvas API, sends result to frontend
    const self = await canvasAPI.getSelf()
    res.json(self)
  })

//Endpoint for getCourses
app.get('/getCourses', async (req, res) => {
    const courses = await canvasAPI.getCoursesByUser('10288')
    res.json(courses)
  })

// Endpoint for getDiscussions
app.get('/getDiscussions/:id', async (req, res)  => {
    const courseID = req.params.id
    const discussions = await getDiscussions(courseID)
    const discussion = flattenTopicAndReplies(discussions)
    res.json(discussion)
  })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
