import yaml from 'js-yaml';

export function loadYaml<T = any>(content: string): T {
  try {
    return yaml.load(content) as T;
  } catch (error) {
    console.error('Error parsing YAML:', error);
    throw new Error('Failed to parse YAML content');
  }
}

export function dumpYaml(data: any): string {
  try {
    return yaml.dump(data);
  } catch (error) {
    console.error('Error stringifying YAML:', error);
    throw new Error('Failed to convert data to YAML');
  }
}
