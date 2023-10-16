# Intro to Authentication Based Web Application Attacks

According to the OWASP Top-10 list of Web Application Vulnerabilitites, *Broken Access Controls* were the most common vulnerability found in 94% of applications, followed by *Encryption Failure* and *Injection* vulnerabilities. Given this fact, as developers and users of software that holds our Personally Identifiable Information (PII), our first concern should be the integrity of our authentication systems. 

For this project I've created a repository for you that implements a simple website with authentication. You will 1. run and inspect the code, then 2. create a new branch and update the code to fix a few common authentication issues.  Finally, you will merge your branch back into the main one.

# 🤓 SWBAT 

- Students will demonstrate an understand of the structure of a web application (nodejs).
- Students will demonstrate an understanding of authentication logic by upgrading a simple web application to fix common vulnerabilities associated with authentication systems.
- Students will demonstrate and understanding of Github fundamentals by creating a new feature branch, making code changes, and merging that new branch into the main branch.

# 👷 Project Requirements 
### 🦿 Part 1. Setting up and running your project 
1. Open this repo in a new **codespace** by clicking on the green `< > Code` button (above) then selecting the **Codespaces** tab and clicking on **Create codespace on main**. This will start your codespace.
2. Inside your codespace, open your **Terminal** in your codespace by clicking on the **hamburger icon** at the top-left, then clicking on **View** then **Terminal**. **Note:** Your terminal may already be open by default.
3. Your **Explorer** (on the left side of your codespace) lists all of your project files and directories. You can also type `ls -al` into your terminal to see your file structure at any time. In your Explorer, **right-click** README.md and click **Open Preview**. That will open these directions in your codespace so you can continue in the same window.
4. In your **Terminal**, run your project code by typing the following command: `npm start` into your terminal. The `start` script is defined in line 7 of your **package.json** file and runs the command 'node ./index.js' for you. This will begin the execution of your program.
5. In your **Terminal**, inspect the output of the program and make sure you see the text '**Server listening on Port 3000**' as the last line of output.
6. If your project ran successfully, you should also **see a popup** in the bottom-right of your terminal with the options *Make Public* and *Open in Browser*. **Click** the **Make Public** button then **click** the **Ports (1)** tab next to *Terminal*, **right-click** the url listed under *Forwarded Addresses* and click **Copy Local Address**
7. **Paste** the address that you just copied ***into a different window*** and you should see a website with the title "Welcome to Cybersecurity..." and a form to login. If you do not see the website at this point **please ask for help as you will not be able to continue**.
8. In another window **open postman.com**, login and **create a new collection** called "**Codespace**". Create a new request and paste your codespace url where it says **Enter URL or paste text**. We will come back to this later

### 🔮 Part 2. Getting to know your project (Quiz Upcoming) 
1. **Nodejs** is a, cross-platform, **runtime environment for executing JavaScript code** that enables developers to build scalable, fast, and efficient applications that can run **on any device**. For example, you could write a program in JavaScript that:
    - runs as a **background process** (script or utility) that doesn't require user input.
    - runs **in your terminal** and accepts user input through the command prompt.
    - runs as a **desktop application** with a fully functional GUI.
    - runs as an **API server** accepting network requests and returning data.
    - runs as a **web server** accepting network requests and returning web pages.
    - runs natively on mobile as an app device 
```
Start-ups and large companies (ie., PayPal, Uber, Netflix, Walmart) alike build software with Node bcs:
    - it allows them to build twice as fast with fewer developers.
    - results, on average, in 33% fewer lines of code and 40% fewer files.
    - handles 100% more requests per second compared to other platforms like Java.
    - decreases the average response time for requests by 35% compared to other platforms.
```
2. **NPM**, or Node Package Manager, is a **command-line utility** that comes pre-installed with Nodejs, and **used to manage and execute** your node projects. NPM is **also a Registry** of open-source projects that you are **free to use in your own projects**. There are over 1.3 projects on NPM that can be used in your project **with a single command** `npm install <package-name>`. But **be careful** because anyone can post their projects on NPM without validation and it is **often a source of vulnerabilities**. Check out https://www.npmjs.com/package/express to explore a popular package called **Express** that we depend on in this project **to implement our HTTP server**.
3. **Explorer** or File Explorer lets you **visualize and navigate your project** file structure easily. Below is a description of each folder and file. **Note:** organization of the folder structure in this project is **arbitrary** and solely for your ease of readability. This project **works the same** if all the files were in the root folder (or **any folder** for that matter.) However, for **other platforms** (ie., Nextjs) **the folder structure matters** and requires that files go in their appropriate folders.
```
server/
├── helpers/
│   ├── auth.js     // createUser, login, and logout helper functions
│   └── setup.js   // code to setup and configure our server
├── images/
│   └── haxxor-matrix.gif   // lol
├── node_modules/          // created by 'npm install' includes dependencies (ie., express)
├── pages/
│   ├── createUser.html   // page with component to create user
│   ├── dashboard.html   // only accessible after login
│   └── homepage.html   // homepage with login component
├── routes/
│   ├── createUser.js   // http POST route to create user
│   ├── login.js       // http POST route to log user in
│   ├── logout.js     // http POST route to log user out
│   └── pages.js     // http GET route for .html pages
├── styles/
│   └── matrix.css         // global stylesheet
├── .gitignore            // list of files to ignore when commiting
├── index.js             // entry point for running the project
├── package.lock.json   // dont worry about this for now
├── package.json       // your project definition file
└── README.md         // this file
```
### 🧪 Part 3. Interactive Application Testing
Performing interactive testing means trying trying to find flaws in a running application by testing its GUI and API endpoints. An application can exhibit 3 types of flaws: 1. Broken feature: not doing something it's supposed to do; 2. Bugs: doing something it's not supposed to do; 3. Unhandled Exception: doing something completely unexpected. 1 & 2 are very similar but meant to distinguish errors in features and other system errors. By the end of this exercise your project will be flawless.
#### 😎 The Happy Path - To get started, let's explore the 'Happy Path' and make sure there are no broken features.
1. You can use the username '`JHegler`' and the password '`Poptart`' to log in on the homepage, which should redirect you to '`dashboard.html`'
2. Inspect elements on the page and go to the '`Storage`' tab and search for '`tehstCookie`' under 'Cookies' the value of this cookie should be '`JHegler`'
3. Click logout which should redirect you to the homepage and delete the '`tehstCookie`' from your browser.
4. Next, test the Create User form, which should log you in automatically and forward you to the dashboard. Check cookie.
5. Go ahead and log out checking that cookies were deleted again. 
#### 🫠 The Not-So-Happy Path - Let's poke around and see if we can make the app do something it's not supposed to.
1. Logging in takes us to '`dashboard.html`' which gives us the impression that it's secured but what happens if you try to navigate to '`dashboard.html`' directly?
2. Wow.. who needs a backdoor when the developer left the front one wide open!? Let's see if the app is only serving up web files or if we have access to system files as well. Navigate to the `/package.json` path in the url.
3. Every NodeJS project has a `package.json` file that tells us everything about the project. Inspect the file and determine what dependencies the project has (that can later be targeted) and determine the projects start file.
4. Navigate to the `/index.js` path in the url and inspect the file for potential next steps.
5. Navigate to the `/helpers/setup.js` path in the url and inspect the file for potential next steps.
6. Bingo! `/routes/login.js` should have something interesting lets take a look. Go ahead and navigate to that path.
7. Hmm seems like if a user fails authentication the logic redirects them with an error message in the url. We might be able to exploit this for some good old-fashioned **exfiltration**. Let's navigate to the `/helpers/auth.js` path and see how that error message is set.
8. This program must have been written by a really bad AI because not only are passwords stored in plain-text, but they are using a very insecure compare function that allows us to inject any code that we want. The `eval()` function interprets its string parameter as code and executes it as a function. This allows us to inject any function we want in the '`username`' field. 
9. Navigate back to `homepage.html` and paste the following string into the username field:
```
" === "") && (() => {console.log("all your base are belong to us"); throw new Error(users.reduce((users, user) => users+="user: " + user.username + " pass: " + user.password + "<br/>",""))})() && ("
```
this string will get interpreted as code and everything outside the &&'s will preserve our syntax so we can do what we really want which is throw an error that prints out all of the usernames and passwords to the error message we found in step 7.
#### ☠️ The Devious Path - Let's see if we can take the site down all together
10. Great! We've got our usernames and passwords, let's crash this sucker and get out of here. Paste the following string into the username field:
```
" === "") && (() => process.exit() && ("
```
Again, everything outside of the &&'s will preserve our sytax so we can force the application to exit via `process.exit()`
11. Refresh the page and confirm that the site is no longer available. Go back to your github codespace and confirm that the messages "`all your base are belong to us`" and "`Server was forced to exit.`" appear in your terminal.
#### Congratuations! you just learned how to hack a (very) basic website 🥷

### 🦟 Part 4. Bug Fixes
1. If the project ran successfully, create a new branch where you can make changes, by typing the following command into your terminal:
```
git checkout -b "bug-fix-1"
```
The `-b` flag tells git to create a new branch if the branch doesn't already exist

7. Notice that in the terminal your current branch changed from **(main)** to **(bug-fix-1)** 
8. Write as much code as needed to `index.js` to display the winning team at the end of the output. **HINT:** Create variables to track the team names and final scores, then log it to the console at the end of the program.
9. **Commit** your code to the current branch (`bug-fix-1`) by typing the following command into your terminal:
```
git commit -a -m "added victory message"
```
10. Switch back to the `main` branch by typing the following command into your terminal:
```
git checkout "main"
```
11. Notice that in the terminal your current branch changed from **(bug-fix-1)** to **(main)** and the code you added has disappeared (?)
12. Switch back to the `bug-fix-1` branch by typing the following command into your terminal:
```
git checkout "bug-fix-1"
```
13. Notice that in the terminal your current branch changed from **(main)** to **(bug-fix-1)** and the code that you wrote is back. Your changes live on this branch. You can switch to any other branch and your code will still be on this branch when you come back. When you are done testing and working on this branch you will then merge it with the default branch which, in most cases, is called `main` but you can name it whatever you want.
14. Switch back to `main` (step 11) **then** merge the code from `bug-fix-1` into `main` by typing the following command into your terminal:
```
git merge "bug-fix-1"
```
15. Notice that your code now appears in your `main` branch.
16. Backup your CLI history to submit with your assignment by typing the following command into your terminal:
```
history > cli-backup.txt
```
17. Commit your cli history to the `main` branch by typing the following command into your terminal:
```
git commit -a -m "added cli history"
```
18. **Push** your commits from your (remote) codespace to the (origin) main repository in GitHub by typing the following command into your terminal:
```
git push origin main
```
19. Take a screenshot of your codespace and submit to canvas!
20. 🎉🎉🎉

# You just learned how to:
✅ Create a codespace on GitHub

✅ Run a NodeJS project

✅ Create a new branch with git

✅ Commit new code to a branch with git

✅ Swith branches with git

✅ Merge branches with git

✅ Push changes to a repository in GitHub
