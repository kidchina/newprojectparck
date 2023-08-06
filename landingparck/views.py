from django.shortcuts import render

def index(request):
    
    return render(request, 'landingparck/index.html')

def locate(request):
    return render(request, 'landingparck/locate.html')

def parking_detail(request):
    return render(request, 'landingparck/parking_detail.html')
