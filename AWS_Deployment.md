### The document hereby is to instruct using AWS EC2 instance for website deployment with MySQL integrated on Mac/Linux

# Step 1: Create an AWS Free Tier Account

1. **Visit AWS Website:** Go to the [AWS website](https://aws.amazon.com/) and click on "Create an AWS Account."
   
2. **Provide Account Information:** Enter your email address and password, along with the required information to set up your AWS account.
   
3. **Access AWS Management Console:** Once your account is set up, log in to the AWS Management Console.

# Step 2: Launching an EC2 Instance

1. **Access EC2 Dashboard:** From the AWS Management Console, navigate to the EC2 service.
   
2. **Launch Instance:** Click on the "Launch Instance" button.
   
3. **Choose an Amazon Machine Image (AMI):** Select an AMI that suits your needs. For a web server, you might consider Amazon Linux, Ubuntu, or another Linux distribution.
   
4. **Choose Instance Type:** Select an instance type based on your requirements. For a simple website, a t2.micro (part of the Free Tier) might be suitable.
   
5. **Configure Instance:** Configure instance details such as the number of instances, network settings, etc., or keep the default settings if you're not sure.
   
6.  **Create Key Pair:** Select a key pair (or create a new one) to connect securely to your instance via SSH. Save the private key file (.pem) securely.

# Step 3: Installing MySQL

1. **Connect to the EC2 Instance:** Use an SSH client (Terminal in this case) to connect to your instance using the downloaded private key (.pem) and the public DNS/IP address provided by AWS.
   
2. **Update Packages:** Run `sudo yum update` (for Amazon Linux) or `sudo apt update` (for Ubuntu) to update the package list.
   
3. **Install MySQL:** Run `sudo yum install mysql` (for Amazon Linux) or `sudo apt install mysql-server` (for Ubuntu) to install MySQL.

4. **Status Check:** Run `sudo systemctl status mysql` to check the active status of mysql

5. **Login to MySQL as a root:** Run `sudo mysql`
   
6. **Update MySQL Password:**
    ```MySQL
    ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'place-your-password-here';

    FLUSH PRIVILEGES;
    ```
   
# Step 4: Configuring & Making Deployment
1. **Connect to EC2 Instance on your local machine:** Open Terminal and use the SSH command. 
    ```bash
    ssh -i /path/to/your-key.pem ec2-user@your-instance-public-ip
    ```
2. **Install Dependency:** Using `sudo yum install` (for Amazon Linux) or `sudo apt install` (for Ubuntu)
3. **Copy folder from local to AWS:** Open Terminal of your local and use the SCP command.
   ```bash
    scp -r /path/to/local/folder ec2-user@your_aws_public_dns:/path/to/destination
   ```
4. **Configure the Web Server to Serve Your Files:** Move Files to Server Directory: Move your HTML, JavaScript, and Markdown files to the appropriate directory that the web server serves content from. For Apache, it's typically /var/www/html/.
    ```bash
    sudo mv /path/to/folder/on/AWS /var/www/html/
    ```
5. **Configure Permissions:** Ensure that the files in your web directory have appropriate permissions for the web server to access them. Typically, setting the permissions to 755 for directories and 644 for files is recommended:
    ```bash
    sudo chmod -R 755 /var/www/html/your_website_folder
    sudo chmod -R 644 /var/www/html/your_website_folder/*
    ```
6. **Testing:** Test if the program is deployed now using AWS public IP address

### Additional Connection
When working with MySQL, the MySQL Workbench is a visual database design tool that integrates SQL development, administration, database design, creation and maintenance into a single integrated development environment for the MySQL database system. Therefore, connecting MySQL database on AWS server to MySQL Workbench can help greater visualize and manipulate the data. Hereby will be the instruction for connecting both servers.
# Steps:
* Open MySQL Workbench.
* Click on the "+" icon next to "MySQL Connections" to set up a new connection.
* Provide a connection name (e.g., AWS MySQL).
* Fill in the following details:
  * Connection Method: Standard TCP/IP over SSH.
  * SSH Hostname: Your EC2 instance's public IP or DNS.
  * SSH Username: Your SSH username for the EC2 instance (usually "ubuntu" for AWS Ubuntu instances).
  * SSH Password/Key File: If using a password for SSH, provide the password. If using key-based authentication, select the private key file (.pem) you use to connect to the EC2 instance.
  
* Under the "MySQL" tab:
  * MySQL Hostname: Set it to "127.0.0.1" or "localhost" (this refers to the MySQL server running on the EC2 instance).
  * Port: 3306 (default MySQL port).
  * Username: Your MySQL username.
  * Password: Your MySQL password.
Click "Test Connection" to ensure that the connection details are correct.

Once the test is successful, click "OK" to save the connection. Now, you can connect to MySQL Workbench for seeing the database collected from your deployed website.