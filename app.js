const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const cors = require('cors')

app.use(cors())

io.on('connection', (socket) => {
  console.log('a user connected')
})

const port = parseInt(process.env.PORT, 10) || 4000

http.listen(port, () => {
  console.log(`listening on ${port}`)
})

const history = []

io.on('connection', (socket) => {
  socket.emit('history', history)
  socket.on('color change', (change) => {
    history.push(change)
    io.emit('color change', { color: change.color, id: change.id })
  })
})

