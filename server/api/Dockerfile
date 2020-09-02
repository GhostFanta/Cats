FROM node:8.15.0-alpine

# SET environment to be production mode
ENV NODE_ENV production
ENV SECRET "secret"

# Create root working dir
RUN mkdir /root/web

# Setting root working dir
WORKDIR /root/web

COPY package*.json ./

# Install dependencies
RUN npm install

# copy all resources
COPY . .

# Use 3000 as production port
EXPOSE 3005

CMD ["npm", "start"]
