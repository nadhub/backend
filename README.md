# ///

Single API using Koa, apollo-server-koa and sequelize with postgres dialect

Before starting

- Create database songkick
- create a role
- create the (tune) tables + partitions 

By using the sql script in the root of project.

For ease, a .devcontainer directory for those who use vscode IDE is also created

### Why Postgresql:
----

- Partition data
- Monitoring and tune top queries (pg_activity)
- using copy (very fast) for insertion and queries
- Postgis extension for spatial data
  

### Requirements
---
```
Node.js
Docker
Docker-compose
Vscode (remote container extension)
```

### Usage
```
 In Vscode: Remote-Containers: Rebuild Container
 ```
This create needed container
- container App: all dev requirements: Node;js Postgres-client(psql)
- container db: Postgres server 13

#### Execute sql script In the App container
```
psql -h db -U postgres -f sql/init.sql
```
### load inital data
```
yarn && yarn loadData
```
Run the server 
```
yarn start 
```
 
Server will be running at http://localhost:3000/graphql 

## EndPoint
With Postman or curl
```
curl -XPOST http://localhost:3000/graphql \                 
> -H "Content-Type: application/json" \
> -d '{"query": "{concertsByBandAndLocationWithInRadius(bandIds: [129, 95, 123, 135] latitude: 48.8598659 longitude: 2.347761 radius: 50) { venue {id name latitude longitude }}}"}'
```

## Description
For data queries, graphql is used to fetch data that we need only

Data are stored in postgresql database, for performance purpose partition are created by range of data for concerts table.

Postgis extension is installed, for effeciecy, indexing geolocation data, location field with a type geography is added to the table venue. we combine the longitude and latitude to create Point for each venue. A lot of functions to handle spatial data are provided by the extension ex: ST_DWithin ST_Distance.

