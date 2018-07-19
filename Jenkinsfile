#!groovy
@Library('github.nwie.net/Nationwide/shared-pipeline-library')
import com.nationwide.pipeline.build.BuildConfig
import com.nationwide.pipeline.build.BuildList

BuildList buildConfigs = new BuildList(
		[
				['master', 'TTJ1167', 'H * * * *']
		]
)
BuildConfig currentConfig = buildConfigs.getDeployConfig(env.BRANCH_NAME) ?: new BuildConfig(env.BRANCH_NAME)

propertiesConfig(currentConfig)

def recipients = ['polisk1', 'pulin84', 'vandykj1', 'sherram', 'sharma8', 'eepurs2']

node {
	try {
		withEnv(["PATH+MAVEN=${tool 'Maven 3.3'}/bin", "PATH+JAVA=${tool 'Oracle Hotspot 1.8 JDK'}/bin"]) {
			stage('Checkout Code') {
				checkout scm
			}

			stage('Build') {
				sh 'mvn clean package -Dmaven.test.skip'
			}

			stage('Test') {
				sh 'mvn test'
			}

			stage('Deploy') {
				nitroDeploy(currentConfig, "${env.WORKSPACE}/target/productmanual-0.0.1.war")
			}
		}
	} catch (e) {
		emailRecipients('FAILURE', recipients)
		throw e
	} finally {
		junit '**/target/surefire-reports/*.xml'
		retry(2) { deleteDir() }
	}
}
