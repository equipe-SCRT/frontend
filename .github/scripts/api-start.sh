#!/bin/bash
set -xe

sudo apt-get update

sudo apt-get install -y nodejs npm

npm install

npm start

# Salvando o PID num arquivo
echo $! > api_pid.txt