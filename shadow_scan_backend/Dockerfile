# Stage 1: Build the application
FROM rust:1.78 AS builder

# Create a new empty shell project
WORKDIR /usr/src/shadow_scan_backend
COPY . .

# Install sqlx-cli
RUN cargo install sqlx-cli --version=0.7.4

# Build the application
# Using --release flag for production build
RUN cargo build --release

# Stage 2: Create the final, smaller image
FROM debian:buster-slim

# Set the locale
RUN apt-get update && apt-get install -y locales && rm -rf /var/lib/apt/lists/* \
    && localedef -i en_US -c en_US.UTF-8 -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8
ENV LANG en_US.utf8

# Copy the compiled binary from the builder stage
COPY --from=builder /usr/src/shadow_scan_backend/target/release/shadow_scan_backend .

# Copy migrations and .env file
COPY migrations ./migrations
COPY .env .

# Expose the port the app runs on
EXPOSE 3000

# Set the entrypoint
CMD ["./shadow_scan_backend"]
