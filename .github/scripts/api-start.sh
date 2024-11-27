#!/bin/bash
set -xe

npm start

# Salvando o PID num arquivo
echo $! > api_pid.txt