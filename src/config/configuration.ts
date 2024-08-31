import { readFile } from 'fs/promises';
import * as yaml from 'js-yaml';
import { join } from 'path';

const YAML_CONFIG_FILENAME = 'config.yaml';

export default async () => {
  const configPath = join(process.cwd(), YAML_CONFIG_FILENAME);
  const configFlie = await readFile(configPath, 'utf8');
  return yaml.load(configFlie) as Record<string, any>;
};
