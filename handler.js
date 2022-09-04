import Inquirer from 'inquirer'
import GenesisAPI from './api/GenesisAPI.js'
import * as Prompts from './api/Prompts.js'

export default {
	add: async () => {
		let type = await askPackageType()
		var meta = {}
		switch (type) {
			case Prompts.PACKAGE_TYPE_GITHUB_SUBMODULE: {
				meta = await askGitRepo()
				break
			}
			case Prompts.PACKAGE_TYPE_SINGLE_FILE: {
				meta = await askSingleFile()
				break
			}
			case Prompts.PACKAGE_TYPE_PROJECT: {
				meta = await askProject()
				console.log('Your project will be added...')
				console.log('To edit dependencies type in "genesisb dependencies"')
				break
			}
		}

		GenesisAPI.addPackage({ type, meta })
	},
	dependencies: async () => {
		const data = GenesisAPI.getData()
		const dependents = []

		data.projects.forEach(e => {
			dependents.push(e.name)
		})
		data.packages.forEach(e => {
			dependents.push(e.name)
		})

		const answers = await Inquirer.prompt({
			name: 'project',
			type: 'list',
			message: 'Choose the project where you want to edit the dependencies',
			choices: dependents
		})
		const target = answers.project

		const dependencies = []
		data.projects.forEach(e => {
			if (e.name == target) return
			if (e.type == Prompts.PROJECT_TYPE_CONSOLE_APP) return
			dependencies.push(e.name)
		})
		data.packages.forEach(e => {
			if (e.name == target) return
			dependencies.push(e.name)
		})

		const answers2 = await Inquirer.prompt({
			name: 'dependencies',
			type: 'checkbox',
			message: 'Choose what dependencies you want to add to your target',
			choices: dependencies
		})

		GenesisAPI.setDependencies(target, answers2.dependencies)
	}
}

async function askPackageType() {
	const answers = await Inquirer.prompt({
		name: 'type',
		type: 'list',
		message: 'What type of package do you want to add?',
		choices: Object.keys(Prompts.PACKAGE_TYPES)
	})

	return Prompts.PACKAGE_TYPES[answers.type]
}

async function askProject() {
	const answers = await Inquirer.prompt([
		{
			name: 'name',
			type: 'input',
			message: 'Enter the name of your sub project'
		},
		{
			name: 'type',
			type: 'list',
			message: 'What type of project do you want to add?',
			choices: Object.keys(Prompts.PROJECT_TYPES)
		},
		{
			name: 'language',
			type: 'list',
			message: 'Choose a language',
			choices: Object.keys(Prompts.LANGUAGES)
		},
		{
			name: 'srcDir',
			type: 'input',
			message: 'Enter the SRC-Directory of your project'
		},
		{
			name: 'tests',
			type: 'list',
			message: 'Do you want to add unit tests to your project?',
			choices: Object.keys(Prompts.PROMPT_BOOL)
		}
	])

	var tests = undefined

	if (Prompts.PROMPT_BOOL[answers.tests]) {
		const answers2 = await Inquirer.prompt({
			name: 'testDir',
			type: 'input',
			message: 'Enter your directory where your unit tests will be stored'
		})

		tests = answers2.testDir
	}

	const answersCheck = await Inquirer.prompt({
		name: 'check',
		type: 'list',
		message: 'Is that correct?',
		choices: Object.keys(Prompts.PROMPT_BOOL)
	})

	if (!Prompts.PROMPT_BOOL[answersCheck.check]) {
		console.log()
		console.log()
		console.log()
		await askProject()
	}

	return { name: answers.name, type: Prompts.PROJECT_TYPES[answers.type], language: Prompts.LANGUAGES[answers.language], srcDir: answers.srcDir, testDir: tests }
}

async function askSingleFile() {
	const answers = await Inquirer.prompt([
		{
			name: 'url',
			type: 'input',
			message: 'Enter the direct download link of your file'
		},
		{
			name: 'name',
			type: 'input',
			message: 'Enter the name the file should be name (include ending)'
		},
		{
			name: 'group',
			type: 'input',
			message: 'Enter the group where your file should be saved in'
		}
	])

	const answersCheck = await Inquirer.prompt({
		name: 'check',
		type: 'list',
		message: 'Is that correct?',
		choices: Object.keys(Prompts.PROMPT_BOOL)
	})

	if (!Prompts.PROMPT_BOOL[answersCheck.check]) {
		console.log()
		console.log()
		console.log()
		await askSingleFile()
	}

	return { url: answers.url, name: answers.name, group: answers.group }
}
async function askGitRepo() {
	const answers = await Inquirer.prompt([
		{
			name: 'url',
			type: 'input',
			message: 'Enter the repo url'
		},
		{
			name: 'name',
			type: 'input',
			message: 'Enter the name of this package'
		},
		{
			name: 'type',
			type: 'list',
			message: 'What type of package do you want to add?',
			choices: Object.keys(Prompts.LIBRARY_TYPES)
		},
		{
			name: 'includeDir',
			type: 'input',
			message: 'Enter the include directory relative to the repo root',
			default() {
				return 'include/'
			}
		},
		{
			name: 'premake',
			type: 'list',
			message: 'Does your package already contain a premake file?',
			choices: Object.keys(Prompts.PROMPT_BOOL)
		}
	])

	var premakeFile = undefined

	if (Prompts.PROMPT_BOOL[answers.premake]) {
		const answers2 = await Inquirer.prompt({
			name: 'premake',
			type: 'input',
			message: 'What is your premake file called?',
			default() {
				return 'premake5.lua'
			}
		})

		premakeFile = answers2.premake
	}

	const answersCheck = await Inquirer.prompt({
		name: 'check',
		type: 'list',
		message: 'Is that correct?',
		choices: Object.keys(Prompts.PROMPT_BOOL)
	})

	if (!Prompts.PROMPT_BOOL[answersCheck.check]) {
		console.log()
		console.log()
		console.log()
		await askGitRepo()
	}

	return { url: answers.url, type: Prompts.LIBRARY_TYPES[answers.type], premake: premakeFile, includeDir: answers.includeDir, name: answers.name }
}

function getNameFromUrl(url) {
	return url.substr(url.lastIndexOf('/') + 1)
}
