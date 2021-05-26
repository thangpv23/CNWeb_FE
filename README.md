về phía backend:
## 1. api đăng ký (POST)
- ta cần truyền 3 trường, Username, Password, Name
nếu truyền đúng và user chưa tồn tại nó sẽ trả về chữ "ok"
truyền sai hoặc usr đã tồn tại nó sẽ trả về rỗng, httpcode= 204
mọi người cứ gọi api test thoải mái
nhớ khi làm thì làm một biến object body
sau đó mới dùng hàm JSON.stringify
```var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({"Username":"admin10","Password":"admin","Name":"PostMan1"});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://localhost:5000/users/regis", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  ```
  
 
 
 
## 2. api đăng nhập (POST)
 
 
ta cần truyền 2 trường, Username, Password
nếu truyền ko đúng nó sẽ trả về tin nhắn là "user or password not correct"
nếu truyền đúng và đăng nhập tài khoản đúng thì nó sẽ trả về object trong đó có token


```var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({"Username":"admin10","Password":"admin"});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://localhost:44369/users/authen", requestOptions)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  ```

ví dụ kết quả trả về khi đăng nhập đúng:
  ```
  {
    "id": 8,
    "name": "",
    "lastName": null,
    "username": "admin11",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgiLCJuYmYiOjE2MjE1MzAyNzAsImV4cCI6MTYyMjEzNTA3MCwiaWF0IjoxNjIxNTMwMjcwfQ.frNXOlotJymWzUAnujlzCerm9rhIjoKLC6OkjMc60b8"
}
  ```
Chú ý vào trường token, sử dụng nó để gọi những request liên quan đến sự kiện (mọi người có thể lưu token vào đâu đó để giữ session)
## 3. api trả về danh sách sự kiện theo một khoảng thời gian(GET)
code mẫu (nhớ thay token,from,to) biến from,to dữ liệu kiểu số, ý nghĩa là timestamp
```
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYmYiOjE2MjE1Mjc2MDIsImV4cCI6MTYyMjEzMjQwMiwiaWF0IjoxNjIxNTI3NjAyfQ.ueYsOht-XDkcgzlIZFUYPWwF8kZeAFlG4aUvPprDSdY");

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch("https://localhost:44369/events/get_all?from=1621448380&to=1621448390", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
```
Chú ý đến cái đoạn headers có Authorization, ta sẽ dùng biến token được trả về sau khi đăng nhập thành công ở trên kia để thay vào đoạn sau chữ ``` Bearer ```, nhớ là phải có chữ Bearer ta chỉ thay token vào đoạn sau nó với mỗi user. Kết quả trả về khi gọi đúng và thành công là dạng mảng object sau:
```
[
    {
        "id": 1,
        "uid": 1,
        "name": "Sự kiện 1",
        "description": "mô tả sự kiện ",
        "startTime": 1621448385,
        "updateTime": 1621448385,
        "isPublic": 1,
        "nameUser": "thang tran"
    },
    {
        "id": 4,
        "uid": 1,
        "name": "ok",
        "description": "ok nhé",
        "startTime": 1621448385,
        "updateTime": 1621448800,
        "isPublic": 1,
        "nameUser": "thang tran"
    },
    {
        "id": 5,
        "uid": 1,
        "name": "ok",
        "description": "ok nhé",
        "startTime": 1621448389,
        "updateTime": 1621449045,
        "isPublic": 1,
        "nameUser": "thang tran"
    }
]
```


## 4. api tạo sự kiện (POST)
Cần token như trên, cần truyền thêm các tham số liên quan tới sự kiện như: Name, Description, Starttime (định dạng timestamp), IsPublic(dạng số: 0  là private, 1 là public)
```
var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYiLCJuYmYiOjE2MjE1MjQ4OTksImV4cCI6MTYyMjEyOTY5OSwiaWF0IjoxNjIxNTI0ODk5fQ.ogVuGhWmvVJC-9hbbkkunWtwbvieXmQ0u8_1Tv-XXdc");
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({"Name":"Sự kiện cho postman2","Description":"postman call api","StartTime":1621448390,"IsPublic":1});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://localhost:44369/events/create", requestOptions)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

Kết quả trả về dạng json khi gọi đúng:
```
{
    "id": 0,
    "uid": 0,
    "name": "Sự kiện cho postman2",
    "description": "postman call api",
    "startTime": 1621448390,
    "updateTime": 0,
    "isPublic": 1,
    "nameUser": null
}
```

## 5. api update sự kiện('POST')
cần truyền Id sự kiện, Id người dùng, các trường dữ liệu mới, các trường ko thay đổi thì truyền dữ liệu cũ
```
var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYiLCJuYmYiOjE2MjE1MjQ4OTksImV4cCI6MTYyMjEyOTY5OSwiaWF0IjoxNjIxNTI0ODk5fQ.ogVuGhWmvVJC-9hbbkkunWtwbvieXmQ0u8_1Tv-XXdc");
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({"id":7,"uid":6,"name":"update sự kiện","description":"update postman call api","startTime":1621448395,"updateTime":0,"isPublic":0});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://localhost:44369/events/update", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```
kết quả trả về giống định dạng api số 4, là dữ liệu đã update nếu thành công

## 6. api xóa sự kiện(GET)
chỉ cần token và id sự kiện, nếu gọi đúng thì sẽ response text là "ok"
```
var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYiLCJuYmYiOjE2MjE1MjQ4OTksImV4cCI6MTYyMjEyOTY5OSwiaWF0IjoxNjIxNTI0ODk5fQ.ogVuGhWmvVJC-9hbbkkunWtwbvieXmQ0u8_1Tv-XXdc");
myHeaders.append("Content-Type", "application/json");


var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://localhost:44369/events/delete?id=7", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

```

## 6. api search(GET)
Kết quả search sẽ tìm những sự kiện có tên sự kiện chứa các từ trong query, ví dụ query search từ: âm nhạc, nó sẽ query tất cả những sự kiện có từ âm hoặc từ nhạc(gồm cả sự kiện của bản thân và sự kiện public người khác)

```
var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJuYmYiOjE2MjE2OTQ5MzcsImV4cCI6MTYyMjI5OTczNywiaWF0IjoxNjIxNjk0OTM3fQ.tkWTn6G80nysLfdd3uylalmPou4Z2pKRxlkQC1T9GNY");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://localhost:44369/events/search?text=âm nhạc", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```



về phía font-end:
- mở login.html trên live server
- đăng nhập hoặc đăng ký
- màn hình chính sẽ hiễn thị lịch ngày tháng
- có các chức năng thêm, sửa xoá sự kiện, hiển thị lịch âm dương, tìm kiếm sự kiện, follow acount khác ,
