import { promisify } from 'util';
import { execFile } from 'child_process';

const execFileAsync = promisify(execFile);
const execFilePath = './child-process/bin/Debug/net7.0/child-process.exe';
const result = await execFileAsync(execFilePath, ['arg1', 'arg2']);

console.log(result.stdout);
