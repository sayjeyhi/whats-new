# Serve the built React app
FROM nginx:alpine

# Set working directory
WORKDIR /usr/share/nginx/html

# Copy built React files
COPY dist /usr/share/nginx/html

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf
