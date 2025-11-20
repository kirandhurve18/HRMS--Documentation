# jenkinsfile with only dockerfile deployment like --> build image --> build conatiner --> through docker itself 
===============================================================================================================

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
        stage('Run New Container') {
            steps {
                sh """
                    # Stop old container if running
                    docker rm -f ${CONTAINER_NAME} || true

                    # Run new container
                    docker run -d --name ${CONTAINER_NAME} -p 3005:3005 ${IMAGE_NAME}:latest
                """
            }
        }
    
    }
} 

````
==================================================================================================================================

# jenkins file like ---> created image through dockerfile --> build docker image --> push docker image to dockerhub --> pull image from docker hub --> deploy through docker conatiner

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
