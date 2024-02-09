
class bankaccount{
    #balance = 1000;
    constructor(number,branch){
        this.number = number;
        this.branch = branch;
    }

    decreasebalance(prize){
        this.#balance -=prize;
    }

    addbalance(prize){
        this.#balance +=prize;
    }

    getbalance(){
        // console.log("Your account balance is : ", this.#balance);
        return this.#balance;
    }
}

class person extends bankaccount{
    constructor(accountnumber, branch,name, surname, age, address){
        super(accountnumber,branch)
        this.name = name;   
        this.surname = surname;
        this.age = age;
        this.address = address;
    }
    changename(newname){
        this.name = newname;
    }
}

class book{
    static id = 1;
    constructor(name, genre, prize,author){
        this.name = name;
        this.genre = genre;
        this.prize = prize
        this.author = author;
        this.id = book.id++;
    }
}

class library{
    static allbooks= [];

    static addbook(book){
        this.allbooks.push(book);
    }

    static showbook(){
        console.log(this.allbooks);
    }

    static findbook(id){
        return this.allbooks.find(item => item.id === id);
    }
}


class author extends person{
    constructor(accountnumber, branch,name,surname,age,address){
        super(accountnumber, branch,name,surname,age,address);
        this.writtenbooks = [];
    }
    addbook(name, genre, prize){
        this.writtenbooks.push(name)
        let b =  new book(name, genre, prize, this.name);
        library.addbook(b);
        return b;
    }
    showautherbooks(){
        console.log(this.writtenbooks);
    }
}

class buyer extends person{
    
    constructor(accountnumber, branch,name,surname,age,address){
        super(accountnumber, branch,name,surname,age,address);
        this.boughtbooks = []; 
    }

    buybook(id){
        let book = library.findbook(id);
        if(book.prize > this.getbalance()){
            console.log(`Your account balance is less then book prize. Your Account balance is ::${this.getbalance()} and book prize is::${book.prize}`)
        }
        else{
            this.boughtbooks.push(book);
        }
    }
    makebill(){
        let bill = 0;
        this.boughtbooks.forEach((item=>{
                console.log(`You selected book:""${item.name}"" and prize is: ${item.prize}`);
                bill += item.prize;
        }))
        console.log("Your total bill is::",bill);
        this.decreasebalance(bill);
    }
}
let jay = new author(25400,"SBI","jayesh", "bharadva", 21, "Rajkot");
jay.addbook("Just Us","Suspence", 100);
jay.addbook("while running", "Crime Thriller", 2000);

let milan = new author(245240, "ICICI", "milan", "bharadva", 20, "rajkot");
milan.addbook("with this", "Horror", 500);
library.showbook()

let codal = new buyer(201045,"HDFC","codal","amd",50, "India");
console.log(codal.getbalance());
codal.buybook(1);
codal.buybook(2);
codal.makebill();
console.log(codal.getbalance());
