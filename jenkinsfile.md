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

<img width="1865" height="904" alt="image" src="https://github.com/user-attachments/assets/61393adb-1414-4e85-bc03-018ca9fc6edd" />

