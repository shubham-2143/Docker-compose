pipeline {
    agent any

    environment {
        AWS_REGION = "us-east-1"
        AWS_ACCOUNT_ID = "340285141944"

        BACKEND_IMAGE = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/employee-backend"
        FRONTEND_IMAGE = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/employee-frontend"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                url: 'https://github.com/shubham-2143/Docker-compose.git'
            }
        }

        stage('Verify Environment') {
            steps {
                sh '''
                java -version
                mvn -version
                docker --version
                aws --version
                aws sts get-caller-identity
                '''
            }
        }

       stage('Build Backend') {
    steps {
        dir('backend') {
            sh '''
            export JAVA_HOME=/usr/lib/jvm/java-21-amazon-corretto.x86_64
            export PATH=$JAVA_HOME/bin:$PATH

            java -version
            javac -version
            mvn -version

            mvn clean compile -U
            '''
        }
    }
}

        stage('SonarQube Analysis') {
            environment {
                scannerHome = tool 'SonarScanner'
            }

            steps {
                withSonarQubeEnv('sonarqube') {
                    sh """
                    ${scannerHome}/bin/sonar-scanner \
                    -Dsonar.projectKey=employee-management-app \
                    -Dsonar.projectName="Employee Management App" \
                    -Dsonar.projectVersion=1.0 \
                    -Dsonar.sources=backend/src/main,frontend/src \
                    -Dsonar.java.binaries=backend/target/classes \
                    -Dsonar.sourceEncoding=UTF-8
                    """
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Login to ECR') {
            steps {
                sh '''
                aws ecr get-login-password --region ${AWS_REGION} | \
                docker login --username AWS --password-stdin \
                ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
                '''
            }
        }

        stage('Build Docker Images') {
            steps {
                sh '''
                docker build -t employee-backend ./backend
                docker build -t employee-frontend ./frontend
                '''
            }
        }

        stage('Tag Docker Images') {
            steps {
                sh '''
                docker tag employee-backend:latest ${BACKEND_IMAGE}:latest
                docker tag employee-frontend:latest ${FRONTEND_IMAGE}:latest
                '''
            }
        }

        stage('Push Images to ECR') {
            steps {
                sh '''
                docker push ${BACKEND_IMAGE}:latest
                docker push ${FRONTEND_IMAGE}:latest
                '''
            }
        }

        stage('Deploy Containers') {
            steps {
                sh '''
                docker compose down || true
                docker compose up -d
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh '''
                docker ps

                echo "===== Backend Health ====="
                curl http://localhost:8081/employees || true
                '''
            }
        }
    }

    post {

        success {
            echo 'Application deployed successfully with SonarQube Quality Check!'
        }

        failure {
            echo 'Pipeline failed!'
        }
    }
}
