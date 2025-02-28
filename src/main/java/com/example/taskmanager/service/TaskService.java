package com.example.taskmanager.service;

import com.example.taskmanager.model.Task;
import com.example.taskmanager.model.TaskExecution;
import com.example.taskmanager.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Date;
import java.util.List;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task getTask(String id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
    }

    public List<Task> findTasksByName(String name) {
        return taskRepository.findByNameContaining(name);
    }

    public Task createTask(Task task) {
        validateCommand(task.getCommand());
        return taskRepository.save(task);
    }

    public void deleteTask(String id) {
        taskRepository.deleteById(id);
    }

    public TaskExecution executeTask(String id) {
        Task task = getTask(id);
        TaskExecution execution = new TaskExecution();
        execution.setStartTime(new Date());
        
        try {
            ProcessBuilder processBuilder = new ProcessBuilder();
            if (System.getProperty("os.name").toLowerCase().contains("windows")) {
                processBuilder.command("cmd.exe", "/c", task.getCommand());
            } else {
                processBuilder.command("bash", "-c", task.getCommand());
            }
            
            Process process = processBuilder.start();
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            StringBuilder output = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line).append("\n");
            }
            
            process.waitFor();
            execution.setOutput(output.toString());
            execution.setEndTime(new Date());
            execution.setStatus("COMPLETED");
            
            task.getTaskExecutions().add(execution);
            taskRepository.save(task);
            
            return execution;
        } catch (Exception e) {
            execution.setEndTime(new Date());
            execution.setStatus("FAILED");
            execution.setOutput("Error: " + e.getMessage());
            task.getTaskExecutions().add(execution);
            taskRepository.save(task);
            throw new RuntimeException("Failed to execute task: " + e.getMessage());
        }
    }

    private void validateCommand(String command) {
        // Add your command validation logic here
        // For example, check for dangerous commands, validate syntax, etc.
        if (command == null || command.trim().isEmpty()) {
            throw new RuntimeException("Command cannot be empty");
        }
        // Add more validation as needed
    }
} 