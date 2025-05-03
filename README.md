# Project Setup and Run Instructions

Follow these steps to run the project on a new PC:

## Prerequisites
1. Install **Node.js** (LTS version recommended, e.g., 18.x) from [Node.js official website](https://nodejs.org/).
2. Install **npm** (comes with Node.js installation).
3. Ensure **Git** is installed for managing the repository files.

## Steps to Run the Project

1. **Clone the Repository**
```shell script
git clone <repository-url>
```

Replace `<repository-url>` with the actual URL of your Git repository.

2. **Navigate to the Project Directory**
```shell script
cd <project-folder>
```

Replace `<project-folder>` with the actual project folder name.

3. **Install Dependencies**
   Run the following command to install all necessary packages:
```shell script
npm install
```


4. **Start the Development Server**
   Start the development server with:
```shell script
npm run dev
```

This will start the server and provide a localhost URL (e.g., `http://localhost:5173`) to access the application in the browser.

## Key Notes
- The **backend is already hosted** and ready to be used with the frontend. No additional backend setup is necessary.
- Ensure you have an active internet connection to interact with the hosted backend APIs.
- Modify environment variables if required (e.g., API endpoint) before starting the project.

For any issues during setup or runtime, refer to logs or contact the repository owner.
