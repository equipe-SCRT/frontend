#!/bin/bash
set -xe

sudo apt-get update

sudo apt-get install -y nodejs npm

npm install

nohup npm start > /tmp/pocpet.log 2>&1 &

# Salvando o PID num arquivo
echo $! > api_pid.txt