#!/bin/bash
CURRENT_CODE_PATH="/home/proddeployuser/workspace/sauth0-api"
BACKUP_BASE_PATH="/home/proddeployuser/workspace/sauth0-api_bkp"
TIMESTAMP=$(date +"%Y%m%d%H%M%S")  # Unique timestamp for each backup
BACKUP_CODE_PATH="${BACKUP_BASE_PATH}_${TIMESTAMP}"  # Backup with timestamp
S3_BUCKET="my-secrets"
ENV_FILE_KEY="mysecretfiles/sauth0-api-env"  # S3 key of the .env file

# Backup existing code with timestamp
if [ -d "$CURRENT_CODE_PATH" ]; then
    echo "Backing up existing code to $BACKUP_CODE_PATH"
    sudo mkdir -p $BACKUP_BASE_PATH  # Ensure base backup directory exists
    sudo mv $CURRENT_CODE_PATH $BACKUP_CODE_PATH  # Move current code to timestamped backup
else
    echo "No existing code found, proceeding with new code deployment"
fi

# Copy new code (CodeDeploy manages the file extraction)
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

# Build and deploy the new Docker image
cd $CURRENT_CODE_PATH
docker build -t sauth0-api -f Dockerfile .

docker service create --name sauth0-api --replicas 1 -p 3002:3002 sauth0-api:latest

echo "Deployment completed successfully!"
