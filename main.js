var mysql = require("mysql");
var inquirer = require("inquirer");
var password = require("./password")
const cTable = require('console.table');
var res = [];
var i = 0;
var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: password,
  database: "bamazon"
});

connection.connect(function(err){
    if (err) throw err;
    // runSearch();
    connection.query("SELECT * FROM products",function(err,res){
        if(err) throw err;
        console.table(res);
        runSearch();
    })


function runSearch(){
    inquirer
    .prompt([{
        name: "id",
        type: "input",
        message: "Wanna buy something from our list? Pick a number!"
    

    },{
        name: "quantity",
        type: "input",
        message: "How many?"
    

    }]).then(function(answer){
        console.log(answer.id);
        // connection.query("SELECT product_name FROM products",{id: answer.id}, function(err, res){
        //     if (err) throw err
        //     console.table(res.answer);
        if (answer.quantity < res[i].stock_quantity){
            console.log("Congrats on your purchase!!");
        }
        else{
                console.log("PLEASE CHOOSE FEWER!!!!")
            }
        
        });
    }
    connection.end();
});
        
        // switch (answer.action){
        //     case ""
        // }
    
