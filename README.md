# Task-Manager-Application
A full-stack application that allows users to create, manage, and execute system commands as tasks. Built with Spring Boot backend and React TypeScript frontend.


## Features
- Create tasks with name, owner, and command

- Execute system commands through a web interface

- View command execution output in real-time

- Delete tasks

- MongoDB integration for data persistence



## Screenshots



### Creating a Task

![image](https://github.com/user-attachments/assets/ad775a2f-94e5-41e6-b9bf-b1b3795997fc)

![image](https://github.com/user-attachments/assets/13267b9a-a5a9-489b-9ced-289b5b6b935b)


*Screenshot showing task creation with my username and current time*


### Executing a Command

![image](https://github.com/user-attachments/assets/93ece152-524e-4acf-aa72-ae169ad171a3)
![image](https://github.com/user-attachments/assets/dd1efec2-b65e-42fa-af37-2caa78394705)

*Screenshot showing command execution output with system time*



### Task List View

![image](https://github.com/user-attachments/assets/d4cc22f8-6b4b-45ba-a68b-da379ea986bb)

*Screenshot showing list of tasks with my username visible*

## Tech Stack

### Backend

- Java 17

- Spring Boot 3.2.3

- MongoDB

- Maven

### Frontend

- React 18

- TypeScript

- Ant Design

- Axios


## Project Structure

```
task-manager/
├── src/
│ ├── main/
│ │ ├── java/
│ │ │ └── com/example/taskmanager/
│ │ │ ├── controller/
│ │ │ │ └── TaskController.java
│ │ │ ├── model/
│ │ │ │ ├── Task.java
│ │ │ │ └── TaskExecution.java
│ │ │ ├── repository/
│ │ │ │ └── TaskRepository.java
│ │ │ ├── service/
│ │ │ │ └── TaskService.java
│ │ │ └── TaskManagerApplication.java
│ │ └── resources/
│ │ └── application.properties
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ └── TaskManager.tsx
│ │ ├── App.tsx
│ │ └── index.tsx
│ └── package.json
└── pom.xml
```

## Setup Instructions
- Java 17
- Node.js 14+
- MongoDB Atlas account
- Maven

### Backend Setup

1. Clone the repository

```bash
bash
git clone https://github.com/sugashsm/Task-Manager-Application.git
cd task-manager
```
2. Configure MongoDB
Update `src/main/resources/application.properties`:

properties
spring.data.mongodb.uri=your_mongodb_connection_string
spring.data.mongodb.database=taskmanagerdb

3. Run the Spring Boot application
   ```bash
   mvn clean install
   mvn spring-boot:run
``
he backend will start on http://localhost:8080

### Frontend Setup

1. Navigate to the frontend directory
``bash
cd frontend
``
2. Install dependencies
``bash
npm install
``
3. Start the React application
``bash
npm start
``
The frontend will start on http://localhost:3000

## Security Considerations
- Input validation for commands
- CORS configuration
- Process execution security
- MongoDB connection string protection

## Future Enhancements
- User authentication
- Command history
- Task scheduling
- Advanced command options

## Author
[Sugash ]
