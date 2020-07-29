from rest_framework import serializers
from .models import Cases

class CasesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cases
        fields = ('countyname', 'recordeddate', 'numcases', 'id')


        