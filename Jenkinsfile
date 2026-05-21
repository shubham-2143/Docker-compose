pipeline {
    agent any

    environment {
        AWS_REGION = "us-east-1"
        AWS_ACCOUNT_ID = "340285141944"

        BACKEND_IMAGE = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/employee-backend"
        FRONTEND_IMAGE = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/employee-frontend"

        JAVA_HOME = "/usr/lib/jvm/java-21-amazon-corretto.x86_64"
        PATH = "${JAVA_HOME}/bin:${env.PATH}"
    }

    stages {

        stage('Cleanup Old Cache') {
            steps {
                sh '''
                docker image prune -af || true
                docker builder prune -af || true
                rm -rf /var/lib/jenkins/.m2/repository/*.lastUpdated || true
                '''
            }
        }

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                url: 'https://github.com/shubham-2143/Docker-compose.git'
            }
        }

        stage('Verify Environment') {
            steps {
                sh '''
                echo "===== JAVA ====="
                java -version
                javac -version
                echo $JAVA_HOME

                echo "===== MAVEN ====="
                mvn -version

                echo "===== DOCKER ====="
                docker --version
                docker compose version

                echo "===== AWS ====="
                aws --version
                aws sts get-caller-identity

                echo "===== DISK ====="
                df -h
                '''
            }
        }

        stage('SonarQube Analysis') {
            environment {
                scannerHome = tool 'SonarScanner'
            }

            steps {

                dir('backend') {
                    sh '''
                    export JAVA_HOME=/usr/lib/jvm/java-21-amazon-corretto.x86_64
                    export PATH=$JAVA_HOME/bin:$PATH

                    echo "===== BUILD FOR SONAR ====="
                    mvn clean compile -U -DskipTests

                    echo "===== VERIFY TARGET ====="
                    ls -R target || true
                    ls -la target/classes || true
                    '''
                }

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

        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh '''
                    export JAVA_HOME=/usr/lib/jvm/java-21-amazon-corretto.x86_64
                    export PATH=$JAVA_HOME/bin:$PATH

                    echo "===== PACKAGE BACKEND ====="
                    mvn clean package -DskipTests
                    '''
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
                echo "===== BUILD BACKEND IMAGE ====="
                docker build -t employee-backend ./backend

                echo "===== BUILD FRONTEND IMAGE ====="
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
                echo "===== RUNNING CONTAINERS ====="
                docker ps

                echo "===== BACKEND API TEST ====="
                sleep 20
                curl http://localhost:8081/employees || true
                '''
            }
        }
    }

    post {

        success {
            echo 'Pipeline completed successfully!'
        }

        failure {
            echo 'Pipeline failed!'
        }

        always {
            sh '''
            docker image prune -af || true
            '''
        }
    }
}
