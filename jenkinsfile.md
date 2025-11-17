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
sudo yum upgrade
# Add required dependencies for the jenkins package
sudo yum install fontconfig java-21-openjdk
sudo yum install jenkins
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

