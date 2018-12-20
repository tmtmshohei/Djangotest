from django.urls import path

from . import views

urlpatterns = [
    path('', views.heatmap, name='heatmap'),
    path('json',views.json,name='json'),
    path('gaze_visualization',views.gaze_visualization,name='gaze_visualization')
]
