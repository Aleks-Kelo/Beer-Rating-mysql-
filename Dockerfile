# Use an official MySQL image as a parent image
FROM mysql:latest

# Set environment variables for MySQL
ENV MYSQL_ROOT_PASSWORD=rootpassword
# ENV MYSQL_ROOT_HOST=localhost
ENV MYSQL_DATABASE=mydatabase
ENV MYSQL_USER=myuser
ENV MYSQL_PASSWORD=mypassword

# Copy the MySQL initialization script to the container
COPY init-mysql.sql /docker-entrypoint-initdb.d/

# Expose the MySQL port
EXPOSE 3306
