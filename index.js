let multer =require('multer');
let express=require('express');
let db = require('mongoose');
let userSchema = require('./model/userSchema')
let productSchema=require('./model/productsSchema')
let User=db.model('User',userSchema,'User');
let product=db.model('Product',productSchema,'products');
db.connect('mongodb+srv://minhhieu:Hieu123@cluster0-e5ua0.gcp.mongodb.net/info',{}).then(function(res) {
    console.log('Connected')
})

let app = express();
let hbs=require('express-handlebars');


app.engine('.hbs',hbs(
    {extname:'hbs'
        ,defaultLayout: ''
        ,layoutsDir:''}))
app.set('view engine','.hbs');
app.listen(1100);
app.get('/', function (request, response) {


    response.render('login',{status:'none'});
});
app.get('/register', function (request, response) {


    response.render('register');
});

app.get('/login',async function (request, response)  {

    let newName=request.query.newName;
    let newPassword=request.query.newPassword;
    let user=new User({
        name:newName,
        password:newPassword,
    })

    let status=await user.save();
    if (status){
        response.render('Login',{status:'block',data:'created account',name:newName,password:newPassword})
    }else {
        response.send('them khong thanh cong');
    }
});
app.get('/index', async function (request, response)  {
    let name=request.query.name;
    let password=request.query.password;
    let users = await User.find({name:name,password:password}).lean();
    console.log(name+""+password);
if (users.length<=0){
    response.render('login',{status:'block',data: 'Name or Password Wrong!!!'});
}else {
    response.render('index',{data:users});
}

});
app.get('/UserManage',async function (request, response){
    let users = await User.find({}).lean();
    let idKH = request.query.idKH;
    let del = request.query.del;
    if (del == 1) {
        console.log(idKH);
        del = 0;
        let status = await User.findByIdAndDelete(idKH);
        let users = await User.find({}).lean();
        if (status) {
            response.render('UserManage', {data: users, status: 'block', textAlert: 'Xóa thành công.'});
        } else {
            response.render('UserManage', {data: users, status: 'block', textAlert: 'Xóa thất bại.'});
        }

    } else {
        response.render('UserManage', {data: users, status: 'none'});
    }
    // let users = await User.find({}).lean();
    // response.render('UserManage',{data:users});
});
app.get('/upload',async function (request, response){
    response.render('upload');
})
app.get('/manage',async function (request, response){
    response.render('manage');
})
app.get('/home',async function (request, response){
    response.render('home');
})
app.get('/prouducts',async function (request, response){
    let products = await product.find({}).lean();
    response.render('prouducts',{data:products});
})






