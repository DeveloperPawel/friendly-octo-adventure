#!/bin/sh

touch .env

i=1;
for keyval in "$@" 
do
    echo "$keyval" >> .env;
    i=$((i + 1));
done