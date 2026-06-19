pipeline {
    agent any

    parameters {
        choice(
            name: 'TAGS',
            choices: ['all', '@positive', '@negative', '@inventory'],
            description: 'Pilih tag scenario yang mau dijalankan'
        )
    }

    environment {
        PATH = "/usr/local/bin:${env.PATH}"
        CI = "true"
    }

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
                sh params.TAGS == 'all' ? 'npm test' : "npx cucumber-js --tags ${params.TAGS}"
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
            publishHTML(target: [
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'reports/html',
                reportFiles: 'index.html',
                reportName: 'Cucumber HTML Report'
            ])
            allure([
                includeProperties: false,
                jdk: '',
                results: [[path: 'allure-results']]
            ])
        }
    }
}
