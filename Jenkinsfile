pipeline {
    agent any

    environment {
        APP_DIR = "${WORKSPACE}"
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
                url: 'https://github.com/shubham-2143/employee-management-app.git'
            }
        }

        stage('Build Backend') {
            steps {
                dir("${APP_DIR}/backend") {
                    sh 'chmod +x mvnw || true'
                    sh './mvnw clean package -DskipTests || mvn clean package -DskipTests'
                }
            }
        }

        stage('Stop Existing Containers') {
            steps {
                sh '''
                docker compose down || true
                '''
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker compose build --no-cache'
            }
        }

        stage('Deploy Application') {
            steps {
                sh 'docker compose up -d'
            }
        }

        stage('Verify Deployment') {
            steps {
                sh 'docker ps'
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                sleep 20
                curl http://localhost:8081/employees || true
                '''
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful'
        }

        failure {
            echo 'Deployment Failed'
        }
    }
}
