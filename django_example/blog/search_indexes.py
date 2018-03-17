import datetime
from haystack import indexes
from blog.models import Article
from haystack.backends.elasticsearch_backend import ElasticsearchSearchEngine

class ArticleIndex(indexes.SearchIndex, indexes.Indexable):
    title = indexes.CharField(model_attr='title')
    category = indexes.CharField(model_attr='category')
    pub_date = indexes.DateTimeField(model_attr='pub_date')
    update_time = indexes.DateTimeField(model_attr='update_time')
    content = indexes.CharField(model_attr='content')
    text = indexes.CharField(document=True, use_template=True)

    def get_model(self):
        return Article

    def index_queryset(self, using=None):
        return self.get_model().objects.filter(pub_date__lte=datetime.datetime.now())

# wget https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v1.10.6/elasticsearch-analysis-ik-1.10.6.zip
# unzip elasticsearch-analysis-ik-1.10.6.zip -d plugins/elasticsearch-analysis-ik-1.10.6/

