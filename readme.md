# <h1> Isar AeroSpace Dashboard rocket </h1>

# Clone the Project

1. **Clone:**
   ```bash
   git clone <repo Url>
   ```

# Install packages with either yarn or npm:

1. **After creting your folder, clone it there then open vscode**

2. **For npm**
   ```
   Npm install
   ```
3. **For yarn**
   ```
   Yarn
   ```

# Navigate to Your Directory:

```
cd /path/to/your/directory
```

## Run the Project::

1. **To run the project with either Yarn or npm, you can use the following commands:**

   ```
   Yarn dev or npm run dev
   ```

<br>
<br>

# Assigment C Answer:

Given the context provided and the data structures of both the HTTP GET request and WebSocket response, here are some potential improvements and considerations:

## 1) Consistent Naming Conventions

### Issue

Inconsistency in property naming conventions in both of the endpoints. For instance, in the HTTP GET response, the property is named `isActionRequired`, while in the WebSocket response, it's named `IsActionRequired`. Generally the difference was the capital letters.

### Recommendation

It is advisable to adopt a consistent naming convention for properties across all endpoints. Consistency enhances code readability and maintainability, preventing potential issues like the one experienced when fetching data the current api's.

## 2) Error Handling:

### Issue

There is a lack of proper error handling implementation for both the HTTP GET request and WebSocket connection. In the absence of robust error handling, developers may encounter challenges diagnosing issues and understanding the cause of failures.

### Recommendation

To improve the reliability and troubleshooting capabilities of your application, it is essential to implement thorough error handling for both the HTTP GET request and WebSocket connection. Follow these best practices:

1. **HTTP GET Request Error Handling:**

   - Implement error handling mechanisms for the HTTP GET request to gracefully manage potential failures.
   - Provide meaningful error messages that offer insights into the issue type so the developer can quicly figure out the problem .

2. **WebSocket Connection Error Handling:**
   - Implement error handling for WebSocket connection issues, including connection failures and disconnections.
   - Provide descriptive error messages that guide developers in identifying and resolving connection problems.
   - Consider automatic reconnection strategies to maintain a continuous stream of data.

## 3) CORS Headers:

### Overview

Cross-Origin Resource Sharing (CORS) headers are essential to enable secure cross-origin requests for both the HTTP and WebSocket endpoints.

### Purpose

CORS headers define which origins are permitted to access resources on the server. This security measure helps prevent unauthorized cross-origin requests and ensures a secure data exchange between different origins.

### Implementation

Ensure that the necessary CORS headers are correctly set on both the HTTP and WebSocket endpoints. This involves configuring the server to include the appropriate headers such as `Access-Control-Allow-Origin` and others as needed.

These improvements will depend on the project's requirements, constraints, and future plans. It's often beneficial to collaborate with the development team and stakeholders to align improvements with business goals.
