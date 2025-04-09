pipeline {
    agent any
    environment {
        GIT_REPO = "https://github.com/LAURASOY1/gallery"
        GIT_BRANCH = "master"
        RENDER_WEBHOOK = "https://api.render.com/deploy/srv-cvqnhveuk2gs73ckqj1g?key=L9jQcaxODvQ"
        SLACK_WEBHOOK = "https://hooks.slack.com/services/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"
    }
    stages {
        stage('Clone Code') {
            steps {
                git branch: "${env.GIT_BRANCH}", url: "${env.GIT_REPO}"
            }
        }
        stage('Test') {
            steps {
            sh 'npm test' 
            }
}
        
        stage('Build App') {
            steps {
                sh 'npm install'
            }
        }


        stage('Deploy to Render') {
            steps {
                script {
                    env.RENDER_RESPONSE = sh(script: """
                        curl -X POST "${env.RENDER_WEBHOOK}" \
                             -H "Content-Type: application/json" \
                             --data '{"serviceId": "${env.HEROKU_APP_NAME}"}'
                    """, returnStdout: true).trim()
                    echo "Render deployment response: ${env.RENDER_RESPONSE}"
                }
            }
        }
    }
    post {
        always {
            script {
                echo "Pipeline Execution Completed!"
                env.REPO_NAME = sh(script: "basename -s .git `git config --get remote.origin.url`", returnStdout: true).trim()
                env.DEPLOYMENT_ID = sh(script: "echo '${env.RENDER_RESPONSE}' | jq -r '.deploy.id'", returnStdout: true).trim()
            }
        }
        success {
            script {
                def slackMessage = """
                {
                    "text": "Deployed ${env.REPO_NAME} to Render successfully.\\nBranch: ${env.GIT_BRANCH}\\nDeployment ID: ${env.DEPLOYMENT_ID}"
                }
                """
                sh """
                    curl -X POST -H 'Content-Type: application/json' \
                    --data '${slackMessage}' ${env.SLACK_WEBHOOK}
                """
            }
        }
        failure {
            script {
                mail subject: "PIPELINE FAILURE: ${env.REPO_NAME}",
                     body: """
                     The Jenkins build for ${env.JOB_NAME} has failed.
                     Branch: ${env.GIT_BRANCH}
                     Build URL: ${env.BUILD_URL}
                     
                     Please check the logs for more details.
                     """,
                     to: "laurachepkemoi111@gmail.com",
                     from: "jenkins@example.com"
            }
        }
    }
}