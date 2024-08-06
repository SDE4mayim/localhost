const mysql = require('mysql');

	
	exports.connect = function()
	{
		// Create a connection to the MySQL database
		this.connection = mysql.createConnection({
		  host: 'db4free.net',
		  user: 'testpetdb',
		  password: 'testpetdb',
		  database: 'testpetdb'
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
