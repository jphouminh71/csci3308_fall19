# Version Control/How to branch

First change to a folder where you want to stage repo folder
> cd directoryPath

Clone the repository
"Internally, git clone first calls git init to create a new repository. It then copies the data from the existing repository, and checks out a new set of working files"
> git clone "https://www.github.com/jphouminh71/csci3308_fall19.git"

Move into the repo folder
> cd repoName

List branches
> git branch

Create a new branch
> git branch newBranch

Change to new branch
> git checkout newBranch

Make changes
> git add . OR git add <files changed>
> ...make file changes...
> git commit -m "message about what changes were made"

Push to new branch
> git push --set-upstream origin newBranch

Merge to master
> git checkout master
> git merge newBranch

Delete new branch
> git branch -d newBranch
OR
> git branch -D newBranch

* -d is normal delete, -D is force delete. Try -d first.
