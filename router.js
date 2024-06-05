const express = require('express');
const mysql = require('mysql');
const path = require('path');

const router = express.Router();

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3309',
    user: 'rafaelcoelho',
    password: '123456',
    database: 'uf1846'
});

//storing in a empyt array all the departament by group then
let departamentos = [];
const selectDep = "SELECT DISTINCT(departamento) FROM team GROUP BY departamento";
connection.query(selectDep, (error, results) => {
    if(error){
        console.log(error);
    }
    else{
        departamentos = results;  
    }
    //console.log("cheacking if can group all the departaments together: ",results)
})

//inicializing homePage
router.get('/', (req, res) => {
    //select All from table team from DDBB
    const selectAll = `SELECT * FROM team`;
    connection.query(selectAll, (error, results) =>{
        if(error){
            console.log(error)
        }
        else{
            res.render('index', {results, departamentos}) //results are the info that we get from DDBB
            //console.log("get all the info from DDBB: ",results)
        }
    })
});


router.get('/departamento/:departamento', (req, res) => {
    const departamento = req.params.departamento;
    const useDep = `SELECT * FROM team WHERE departamento = '${departamento}'`;
    connection.query(useDep, (error, results) => {
        if(error){
            console.log(error)
        }else{
            if(results.length === 0){
                res.render('error', {departamentos})
            }
            res.render('index', {departamentos, results})
        }
        
    })
});

router.get('/team/:apellido', (req, res) => {
    const getApellido = req.params.apellido;
    const selectApellido = `SELECT * FROM team WHERE apellido = '${getApellido}'`;
    connection.query(selectApellido, (error, results) => {
        if(error){
            console.log(error)
        }else{
            if(results.length === 0){
                res.render('error', {departamentos})
            }
            res.render('index', {departamentos, results})
        }
        
    })
})


//exporting modules
module.exports = { router, departamentos };