express = require('express')
app = express()

app.use(require('compression')())
app.use(require('cors')())
app.use(require('body-parser')({extended: true}))

app.use(express.static('public'))
app.post(express.static('public'))





app.listen(process.env.PORT || 3331)