const express = require('express')
const app = express();
const morgan = require('morgan');
const cors = require('cors');

const { port } = require('./auth/config');

app.use(express.json());
app.use(morgan('dev'))
app.use(cors());

app.use('/user', require('./routes/user.route'))
app.use('/blog', require('./routes/blog.route'))

app.use('/', (req, res) => {
    res.send({
        msg: "Not found.",
        err: 404
    })
})


app.listen(port, () => console.log(`http://localhost:${port}`))