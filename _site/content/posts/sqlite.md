+++
title = """SQLite: Lightweight, Fast and Local"""
date = 2023-03-04T15:21:00+07:00
draft = false
+++
![SQL Code](/images/sql.jpg)
SQLite is a powerful relational database management system that is widely used for its simplicity, speed, reliability, and versatility; making it ideal for a wide range of applications and use cases. Some of the key reasons why SQLite is considered powerful are:

1. Lightweight and easy to use: SQLite is a lightweight and self-contained database engine that requires minimal configuration and setup. It is also0 very easy to use and does not require a dedicated server or administrator.
2. High performance: SQLite is designed to be fast and efficient, with a small memory footprint and minimal disk I/O. It is optimized for read-heavy workloads, making it ideal for applications that require fast data retrieval.
3. ACID compliance: SQLite is fully ACID-compliant, which means that it provides atomicity, consistency, isolation, and durability guarantees for transactions. This makes it suitable for applications that require high data integrity and reliability.
4. Cross-platform compatibility: SQLite is available on virtually all operating systems, including Windows, Mac OS, Linux, Android, and iOS. It also supports a wide range of programming languages, including C, C++, Java, Python, and PHP.
5. Wide range of features: Despite its small size, SQLite provides a wide range of features, including support for complex queries, indexing, triggers, and full-text search. It also supports encryption, which makes it suitable for storing sensitive data.

In this tutorial, we will cover the basics of using SQLite for data storage.
#
***
## Installing SQLite
SQLite is pre-installed on most operating systems including Windows, Mac OS, and Linux. To check if SQLite is installed on your system, open the command prompt or terminal and type the following command:

{{< highlight bash >}}
sqlite3
{{< /highlight >}}
If SQLite is installed, you will see the SQLite command prompt:

``` bash
for i in b:
    print(i)
```


{{< highlight bash >}}
SQLite version 3.36.0 2021-06-18 18:36:39
Enter ".help" for usage hints.
Connected to a transient in-memory database.
Use ".open FILENAME" to reopen on a persistent database.
{{< /highlight >}}
If SQLite is not installed, you can download and install it from the official website: https://www.sqlite.org/download.html
#
***
## Creating a Database
To create a new database in SQLite, you need to use the sqlite3 command (in a termianl window on Macintosh or Linux) followed by the name of the database file. For example, to create a new database called mydatabase.db, type the following command:

{{< highlight bash >}}
sqlite3 mydatabase.db
{{< /highlight >}}
This will create a new database file in the current directory. You can verify that the database file has been created by typing the following command:

{{< highlight bash >}}
ls
{{< /highlight >}}
This will list all the files in the current directory, including the newly created mydatabase.db file.
#
***
## Creating Tables
Once you have created a database, you can create tables to store data in the database. To create a table, you need to use the CREATE TABLE SQL command followed by the name of the table and the column definitions.

For example, let's create a table called employees with the following columns: id, name, age, and salary.
{{< highlight sql >}}
CREATE TABLE employees (
    id INTEGER PRIMARY KEY,
    name TEXT,
    age INTEGER,
    salary REAL
);
{{< /highlight >}}
In this example, we have defined four columns with different data types: id (INTEGER), name (TEXT), age (INTEGER), and salary (REAL). We have also specified that the id column is the primary key.
#
***
## Inserting Data
Once you have created a table, you can insert data into the table using the INSERT INTO SQL command.

For example, let's insert a new employee record into the employees table:
{{< highlight sql >}}
INSERT INTO employees (name, age, salary) VALUES ('John Doe', 30, 50000);
{{< /highlight >}}
In this example, we have specified the column names and the corresponding values that we want to insert into the table.
#
***
## Querying Data
You can retrieve data from the database using the SELECT SQL command.

For example, let's retrieve all the records from the employees table:
{{< highlight sql >}}
SELECT * FROM employees;
{{< /highlight >}}
This will retrieve all the records from the employees table and display them in the console.
#
***
## Updating Data
You can update data in the database using the UPDATE SQL command.

For example, let's update the salary of the employee with the id of 1:
{{< highlight sql >}}
UPDATE employees SET salary = 60000 WHERE id = 1;
{{< /highlight >}}
This will update the salary column of the employee record with the id of 1 to 60000.

#
***
## Deleting Data
You can delete data from the database using the DELETE SQL command.

For example, let's delete the employee record with the id of 1:

{{< highlight sql >}}
DELETE FROM employees WHERE id = 1;
{{< /highlight >}}


