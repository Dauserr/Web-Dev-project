from django.urls import path
from .views import NewsListView
urlpatterns = [
    path("get_news", NewsListView.as_view(), name="getNews")
]
