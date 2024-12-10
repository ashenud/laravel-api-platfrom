FROM php:8.3.8-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    zip unzip git curl libpng-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Allows Git to safely operate within the specified directory, `/var/www/html`.
# This is useful for avoiding 'fatal: unsafe directory' errors when working with Git in Docker or other non-standard environments.
RUN git config --global --add safe.directory /var/www/html

# Set ownership to www-data for writable directories
RUN mkdir -p /var/www/html/storage /var/www/html/bootstrap/cache
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Set permissions for storage directory
RUN chmod -R 777 /var/www/html/storage

# Expose port 9000 for PHP-FPM
EXPOSE 9000

# Command to start PHP-FPM
CMD ["php-fpm"]
