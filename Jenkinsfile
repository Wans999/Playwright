pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                sh 'npx playwright install chromium'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Generate Report') {
            steps {
                sh 'npm run report'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'reports/html/**', allowEmptyArchive: true
        }
    }
}
