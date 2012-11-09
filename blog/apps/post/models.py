from django.db import models


class Post(models.Model):
    title = models.CharField(max_length=50)
    body = models.TextField()
    date_time = models.DateTimeField(auto_now_add=True)
    
    def __unicode__(self):
        return self.title
    
    
class Comment(models.Model):
    post = models.ForeignKey(Post)
    text = models.TextField()
    date_time = models.DateTimeField(auto_now_add=True)
    
    def __unicode__(self):
        return self.text
