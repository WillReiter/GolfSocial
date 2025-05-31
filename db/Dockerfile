# Use the official PostgreSQL image as the base image
FROM postgres:latest

# Set environment variables for PostgreSQL
ENV POSTGRES_PASSWORD=mysecretpassword
ENV POSTGRES_USER=postgres
ENV POSTGRES_DB=mydatabase

# Optional: Copy your SQL dump to the container
# COPY ./init.sql /docker-entrypoint-initdb.d/

# (Optional) Configure listening port
# Expose the PostgreSQL port 5432
EXPOSE 5432