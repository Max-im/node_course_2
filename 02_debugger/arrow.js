var user = {
    name: "Max",
    hiFunc: function(){console.log(`Hi, ${this.name}`)},
    hiArr: () => console.log(`Hi, ${this.name}`),
    hiNew() { console.log(`Hi, ${this.name}`)}
}


user.hiFunc();
user.hiArr();
user.hiNew();