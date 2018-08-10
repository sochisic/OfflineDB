Task for Technical interview.

for run
npm run start

for tests
npm run test

Schema Technical Challenge 
The following task is about building an offline database for an existing Node.js backend  server. Currently, the server can be run locally, but its database connection will fail and thus  it will be unable serve any data without an active internet connection. The database  singleton object is initialised in a module as follows: 
export const​ db: Database = OnlineDatabase()  And every other module imports it from here. The constructor of ​OnlineDatabase​ throws  an ​DatabaseConnectionError​ error if the server is offline.​ ​The data is stored in a  JSON-like structure, for example: 
{   users: {     ID1: {       name: ​"Alice"​,       email: ​"alice@email.com"     }   } } 
Note that the database can be accessed at any given level (see examples below). This  Database​ class implements the following interface: 
// Sets the reference to the new given path. // @param path - The path. // @return - The current database instance. ref(path: string): Database 
 
// Saves the object in the database under the currently set path,  // assigning it a new unique id i.e. it is saved under "path/new_id/". // If the path does not exist, it creates it. // @param object - The data to be saved. // @return - The new unique id. push(obj: ​Object​): string 
 
// Removes the data under the currently set path. remove(): void 
 
// Retrieves the data from the currently set path and calls the  // continuation function with the data as a parameter // @param continuation - Callback to be called with the data. once(continuation: any => any) 
An example of using ​push​:  const id = db.ref(​"users"​).push({name: ​"Bob"​, address: {city:​"New York"​,   country: ​"US"​}}); console.log(id); >>>  ​"ID2" 
The database after this change: 
{   users: {     ID1: {       name: ​"Alice"​,       email ​"alice@email.com"     },     ID2: {       name: ​"Bob"​,        address: {city:​"New York"​, country: ​"US"​}     }   } }  An example of using ​once​:  db.ref(​"users/ID2/address/city"​).once(console.log); >>>   ​"New York" 
 db.ref(​"users/ID1"​).once(console.log); >>>   {name: ​"Alice"​, email: ​"alice@email.com"​}  An example of using ​remove​:  db.ref(​"users/ID2/address"​).remove(); 
The database after this change: 
{   users: {     ID1: {       name: ​"Alice"​,       email ​"alice@email.com"     },     ID2: {       name: ​"Bob"     } 
  } } 
And 
db.ref(​"users"​).remove(); 
The database after this change: 
{}  Your task​ is to write a ​OfflineDatabase​ class that implements the ​Database​ interface so  that it could be used instead of the ​OnlineDatabase​ object when the server is offline. The  required code must be written in Javascript/Node.js. You are free to use any open source  libraries as long as you briefly describe what they do and why you use them. If you make  any assumptions, please state them clearly. 
Time allowed: 2 hours. 