exports.extractOwnerAndRepoFromGitRemoteURL = url => {
  return url?.replace(/^git@github.com:|.git$/gims, '').trim()
}
