# JENKINS SERVER SET-UP FOR JENKINS PIPELINE (BACKEND )

````
sudo apt update
sudo apt install fontconfig openjdk-21-jre
java -version
````

````
sudo wget -O /etc/yum.repos.d/jenkins.repo \
    https://pkg.jenkins.io/redhat-stable/jenkins.repo
sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io-2023.key
sudo apt upgrade
# Add required dependencies for the jenkins package
sudo apt install fontconfig java-21-openjdk
sudo apt install jenkins
sudo systemctl daemon-reload
````
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
sudo apt install docker.io -y
````
````
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins
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
— Install Required Plugins

Go to:

Manage Jenkins → Plugins → Available Plugins

Add Credenatial:
* instll plugins - docker plugins , docker pipeline plugins , git , pipeline , pipeline stageview, 
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

