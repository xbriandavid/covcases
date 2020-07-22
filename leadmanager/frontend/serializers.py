from rest_framework import serializers
from .models import Cases
from .models import Casesbydate

class CasesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cases
        fields = ('countyname', 'recordeddate', 'numcases', 'id')

class CasesByDateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Casesbydate
        fields = ('getnumcases','recordeddate', 'id')
        