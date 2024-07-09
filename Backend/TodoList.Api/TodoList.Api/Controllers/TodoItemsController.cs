using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading.Tasks;
using TodoList.Api.Services;

namespace TodoList.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoItemsController : ControllerBase
    {
        private readonly ILogger<TodoItemsController> _logger;

        private readonly ITodoItemService _todoItemService;


        public TodoItemsController(ILogger<TodoItemsController> logger, ITodoItemService todoItemService)
        {
            _logger = logger;
            _todoItemService = todoItemService;
        }

        // GET: api/TodoItems
        [HttpGet]
        public async Task<IActionResult> GetTodoItems()
        {
            try
            {
                var results = await _todoItemService.GetAllTodoItems();
                return Ok(results);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error: GetTodoItems() failed");
                return StatusCode(500, "An error occurred.");
            }
        }

        // GET: api/TodoItems/...
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTodoItem(Guid id)
        {
            try
            {
                var result = await _todoItemService.GetTodoItem(id);
                if (result == null)
                {
                    return NotFound($"Todo item {id} not found.");
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error: GetTodoItem() failed to retrieve {Id}", id);
                return StatusCode(500, "An error occurred.");
            }
        }

        // PUT: api/TodoItems/... 
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodoItem(Guid id, TodoItem todoItem)
        {
            if (id != todoItem.Id)
            {
                return BadRequest("ID mismatch in the request.");
            }

            var existingTodoItem = await _todoItemService.GetTodoItem(id);
            if (existingTodoItem != null)
            {
                try
                {
                    existingTodoItem.Description = todoItem.Description;
                    existingTodoItem.IsCompleted = todoItem.IsCompleted;
                    await _todoItemService.UpdateTodoItem(id, existingTodoItem);
                }
                catch (DbUpdateConcurrencyException ex)
                {
                    _logger.LogError(ex, "Error: PutTodoItem() failed for {Id}", id);
                    return StatusCode(500, "An error occurred.");
                }
            }
            else
            {
                return NotFound($"Todo item {id} not found.");
            }

            return NoContent();
        } 

        // POST: api/TodoItems 
        [HttpPost]
        public async Task<IActionResult> PostTodoItem(TodoItem todoItem)
        {
            if (string.IsNullOrEmpty(todoItem?.Description))
            {
                return BadRequest("Description is required");
            }
            else if (await TodoItemDescriptionExists(todoItem.Description))
            {
                return BadRequest("Description already exists");
            }

            try
            {
                var newItem = await _todoItemService.AddTodoItem(todoItem);
                return CreatedAtAction(nameof(GetTodoItem), new { id = newItem.Id }, newItem);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error: PostTodoItem() failed.");
                return StatusCode(500, "An error occurred.");
            }
        } 

        private async Task<bool> TodoItemIdExists(Guid id)
        {
            return await _todoItemService.TodoItemIdExists(id);
        }

        private async Task<bool> TodoItemDescriptionExists(string description)
        {
            return await _todoItemService.TodoItemDescriptionExists(description);
        }
    }
}
