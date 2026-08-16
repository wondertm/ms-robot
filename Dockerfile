FROM node:26-slim

# Create the directory!
RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

# Copy and install bot dependencies
COPY package*.json /usr/src/bot/
RUN npm ci --omit=dev --loglevel=warn && npm cache clean --force

# Copy application source
COPY . /usr/src/bot

# Run as non-root
USER node

CMD ["node", "index.js"]
