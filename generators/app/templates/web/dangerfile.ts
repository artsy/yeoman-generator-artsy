import { danger, fail, warn } from 'danger'

if (!danger.github.pr.body.length) {
  fail('Please add a description to your PR.')
}

// Warns if there are changes to package.json without changes to yarn.lock.
const packageChanged = danger.git.modified_files.includes('package.json')
const lockfileChanged = danger.git.modified_files.includes('yarn.lock')

if (packageChanged && !lockfileChanged) {
  const message = 'Changes were made to package.json, but not to yarn.lock'
  const idea = 'Perhaps you need to run `yarn install`?'
  warn(`${message} - <i>${idea}</i>`)
}

const someoneAssigned = danger.github.pr.assignee
if (someoneAssigned === null) {
  fail('Please assign someone to merge this PR, and optionally include people who should review.');
}
