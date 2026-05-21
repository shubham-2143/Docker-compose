# 🚀 End-to-End DevOps CI/CD Platform for Employee Management Application on AWS

## Contents

- Architecture Diagram
- Tech Stack
- Project Overview
- Application Containerisation
- Infrastructure & Environment Setup
- CI/CD Pipeline with Jenkins
- SonarQube Code Quality Analysis
- Docker Image Build & Amazon ECR Integration
- Automated Deployment with Docker Compose
- Application Health Validation
- Challenges Solved
- Future Enhancements
- Conclusion

---

# 🏗️ Architecture and Pipeline Diagram

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/7a96f0a5-5a3e-4e04-a817-28db2efa7295" />



<img width="1352" height="453" alt="image" src="https://github.com/user-attachments/assets/266798c6-c370-4677-8201-6f2b57a757d3" />



GitHub
   │
   ▼
Jenkins CI/CD Pipeline
   │
   ├── SonarQube Analysis
   ├── Quality Gate
   ├── Docker Build
   ├── Amazon ECR Push
   └── Automated Deployment
               │
               ▼
           AWS EC2
               │
     ┌─────────┼─────────┐
     │         │         │
     ▼         ▼         ▼
 Frontend   Backend    MySQL
  React   Spring Boot  Database

---

# 🛠️ Tech Stack

## Cloud & Infrastructure
- AWS EC2
- Amazon ECR
- IAM Roles
- Security Groups

## CI/CD & DevOps
- Jenkins
- SonarQube
- Docker
- Docker Compose
- GitHub Webhooks

## Application Stack
- Spring Boot (Java 21)
- React.js
- MySQL
- Maven
- Axios

---

# 📌 Project Overview

This project demonstrates an end-to-end **DevOps CI/CD implementation** for a full-stack Employee Management Application deployed on AWS.

The objective of the project was to automate the entire software delivery lifecycle from **source code commit to application deployment**, while integrating modern DevOps tooling and practices.

The workflow includes:

- Source code management through GitHub
- Continuous Integration using Jenkins
- Static code analysis using SonarQube
- Docker-based containerisation
- Image storage in Amazon ECR
- Automated deployment on AWS EC2
- Multi-container orchestration using Docker Compose
- Health verification after deployment

The result is a fully automated deployment pipeline capable of continuously delivering application updates with minimal manual intervention.

---

# Step 1 – Application Containerisation

The application was first containerised to ensure portability and environment consistency.

Separate Dockerfiles were created for:

### Backend
A Spring Boot application container running on Java 21.

### Frontend
A React.js application served through a lightweight web server.

### Database
MySQL was deployed as a dedicated container and integrated into the application network.

Docker Compose was used to orchestrate communication between all services.

This step ensured:

- Consistent runtime environments
- Isolated service deployment
- Simplified application startup
- Reproducible deployments

Application validation was performed locally before cloud deployment.

---

# Step 2 – Infrastructure & Environment Setup

An AWS EC2 instance was configured as the deployment environment.

The following DevOps tooling was installed and configured:

### Core Dependencies
- Java 21
- Maven
- Node.js
- Docker
- Docker Compose
- AWS CLI
- SonarQube
- Jenkins

IAM Roles were attached to EC2 to securely authenticate with AWS services without exposing access keys.

Amazon ECR repositories were provisioned to store application container images.

This established a secure and repeatable deployment environment.

---

# Step 3 – CI/CD Pipeline with Jenkins

A production-style CI/CD pipeline was implemented using Jenkins to automate the application delivery process.

The pipeline is integrated with GitHub webhooks and automatically triggers on code changes.

The workflow includes:

- **Code Checkout** from GitHub  
- **Environment Verification** to validate required tools and dependencies  
- **Backend Build** using Maven for Spring Boot application packaging  
- **SonarQube Analysis** for static code quality checks  
- **Quality Gate Validation** to ensure only approved code progresses  
- **Docker Image Build** for frontend and backend services  
- **Amazon ECR Push** for centralized image storage  
- **Automated Deployment** on AWS EC2 using Docker Compose  
- **Health Validation** to verify successful deployment

**This implementation established a fully automated workflow from **code commit to deployment**, reducing manual effort and improving deployment consistency.**
---

# Step 4 – SonarQube Code Quality Analysis

SonarQube was integrated into the Jenkins pipeline to enforce code quality standards.

Static code analysis was introduced before deployment to identify:

- Bugs
- Vulnerabilities
- Code Smells
- Maintainability Issues

A **Quality Gate** was implemented to ensure deployments only continue if the code passes predefined quality checks.

This prevents poor-quality code from reaching deployment environments.

---

# Step 5 – Docker Image Build & Amazon ECR Integration

After successful validation, Docker images are built automatically through Jenkins.

The pipeline:

- Builds frontend image
- Builds backend image
- Tags images
- Authenticates with Amazon ECR
- Pushes images into ECR repositories

This provides:

- Centralised image storage
- Version consistency
- Simplified deployments
- Cloud-native container management

---

# Step 6 – Automated Deployment with Docker Compose

Deployment automation was implemented using Docker Compose.

The deployment process includes:

### Existing Container Cleanup
Old containers are stopped safely.

### Service Deployment
Updated frontend, backend, and MySQL containers are started automatically.

### Service Networking
Container communication is handled internally using Docker networking.

### Database Connectivity
Backend services connect to MySQL using container-based service discovery.

This enables fast, repeatable, and reliable deployments.

---

# Step 7 – Application Health Validation

Post-deployment validation was implemented to verify successful releases.

Automated health checks validate:

- Running containers
- Backend API availability
- Service accessibility

Application endpoints are verified after deployment to confirm system health.

This reduces deployment risks and increases reliability.

---

# ⚠️ Real-World DevOps Challenges Solved

During implementation, several production-like issues were identified and resolved:

### Docker Networking Issues
Resolved inter-container communication failures.

### MySQL Authentication Failures
Fixed backend connectivity and credential mismatches.

### Jenkins Java Version Conflicts
Resolved Java 17 vs Java 21 compatibility issues.

### SonarQube Integration Issues
Configured Quality Gates and webhook communication.

### AWS ECR Authentication Problems
Implemented secure IAM-based authentication.

### Disk Space Optimization
Managed Docker cleanup and EC2 storage limitations.

### Backend Container Failures
Resolved deployment and runtime crashes through log-based debugging.

These troubleshooting experiences strengthened practical DevOps problem-solving skills.

---

# 🔄 CI/CD Workflow

```text
GitHub Push
      │
      ▼
Jenkins Pipeline
      │
      ▼
Code Checkout
      │
      ▼
SonarQube Analysis
      │
      ▼
Quality Gate Validation
      │
      ▼
Application Build
      │
      ▼
Docker Image Build
      │
      ▼
Amazon ECR Push
      │
      ▼
Docker Compose Deployment
      │
      ▼
Application Health Validation

---

# 🔮 Future Enhancements

Planned next phase of this project:

- Kubernetes (Amazon EKS)
- ArgoCD GitOps Deployment
- Helm Charts
- Trivy Security Scanning
- Prometheus & Grafana Monitoring
- Terraform Infrastructure Automation

---

# Conclusion

This project demonstrates the implementation of a fully automated DevOps CI/CD platform for a containerised full-stack application on AWS.

It combines CI/CD automation with Jenkins, code quality analysis using SonarQube, containerisation through Docker, cloud-native image management using Amazon ECR, and automated deployment using Docker Compose.

The outcome is a scalable, repeatable, and reliable deployment workflow that reflects real-world DevOps engineering practices and production deployment patterns.

---

# 👨‍💻 Author

### Shubham Sontakke

**DevOps Engineer | AWS | Docker | Jenkins | Kubernetes | Terraform | CI/CD**
