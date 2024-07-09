using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace TodoList.Api.Services
{
    public interface ITodoItemService
    {
        Task<IEnumerable<TodoItem>> GetAllTodoItems();
        Task<TodoItem> GetTodoItem(Guid id);
        Task<TodoItem> UpdateTodoItem(Guid id, TodoItem todoItem);
        Task<TodoItem> AddTodoItem(TodoItem todoItem);
        Task<bool> TodoItemIdExists(Guid id);
        Task<bool> TodoItemDescriptionExists(string description);
    }
}
