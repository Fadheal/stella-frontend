#!/bin/bash

APP_NAME="nextjs-app"

echo "Updating system..."
sudo apt update -y

echo "Installing dependencies..."
sudo apt install -y nodejs npm git

echo "Installing PM2..."
sudo npm install -g pm2

echo "Installing project packages..."
npm install

echo "Building Next.js..."
npm run build

echo "Starting Next.js with PM2..."
pm2 stop $APP_NAME 2>/dev/null || true
pm2 delete $APP_NAME 2>/dev/null || true
pm2 start npm --name $APP_NAME -- run start

echo "Saving PM2 process list..."
pm2 save

echo "Setting PM2 to start on reboot..."
read -p "Do you want to enable PM2 startup on reboot? (y/n): " answer
if [ "$answer" = "y" ] || [ "$answer" = "Y" ]; then
    pm2 startup systemd -u $USER --hp $HOME
    echo "PM2 startup enabled."
else
    echo "Skipped enabling PM2 startup."
fi

echo "Next.js deployment completed."
