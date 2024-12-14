To run the provided TypeScript application, follow these steps:

1. Set Up Your Environment
Ensure you have Node.js and npm (Node Package Manager) installed. You can download them from Node.js official website.
Install TypeScript globally if not already installed:

npm install -g typescript

1. Create a React App
Use the create-react-app tool with TypeScript template:

npx create-react-app celebrity-manager --template typescript

Navigate to the project folder:

cd celebrity-manager

1. Replace the App Component
Open the src folder in the project.
Replace the contents of src/App.tsx with the provided TypeScript code.

1. Add the Styles
Create a file src/App.css and include styles based on your design (refer to the Design.png for inspiration).

1. Add JSON File
Place the celebrities.json file in the public folder (e.g., public/celebrities.json).
Update the fetch path in the code to point to /celebrities.json:

fetch('/celebrities.json')

1. Install Dependencies
Ensure all required dependencies are installed. For example:

npm install

1. Run the Application
Start the development server:

npm start
Open http://localhost:3000 in your browser to view the app.