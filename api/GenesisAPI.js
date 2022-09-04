import { simpleGit } from 'simple-git'
const Git = simpleGit()

import fs, { read, write } from 'fs'

import * as Prompts from './Prompts.js'

export default {
	getAllNames: async () => {
		getAllNames()
	},
	contains: async (name) => {
		return contains(name)
	},
	addPackage: async (conf) => {
		addPackage(conf)
	},
	getData: () => {
		return load()
	},
	dependsOn: (target, dependency) => {
		return dependsOn(target, dependency)
	},
	setDependencies: (target, dependencies) => {
		const data = load()
		data.links[target] = dependencies
		save(data)
	}
}

function load() {
	if (!fs.existsSync('./genesis.json')) return { projects: [], packages: [], links: {} }
	return JSON.parse(fs.readFileSync('./genesis.json', { encoding: 'utf-8' }))
}
function save(data) {
	fs.writeFileSync('./genesis.json', JSON.stringify(data, null, 4), { encoding: 'utf-8' })
}

function getAllNames() {
	const data = load()
	const names = []
	data.projects.forEach(e => {
		names.push(e.name)
	});
	data.packages.forEach(e => {
		names.push(e.name)
	});

	console.log(names)

	return names
}
function contains(name) {
	return getAllNames().includes(name)
}
function addPackage(conf) {
	if (contains(conf.meta.name)) {
		console.info(`Project/Package ${conf.meta.name} already exists!`)
		return
	}

	switch (conf.type) {
		case Prompts.PACKAGE_TYPE_GITHUB_SUBMODULE:
			addGitHubSubmodule(conf.meta)
			break
		case Prompts.PACKAGE_TYPE_SINGLE_FILE:
			break
		case Prompts.PACKAGE_TYPE_PROJECT:
			addProject(conf.meta)
			break
	}

	console.log(conf.meta)
}
function dependsOn(target, dependency) {
	const data = load()
	if (data.links[target] == undefined) return false
	const links = data.links[target]
	return links.contains(dependency)
}

function addGitHubSubmodule(meta) {
	const data = load()

	data.packages.push({
		name: meta.name,
		package: {
			type: 'git',
			repo: meta.url
		},
		library: {
			type: meta.type,
			includeDir: meta.includeDir
		}
	})

	save(data)
}
function addProject(meta) {
	const data = load()

	data.projects.push({
		name: meta.name,
		type: meta.type,
		src: meta.srcDir,
		tests: meta.testDir,
		lang: meta.language
	})

	save(data)
}
