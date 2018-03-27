import datetime
from haystack import indexes
from blog.models import Article
from haystack.backends.elasticsearch_backend import ElasticsearchSearchEngine
from blog.ik_elasticsearch_backend import IkCharField
from haystack.utils import get_identifier

DOC_INDEX = 'haystack'
DOC_TYPE = 'modelresult'

class ArticleIndex(indexes.SearchIndex, indexes.Indexable):
    title = indexes.CharField(model_attr='title')
    category = indexes.CharField(model_attr='category')
    pub_date = indexes.DateTimeField(model_attr='pub_date')
    update_time = indexes.DateTimeField(model_attr='update_time')
    text = IkCharField(document=True, use_template=True)

    def get_model(self):
        return Article

    def index_queryset(self, using=None):
        return self.get_model().objects.filter(pub_date__lte=datetime.datetime.now())

    def more_like_this(self, instance):
        response = self.get_backend().conn.search(body=self.query_body(instance))
        return self.get_backend()._process_results(response)['results']

    def query_body(self, instance):
        return {
            "query": {
                "more_like_this": {
                    "like": {
                        "_index": "haystack",
                        "_type": "modelresult",
                        "_id": get_identifier(instance)
                    },
                    "min_term_freq": 1,
                    "min_doc_freq": 1
                }
            }
        }
        # return {
        #     "_index": "haystack",
        #     "_type": "modelresult",
        #     "_id": get_identifier(instance)
        # }


# wget https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v1.10.6/elasticsearch-analysis-ik-1.10.6.zip
# unzip elasticsearch-analysis-ik-1.10.6.zip -d plugins/elasticsearch-analysis-ik-1.10.6/


# {
#     "query": {
#         "more_like_this" : {
#             "like" : {
#         		"_index": "haystack",
#     			"_type": "modelresult",
#     			"_id": "blog.article.1"
#             },
#             "min_term_freq": 1,
#             "min_doc_freq": 1
#         }
#     }
# }
