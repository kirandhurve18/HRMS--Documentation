# -------------------------------------------------------
# Step 1 — Build Angular App
# -------------------------------------------------------
FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build Angular app (production)
RUN npm run build

# -------------------------------------------------------
# Step 2 — Nginx to Serve Angular
# -------------------------------------------------------
FROM nginx:alpine

# Remove default config
RUN rm /etc/nginx/conf.d/default.conf

# Add custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*
# Copy ALL files from dist folder to Nginx
# (works for any dist/<project-name>/ structure)
COPY --from=build  /app/dist/HRMS4/browser/ /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

