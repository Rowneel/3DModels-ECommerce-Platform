import requests
import json
# Django Import
from django.core.exceptions import RequestDataTooBig
from django.shortcuts import render
from datetime import datetime

from rest_framework import status

# Rest Framework Import
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.serializers import Serializer


# Local Import
# from base.products import products
from api.models import *
from api.serializers import ProductSerializer, OrderSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def initKhalti(request):
    # url = "https://a.khalti.com/api/v2/epayment/initiate/"
    data = request.data

    # payload = json.dumps(data)
    # headers = {
    #     'Authorization': 'key live_secret_key_68791341fdd94846a146f0457ff7b455',
    #     'Content-Type': 'application/json',
    # }

    # response = requests.request("POST", url, headers=headers, data=payload)
    # # response = requests.post(url, headers=headers, data=payload)
    # if response.status_code == 200:
    #     return Response(response.json(), status=status.HTTP_200_OK)
    # else:
    #     return Response(response.json(), status=response.status_code)
    # print(response.text)
    return Response({"message": data}, status=status.HTTP_200_OK)