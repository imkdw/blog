#!/bin/bash
export $(grep -v '^#' .env | xargs)

mysql -P 3307 -u root -p1234 -e "DROP DATABASE imkdw_dev; CREATE DATABASE imkdw_dev;"
npx prisma db push
npx prisma db seed