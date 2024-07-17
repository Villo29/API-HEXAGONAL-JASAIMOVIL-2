pipeline {
    agent any

    environment {
        NODEJS_HOME = '/usr/local/bin/node' // Ajusta la ruta de Node.js según tu instalación
        PATH = "${NODEJS_HOME}/bin:${env.PATH}"
    }

    stages {
        stage('Checkout') {
            steps {
                // Clona el repositorio
                git 'https://github.com/Villo29/API-HEXAGONAL-JASAIMOVIL-2.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Instala las dependencias del proyecto
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                // Ejecuta las pruebas unitarias
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                // Construye el proyecto (ajusta este comando según sea necesario)
                sh 'npm run build'
            }
        }
    }

    post {
        always {
            // Archiva los resultados de las pruebas
            junit 'test-results.xml'

            // Limpia el workspace después de la ejecución
            cleanWs()
        }
    }
}