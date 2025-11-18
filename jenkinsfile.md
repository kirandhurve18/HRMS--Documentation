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

