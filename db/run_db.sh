#!/bin/bash

docker build -t db-img .

docker run -d --rm --name db-container --network school-network db-img