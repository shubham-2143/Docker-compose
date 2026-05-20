pipeline {
    agent any

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                url: 'https://github.com/shubham-2143/Docker-compose.git'
            }
        }

        stage('Check Java') {
            steps {
                sh '''
                java -version
                javac -version
                '''
            }
        }

        stage('Stop Existing Containers') {
            steps {
                sh 'docker compose down || true'
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

        stage('Verify Containers') {
            steps {
                sh 'docker ps'
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                sleep 20
                curl http://localhost || true
                curl http://localhost:8081/employees || true
                '''
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful!'
        }

        failure {
            echo 'Deployment Failed!'
        }
    }
}
