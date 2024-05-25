CREATE USER 'devTFM'@'localhost' IDENTIFIED BY 'exp_sharing_pass';
FLUSH PRIVILEGES;
GRANT CREATE, SELECT ON * . * TO 'devTFM'@'localhost';