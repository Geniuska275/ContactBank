from flask import Flask,session,render_template,request,url_for,redirect,g
from flask_sqlalchemy  import SQLAlchemy
from datetime import datetime
from forms import UsersForm,ContactsForm,SearchForm
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash,check_password_hash
import os
import json
import jsonpickle

UPLOAD_FOLDER="./static"
ALLOWED_EXTENSION={"txt","pdf","png","jpg","jpeg","gif"}
app=Flask(__name__)
app.secret_key="secretttt"


ENV='dev'

if ENV=='dev':
   app.debug=True
   app.jinja_env.auto_reload=True
   app.config['TEMPLATES_AUTO_RELOAD']=True
   app.config['UPLOAD_FOLDER']=UPLOAD_FOLDER
   app.config["SESSION_PERMANENT"]=False
   app.config['SQLALCHEMY_DATABASE_URI']='postgresql://postgres:kingsley2@localhost/flask'
else:
   app.config['SQLALCHEMY_DATABASE_URI']=''      
   app.debug=False

app.config['SQLALCHEMY_TRACK_MODIFICATION']=False
db=SQLAlchemy(app)
"""
models
"""
class Users(db.Model):
    __tablename__="users"
    id=db.Column(db.Integer,primary_key=True)
    username=db.Column(db.String(255),nullable=False,)
    surname=db.Column(db.String(255),nullable=False,unique=True)
    contact=db.Column(db.String(255),nullable=False)
    password=db.Column(db.String(255),nullable=False,unique=True)
    email=db.Column(db.String(100),nullable=False,unique=True)
    passcode=db.Column(db.String(100),nullable=False,unique=True)
    Date_created=db.Column(db.DateTime, default=datetime.utcnow)
    contacts=db.relationship('Contact', backref='user',lazy="joined")
    



class Images(db.Model):
    __tablename__="images"
    id=db.Column(db.Integer,primary_key=True)
    image=db.Column(db.String(100),nullable=False,unique=True)
    mime_type=db.Column(db.String(100),nullable=False,)
    name=db.Column(db.String(100),nullable=False)






class Contact(db.Model):
    __tablename__="contacts"
    id=db.Column(db.Integer ,primary_key=True)
    firstname=db.Column(db.String(200),nullable=False,)
    lastname=db.Column(db.String(200),nullable=False)
    number=db.Column(db.String(200),nullable=False,unique=True)
    stack=db.Column(db.String(200),nullable=False)
    Date_Created=db.Column(db.DateTime,default=datetime.utcnow)
    user_id=db.Column(db.Integer,db.ForeignKey("users.id"))
    

#landing page
@app.route("/")
def landing():
    if g.user:
       return render_template("landing.html",user=session['user'])

    return redirect("/login")


@app.route('/signed', methods=['POST','GET'])
def index():
 if request.method=='POST':
     firstname=request.form['firstname']
     lastname=request.form['lastname']
     number=request.form['number']
     print(firstname,lastname,number)
     if firstname == ' ' or lastname == '' or number=='':
         return render_template('index.html',message="please fill in the fields")
     if db.session.query(Contact).filter(Contact.number==number).count()==0: 
       data=Contact(firstname,lastname,number)
       db.session.add(data)
       db.session.commit()
     return render_template('success.html')
 else:
     user=Users.query.filter_by(username=session['user']).first()
     return render_template('index.html',contacts=user.contacts ,lengths=len(user.contacts),user=session['user'] )

# delete endpoint


@app.before_request
def before_request():
    g.user=None
    if 'user' in session:
        g.user=session['user']

@app.route('/delete/<int:id>')
def delete(id):
    contact_to_delete=Contact.query.get_or_404(id)
    try:
        db.session.delete(contact_to_delete)
        db.session.commit()
        return redirect('/signed')
    except:
        return "there was an error deleting this contact"


#Update endpoint
@app.route('/update/<int:id>', methods=['GET','POST'])
def update(id):
    update=Contact.query.get_or_404(id)
    if request.method=='POST':
     update.firstname=request.form['firstname']
     update.lastname=request.form['lastname']
     update.number=request.form['number']
     update.stack=request.form['stack']

     db.session.commit()

     return redirect('/Contacts')

    else:
      return render_template('update.html', update=update)

#search endpoints

@app.route('/search/<search>' ,methods=['POST'])
def search(search):
    if request.method=='POST':
     seah=request.form['search']
     searched=Contact.query.filter_by(firstname=seah).first()
     return render_template('search.html', searched=searched)
    else:
        return render_template('index.html', messages="sorry search not found")


# react contacts
@app.route("/contacts")
def Allcontacts():
    contacts=Contacts.query.order_by(Contact.Date_Created).all()
    contact=json.dumps(contacts, default=dumper,indent=2)
    print(contact)
    return contact
#Contacts endpoint
@app.route('/Contacts')
def Contacts():
    kingsley=Users.query.filter_by(username=session['user']).first()
   

    return render_template('contacts.html',contacts=kingsley.contacts ,length=len(kingsley.contacts))

@app.route('/AddContacts', methods=['GET','POST'])
def AddContacts():
    if request.method=='POST':
     firstname=request.form['firstname']
     lastname=request.form['lastname']
     number=request.form['number']
     stack=request.form['stack']
     print(stack)
     if firstname == ' ' or lastname == '' or number==''or stack=='':
         return render_template('addContacts.html',message="please fill in the fields")
     if db.session.query(Contact).filter(Contact.number==number).count()==0:   
       kingsley=Users.query.filter_by(username=session['user']).first()
       print(kingsley.contacts)
       for contact in kingsley.contacts:
           print(contact.firstname,contact.number)
       data=Contact(firstname=firstname,lastname=lastname,number=number,stack=stack,user=kingsley)
       db.session.add(data)
       db.session.commit()
     return render_template('success.html', stack=stack, firstname=firstname )
    else:
        return render_template('addContacts.html')

#users add endpoint
@app.route('/user')
def User():
    email=session["email"]
    if "email" in session:
        return f"<h1>{email}</h1>"
@app.route('/Addusers',methods=['POST','GET'])
def Addusers():
    Userform=UsersForm()
    if request.method=='POST':
        user_name=request.form['user_name']
        surname=request.form['surname']
        contact=request.form['contact']


        password=request.form['password']
        email=request.form['email']
        passcode=request.form['passcode']
        hashed_password=generate_password_hash(password)
        user=Users(username=user_name,surname=surname,contact=contact,password=hashed_password,email=email,passcode=passcode)
        db.session.add(user)
        db.session.commit()
        return redirect("/login")
    else:
        return render_template('adduser.html',form=Userform)    


#login
@app.route("/login" ,methods=["GET","POST"])
def Login():
    if request.method=="POST":
        session.pop('user',None)
        email=request.form["email"]
        password=request.form["password"]        
        users=Users.query.filter_by(email=email).first()
        user=users.username       
        if not check_password_hash(users.password,password):
            message="invalid usename or password"
            return render_template("login.html",message=message)
        session['user']=user
        return redirect("/") 
    else:
        return render_template('login.html')


#logout
@app.route("/logout")
def Logout():
    session.pop('user',None)
    return render_template("login.html")


@app.route('/Users')
def showUsers():
    users=Users.query.order_by(Users.Date_created).all()
    
    return render_template('users.html',users=users)
@app.route("/viewcontacts/<int:id>")
def userContacts(id):
    user=Users.query.get_or_404(id)
    contacts=user.contacts
    length=len(contacts)
    return render_template("usercontacts.html",contacts=contacts, length=length,user=user)


#search endpoint for users
@app.route('/search' ,methods=['POST'])
def searched():
    form=SearchForm()
    if request.method=='POST':
        searched=request.form['searched'] 
        users=Users.query.filter(Users.username.ilike(f'%{searched}%')).all()
        for user in users:
            print(user)
        print(users)      
        return render_template("showsearch.html",users=users)

#endpoint for entering passcode
@app.route("/passcode/<int:id>")
def passCode(id):
    user=Users.query.get_or_404(id)
    contacts=user.contacts
    length=len(contacts)
    return render_template("passcode.html",contacts=contacts, length=length,user=user)



@app.route("/passcode",methods=["POST"])
def verfication():
    if request.method=="POST":
        passcode=request.form["passcode"]
        username=request.form["username"]
        users=Users.query.filter(Users.username.ilike(f'%{username}%')).all()
        
        for user in users:
            print(user.passcode)
        if user.passcode==passcode:
            contacts=user.contacts
            length=len(contacts)
            return render_template("usercontact.html",contacts=contacts, length=length,user=user)
        else:
            return "wrong passcode"

#Update Users endpoint
@app.route('/updateUser/<int:id>', methods=['GET','POST'])
def updateUser(id):
    user=Users.query.get_or_404(id)
    if request.method=='POST':
     user.username=request.form['username']
     user.email=request.form['email']
     user.passcode=request.form['passcode']
     db.session.commit()

     return redirect('/Users')

    else:
      return render_template('updateUsers.html', user=user)








@app.route("/userprofile/<int:id>")
def Userprofile(id):
    user=Users.query.get_or_404(id)
    contacts=user.contacts
    length=len(contacts)
    return render_template("userprofile.html", user=user,length=length)



@app.route("/profile")
def Userpro():
    kingsley=Users.query.filter_by(username=session['user']).first()
    user=Users.query.get_or_404(kingsley.id)
    contacts=user.contacts
    length=len(contacts)
    return render_template("userprofile.html", user=user,length=length)

@app.route("/brains")
def Brains():
    return render_template("brains.html")
#copy contacts
@app.route("/copy")
def Copycontacts():
    contacts=Contact.query.order_by(Contact.Date_Created).all()
    return render_template("copy.html",contacts=contacts)
#family stack
@app.route("/stack/family")
def Family():
    contacts=Contact.query.filter_by(stack="family").all()
    print(contacts)
    print(len(contacts))
    return render_template("friends.html",contacts=contacts,length=len(contacts))
   
@app.route("/stack/friends")
def Friends():
    contacts=Contact.query.filter_by(stack="friends").all()
    print(contacts)
    print(len(contacts))
    return render_template("friends.html",contacts=contacts,length=len(contacts))
@app.route("/stack/business")
def Business():
    contacts=Contact.query.filter_by(stack="business").all()
    print(contacts)
    print(len(contacts))
    return render_template("business.html",contacts=contacts,length=len(contacts))
@app.route("/stack/church")
def Church():
    contacts=Contact.query.filter_by(stack="church").all()
    print(contacts)
    print(len(contacts))
    return render_template("church.html",contacts=contacts,length=len(contacts))
@app.route("/stack/stranger")
def Stranger():
    contacts=Contact.query.filter_by(stack="stranger").all()
    print(contacts)
    print(len(contacts))
    return render_template("Stranger.html",contacts=contacts,length=len(contacts))
@app.route("/stack/mosque")
def Mosque():
    contacts=Contact.query.filter_by(stack="mosque").all()
    print(contacts)
    print(len(contacts))
    return render_template("mosque.html",contacts=contacts,length=len(contacts))

@app.route("/stack/spouse")
def Spouse():
    contacts=Contact.query.filter_by(stack="spouse").all()
    print(contacts)
    print(len(contacts))
    return render_template("spouse.html",contacts=contacts,length=len(contacts))
@app.route("/newlogin")
def Newlogin():
    return render_template("newlogin.html")


if __name__=="__main__":
    db.create_all()
    app.run()

