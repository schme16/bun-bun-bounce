express = require('express')
app = express()

app.use(require('compression')())
app.use(require('cors')())
app.use(require('body-parser')({extended: true}))

app.use(express.static(__dirname + '/public'))
app.post(express.static(__dirname + '/public'))





app.listen(process.env.PORT || 3331)