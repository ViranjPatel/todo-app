# Development Guide

This guide will help you understand the development process for this to-do application. As a beginner, following these steps will help you maintain good practices from the start.

## Getting Started

1. **Clone the repository** to your local machine:
   ```
   git clone https://github.com/ViranjPatel/todo-app.git
   cd todo-app
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Start the development server**:
   ```
   npm start
   ```
   This will start a local server at http://localhost:8080

## Development Workflow

### 1. Understanding the Project Structure

- `src/index.html`: The main HTML file
- `src/app.js`: The JavaScript code that powers the application
- `src/styles/main.css`: The styling for the application

### 2. Making Changes

Always follow this workflow when making changes:

1. **Create a new branch** for your feature or bug fix:
   ```
   git checkout -b feature/my-new-feature
   ```
   Use a descriptive name that reflects what you're working on.

2. **Make your changes** to the code.

3. **Test your changes** locally by running the application.

4. **Commit your changes** with a clear message:
   ```
   git add .
   git commit -m "Add feature: description of what you did"
   ```

5. **Push your changes** to GitHub:
   ```
   git push origin feature/my-new-feature
   ```

6. **Create a Pull Request** on GitHub from your branch to the main branch.

7. After review, **merge your changes** into the main branch.

### 3. Coding Standards

- Use meaningful variable and function names
- Add comments to explain complex logic
- Keep functions small and focused on one task
- Test your code before committing

## Next Steps for This Project

Here are some features you could implement to enhance this to-do application:

1. **Add due dates** to tasks
2. **Create categories** for different types of tasks
3. **Add priority levels** (high, medium, low)
4. **Implement drag-and-drop** for reordering tasks
5. **Add a dark/light theme** toggle
6. **Create user accounts** and sync data to a backend
7. **Add notifications** for upcoming tasks

## Learning Resources

If you're new to web development, here are some resources to help you learn:

- [MDN Web Docs](https://developer.mozilla.org) - Comprehensive documentation for HTML, CSS, and JavaScript
- [freeCodeCamp](https://www.freecodecamp.org) - Free coding lessons and projects
- [JavaScript.info](https://javascript.info) - Modern JavaScript tutorial
- [CSS-Tricks](https://css-tricks.com) - Tips and tricks for CSS

## Getting Help

If you get stuck or have questions:

1. Search for solutions on [Stack Overflow](https://stackoverflow.com)
2. Look for similar issues in the GitHub repository
3. Ask clear, specific questions with code examples when seeking help
