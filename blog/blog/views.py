# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.http import HttpResponse
from django.template.loader import get_template
from django.template import Context
from django.shortcuts import render_to_response
from django.views.generic.base import TemplateView
from blog.models import Blog

def blogs(request):
    return render_to_response('blogs.html',
    {'blogs':Blog.objects.all()})
def blog(request, blog_id=1):
    return render_to_response('blog.html',
    {'blog':Blog.objects.get(id=blog_id)})

    
    
    
    
    