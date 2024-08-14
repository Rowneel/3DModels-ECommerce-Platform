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
def addOrderItems(request):
    user = request.user
    data = request.data
    print("this data: ",data)
    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No Order Items', "status": status.HTTP_400_BAD_REQUEST})
    else:
        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            totalPrice=data['totalPrice'],
        )

    for i in orderItems:
        # product = Product.objects.get(_id=i['product'])
        product = Product.objects.get(_id=i['_id'])
        item = OrderItem.objects.create(
            product=product,
            order=order,
            name=product.name,
            price=i['price'],
            image=product.image.url,
        )
    
    serializer = OrderSerializer(order,many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):

    user = request.user

    try:
        order = Order.objects.get(_id=pk)
        print(order)
        if order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            Response({'detail': 'Not Authorized  to view this order'},
                     status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail': 'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    order = Order.objects.get(_id=pk)
    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()
    return Response('Order was paid', status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def initKhalti(request,i):
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