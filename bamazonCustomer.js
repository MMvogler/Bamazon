var mysql = require("mysql");
var inquirer = require("inquirer");

// Connection to database
var connection = mysql.createConnection({
    host: "localhost",
    post: 3306,
    user:"root",
    password: "bud2Fran1",
    database:"bamazon"
});

connection.connect(function(err){
    if (err) throw err;
    console.log("Connected as id: " + connection.threadId);
    showProducts();
});

// Show the current products in the database for user to choose
function showProducts() {
connection.query("SELECT * FROM products", function(err, res){
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
        console.log(res[i].item_id + " | " + res[i].product_name);  
    }
    
});
connection.end();
} 

// Prompt user to select an item for purchase
var startPrompt = function(){
    inquirer.prompt({

        name:"productId",
        type:"rawlist",
        message:"What is the id number for the product you would like to buy?",
       
    }).then(function(answer){
        var query = "SELECT item_id FROM products WHERE ?";
        connection.query(query, {item_id: answer.item_id}, function(err,res){
            if (err) throw err;
            for (var j = 0; j < res.length; j++){
                console.log("ID Number: " + res[j].item_id + " | " + res[j].product_name + " | " + res[j].product.price)
            }
            runSearch();
        }); 
    });
}


