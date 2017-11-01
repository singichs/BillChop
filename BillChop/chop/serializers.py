from rest_framework import serializers
from chop.models import Group, Receipt, User, Item, UserMembership, ReceiptMembership

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('name', 'date_created', 'last_used')

class ReceiptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receipt
        fields = ('photo_bucket', 'timestamp', 'total_cost', 'tip', 'tax', 'is_complete', 'group')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'venmo_handle', 'groups', 'receipts')
        # currently not working - phone_number = PhoneNumberField()

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ('name', 'value', 'receipt', 'user_owns')

class UserMembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserMembership
        fields = ('user', 'group', 'date_joined', 'role')

class ReceiptMembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReceiptMembership
        fields = ('user', 'receipt', 'outstanding_payment')

