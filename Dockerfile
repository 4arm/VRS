# Use the official Nginx image
FROM nginx:alpine

# Copy your HTML file(s) into the Nginx web root
COPY . D:\laragon\www\VRS

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
