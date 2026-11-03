using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManager.Api.Data;
using TaskManager.Api.DTOs;
using TaskManager.Api.Models;

namespace TaskManager.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly AppDbContext _context;

        private static readonly string[] ValidStatuses =
        {
            "TODO",
            "IN_PROGRESS",
            "DONE"
        };

        private static readonly string[] ValidPriorities =
        {
            "LOW",
            "MEDIUM",
            "HIGH"
        };

        public TasksController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Tasks
        // GET: api/Tasks?status=TODO
        // GET: api/Tasks?priority=HIGH
        // GET: api/Tasks?status=TODO&priority=HIGH

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskItem>>> GetTasks(
            [FromQuery] string? status,
            [FromQuery] string? priority)
        {
            if (status != null && !IsValidStatus(status))
            {
                return BadRequest(new
                {
                    message = "Invalid status. Allowed values: TODO, IN_PROGRESS, DONE."
                });
            }

            if (priority != null && !IsValidPriority(priority))
            {
                return BadRequest(new
                {
                    message = "Invalid priority. Allowed values: LOW, MEDIUM, HIGH."
                });
            }

            var query = _context.Tasks.AsQueryable();

            if (status != null)
            {
                var normalizedStatus = status.Trim().ToUpper();

                query = query.Where(t =>
                    t.Status.ToUpper() == normalizedStatus);
            }

            if (priority != null)
            {
                var normalizedPriority = priority.Trim().ToUpper();

                query = query.Where(t =>
                    t.Priority.ToUpper() == normalizedPriority);
            }

            var tasks = await query
                .OrderByDescending(t => t.CreatedDate)
                .ToListAsync();

            return Ok(tasks);
        }


        // GET: api/Tasks/1

        [HttpGet("{id}")]
        public async Task<ActionResult<TaskItem>> GetTaskById(int id)
        {
            if (id <= 0)
            {
                return BadRequest(new
                {
                    message = "Invalid task ID."
                });
            }

            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
            {
                return NotFound(new
                {
                    message = $"Task with ID {id} was not found."
                });
            }

            return Ok(task);
        }


        // POST: api/Tasks

        [HttpPost]
        public async Task<ActionResult<TaskItem>> CreateTask(
            [FromBody] CreateTaskDto request)
        {
            if (string.IsNullOrWhiteSpace(request.Title))
            {
                return BadRequest(new
                {
                    message = "Task title is required."
                });
            }

            if (!IsValidStatus(request.Status))
            {
                return BadRequest(new
                {
                    message = "Invalid status. Allowed values: TODO, IN_PROGRESS, DONE."
                });
            }

            if (!IsValidPriority(request.Priority))
            {
                return BadRequest(new
                {
                    message = "Invalid priority. Allowed values: LOW, MEDIUM, HIGH."
                });
            }

            var task = new TaskItem
            {
                Title = request.Title.Trim(),
                Description = request.Description,
                Status = request.Status.Trim().ToUpper(),
                Priority = request.Priority.Trim().ToUpper(),
                CreatedDate = DateTime.UtcNow
            };

            _context.Tasks.Add(task);

            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetTaskById),
                new { id = task.Id },
                task
            );
        }


        // PUT: api/Tasks/1

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(
            int id,
            [FromBody] UpdateTaskDto request)
        {
            if (id <= 0)
            {
                return BadRequest(new
                {
                    message = "Invalid task ID."
                });
            }

            if (string.IsNullOrWhiteSpace(request.Title))
            {
                return BadRequest(new
                {
                    message = "Task title is required."
                });
            }

            if (!IsValidStatus(request.Status))
            {
                return BadRequest(new
                {
                    message = "Invalid status."
                });
            }

            if (!IsValidPriority(request.Priority))
            {
                return BadRequest(new
                {
                    message = "Invalid priority."
                });
            }

            var existingTask = await _context.Tasks.FindAsync(id);

            if (existingTask == null)
            {
                return NotFound(new
                {
                    message = $"Task with ID {id} was not found."
                });
            }

            existingTask.Title = request.Title.Trim();
            existingTask.Description = request.Description;
            existingTask.Status = request.Status.Trim().ToUpper();
            existingTask.Priority = request.Priority.Trim().ToUpper();

            await _context.SaveChangesAsync();

            return NoContent();
        }


        // PATCH: api/Tasks/1/status

        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateTaskStatus(
            int id,
            [FromBody] UpdateTaskStatusDto request)
        {
            if (id <= 0)
            {
                return BadRequest(new
                {
                    message = "Invalid task ID."
                });
            }

            if (!IsValidStatus(request.Status))
            {
                return BadRequest(new
                {
                    message = "Invalid status. Allowed values: TODO, IN_PROGRESS, DONE."
                });
            }

            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
            {
                return NotFound(new
                {
                    message = $"Task with ID {id} was not found."
                });
            }

            task.Status = request.Status.Trim().ToUpper();

            await _context.SaveChangesAsync();

            return NoContent();
        }


        // DELETE: api/Tasks/1

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            if (id <= 0)
            {
                return BadRequest(new
                {
                    message = "Invalid task ID."
                });
            }

            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
            {
                return NotFound(new
                {
                    message = $"Task with ID {id} was not found."
                });
            }

            _context.Tasks.Remove(task);

            await _context.SaveChangesAsync();

            return NoContent();
        }


        // Validation helper methods

        private static bool IsValidStatus(string status)
        {
            return ValidStatuses.Contains(
                status.Trim(),
                StringComparer.OrdinalIgnoreCase
            );
        }

        private static bool IsValidPriority(string priority)
        {
            return ValidPriorities.Contains(
                priority.Trim(),
                StringComparer.OrdinalIgnoreCase
            );
        }
    }
}