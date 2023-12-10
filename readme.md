

# <h1> Isar AeroSpace Dashboard rocket </h1>


# Clone the Project

1. **Install Yarn:**
   ```bash
   git clone <repo Url>
   ``````

# Install yarn or npm:
1. **After creting your folder, clone it there then open vscode**
2. **You can either use yarn or npm**
    ```
    npm install -g yarn
   ``````

# Navigate to Your Directory:
  ``````
  cd /path/to/your/directory
 ``````


 # Install Dependencies:
  ``````
    # If using Yarn
    yarn

    # If using npm
    npm install
 ``````



   ## Run the Project::
1. **Simple run**
   ```
   Run the Project:
   ```

<br>
<br>
<br>
<br>
<br>





# Assigment C Answer:

Given the context provided and the data structures of both the HTTP GET request and WebSocket response, here are some potential improvements and considerations:


## 1) Consistent Naming Conventions

### Issue
Inconsistency in property naming conventions has been observed across different endpoints. For instance, in the HTTP GET response, the property is named `isActionRequired`, while in the WebSocket response, it's named `IsActionRequired`.

### Recommendation
It is advisable to adopt a consistent naming convention for properties across all endpoints. Consistency enhances code readability and maintainability, preventing potential issues like the one experienced when fetching data.

### Example
Consider aligning all property names with a specific naming convention, such as using camelCase or PascalCase consistently. For instance, choose either `isActionRequired` or `IsActionRequired` and apply the chosen convention uniformly across all properties.





#### Before 
```typescript

/// After checking the response from the Data of the websocket 
interface WebSocketLiveData {
  icon: string;
  tooltip: string;
  color: ThemeColor;
  Velocity: number;
  Altitude: number;
  Temperature: number;
  StatusMessage: string;
  IsAscending: boolean;
  IsActionRequired: boolean;
}


// Before 
interface WebSocketLiveData {
  icon: string;
  tooltip: string;
  color: ThemeColor;
  velocity: number;
  altitude: number;
  temperature: number;
  statusMessage: string;
  isAscending: boolean;
  isActionRequired: boolean;
}

``````


## 2) Documentation :

### Issue
Insufficient documentation exists regarding the purpose, expected frequency, and payload structure of the API endpoints. This lack of comprehensive documentation may pose challenges for developers who need to interact with the API, hindering their ability to effectively use the endpoints.

### Recommendation
It is imperative to provide clear and thorough documentation for each API endpoint. The documentation should encompass the following key aspects:

1. **Purpose:**
   Clearly articulate the purpose or functionality that each API endpoint serves. Explain the intended use case and the specific features it supports.

2. **Expected Frequency:**
   Specify the expected frequency of data updates or interactions with each endpoint. This information is essential for developers to anticipate how often they should request or consume data from the API.

3. **Payload Structure:**
   Define the structure of the payload that the API expects or returns for each endpoint. Include details about required parameters, data types, and any optional elements. This clarity aids developers in crafting correct and efficient requests.

### Example
```markdown
#### Endpoint: /api/example

**Purpose:** Retrieve detailed information about examples.

**Expected Frequency:** Moderate, updated once a day.

**Payload Structure:**
- Request: No additional parameters required.
- Response:
  ```json
  {
    "exampleId": 123,
    "name": "Example Name",
    "description": "Detailed description of the example.",
    "timestamp": "2023-01-01T12:00:00Z"
  }

``````

## 3) Error Handling:

### Issue
There is a lack of proper error handling implementation for both the HTTP GET request and WebSocket connection. In the absence of robust error handling, developers may encounter challenges diagnosing issues and understanding the cause of failures.

### Recommendation
To improve the reliability and troubleshooting capabilities of your application, it is essential to implement thorough error handling for both the HTTP GET request and WebSocket connection. Follow these best practices:

1. **HTTP GET Request Error Handling:**
   - Implement error handling mechanisms for the HTTP GET request to gracefully manage potential failures.
   - Provide meaningful error messages that offer insights into the issue type so the developer can quicly figure out the problem .
   - Utilize appropriate HTTP status codes to indicate the nature of the response (e.g.,200 Successful, 500 for server errors).

2. **WebSocket Connection Error Handling:**
   - Implement error handling for WebSocket connection issues, including connection failures and disconnections.
   - Provide descriptive error messages that guide developers in identifying and resolving connection problems.
   - Consider automatic reconnection strategies to maintain a continuous stream of data.

### Example
```markdown
#### HTTP GET Request Error Handling
In the event of an error, the API should respond with an appropriate status code and a descriptive error message.

Example:
- Status Code: 404 Not Found
- Response Body:
  ```json
  {
    "error": "Resource not found. Please check the request URL."
  }

``````

## 4) CORS Headers:

### Overview
Cross-Origin Resource Sharing (CORS) headers are essential to enable secure cross-origin requests for both the HTTP and WebSocket endpoints.

### Purpose
CORS headers define which origins are permitted to access resources on the server. This security measure helps prevent unauthorized cross-origin requests and ensures a secure data exchange between different origins.

### Implementation
Ensure that the necessary CORS headers are correctly set on both the HTTP and WebSocket endpoints. This involves configuring the server to include the appropriate headers such as `Access-Control-Allow-Origin` and others as needed.




These improvements will depend on the project's requirements, constraints, and future plans. It's often beneficial to collaborate with the development team and stakeholders to align improvements with business goals.