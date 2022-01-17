

export class Rating{
    rate:number;
    count:number;
    constructor(rate:number,count:number){
        this.rate=rate;
        this.count=count;
    }
}

export class Product{
    id: number;
    title:string;
    price:number;
    description:string;
    category:string;
    image:string; // url to an image "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
    rating:Rating;
    constructor(id:number,title:string,price:number,description:string,category:string,image:string,rating:Rating){
        this.id =id ;
        this.title =title ;
        this.price = price;
        this.description = description;
        this.category = category;
        this.image = image;
        this.rating = rating;
    }
}