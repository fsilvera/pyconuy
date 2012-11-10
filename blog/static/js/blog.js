$(document).ready(
    function(){
    	
		PostModel = Backbone.Model.extend({
		    urlRoot : "/api/v1/post/"
		});
		
		PostCollection = Backbone.Collection.extend({
		    url: "/api/v1/post/",
		    model: PostModel
		});
		
		posts = new PostCollection; 
	
		
		PostView = Backbone.View.extend({
			
		    template: _.template( $('#post_single_tpl').html()),
		    tagName:  "div",
		    className: "post",
		    
		    events: {
		        "click a.destroy" 		: "destroy",
		        "dblclick .label_text"	: "edit",
		        "keypress .edit"		: "updateOnEnter",
		        "blur .edit"			: "save"
		    },
		    
		    initialize: function() {
		    	this.model.bind('change', this.render, this);
		        this.model.bind('destroy', this.remove, this);
		    },
		    
		    render: function() {
		        this.$el.html(this.template(this.model.toJSON()));
		        return this;
		    },	

		    edit: function(e) {
		    	$(e.target).parent().addClass("editing");
		    	this.$el.find('.edit').focus();
		    },

		    destroy: function() {
		        this.model.destroy(); // DELETE
		    },
		    
		    save: function(e) {
		    	obj = $(e.target)
		    	obj.parent().removeClass("editing");
		    	var name = obj.attr('name');
		        var value = obj.val();
		        var data = {}
		        data[name] = value
		        this.model.save(data); // PUT
		    },
		      
		    updateOnEnter: function(e) {
		    	if (e.keyCode == 13) this.save(e);
		    }
		    
		});

        
        var BlogView = Backbone.View.extend({
        	
        	el: $("#main_content"),
        	template: _.template($('#blog_tpl').html()),

		    events: {
		        "submit #form" : "add_post",
		    },
        	
        	render: function() {
        		this.$el.html(this.template);
        		
        	    this.input_title = this.$("#title");
        	    this.textarea_body = this.$("#body");
        	    
        	    posts.bind('add', this.addOne, this);
        		posts.bind('reset', this.addAll, this); 
        	    posts.fetch(); // GET
        	},
        	
            addOne: function(post) {
                var view = new PostView({model: post});
                this.$("#post_list").append(view.render().el);
            },
            
            addAll: function() {
                this.$("#post_list").html('');
                posts.each(this.addOne);
            },
            
            add_post: function(e) {
            	e.preventDefault();	
                posts.create({
                	title: this.input_title.val(),
                	body: this.textarea_body.val(),
                });  // POST
                this.input_title.val('');
                this.textarea_body.val('');
                this.addAll();
            },
        	
        });
		blog_view = new BlogView;

		
    	var AboutView = Backbone.View.extend({
    		
    		el: $('#main_content'),
    		template: _.template($('#about_tpl').html()),
    	
    		render: function(){
    			this.$el.html(this.template);
    	        return this;
    	    }	
    	
    	});
		about_view = new AboutView;

        
        var MenuView = Backbone.View.extend({
        	el: $('#header'),
        	
    		events: {
    			"click #go_blog"	: "blog",
    			"click #go_about"	: "about",
    		},
    		
			blog: function(event) {
				event.preventDefault();
				router.navigate('blog', true);
			},
			about: function(event) {
				event.preventDefault();
				router.navigate('about', true);
			}
        });
        
		var menu_view = new MenuView;
		
        var Router = Backbone.Router.extend({
            routes: {
                '': 'blog',
                'blog': 'blog',
                'about': 'about',
            },

            blog: function(){
                blog_view.render();
            },
        
            about: function(){
                about_view.render();
            }
        });
        
        router = new Router;
        Backbone.history.start({pushState: true});
            
});

