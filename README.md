# Job Search Helper

## Overview

This MVP was created to join Chingu Voyage!  
It helps people to record the job they are interested in.
This platform has basic operations as per the Chingu Solo Project requirement.  
It makes it easier for registered users to keep track of their job or company research.

<hr>
Sample screenshot:

![Dashboard Preview](./assets/dashboard_jsh.png)

<hr>

## Features

User can

- Sign up, login, and logout
- Add, edit, delete Company information (name, address, website, job title, work mode, notes, and ratings for culture, mission, growth support, and career opportunity)
- See the company list to quickly view name, website, and job title and click to edit them.

For the company attributes, I only made the company name to be required, so users can list the companies that they are interested in first, and research about them later.

## How to Run the Project

**Live version:** [Job Search Helper](https://your-job-search-helper.vercel.app/)  
_\*The backend is deployed on Render's free tier, so it may take a few minutes to get it back online first!_

**Run locally:**  
After clone my project from this repo, move to the project directory  
`cd job-search-helper`  
Install dependencies  
`npm install`  
Create .env file in the project directory and add  
`REACT_APP_API_URL=http://localhost:8000`  
Start the dev server  
`npm start`

## Tech Stack

**Frontend**

- React
- React DOM
- React Router DOM
- Axios
- React Hook Form
- Tailwind CSS
- TypeScript
- Zod

**Backend**

- Django REST Framework (check [Job Search Helper backend repo](https://github.com/AkoKBIkeda/job-search-helper-backend))

## Future Work

Since this is a bare MVP, there are so many things that can be improved. To list some:

- Add descriptions for how to use, what they can do on the platform
- Improve labelling, wording, alert messages, layout, and design
- Add "Forget Password" function
- Sum ratings to display how much each job is matching for the user's preference on the Company List  
  etc., etc., etc.

If you have any ideas to add to this platform, please feel free to reach out!
