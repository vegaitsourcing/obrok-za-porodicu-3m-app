using MealForFamily.Helpers.Exceptions;
using MealForFamily.Models;
using MealForFamily.RepositoryInterface;
using MealForFamily.ServiceInterface;

namespace MealForFamily.Service
{
    public class NewsService : INewsService
    {
        private readonly INewsRepository _newsRepository;
        private readonly INewsletterSubscriptionService _newsletterSubscriptionService;
        private readonly IThankYouEmailSendingService _thankYouEmailSendingService;

        public NewsService(INewsRepository newsRepository, INewsletterSubscriptionService newsletterSubscriptionService, IThankYouEmailSendingService thankYouEmailSendingService)
        {
            _newsRepository = newsRepository;
            _newsletterSubscriptionService = newsletterSubscriptionService;
            _thankYouEmailSendingService = thankYouEmailSendingService;
        }

        public async Task<Page<News>> GetNews(int pageNumber, int pageSize)
        {
            return await _newsRepository.GetAllByPage(pageNumber, pageSize);
        }

        public async Task<News> GetSingleById(int id)
        {
            News news = await _newsRepository.GetSingleById(id);
            if (news == null)
                throw new CustomException("News not found", 404);

            return news;
        }

        public async Task<News> CreateNews(News news)
        {
            News newNewsItem = await _newsRepository.Create(news);
            await _thankYouEmailSendingService.ThankSubscribers();
            return newNewsItem;
        }

        public async Task<News> UpdateNews(News news)
        {
            return await _newsRepository.Update(news);
        }

        public async Task DeleteNews(int id)
        {
            News news = await _newsRepository.GetSingleById(id);
            if (news == null)
                throw new CustomException("News not found", 404);

            news.IsDeleted = true;
            await _newsRepository.Update(news);
        }
    }
}
