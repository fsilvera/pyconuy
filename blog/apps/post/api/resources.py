from tastypie.resources import ModelResource
from post.models import Post, Comment


class PostResource(ModelResource):
    
    class Meta:
        queryset = Post.objects.all()
        allowed_methods = ['get']
        
        
class CommentResource(ModelResource):
    
    class Meta:
        queryset = Comment.objects.all()
        allowed_methods = ['get']