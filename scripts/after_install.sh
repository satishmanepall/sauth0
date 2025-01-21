#!/bin/bash
CURRENT_CODE_PATH="/home/proddeployuser/workspace/sauth0-api"
BACKUP_CODE_PATH="/home/proddeployuser/workspace/sauth0-api_bkp"
S3_BUCKET="my-secrets"
ENV_FILE_KEY="mysecretfiles/sauth0-api-env"  # S3 key of the .env file

if [ -d "$CURRENT_CODE_PATH" ]; then
    echo "Backing up existing code to $BACKUP_CODE_PATH"
    sudo rm -rf $BACKUP_CODE_PATH  # Remove old backup if it exists
    sudo mv $CURRENT_CODE_PATH $BACKUP_CODE_PATH  # Move current code to backup
else
    echo "No existing code found, proceeding with new code deployment"
fi

# Find the actual deployment directory
DEPLOYMENT_ARCHIVE=$(find /opt/codedeploy-agent/deployment-root -type d -name "deployment-archive" -printf '%T@ %p\n' | sort -n | tail -n 1 | awk '{print $2}')

if [ -z "$DEPLOYMENT_ARCHIVE" ]; then
    echo "Error: Could not find deployment-archive directory!"
    exit 1
fi

echo "Copying new code from $DEPLOYMENT_ARCHIVE to $CURRENT_CODE_PATH"
mkdir -p $CURRENT_CODE_PATH
cp -r $DEPLOYMENT_ARCHIVE/* $CURRENT_CODE_PATH
cp -r $DEPLOYMENT_ARCHIVE/.* $CURRENT_CODE_PATH

echo "Downloading .env file from S3 bucket: $S3_BUCKET, key: $ENV_FILE_KEY"
aws s3 cp s3://$S3_BUCKET/$ENV_FILE_KEY $CURRENT_CODE_PATH/.env

# Ensure the .env file is copied correctly
if [ ! -f "$CURRENT_CODE_PATH/.env" ]; then
    echo "Error: .env file could not be downloaded or copied!"
    exit 1
else
    echo ".env file downloaded and copied successfully!"
fi

# Remove the old Docker service if it exists
docker service rm sauth0-api

# Clean up Docker system
docker system prune -a -f

# Build the new Docker image
cd /home/proddeployuser/workspace/sauth0-api
docker build -t sauth0-api -f Dockerfile .

# Create a new Docker service
docker service create --name sauth0-api --replicas 1 -p 3002:3002 sauth0-api:latest

echo "Deployment completed successfully with great!!!"
