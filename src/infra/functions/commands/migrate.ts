import { exec } from 'child_process';
import { Handler } from 'aws-lambda';

export const handler: Handler = async () => {
  exec('npm run migrate:prod', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      return;
    }

    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }

    console.log(`stdout: ${stdout}`);
  });
};
