from flask import Flask,render_template,request,url_for,redirect
from flask_sqlalchemy  import SQLAlchemy
from datetime import datetime

app=Flask(__name__)
ENV='dev'

if ENV=='dev':
   app.debug=True
   app.config['SQLALCHEMY_DATABASE_URI']='postgresql://postgres:kingsley2@localhost/flask'
else:
   app.config['SQLALCHEMY_DATABASE_URI']=''      
   app.debug=False

app.config['SQLALCHEMY_TRACK_MODIFICATION']=False
db=SQLAlchemy(app)

class Contact(db.Model):
    id=db.Column(db.Integer ,primary_key=True)
    firstname=db.Column(db.String(200),nullable=False,unique=True)
    lastname=db.Column(db.String(200),nullable=False)
    number=db.Column(db.String(200),nullable=False,unique=True)
    Date_created=db.Column(db.DateTime,default=datetime.utcnow)

    def __init__(self,firstname,lastname,number):
       self.firstname=firstname
       self.lastname=lastname
       self.number=number

@app.route('/', methods=['POST','GET'])
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
     contacts=Contact.query.order_by(Contact.Date_created).all()
     return render_template('index.html',contacts=contacts)

# delete endpoint

@app.route('/delete/<int:id>')
def delete(id):
    contact_to_delete=Contact.query.get_or_404(id)
    try:
        db.session.delete(contact_to_delete)
        db.session.commit()
        return redirect('/')
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
     db.session.commit()

     return redirect('/')

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










if __name__=="__main__":
    db.create_all()
    app.run()

