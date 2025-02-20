from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Tag)
admin.site.register(Product)
admin.site.register(Review)
admin.site.register(OrderItem)

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = [
        "user","createdAt","totalPrice"
    ]
