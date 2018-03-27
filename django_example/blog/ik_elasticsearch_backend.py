from haystack.backends.elasticsearch_backend import ElasticsearchSearchEngine, ElasticsearchSearchBackend, \
    FIELD_MAPPINGS, DEFAULT_FIELD_MAPPING
from haystack.constants import DJANGO_CT, DJANGO_ID
from haystack.indexes import CharField


class IkCharField(CharField):

    def __init__(self, **kwargs):
        self.analyzer = kwargs.pop('analyzer', None)
        self.term_vector = kwargs.pop('term_vector', None)
        super(IkCharField, self).__init__(**kwargs)


class IkElasticsearchSearchBackend(ElasticsearchSearchBackend):

    def raw_search(self):
        raw_results = self.conn.search(body=search_kwargs,
                                       index=self.index_name,
                                       doc_type='modelresult',
                                       _source=True)
        return raw_results

    def build_schema(self, fields):
        content_field_name = ''
        mapping = {
            DJANGO_CT: {'type': 'string', 'index': 'not_analyzed', 'include_in_all': False},
            DJANGO_ID: {'type': 'string', 'index': 'not_analyzed', 'include_in_all': False},
        }

        for field_name, field_class in fields.items():
            field_mapping = FIELD_MAPPINGS.get(field_class.field_type, DEFAULT_FIELD_MAPPING).copy()
            if field_class.boost != 1.0:
                field_mapping['boost'] = field_class.boost

            if field_class.document is True:
                content_field_name = field_class.index_fieldname

            # Do this last to override `text` fields.
            if field_mapping['type'] == 'string':
                if field_class.indexed is False or hasattr(field_class, 'facet_for'):
                    field_mapping['index'] = 'not_analyzed'
                    del field_mapping['analyzer']

            if isinstance(field_class, IkCharField):
                if field_class.term_vector:
                    field_mapping['term_vector'] = field_class.term_vector
                if field_class.analyzer:
                    field_mapping['analyzer'] = field_class.analyzer

            mapping[field_class.index_fieldname] = field_mapping

        return (content_field_name, mapping)


class IkElasticsearchSearchEngine(ElasticsearchSearchEngine):
    backend = IkElasticsearchSearchBackend
