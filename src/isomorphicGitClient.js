const path = require('path')
const git = require('isomorphic-git')
const http = require('isomorphic-git/http/node')
const fs = require('fs')
const config = require("./config.js");

function GitClient() {

  this.clone = function(https_url_to_repo, repo_name, success_callback) {
    console.log('***********git clone called*****************')
    const dir = path.join(process.cwd(), 'tmp','migrate', repo_name)
    return git.clone({fs, http, dir, url: https_url_to_repo})
  }

  this.addRemote = function(repo_path_on_local, remote_name, https_remote_url) {
    console.log('***********git addRemote called*****************')
    return git.addRemote({fs, dir: repo_path_on_local, remote: remote_name, url: https_remote_url})
  }

  this.push = function(repo_path_on_local, remote_name, branch_name) {
    console.log('***********git push called*****************')
    return git.push({fs, http, dir: repo_path_on_local, remote: remote_name,
                      ref: branch_name, onAuth: () => ({ username: config.GITHUB_TOKEN })
                      })
  };
}

module.exports = GitClient;