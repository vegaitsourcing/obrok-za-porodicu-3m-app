using MealForFamily.Models;

namespace MealForFamily.RepositoryInterface
{
    public interface INewsRepository : IRepository<News>
    {
        Task<List<News>> GetNews();
        
        Task<News> GetSingleById(int id);
    }
}