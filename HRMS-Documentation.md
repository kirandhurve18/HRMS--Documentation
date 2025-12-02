# JENKINS SERVER SET-UP FOR JENKINS PIPELINE (BACKEND )

````
apt update -y 
````
````
apt install openjdk-11-jdk -y
````
Verify the Java installation:

````
java -version
````
Add the Jenkins repository.
Import the Jenkins key to authenticate the repository:
````
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee \
/usr/share/keyrings/jenkins-keyring.asc > /dev/null
````
Add the Jenkins repository to your system's package list:
````
echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
https://pkg.jenkins.io/debian-stable/ binary/ | sudo tee \
/etc/apt/sources.list.d/jenkins.list > /dev/null
````
install jenkins.
Update the package list again to include the new Jenkins repository:
````
sudo apt update
````
Install Jenkins :

````
sudo apt install jenkins -y
````
Start and Enable Jenkins Service.

````
sudo systemctl enable jenkins
````
````
sudo systemctl start jenkins
````
````
sudo systemctl status jenkins
````
````
http://YOUR_SERVER_IP:8080
````
````
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
````
Install suggested plugins 
````
username-admin
password-admin
````
## Set up the Docker repository: 

````
 IMP : sudo apt install docker.io -y
````
Install packages to allow apt to use a repository over HTTPS:

````
sudo apt-get install ca-certificates curl gnupg
````
Add Docker's official GPG key.
````
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
````

Add the Docker repository to apt sources:
````
echo \
"deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
"$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
````

Update the apt package index again.

````
apt-get update
````

Install Docker Engine, containerd, and Docker Compose:
````
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
````
Create the docker group (if it doesn't already exist):
````
sudo groupadd docker
````
Add your user to the docker group:
````
sudo usermod -aG docker $USER
````


# Install suggested plugins 
````
username-admin
password-admin
````
— Install Required Plugins

Go to:

Manage Jenkins → Plugins → Available Plugins

Add Credenatial:
* install plugins - docker plugins , docker pipeline plugins , git , pipeline , pipeline stageview, 
* integrate tools - git add credencial if repo is private , docker , node js .

```
 which docker 
````
````
which git
````
if this is not working , add docker user and jenkins user .

## Then add Jenkins user to docker group:
````
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins
````
## Maybe the container starts but dies immediately
````
docker logs backend-container
````
## sometimes have the port issues .

# Jenkins Steps -- PLUGINS , TOOLS , CREDENTIAL , CONFIGURATION - PIPELINE 

## PLUGINS : 

<img width="1400" height="400" alt="image" src="https://github.com/user-attachments/assets/0ff8b502-0567-4be7-8631-93c0a9148d32" />

## Tools:

<img width="1273" height="575" alt="image" src="https://github.com/user-attachments/assets/a7af75f9-8807-400d-9f6e-bfba9281cf6f" />

## Credential 

<img width="1395" height="738" alt="image" src="https://github.com/user-attachments/assets/a02b08bd-241b-4f48-a025-7c9a1213f522" />

## Job -- configuration

<img width="956" height="358" alt="image" src="https://github.com/user-attachments/assets/73525a17-8913-4909-9178-4f73dc09a433" />

<img width="1325" height="639" alt="image" src="https://github.com/user-attachments/assets/b2bdf5a0-a6b1-42c6-8ae0-b2ab92f0dfd1" />

<img width="1250" height="301" alt="image" src="https://github.com/user-attachments/assets/64f8a27f-1786-4967-8d92-f2ee1ef864a7" />

<img width="1171" height="562" alt="image" src="https://github.com/user-attachments/assets/2101fa0c-7c8e-49e4-983d-463dfd2bf65c" />


# Now i will push my docker image to the dockerhub 

## For that you have to create a account for docker hub 

login to the docker hub --

username - kirand18

password - docker-token

create token from -->account setting--> personal access token -->token will genrate --> copy that token and save .

Go to the jenkins --> credential --> add credentai--> in secret paste the doker-token .

<img width="1076" height="777" alt="image" src="https://github.com/user-attachments/assets/4215f4ae-81f7-4f9f-87ca-4e43b3ff04fc" />

After that go the job --> pipeline --> pipeline syntax  --> follow this steps 

<img width="1802" height="896" alt="image" src="https://github.com/user-attachments/assets/ec72e3f8-db34-4f36-b58a-b82738a375d4" />


Write the stages for the -->create the image -->  Login to dockerhub  --> push image to dockerhub ---> pull image to conatiner --> and host the application

jenkins file for this stages :

````
pipeline {
    agent any
    environment {
        IMAGE_NAME = "myimage"
        CONTAINER_NAME = "backend-container"
    }

    stages {
        stage('pull'){
            steps {
                git branch: 'main', credentialsId: 'git-C', url: 'https://github.com/kirandhurve18/backend-hrms.git'
            }
        }
    
        stage('Build Docker Image') {
            steps {
                script {
                   docker.build(IMAGE_NAME)
                }
            }
        }

        stage('Docker Login') {
            steps {
                 withCredentials([string(credentialsId: 'dockerhub-token', variable: 'DOCKERHUB_TOKEN')]) {
                 sh '''
                echo "$DOCKERHUB_TOKEN" | docker login -u "kirand18" --password-stdin
               '''
            }
        }
} 

        stage('Push to DockerHub') {
            steps {
             sh '''
             docker tag myimage:latest kirand18/dockerrepo:latest
             docker push kirand18/dockerrepo:latest
             '''
    }
}
        stage('deploy'){
            steps{
                sh """
                    docker rm -f backend-container || true
                    docker pull kirand18/dockerrepo:latest
                    docker run -d --name backend-container -p 3005:3005 kirand18/dockerrepo:latest
                """
            }
        }

    
    }
}

````

# Now we need kubernetes for the deployment.

## I am using the GCP kubernet engine for the deployment :

### Step 1 — Open Google Cloud Console

https://console.cloud.google.com/iam-admin/serviceaccounts
Select your GCP Project (top dropdown).

### Step 2 — Create Service Account

Click:

➝ CREATE SERVICE ACCOUNT

Fill:

Service Account Name:
jenkins-gke-deploy

Service Account ID:
auto-fills as jenkins-gke-deploy

Description:
Jenkins pipeline deployment to GKE

Click CREATE AND CONTINUE.

<img width="832" height="751" alt="image" src="https://github.com/user-attachments/assets/42b958d6-1f02-4b4f-ab09-65eeaf29c506" />

<img width="955" height="572" alt="image" src="https://github.com/user-attachments/assets/69b2d1ee-41d1-4133-bc70-c647b0309504" />

### Step 3 — Assign Required IAM Roles

You must add three roles:

1️⃣ roles/container.admin (Required to manage GKE deployments) -->  Search → container.admin → select
2️⃣ roles/storage.admin (Required to pull images and interact with GCR/Artifact Registry) --> Search → storage.admin → select
3️⃣ roles/compute.viewer (Required to read cluster info) --> Search → compute.viewer → select

<img width="1570" height="714" alt="image" src="https://github.com/user-attachments/assets/bcc85d97-0f3f-474d-b68c-ce57f62a283f" />


### Step 4 — Skip granting user access -->  Click DONE.

## You now have a Service Account.

### Step 5 — Create JSON Key

Open the Service Account you created:
jenkins-gke-deploy@<project-id>.iam.gserviceaccount.com

Go to Keys tab.

Click:

➝ ADD KEY → Create new key

Select JSON.

Click CREATE.

Your browser will download: --> jenkins-gke-deploy-xxxx.json --> This is the file Jenkins needs.

### Step 6 — Upload Key to Jenkins

Go to:

Jenkins → Manage Jenkins → Manage Credentials → Global → Add Credentials

Set:

Kind: Secret File

File: Upload the JSON file you downloaded

ID: gcp-key

Description: GKE Deployment Key

Click Save.

<img width="1586" height="857" alt="image" src="https://github.com/user-attachments/assets/e8ec0c6e-7851-42f8-a12d-53e3980d87d1" />

# Install kubectl directly from Kubernetes

### Download latest kubectl

RUN this command on ubuntu server  -- to check the CPU achitecture 
````
uname -m
````


````
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
````

Make it executable

````
chmod +x kubectl
````
````
sudo mv kubectl /usr/local/bin/
````
````
kubectl version --client
````
## Install Google cloud CLI 

````
apt-get install -y google-cloud-cli
````
Check Version 
````
gcloud --version
````
# Create  a Cluster 

SELECT -> Standard mode 

select -> zonal 

node type -> e2 - medium  , No of nodes -> 2 --> create 

# Transfer the json.key to the server for that you need steps :

craete the keys in the cmd (window)
````
ssh-keygen -t rsa -f C:\Users\Kiran\.ssh\mygcp -C kiran 
````
It will create the 
mygcp --> private key , mygcp.pub --> public key 

Copy the public key to VM : Compute Engine → VM instances → Click your VM → Edit → SSH Keys

<img width="1292" height="398" alt="image" src="https://github.com/user-attachments/assets/446e2d31-38d4-4a99-b01e-eecb8a85122f" />

Check this for the username that have to use in the scp command .

servre will have the public-key and the local machine will have the private-key 

connect with local to remote 

TO TEST THE CONNECTION :
````
ssh -i "C:\Users\Kiran\.ssh\mygcp" kiran@34.66.206.108
````

## use command scp in the cmd 

````
scp -i "C:\Users\Kiran\.ssh\mygcp" sonorous-guide-471513-h8-a1f2e0fcedb5.json kiran@34.66.206.108:/home/ubuntu/gcp
````

local path = C:\Users\Kiran\.ssh\mygcp , key-name = sonorous-guide-471513-h8-a1f2e0fcedb5.json , username@<server-ip>=kiran@34.66.206.108 , remotepath=/home/ubuntu/gcp


## Add Google Cloud APT Repository

````
sudo apt-get install -y apt-transport-https ca-certificates gnupg
````
## Add Google Cloud public key:

````
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
````
## Add the repository:
````
echo "deb https://packages.cloud.google.com/apt cloud-sdk main" | \
  sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
````
## Update and Install Plugin
````
sudo apt-get update
sudo apt-get install -y google-cloud-sdk google-cloud-sdk-gke-gcloud-auth-plugin
````
## Test plugin:
````
gke-gcloud-auth-plugin --version
````
## Test GKE Authentication
````
kubectl get nodes
````
TO check the gclohd auth , which service account is configured .

````
gcloud auth list
````
After this you have to  login into the cluster ..

go to the cluster and click the connenct button . after copy the url and paste on the server .

============================================================================================

## issue related the UFW .....dont do it again 
--
STOP the VirtualMachine ---
Select VM -- EDIT -- Automation -- write script over there 

 ````
#!/bin/bash
# Disable firewall (UFW)
ufw disable || true

# Re-enable SSH in case it's disabled
systemctl enable ssh || true
systemctl start ssh || true

# Add your SSH public key manually
mkdir -p /home/ubuntu/.ssh
echo "YOUR_PUBLIC_SSH_KEY_HERE" >> /home/ubuntu/.ssh/authorized_keys
chmod 600 /home/ubuntu/.ssh/authorized_keys
chown -R ubuntu:ubuntu /home/ubuntu/.ssh
````
Script come before the 

save it and then start the VirtualMachine 

# WEBHOOK TRIGGERE :

Go to the pipeline select configure -->  go to tiggers --> Poll SCM --> schedule a crontab job ---> then save 
