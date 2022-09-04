#!/usr/bin/env node
import fs from 'fs'
if (!fs.existsSync('tmp')) fs.mkdirSync('tmp')

import { Command } from 'commander'
const program = new Command()

import Handler from './handler.js'

import Inquirer from 'inquirer'

program.version('1.0.0')
	.description('C/C++ Build System')
	.name('genesisb')

program.command('add')
	.description('Add a package into your workspace')
	.action(Handler.add)

program.command('dependencies')
	.description('Manage dependencies')
	.action(Handler.dependencies)

program.parse(process.argv)
