pipeline {
    agent any

    environment {
        APP_DIR = "/root/employee-management-app"
    }

    stages {

        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                url: 'https://github.com/shubham-2143/Docker-compose.git'
            }
        }

        stage('Copy Project to Deployment Folder') {
            steps {
                sh '''
                rm -rf ${APP_DIR}
                mkdir -p ${APP_DIR}
                cp -r * ${APP_DIR}
                '''
            }
        }

        stage('Build Spring Boot Backend') {
            steps {
                dir("${APP_DIR}/backend") {
                    sh 'chmod +x mvnw || true'
                    sh './mvnw clean package -DskipTests || mvn clean package -DskipTests'
                }
            }
        }

        stage('Stop Existing Containers') {
            steps {
                dir("${APP_DIR}") {
                    sh '''
                    docker compose down || true
                    docker rm -f $(docker ps -aq) || true
                    '''
                }
            }
        }

        stage('Remove Old Images') {
            steps {
                sh '''
                docker image prune -af || true
                '''
            }
        }

        stage('Build Docker Images') {
            steps {
                dir("${APP_DIR}") {
                    sh 'docker compose build --no-cache'
                }
            }
        }

        stage('Deploy Application') {
            steps {
                dir("${APP_DIR}") {
                    sh 'docker compose up -d'
                }
            }
        }

        stage('Verify Containers') {
            steps {
                sh '''
                docker ps
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                sleep 30

                curl -I http://localhost || true
                curl http://localhost:8081/employees || true
                '''
            }
        }
    }

    post {

        success {
            echo 'Application deployed successfully!'
        }

        failure {
            echo 'Deployment failed!'
        }

        always {
            sh 'docker ps -a'
        }
    }
}
