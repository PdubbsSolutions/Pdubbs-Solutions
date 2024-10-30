fromflask

 import app
fromflask

_wtf importflask

Form # type: ignore
from wtforms import StringField, SubmitField # type: ignore
class RegistrationForm(flask
Form):
    username = StringField('Username')
    submit = SubmitField('Sign Up')

from django import forms # type: ignore
class UserForm(forms.Form):
    username = forms.CharFIeld(label='Username', max_length=100)


