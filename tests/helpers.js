import gobble from 'gobble';
import path from 'path';
import sander from 'sander';

export const buildConfig = {
  dest: path.resolve(__dirname, 'dist'),
  gobbledir: path.resolve(__dirname, '.gobble'),
  force: true,
};

export { default as htmlminifier } from '../src/index.js';

export function fixturePath(relativePath) {
  return path.resolve(__dirname, 'fixtures', relativePath);
}

export async function fixtureFile(relativePath) {
  return sander.readFile(fixturePath(relativePath), {encoding: 'utf-8'});
}

export function outputPath(relativePath) {
  return path.resolve(buildConfig.dest, relativePath);
}

export async function outputFile(relativePath) {
  return sander.readFile(outputPath(relativePath), {encoding: 'utf-8'});
}

export function getFixtureNode(fixtureName) {
  return gobble(fixturePath(fixtureName));
}

export async function cleanOutput() {
  await sander.rimraf(buildConfig.dest);
  await sander.rimraf(buildConfig.gobbledir);
}
