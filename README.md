# Advanced-Web-Apps---Project

Installation guidelines
This project was done with node version 19.6.0, NOT 12.0.0
Get the source code from this project and copy it to a folder on your computer. Go to the “client” folder and open it’s terminal. Install the dependencies mentioned below.
Then install the dependencies by running the next script in the root folder terminal:

npm install

The dependencies in the “client” folder should look like this:  
![image](https://user-images.githubusercontent.com/79470113/222975374-3b94aaae-ed0e-484a-9479-5d378a929da0.png)


The dependencies in the "server" folder should look like this:
![image](https://user-images.githubusercontent.com/79470113/222975540-0de64e79-65b8-4c77-a6ef-dc6618b86f05.png)



 
MongoDB database can be accessed with this connection:
“mongodb://127.0.0.1:27017/testdb”
After this, go to the root folder and run the following command in the terminal to start the server:
SET NODE_ENV=production& npm run dev:server
Then open “client” folder’s terminal and run the following command to start the frontside:

npm start
