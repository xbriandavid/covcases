from django.shortcuts import render
from django.shortcuts import HttpResponse
from django.template import Context
from .models import Cases 
from .forms import DateForm
from django.http import JsonResponse
import datetime
# Create your views here.
valrange = range(1,5)
counties = [Cases.objects.get(id = x).countyname.countyname for x in valrange]
casesnum = [Cases.objects.get(id = x).numcases for x in valrange]

first_period = [{'Date':Cases.objects.get(id = 1).recordeddate.strftime("%B %d, %Y"), 'countyName': co_n, 'casesNum': ca_n} for co_n, ca_n in zip(counties,casesnum)]
posts = {
    'post':first_period
}
def index(request):
    countyname = Cases.objects.get(id = 2).countyname.countyname
    return render(request, 'frontend/index.html', posts)

def dateform(request):
    form = DateForm(request.POST or None)
    renderthis = None
    
    if request.method == 'POST':
        if form.is_valid():
            date = form.cleaned_data['date']
            do = datetime.datetime.strptime(date, "%m-%d-%Y")
            renderthis = Cases.objects.filter(recordeddate__exact = do)
    return render(request, 'frontend/formpage.html', {'form':form, 'data': renderthis})
