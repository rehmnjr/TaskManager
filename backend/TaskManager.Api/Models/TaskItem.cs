using System.ComponentModel.DataAnnotations;

namespace TaskManager.Api.Models
{
    public class TaskItem
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }

        [Required]
        public string Status { get; set; } = "TODO";

        [Required]
        public string Priority { get; set; } = "MEDIUM";

        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    }
}