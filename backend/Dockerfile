FROM node:21
WORKDIR /usr/src/app
COPY . .
COPY ../wait-for-it.sh /usr/src/app/
RUN chmod +x /usr/src/app/wait-for-it.sh
RUN npm install
COPY wait-for-it.sh /usr/src/app/
RUN chmod +x /usr/src/app/wait-for-it.sh
EXPOSE 3000
CMD ["/usr/src/app/wait-for-it.sh", "mysql_db:3306", "--", "npm", "run", "start"]