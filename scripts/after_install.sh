#!/bin/bash
cd /home/proddeployuser/workspace
rm -rf sauth0-api_bkp
mv sauth0-api sauth0-api_bkp
cd /home/proddeployuser/workspace/sauth0-api
#docker swarm leave --force
docker service rm sauth0-api
docker system prune -a
docker build -t sauth0-api -f Dockerfile . 
#docker swarm init
#docker swarm join-token manager
docker service create --name sauth0-api --replicas 1 -p 3002:3002 sauth0-api:latest
