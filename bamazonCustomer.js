var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

// Create connection to the database
var connection = mysql.createConnection({
    host: "localhost",
    post: 3306,
    user:"megan",
    password: "bud2Fran1",
    database:"bamazon"
});

// Initialize the connection to the database
connection.connect(function(err){
    if (err) throw err;
    console.log("Connected as id: " + connection.threadId);
    showProducts();
    // startPrompt();
});

// Show the current products in the database for user to choose
function showProducts() {
connection.query("SELECT * FROM products", function(err, res){
    if (err) throw err;
    // for (var i = 0; i < res.length; i++) {
    //     console.log(res[i].item_id + " | " + res[i].product_name);  
    // }
    console.table(res);
    startPrompt(res);
});

} 

// Prompt user to select an item for purchase
// The name database instead of res 
var startPrompt = function(database){
    inquirer.prompt({

        name:"productId",
        type:"input",
        message:"What is the id number for the product you would like to buy?"
       
    },
    ).then(function(answer){
        // console.log(answer);
        // Turn customer's response into a number instead of a string
        var idChoice = parseInt(answer.productId);
        // console.log(idChoice);
        var product = quantityCheck(idChoice, database);
        // console.log(product)
        if(product) {
            console.log(product);
        } else {
            console.log("Item does not exist");
        }
    });
    
}

function quantityCheck(idChoice, database) {
for (let i = 0; i < database.length; i++) {
    // console.log(database[i].item_id);
    if (database[i].item_id === idChoice) {
        return database[i];
    } 
    secondPrompt(); 
} 
    return null;
    // console.table(idChoice, database);
    
}

function secondPrompt(stock_quantity, product){

    inquirer.prompt({
    name:"productQuantity",
    type:"input",
    message:"How many units would you like to buy?"
    
}).then (function(answer){
    if(stock_quantity > answer){
        connection.query()
    } else {
        console.log("Insufficient quantity");
        startPrompt(res);
    }
    
})

}

