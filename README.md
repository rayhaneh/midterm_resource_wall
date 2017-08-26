# Node Skeleton

## Project Setup

1. Create your own empty repo on GitHub
2. Clone this repository (do not fork)
  - Suggestion: When cloning, specify a different folder name that is relevant to your project
3. Remove the git remote: `git remote rm origin`
4. Add a remote for your origin: `git remote add origin <your github repo URL>`
5. Push to the new origin: `git push -u origin master`
6. Verify that the skeleton code now shows up in your repo on GitHub

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Run migrations: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
6. Run the seed: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
7. Run the server: `npm run local`
8. Visit `http://localhost:8080/`

## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above


## Final Product
![Registration Form](https://github.com/rayhaneh/resource_wall/blob/master/screenshots/01-register.png?raw=true)
![Login Form](https://github.com/rayhaneh/resource_wall/blob/master/screenshots/02-login.png?raw=true)
![All URLs page](https://github.com/rayhaneh/resource_wall/blob/master/screenshots/03-urls.png?raw=true)
![Single URL Page](https://github.com/rayhaneh/resource_wall/blob/master/screenshots/04-url.png?raw=true)
![Comment submission form](https://github.com/rayhaneh/resource_wall/blob/master/screenshots/05-comment.png?raw=true)
![Comments](https://github.com/rayhaneh/resource_wall/blob/master/screenshots/06-comments.png?raw=true)
![Profile Page](https://github.com/rayhaneh/resource_wall/blob/master/screenshots/07-profile.png?raw=true)
![Add New URL Form](https://github.com/rayhaneh/resource_wall/blob/master/screenshots/08-addnewurl.png?raw=true)
![Edit Profile Form](https://github.com/rayhaneh/resource_wall/blob/master/screenshots/09-editprofile.png?raw=true)


