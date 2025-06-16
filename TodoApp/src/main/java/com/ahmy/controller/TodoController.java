package com.ahmy.controller;

import com.ahmy.entity.Todo;
import com.ahmy.repository.TodoRepo;
import lombok.Generated;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
public class TodoController {

    private final TodoRepo todoRepo;

    @GetMapping("/")
    public String showHomePage(Model model){

        model.addAttribute("todos", todoRepo.findAll());
        return "index";
    }

    @PostMapping("/add")
    public String add(@RequestParam String title){
        Todo newTodo=Todo.builder()
                .title(title)
                .completed(false)
                .build();
        todoRepo.save(newTodo);

        return "redirect:/";
    }

    @GetMapping("/update/{id}")
    public String update(@PathVariable Long id){

        Todo existingTodo=todoRepo.findById(id).orElseThrow(() -> new RuntimeException("Todo Not found" +id));

        existingTodo.setCompleted(true);
        todoRepo.save(existingTodo);

        return "redirect:/";
    }

    @GetMapping("/delete/{id}")
    public  String delete(@PathVariable Long id){
        Todo existingTodo=todoRepo.findById(id).orElseThrow(() -> new RuntimeException("Todo Not found" +id));

        todoRepo.delete(existingTodo);
        return "redirect:/";
    }
}
