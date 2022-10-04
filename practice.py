x,y,name,is_cool=(1,2.3,'kingsley',True)

print(x,y,is_cool,name)

name='john'
age=26

#concatenating
print('heloo my name is'+" "+name+ "and am"+" "+str(age)+"years old")
#using format method to concatenate
print('heloo my name is {name} and am {age} years old'.format(name=name,age=age))

#using f-string to concatenate
print(f'hello,my name is {name} and i am {age} years old')

s="hello world"
print(s.split())
print(len(s))
print(s.swapcase())
print(s.upper())
print(s.lower())
print(s.replace("world","kingsley"))
print(s.startswith("world"))
print(s.endswith("hello"))

#creating a function
def sayHello(name="world"):
    print(f'helo {name}')

#calling the function
sayHello()