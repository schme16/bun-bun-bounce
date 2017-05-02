express = require('express')
app = express()

app.use(require('compression')())

app.use(express.static(__dirname + '/public'))





app.listen(process.env.PORT || 3331)