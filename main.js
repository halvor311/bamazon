var mysql = require("mysql");
var inquirer = require("inquirer");
var password = require("./password")
const cTable = require('console.table');
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
        runSearch(res);
    })


function runSearch(result){
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
        connection.query("SELECT product_name FROM products",{id: answer.id}, function(err, res){
            if (err) throw (err)
            console.table(res.answer);
        if (answer.quantity < result[answer.id-1].stock_quantity){
            console.log("Congrats on your purchase!!");
        }
        else{
                console.log("PLEASE CHOOSE FEWER!!!!")
            }
        
        });
        connection.query(
            "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",[
                answer.howMany,
                answer.items.item_id
            ], function (error){
                if (error) throw (error)
                console.log(answer.stock_quantity + "fewer");
            }
        );
        connection.end();

    });
}

});

