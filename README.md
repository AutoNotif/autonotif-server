# autonotif-server

## Installing

1. Install PostgreSQL on your system. You can find instructions [here](https://wiki.postgresql.org/wiki/Detailed_installation_guides).
2. Create a new database in PostgreSQL.
3. Clone the repo.
4. Rename  ```src/config/config.example.json``` to ```src/config/config.json``` and enter your options. [Information about config](#config)
5. Run ```npm install``` to install dependencies.
6. Run ```npm run setup``` to add the tables to the database.
7. Run ```npm start``` to start the server.

## Config

### Options

``` port ```: The port for the server.


#### pg
This contains all the database settings.

``` username ```: The username of the psql user for the database.

``` password ```: The password of the psql user for the database.

``` host ```: The host of the psql server. If this is on your machine it is localhost.

``` port ```: The port of the psql server. The default is 5432.

``` database ```: The database name used inside psql for AutoNotif.

#### https

``` enable ```: Set to true if using https otherwise false. If you set this to false you can ignore the other

``` private_key ```: The full path to the private key.

``` certificate ```: The full path to the private key.

``` passphrase ```: The passphrase for the key

#### gcm

``` key ```: Your Google Cloud Messaging API Key.
