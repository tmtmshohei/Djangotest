from django import forms


class MyForm(forms.Form):
    startdatetime = forms.DateTimeField(label='開始日時')
    enddatetime = forms.DateTimeField(label='終了日時')
