from blog.models import Article
from blog.serializers import ArticleSerializer
from rest_framework import viewsets
from haystack.query import SearchQuerySet


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

    def es_search(self, content):
        ids = []
        for record in SearchQuerySet().filter(content=content):
            ids.append(record.pk)
        return ids

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        #import pdb;pdb.set_trace();

        search = request.query_params.get('search')
        if search:
            ids = self.es_search(search)
            queryset = queryset.filter(id__in=ids)
        queryset = self.filter_queryset(queryset)
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
