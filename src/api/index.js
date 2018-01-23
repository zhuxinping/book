import axios from 'axios';
//增加默认的请求路径
/*axios.defaults.baseURL='http://localhost:3000';*/
//拦截器
axios.interceptors.response.use((res)=>{
  return res.data;//在这里统一拦截把结果处理成res.data
});
//获取轮播图数据返回的是一个pomise对象
export let getSliders=()=>{
   return axios.get('/sliders');
};
//获取图书列表接口数据
export  let getHotBooks=()=>{
  return axios.get('/hot');
};
//获取全部图书
export let getAllBooks=()=>{
  return axios.get('/book');
};
//删除某一本图书
export let removeBook=(id)=>{
  return axios.delete(`/book?id=${id}`);
};
//获取一本书的详情
export let bookDetail=(id)=>{
  return axios.get(`/book?id=${id}`);
};

//修改图书
/**
 *
 * @param id 编号
 * @param data 数据 请求体发送
 * @returns {AxiosPromise<any>}
 */
export let updateBook=(id,data)=>{
  return axios.put(`/book?id=${id}`,data);
};
/**
 * 增加book
 * @param data
 * @returns {any|*}
 */
export let addBook=(data)=>{
  return axios.post('/book',data);
};

export let getAll=()=>{
  return axios.all([getSliders(),getHotBooks()]);
};
//根据偏移量返回
export let pagination=(offset)=>{
  return axios.get(`/page?offset=${offset}`);
};
