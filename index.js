// Include necessary modules
var express = require('express')
var app = express()
const mysql = require('mysql');

// Establish a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',//your pass
  database: '',//your db name
  port: 3306,
  multipleStatements: true
});

// Check if the connection was successful and log any errors
connection.connect((error) => {
  if (error) {
    console.error('Error:', error);
  }
  const createUserTable = `
  CREATE TABLE IF NOT EXISTS USER_ACCOUNT(
      USER_ID INTEGER PRIMARY KEY AUTO_INCREMENT,
      FULL_NAME VARCHAR(50) NOT NULL,
      USER_NAME VARCHAR(50) NOT NULL UNIQUE,
      USER_PASSWORD VARCHAR(50) NOT NULL,
      PHONE CHAR(10) NOT NULL UNIQUE,
      EMAIL VARCHAR(50) NOT NULL UNIQUE
  );
`;

  connection.query(createUserTable, (err, result) => {
    if (err) throw err;

    const createFeedbackTable = `
      CREATE TABLE IF NOT EXISTS FEEDBACK(
          FEEDBACK_ID INTEGER PRIMARY KEY AUTO_INCREMENT,
          USER_ID INTEGER,
          FEEDBACK VARCHAR(350) NOT NULL,
          FOREIGN KEY (USER_ID) REFERENCES USER_ACCOUNT(USER_ID)
      );
  `;
    connection.query(createFeedbackTable, (err, result) => {
      if (err) throw err;
    });
  });
});


// Configure Express to parse URL-encoded bodies
app.use(express.urlencoded({ extended: false }));

// Set up the server port and normalize the port value
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

// Serve static files from the 'public_html' directory
app.use(express.static('public_html'))
// Register logic
app.post('/register', function (req, res) {
  html = '';
  // Retrieve form data from the request body
  let fullname = req.body.name;
  let username = req.body.userName;
  let password = req.body.passwordRe;
  let email = req.body.email;
  let phone = req.body.phone;

  // SQL queries to check for duplicate username, email and phone number entries
  let checkUserNameQuery = 'SELECT * FROM USER_ACCOUNT WHERE USER_NAME = ?';
  let checkEmailQuery = 'SELECT * FROM USER_ACCOUNT WHERE EMAIL = ?';
  let checkPhoneQuery = 'SELECT * FROM USER_ACCOUNT WHERE PHONE = ?';

  connection.query(checkUserNameQuery, [username], function (error, results) {
    if (error) {
      console.error('Error:', error);
    }

    // Append error message to html if username is a duplicate
    if (results.length > 0) {
      html += '<p class = "mb-2">This username has already been used. Please enter a different username.</p>';
    }

    // Execute query to check for duplicate email
    connection.query(checkEmailQuery, [email], function (error, results) {
      if (error) {
        console.error('Error:', error);
      }

      // Append error message to html if email is a duplicate
      if (results.length > 0) {
        html += '<p class = "mb-2">This email has already been used. Please enter a different email.</p>';
      }

      // Execute query to check for duplicate phone number
      connection.query(checkPhoneQuery, [phone], function (error, results) {
        if (error) {
          console.error('Error:', error);
        }

        // Append error message to html if phone number is a duplicate
        if (results.length > 0) {
          html += '<p class = "mb-2">This phone number has already been used. Please enter a different phone number.</p>';
        }

        if (html !== '') {
          html = '<div class="container">' +
            '<h1 class="mb-2">Duplicate Information</h1>' +
            html +
            '<p>To return to the previous page, please click here: <a href="Account.html?action=signup">RETURN</a></p>' +
            '</div>';
          res.send(html);
        }
        else {
          // Insert new user details into the database if no duplicates found
          let query = 'INSERT INTO USER_ACCOUNT (FULL_NAME, USER_NAME, USER_PASSWORD, EMAIL, PHONE) VALUES (?, ?, ?, ?, ?)';
          connection.query(query, [fullname, username, password, email, phone], function (error, results, fields) {
            if (error) {
              console.error('Error:', error);
            }
          })
          res.redirect('back');
        }
      });
    });
  });
});

// Login logic
app.post('/login', function (req, res) {
  let html = '';
  let username = req.body.username;
  let password = req.body.password;
  const query = 'SELECT * FROM USER_ACCOUNT WHERE USER_NAME = ? AND USER_PASSWORD = ?';
  connection.query(query, [username, password], (err, rows, fields) => {
    if (err) {
      return console.error(err.message);
    }
    else if (rows.length > 0) {
      res.redirect(`Home.html?loggedin=true&userId=${rows[0].USER_ID}`);
    }
    else {
      html += '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">';
      html += '<div class="container">';
      html += '<h3 class="mb-2">Login Failed</h3>';
      html += `<p>The <span style="font-style: italic;">username</span> or <span style="font-style: italic;">password</span> provided doesn't match our records.</p>`;
      html += '<p>Please sign up here: <a href="Account.html?action=signup">Sign Up</a></p>';
      html += '</div>';
      html += '<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns" crossorigin="anonymous"></script>';
      res.send(html);
    }
  });
});

// Post feedback
app.post('/feedback', function (req, res) {
  let feedback = req.body.feedback;
  let userId = req.body.userId;

  connection.query('INSERT INTO FEEDBACK (USER_ID, FEEDBACK) VALUES (?, ?)', [userId, feedback], (err, results) => {
    if (err) {
      return console.error(err.message);
    }
    res.redirect('back');
  });
});

// Get feedback logic
app.get('/feedback', function (req, res) {
  let html = '';

  html += '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">';
  html += '<div class="container">';
  html += '<h3> Feedback </h3>';
  html += '<table class="table">';
  html += '<thead class="thead-dark"><tr>';
  html += '<th>Feedback ID</th><th>User ID</th><th>Feedback</th>';
  html += '</tr></thead>';
  html += '<tbody>';

  connection.query('SELECT * FROM FEEDBACK', function (err, rows) {
    if (err) {
      return console.error(err.message);
    }

    if (rows.length === 0) {
      console.log("Array is empty!")
      html += '<tr><td colspan="3"> No data found </td></tr>';
    } else {
      rows.forEach(function (row) {
        html += '<tr>';
        html += '<td>' + row.FEEDBACK_ID + '</td>';
        html += '<td>' + row.USER_ID + '</td>';
        html += '<td>' + row.FEEDBACK + '</td></tr>';
      });
    }
    html += '</tbody></table>';
    html += '</div>';
    html += '<div class="container mt-4">';
    html += '<button class="btn btn-primary" onclick="window.history.back()">Return to Previous Page</button>';
    html += '</div>';
    html += '<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns" crossorigin="anonymous"></script>';
    res.send(html);
  });
});

// Tell our application to listen to requests at port 3000 on the localhost
app.listen(port, function () {
  // When the application starts, print to the console that our app is
  // running at http://localhost:3000  (where the port number is 3000 by
  // default). Print another message indicating how to shut the server down.
  console.log(`Web server running at: http://localhost:${port}`)
  console.log("Type Ctrl+C to shut down the web server")
})

