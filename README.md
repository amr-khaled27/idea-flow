## Idea Flow - Generate, Plan, and Execute

Idea Flow is a web application designed to help users generate creative ideas and transform them into actionable plans. It leverages the power of Google's Gemini for idea generation and provides tools for organizing thoughts, defining tasks, and tracking progress. Built with Next.js and Firebase.

## Deployment
https://idea-flow-project.netlify.app/

## Features
- Authentication: Secure user accounts using Firebase Authentication (email/password, Google login).
- Idea Generation: Generate fresh ideas using Google's Gemini API based on custom prompts or categories.
- Save for Later: Save generated ideas to your account for future reference and development.
- Plan Creation: Transform saved ideas into structured plans with actionable steps, deadlines, and priorities.
- Light and Dark themes: to improve accessability.
  
## Tech Stack
- Frontend: Next.js (React framework)
- Backend: Firebase (Authentication, Firestore database)
- AI: Google Gemini
- Styling: Tailwind CSS and Radix UI
- Deployment: Netlify

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

# Prerequisites
- Node.js (version >= 16)
- npm or yarn
- Firebase project
- Google Gemini API key


## Installation
- Clone the repository:

```bash
git clone https://github.com/amr-khaled27/idea-flow.git
cd idea-flow
```
- Install dependencies:

```bash
npm install  # or yarn install
```
- Configure Firebase:

-- Create a Firebase project in the Firebase Console.

-- Enable Authentication and Firestore.

-- Obtain your Firebase configuration object from the Firebase Console (Project settings -> General -> Your apps -> Firebase SDK snippet).

-- Create a .env.local file in the root of your project.

-- Add your Firebase configuration to .env.local:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=[your-api-key]
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=[your-auth-domain]
NEXT_PUBLIC_FIREBASE_PROJECT_ID=[your-project-id]
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=[your-storage-bucket]
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=[your-messaging-sender-id]
NEXT_PUBLIC_FIREBASE_APP_ID=[your-app-id]
```
- Configure Gemini API:
-- Obtain a Gemini API key from the Google Cloud Console.

-- Add your Gemini API key to .env.local:

```bash
GEMINI_API_KEY=[your-gemini-api-key]
```
- Run the development server:

``` bash
npm run dev  # or yarn dev
```
- Open http://localhost:3000 in your browser.

License
This project is licensed under the MIT License - see the LICENSE file for details.
