from flask_wtf import FlaskForm
from datetime import datetime
from wtforms import SelectField,StringField ,FileField,PasswordField , SubmitField,IntegerField,RadioField,DateTimeField,FileField,DateField,TimeField
from wtforms.validators  import DataRequired,Length


class SearchForm(FlaskForm ):
 searched=StringField("searched",validators=[DataRequired()])
 submit=SubmitField("Submit")
 
class UsersForm(FlaskForm ):
 user_name=StringField(label='user_name',validators=[DataRequired("please fill in username")])
 surname=StringField(label='surname',validators=[DataRequired("please fill in surname")])
 contact=IntegerField(label='whatsapp contact',validators=[DataRequired("please fill in whatsapp contact")])


 password=PasswordField(label='password',validators=[DataRequired()])
 email=StringField(label='email',validators=[DataRequired()])
 passcode=PasswordField(label='Your_Passcode',validators=[DataRequired()])


 class LoginForm(FlaskForm ):
    email=StringField(label='email',validators=[DataRequired("please fill in username")])
    password=PasswordField(label='password',validators=[DataRequired()])
 

 
class ContactsForm(FlaskForm ):
 firstname=StringField(label='Venue',validators=[DataRequired()])
 lastname=StringField(label='country',validators=[DataRequired()])
 number=StringField(label='state',validators=[DataRequired()])
 username=StringField(label='state',validators=[DataRequired()])
 stack=SelectField('choose stack',choices=['strangers','business','family','friends','church','mosque','spouse'])

 



