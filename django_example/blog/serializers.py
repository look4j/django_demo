from rest_framework import serializers
from blog.models import Article
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ('id', 'title', 'category', 'pub_date', 'update_time', 'content')

    # id = serializers.IntegerField(read_only=True)
    # title = serializers.CharField("标题", max_length=100)
    # category = serializers.CharField("标签", max_length=50, blank=True)
    # pub_date = serializers.DateTimeField("发布日期", auto_now_add=True, editable=True)
    # update_time = serializers.DateTimeField("更新时间", auto_now=True, null=True)
    # content = serializers.TextField("内容", blank=True, null=True)

    # def create(self, validated_data):
    #     return Article.objects.create(**validated_data)
    #
    # def update(self, instance, validated_data):
    #     instance.title = validated_data.get('title', instance.title)
    #     instance.category = validated_data.get('category', instance.category)
    #     instance.pub_date = validated_data.get('pub_date', instance.pub_date)
    #     instance.update_time = validated_data.get('update_time', instance.update_time)
    #     instance.content = validated_data.get('content', instance.content)
    #     instance.save()
    #     return instance
