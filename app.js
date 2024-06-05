const express = require('express');
const {router, departamentos} = require('./router.js')
const app = express();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

app.use(router);

app.use((req, res) => {
    res.status(404).render('erorr')
});

app.listen(PORT, ()=> {
    console.log(`server runing at http://localhost:${PORT}`)
});