from blog.models import Article
from blog.serializers import ArticleSerializer
from django.contrib import auth
from rest_framework import viewsets
from haystack.query import SearchQuerySet
from rest_framework.response import Response
from rest_framework.decorators import detail_route
from rest_framework.views import APIView
from blog.search_indexes import ArticleIndex
from rest_framework import permissions
from rest_framework.authentication import BasicAuthentication
from rest_framework import exceptions, status


class SessionViewSet(APIView):

    def get(self, request, *args, **kwargs):
        user = request.user
        print(user)
        if user is not None and user.is_active:
            return Response({'username': user.username})
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    def post(self, request, format=None):
        username = request.data.get('username')
        password = request.data.get('password')
        user = auth.authenticate(request, username=username, password=password)
        if user is not None and user.is_active:
            auth.login(request, user)
            return Response({'username': user.username})
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    def delete(self, request, *args, **kwargs):
        user = request.user
        auth.logout(request)
        return Response()


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()

        search = request.query_params.get('search')
        if search:
            ids = self.map_to_ids(SearchQuerySet().filter(text=search))
            queryset = queryset.filter(id__in=ids)
        queryset = self.filter_queryset(queryset)
        return self.render_json(queryset)

    @detail_route()
    def more_like_this(self, request, *args, **kwargs):
        instance = self.get_object()
        ids = self.map_to_ids(ArticleIndex().more_like_this(instance))
        queryset = self.get_queryset().filter(id__in=ids)
        return self.render_json(queryset)

    def render_json(self, queryset):
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @staticmethod
    def map_to_ids(queryset):
        ids = []
        for record in queryset:
            ids.append(record.pk)
        return ids
