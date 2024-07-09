using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoList.Api.Services
{
    public class TodoItemService : ITodoItemService
    {
        private readonly TodoContext _context;

        public TodoItemService(TodoContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TodoItem>> GetAllTodoItems()
        {
            return await _context.TodoItems.Where(x => !x.IsCompleted).ToListAsync();
        }

        public async Task<TodoItem> GetTodoItem(Guid id)
        {
            return await _context.TodoItems.FindAsync(id);
        }

        public async Task<TodoItem> UpdateTodoItem(Guid id, TodoItem newTodoItem)
        {
            _context.Entry(newTodoItem).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return newTodoItem;
        }

        public async Task<TodoItem> AddTodoItem(TodoItem todoItem)
        {
            _context.TodoItems.Add(todoItem);
            await _context.SaveChangesAsync();
            return todoItem;
        }

        public async Task<bool> TodoItemIdExists(Guid id)
        {
            return await _context.TodoItems.AnyAsync(x => x.Id == id);
        }

        public async Task<bool> TodoItemDescriptionExists(string description)
        {
            return await _context.TodoItems
                                .AnyAsync(x => x.Description.ToLowerInvariant() == description.ToLowerInvariant() && !x.IsCompleted);
        }
    }
}