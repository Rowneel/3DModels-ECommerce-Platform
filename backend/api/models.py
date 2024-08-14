from django.db import models
from django.contrib.auth.models import User

class Tag(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(null=True,blank=True)
    image = models.ImageField(null=True,blank=True,default="/images/placeholder.png",upload_to="images/")
    category = models.CharField(max_length=200,null=True,blank=True)
    tags = models.ManyToManyField(Tag,null=True,default="")
    price = models.DecimalField(max_digits=12, decimal_places=2,null=True,blank=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    upload_date = models.DateTimeField(auto_now_add=True)
    rating = models.DecimalField(max_digits=12,decimal_places=2,null=True,blank=True)
    numReviews = models.IntegerField(null=True,blank=True,default=0)
    _id = models.AutoField(primary_key=True,editable=False)
    file = models.FileField(upload_to='store/3dmodels')
    def __str__(self):
        return self.name +" | "+ str(self.price)

class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL,null=True)
    name = models.CharField(max_length=200,null=True,blank=True)
    rating = models.IntegerField(null=True,blank=True,default=0)
    comment = models.TextField(null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True,editable=False)

    def __str__(self): 
        if self.user is None:
            reviewer = "anonymus"    
        else:
            reviewer = self.user.username   
        return f"Review for {self.product.name} by {reviewer}"


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True)
    paymentMethod = models.CharField(max_length=200,null=True,blank=True)
    totalPrice = models.DecimalField(max_digits=12,decimal_places=2,null=True,blank=True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False,null=True, blank=True)
    isDeliver = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(auto_now_add=False,null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True,null=True, blank=True)
    _id =  models.AutoField(primary_key=True,editable=False)

    def __str__(self):
        return str(self.createdAt)
    
class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE,null=True)
    order  = models.ForeignKey(Order,on_delete=models.SET_NULL,null=True)
    name = models.CharField(max_length=200,null=True,blank=True)
    price = models.DecimalField(max_digits=12,decimal_places=2,null=True,blank=True)
    image = models.CharField(max_length=200,null=True,blank=True)
    _id =  models.AutoField(primary_key=True,editable=False)

    def __str__(self):
        return str(self.name)