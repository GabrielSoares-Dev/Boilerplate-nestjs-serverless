import { execSync } from 'child_process';
import { Handler } from 'aws-lambda';

export const handler: Handler = async () => {
  await execSync('npm run migrate:prod', { stdio: 'inherit' });
};
