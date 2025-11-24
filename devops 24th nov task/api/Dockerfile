FROM node:18-alpine

WORKDIR /usr/src/app

# Install dependencies first (cache)
COPY package.json package-lock.json* ./
RUN npm ci --only=production || npm install --production

# Copy source
COPY . .

EXPOSE 3000
CMD [ "node", "index.js" ]
