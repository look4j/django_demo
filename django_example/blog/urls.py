from django.urls import path, include
from blog import views
from rest_framework.routers import DefaultRouter


router = DefaultRouter(trailing_slash=False)
router.register(r'articles', views.ArticleViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth', include('rest_framework.urls')),
    path('sessions', views.SessionViewSet.as_view()),
]
