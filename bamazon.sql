DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE  bamazon;

CREATE TABLE products(
item_id int auto_increment not null,
product_name varchar (35),
department_name varchar (25),
price decimal(10, 2),
stock_quantity int not null,
primary key (item_id)
);