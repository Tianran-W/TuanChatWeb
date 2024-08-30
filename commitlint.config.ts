import type { UserConfig } from '@commitlint/types'
import { RuleConfigSeverity } from '@commitlint/types'

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: 'conventional-changelog-atom',
  formatter: '@commitlint/format',
  rules: {
    'body-leading-blank': [RuleConfigSeverity.Error, 'always'],
    'footer-leading-blank': [RuleConfigSeverity.Warning, 'always'],
    'header-max-length': [RuleConfigSeverity.Error, 'always', 108],
    'subject-empty': [RuleConfigSeverity.Error, 'never'],
    'type-empty': [RuleConfigSeverity.Error, 'never'],
    'type-enum': [
      RuleConfigSeverity.Error,
      'always',
      [
        'feat', // feature
        'fix',
        'perf', // performance
        'style',
        'docs',
        'test',
        'refactor',
        'build',
        'ci',
        'chore', // rebuild ...
        'revert', // roll back
        'wip',
        'workflow',
        'types',
        'release'
      ]
    ]
  },
  ignores: [(commit) => commit === ''],
  defaultIgnores: false,
  helpUrl: 'https://github.com/conventional-changelog/commitlint/#what-is-commitlint'
}

export default Configuration
