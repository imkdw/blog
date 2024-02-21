#!/bin/bash
export $(grep -v '^#' .env | xargs)

mysql -P 3306 -u root -proot -e "DROP DATABASE imkdw_dev; CREATE DATABASE imkdw_dev;"
npx prisma db push
npx prisma db seed