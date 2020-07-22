from django.shortcuts import render
from django.shortcuts import HttpResponse
from django.template import Context
from .models import Cases 
from .models import Casesbydate
from .forms import DateForm
from django.http import JsonResponse
from .serializers import CasesSerializer
from .serializers import CasesByDateSerializer
from rest_framework import generics
import datetime
# Create your views here.
valrange = range(1,5)
counties = [Cases.objects.get(id = x).countyname.countyname for x in valrange]
casesnum = [Cases.objects.get(id = x).numcases for x in valrange]

first_period = [{'Date':Cases.objects.get(id = 1).recordeddate.strftime("%B %d, %Y"), 'countyName': co_n, 'casesNum': ca_n} for co_n, ca_n in zip(counties,casesnum)]
posts = {
    'post':first_period
}
"""
def index(request):
    countyname = Cases.objects.get(id = 2).countyname.countyname
    return render(request, 'frontend/index.html', posts)
"""
def index(request):
    return render(request, 'frontend/index.html')
def dateform(request):
    form = DateForm(request.POST or None)
    renderthis = None
    
    if request.method == 'POST':
        if form.is_valid():
            date = form.cleaned_data['date']
            do = datetime.datetime.strptime(date, "%m-%d-%Y")
            renderthis = Cases.objects.filter(recordeddate__exact = do)
    return render(request, 'frontend/formpage.html', {'form':form, 'data': renderthis})

class CasesView(generics.ListAPIView):
    queryset = Cases.objects.all()
    serializer_class = CasesSerializer

class CasesbydatesView(generics.ListAPIView):
    queryset = Casesbydate.objects.all()
    serializer_class = CasesByDateSerializer