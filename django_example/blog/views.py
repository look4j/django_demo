from blog.models import Article
from blog.serializers import ArticleSerializer
from rest_framework import viewsets
from haystack.query import SearchQuerySet
from rest_framework.response import Response
from rest_framework.decorators import detail_route
from blog.search_indexes import ArticleIndex


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

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
