pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/LAURASOY1/gallery'
      }
    }
    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }
    stage('Run Tests') {
      steps {
        sh 'npm test'
      }
    }
    stage('Deploy to Render') {
      steps {
        sh 'echo "Deploying to Render..."'
      }
    }
  }
  post {
    failure {
      emailext (
        subject: "FAILED: Job '${env.JOB_NAME}' (${env.BUILD_NUMBER})",
        body: "Tests failed. Check console output: ${env.BUILD_URL}",
        to: "laurachepkemoi111@gmail.com"
      )
    }
    always {
      echo 'Pipeline completed.'
    }
  }
}