# Technical test - WeMaintain

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
- using copy (very fast) for insertion
  

### Requirement
---
```
Node.js
Docker
Docker-compose
Vscode (remote container extension)
```

### Usage
```
 yarn install && yarn start 
```
