from django.shortcuts import render
from django.http import HttpResponse
from heatmap.models import Position
from django.http import JsonResponse
from django.core import serializers
from django.forms.models import model_to_dict
from .forms import MyForm
from datetime import datetime

startdate=(str(datetime.now().year)+"-"+str(datetime.now().month)+"-"+str(datetime.now().day)+" "+str(datetime.now().hour)+":"+str(datetime.now().minute))
enddate=(str(datetime.now().year)+"-"+str(datetime.now().month)+"-"+str(datetime.now().day)+" "+str(datetime.now().hour)+":"+str(datetime.now().minute))

# Create your views here.
def heatmap(request):

    if request.method == 'POST':
        dic=dict(request.POST)
        start=dic['startdatetime']
        end=dic['enddatetime']
        form=MyForm()
        global startdate , enddate
        startdate=start[0].replace('T',' ')
        enddate=end[0].replace('T',' ')
        content=makedata(startdate,enddate)
        JsonResponse(content,safe=False)
        return render(request,'members/heatmap.html')

    return render(request,'members/heatmap.html')


def json(request):

    if request.method == "GET":
        content=makedata(startdate,enddate)
        return JsonResponse(content,safe=False)



def makedata(startdate,enddate):
    content = list(Position.objects.filter(DateTime__gte=startdate).filter(DateTime__lte=enddate).values('id','ptz_p','ptz_z','Time'))
    return content


def gaze_visualization(request):

    if request.method == 'POST':
        dic=dict(request.POST)
        start=dic['startdatetime']
        end=dic['enddatetime']
        form=MyForm()
        global startdate , enddate
        startdate=start[0].replace('T',' ')
        enddate=end[0].replace('T',' ')
        content=makedata(startdate,enddate)
        JsonResponse(content,safe=False)
        return render(request,'members/gaze_visualization.html')

    return render(request,'members/gaze_visualization.html')
