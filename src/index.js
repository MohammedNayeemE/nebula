#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import inquirer from 'inquirer';
import chalk from 'chalk';
import * as shell from 'shelljs';
import { type } from 'os';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as template from './utils/template.js'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CHOICES = fs.readdirSync(path.join(__dirname,'templates'));
//console.log(CHOICES);

console.log(chalk.blue.bold('Welcome to Mikasa Backend Template!'));

const CURR_DIR = process.cwd();
const QUESTIONS = [
    {
        name: 'lang',
        type: 'list',
        message: 'Which language do you want to use?',
        choices: ['javascript' , 'typescript'],
        default : 'javascript',
    },
    {
        name: 'database',
        type: 'list',
        message: 'Which database do you want to use?',
        choices: ['mongodb', 'postgresql'],
        default : 'postgresql',
    },
    {
        name: 'prisma',
        type: 'confirm',
        message: 'Do you want to use Prisma?',
        default: true
    },
    {
        name: 'package-name',
        type: 'input',
        message: 'Package name:',
        validate: function (input) {
            if (!input) {
                return 'Please enter a package name.';
            }
            return true;
        }
    }
];

inquirer.prompt(QUESTIONS).then(answers => {
    const language = answers['lang'];
    const db = answers['database'];
    const p = answers['prisma'];
    const project_name = answers['package-name'];
    let template_path = 'javascript+mongo';
    if(language === 'javascript'){
        if(db === 'mongodb'){
            template_path = 'javascript+mongo';
        }
        else{
            template_path = 'javascript+postgre'
        }
    }
    else{
        if(db === 'mongodb'){
            template_path = 'typescript+mongo';
        }
        else{
            template_path = 'typescript+postgre';
        }
    }

    //console.log(template_path);
    const target_path = path.join(CURR_DIR, project_name);
    const actuall_template_path = path.join(__dirname , 'templates' , template_path);
    //console.log(target_path);
    //console.log(actuall_template_path);
    console.log(chalk.cyanBright(`in this project you will use :)-> ${language}`));
    console.log(chalk.cyanBright(`in this project you will use :)-> ${db}`));
    console.log(chalk.cyanBright(`in this project you will use :)-> ${p}`));
    console.log(chalk.cyanBright(`in this project you will use :)-> ${project_name}`));

    createDirectory(target_path);

    createDirectoryContents(actuall_template_path , project_name);

    postProcess(actuall_template_path , target_path);


});
let updated = false;
function createDirectory(projectName){
    if(fs.existsSync(projectName)){
        console.log(chalk.yellowBright(`Updating the project`));
        updated = true;
    }
    else{
        console.log(chalk.yellowBright(`Creating your project`));
        fs.mkdirSync(projectName);
    }
    console.log(chalk.yellowBright(`DONE...`));
}

const SKIP_FILES = ['node_modules'];

function createDirectoryContents(template_path , project_name){
    const files = fs.readdirSync(template_path);

    files.forEach(file =>{
        const originalFilePath = path.join(template_path , file);

        const stats = fs.statSync(originalFilePath);

        if(SKIP_FILES.indexOf(file) > -1) return;

        if(stats.isFile()){
            let contents = fs.readFileSync(originalFilePath , 'utf-8');
            contents = template.render(contents , {project_name});
            const write_path = path.join(CURR_DIR , project_name , file);
            fs.writeFileSync(write_path , contents , 'utf-8');
        }
        else{
            if(!fs.existsSync(path.join(CURR_DIR , project_name , file))){
                fs.mkdirSync(path.join(CURR_DIR , project_name , file));
            }
            createDirectoryContents(path.join(template_path , file) , path.join(project_name, file));
        }
    });
}

function postProcess(actuall_template_path , target_path){
    const isPresent = fs.existsSync(path.join(actuall_template_path , 'package.json'));
    if(isPresent){
        shell.cd(target_path);
        const result = shell.exec('npm install');
        if(result.code !== 0){
            console.log(chalk.redBright('Falied...'));
            return false;
        }
    }
    if(updated){
        console.log(chalk.greenBright(`Project Successfully Updated`));
    }
    else{
        console.log(chalk.greenBright('`Project Successfully Created`'));
    }

    return true;

}
