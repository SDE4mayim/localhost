const mysql = require('mysql');

	exports.connect = function()
	{		
		this.connection = mysql.createConnection({
	    // host: 'petsindia.mysql.database.azure.com',
 	    // user: 'chis007',
	    // password: '1Chris@p!',
        // database: 'testpetdb',
		  host: 'seamless.herosite.pro',
		  user: 'tfeiamho_user007',
		  password: '1Time@p!',
		  database: 'tfeiamho_vetcastle'

		//   host: 'localhost',
		//   user: 'root',
		//   password: '1Time@p!',
		//   database: 'visrutha'
		  
		});
		// Connect to the MySQL database
		this.connection.connect((error) => {
		  if (error) {
			console.error('Error connecting to the MySQL database:', error);
		  } else {
			console.log('Connected to the MySQL database');
		  }
		});
	}
	
	exports.addUser = function()
	{
		// Add a new user to the MySQL database
		const user = {
		  name: 'John Doe',
		  email: 'john.doe@example.com',
		  password: 'password123'
		};

		this.connection.query('INSERT INTO users SET ?', user, (error, results, fields) => {
		  if (error) {
			console.error('Error adding user to the MySQL database:', error);
		  } else {
			console.log('User added to the MySQL database:', results);
		  }
		});
	}
	exports.closeConnection = function()
	{
		// Close the connection to the MySQL database
		this.connection.end();
	}
