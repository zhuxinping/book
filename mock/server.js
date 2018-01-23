let http=require('http');
let fs=require('fs');
let url=require('url');
//因为fs模块读取文件是一个异步操作所以要传入回调函数cb，当读取成功就调用cd回调函数
function read(cb) {
  fs.readFile('./book.json','utf8',function (err,data) {
    if(err||data.length==0){//如果有错或文件没长度就是空数组
        cb([]);
    }else{
      cb(JSON.parse(data));//将读出来的内容转为对象
    }
  });
}
/*read(function (books) {//books代表所有图书
    console.log(books);
});*/
function write(data,cb) {//写入内容
  fs.writeFile('./book.json',JSON.stringify(data),cb);
};
// write({},function () {
//   cons
// });
let pageSize=5;//没有显示5个
//获取轮播图接口/sliders
let sliders=require('./sliders.js');
http.createServer((req,res)=>{
 /* res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("X-Powered-By",' 3.2.1')
  if(req.method=="OPTIONS") return res.end();/!*让options请求快速返回*!/*/

  let {pathname,query}=url.parse(req.url,true);//把query转换为对象
  if(pathname==='/page'){
    let offset=parseInt(query.offset)||0;
    //console.log(offset);
    read(function (books) {
      //每次偏移量,在偏移的基础上增加5条
     let result = books.reverse().slice(offset,offset+pageSize);//数据倒序
      //默认有更多
      let hasMore=true;
      if(books.length<=offset+pageSize){//已经显示的数目大于总的数据
        hasMore=false;
      }
      res.end(JSON.stringify({hasMore,books:result}));
    });
    return;
  }
  if(pathname==='/sliders'){
      res.setHeader('Content-Type','application/json;charset=utf8');
       res.end(JSON.stringify(sliders));
    return
  }
  if(pathname==='/hot'){
    res.setHeader('Content-Type','application/json;charset=utf8');
      read((books)=>{
         let hot=books.reverse().slice(0,6);
        return res.end(JSON.stringify(hot));
      });
    return;
  }
  if(pathname==='/book'){//对书的增删改查
    let id=parseInt(query.id);//取出的是字符串
      switch (req.method){//?id=1
        case 'GET':
          //console.log(req.method);
          if(!isNaN(id)){//有id就查询一个
            read(function (books) {
               let book = books.find(item=>item.bookId===id);
               if(!book) book={};
              res.setHeader('Content-Type','application/json;charset=utf8');
              res.end(JSON.stringify(book));
            });
          }else{//获取所有图书
            read((books)=>{
              res.setHeader('Content-Type','application/json;charset=utf8');
              res.end(JSON.stringify(books.reverse()));
            })
          }
          break;
        case 'POST':
          let str='';
          req.on('data',chunk=>{
            str+=chunk;
          });
          req.on('end',()=>{
            let book=JSON.parse(str);
            read(function (books) {//添加id
              book.bookId=books.length?books[books.length-1].bookId+1:1;
              books.push(book);//放到内存中的数据
              write(books,function () {
                res.end(JSON.stringify(book));
              });
            });
          });
          break;
        case 'PUT':
          if(id){//获取了当前要修改的id
            let str='';
            req.on('data',chunk=>{
              str+=chunk;
            });
            req.on('end',()=>{
              let book=JSON.parse(str);//book要改成什么样子
              read(function (books) {
               books = books.map(item=>{
                 if(item.bookId===id){//找到相同id的book用新的book返回覆盖原来的
                   return book;
                 }
                 return item;//其他的不变
               });
               write(books,function () {//将数据写回json中
                 res.end(JSON.stringify(book));
               });
              });
            });
          }
          break;
        case'DELETE':
          //console.log(id);
          read(function (books) {
            books=books.filter(item=>item.bookId!==id);
            write(books,function () {
              res.end(JSON.stringify({}));//删除返回空对象
            });
          });
          break;
      }
      return;
  }
//读取一个路径
  fs.stat('.'+pathname,function (err,stats) {
    if(err){
     /* res.statusCode=404;
      res.end('NOT FOUND');*/
      fs.createReadStream('index.html').pipe(res);
    }else{
      if(stats.isDirectory()){
        let p=require('path').join('.'+pathname,'./index.html');
        fs.createReadStream(p).pipe(res);
      }else{
        fs.createReadStream('.'+pathname).pipe(res);
      }
    }
  });

}).listen(3000);
