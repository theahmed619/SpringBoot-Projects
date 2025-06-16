package com.todo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.todo.entity.Todo;
import com.todo.repository.TodoRepo;

@Service
public class TodoService {

	@Autowired
	private TodoRepo todoRepo;

	public Todo addTodo(Todo todo) {
		
		Todo tod=new Todo();
		tod.setTitle(todo.getTitle());
		tod.setCompleted(false);

		return todoRepo.save(tod);
	}
	
	public List<Todo> showAllTodos(){
		return todoRepo.findAll();
	}
	
	  public Todo toggleCompleted(Integer id) {
	        Todo todo = todoRepo.findById(id)
	                .orElseThrow(() -> new RuntimeException("Todo not found"));
	        todo.setCompleted(true);
	        return todoRepo.save(todo);
	    }

	    public void deleteTodo(Integer id) {
	    	todoRepo.deleteById(id);
	    }

	    public Todo getTodoById(Integer id) {
	        return todoRepo.findById(id)
	                .orElseThrow(() -> new RuntimeException("Todo not found"));
	    }

}
