import './bootstrap.js';
import {
  buildConfig,
  cleanOutput,
  fixtureFile,
  htmlminifier,
  getFixtureNode,
  outputPath,
} from './helpers.js';

after(cleanOutput);

describe('with single file', () => {
  before(async () => {
    await getFixtureNode('single/index.html')
      .transform(htmlminifier)
      .build(buildConfig);
  });

  it('should output the only file', async () => {
    outputPath('index.html').should.be.a.file();
  });
});

describe('with multiple files', () => {
  before(async () => {
    await getFixtureNode('multiple')
      .transform(htmlminifier)
      .build(buildConfig);
  });

  it('should output all files', async () => {
    outputPath('index.html').should.be.a.file();
    outputPath('about.html').should.be.a.file();
    outputPath('contact.html').should.be.a.file();
  });
});

describe('with nested files', () => {
  before(async () => {
    await getFixtureNode('nested')
      .transform(htmlminifier)
      .build(buildConfig);
  });

  it('should output all files with original file structure', async () => {
    outputPath('static').should.be.a.directory();
    outputPath('static/index.html').should.be.a.file();
    outputPath('static/about.html').should.be.a.file();
    outputPath('static/contact.html').should.be.a.file();
  });
});

describe('options', () => {
  it('should pass through html-minifier', async () => {
    await getFixtureNode('single/index.html')
      .transform(htmlminifier)
      .build(buildConfig);

    outputPath('index.html').should.have.content.that.match(/a poor comment/);

    await cleanOutput();
    await getFixtureNode('single/index.html')
      .transform(htmlminifier, { removeComments: true })
      .build(buildConfig);

    outputPath('index.html').should.not.have.content.that.match(/a poor comment/);
  });

  describe('`preset`', () => {
    it('should apply a set of preset rules', async () => {
      await getFixtureNode('github.com/original.html')
        .transform(htmlminifier, { preset: 'minimal' })
        .build(buildConfig);

      outputPath('original.html').should.have.content(await fixtureFile('github.com/minimal.html'));

      await getFixtureNode('github.com/original.html')
        .transform(htmlminifier, { preset: 'safe' })
        .build(buildConfig);

      outputPath('original.html').should.have.content(await fixtureFile('github.com/safe.html'));

      await getFixtureNode('github.com/original.html')
        .transform(htmlminifier, { preset: 'all' })
        .build(buildConfig);

      outputPath('original.html').should.have.content(await fixtureFile('github.com/all.html'));
    });

    it('should allow overrides', async () => {
      await getFixtureNode('github.com/original.html')
        .transform(htmlminifier, {
          preset: 'minimal',
          removeComments: false,
        })
        .build(buildConfig);

      outputPath('original.html').should.have.content.that.match(/<!-- \/\.container -->/);
    });
  });
});
