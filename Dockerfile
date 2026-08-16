FROM node:16.14.0

# Create the directory!
RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

# Copy and Install bot
COPY . /usr/src/bot
RUN npm ci --only=production --loglevel=warn >NUL

CMD ["node", "index.js"]
