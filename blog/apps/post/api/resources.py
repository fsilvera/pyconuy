from tastypie.resources import ModelResource
from tastypie.authorization import Authorization

from post.models import Post, Comment


class PostResource(ModelResource):
    
    class Meta:
        queryset = Post.objects.all()
        allowed_methods = ['get', 'delete', 'post', 'put']
        authorization = Authorization()
        
        
class CommentResource(ModelResource):
    
    class Meta:
        queryset = Comment.objects.all()
        allowed_methods = ['get']