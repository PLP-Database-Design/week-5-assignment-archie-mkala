const express = require('express');
const mysql = require('mysql2'); // Fixed typo, added quotes around 'mysql2'
const dotenv = require('dotenv');


const app = express()
dotenv.config()


//create a connection object
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})


//get patients
// question 1
app.get('/get-patients', (req, res) => {
    const getPatients = "SELECT * FROM patients"

    db.query(getPatients, (err, results) => {
        //have an error
        if(err) {
            return res.status(500).send('Failed to fetch the patients')
        }
            //get back the data/results
        res.status(200).send(results)
    })
})

//get providers
// question 2
app.get('/get-providers', (req, res) => {
    const getProviders = 'SELECT * FROM providers'

    db.query(getProviders, (err, results) => {
        if(err){
            return res.status(500).send('Failed to Fetch The Providers')
        }
        res.status(200).send(results)
    })
})

//get patients by first name
// question 3
app.get('/get-all-patients-firstnames', (req, res) => {
    const getAllFirstNames = "SELECT DISTINCT first_name FROM patients"; // Query to get all distinct first names
    
    db.query(getAllFirstNames, (err, results) => {
        if (err) {
            return res.status(500).send('Failed to fetch the patients first names');
        }
        
        res.status(200).send(results);
    });
});

// question 4
app.get('/get-all-providers-by-specialty', (req, res) => {
    const getAllProvidersBySpecialty = "SELECT * FROM providers ORDER BY provider_specialty"; // No quotes around the column name

    db.query(getAllProvidersBySpecialty, (err, results) => {
        if (err) {
            console.error('Database query error:', err); // Log the actual error
            return res.status(500).send(`Failed to fetch the providers by specialty. Error: ${err.message}`);
        }
        
        res.status(200).send(results);
    });
});


db.connect((err) => {
    //connection succesful
    if(err){
        return console.log('Error connection to MYSQL', err)}
    //connection not succesful 
    console.log('MySQL connection sucessfull')
})


// listen to the server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`server is runnig on http://localhost:${PORT}`)
})