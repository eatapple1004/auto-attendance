require('./Def');  // 정의

const express = require('express');
const path    = require('path');

const app = express();

const http  = require('http');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


var api_upload = require('./routes/uploadRoutes');

app.use('/upload', api_upload);


app.get("/info", (req, res) => {
    //Hello World 데이터 반환
    res.send(DEF_APP_TITLE + " made by "+ DEF_APP_CREATE_DATE);
});

// 등록되지 않은 패스에 대해 페이지 오류 응답 
app.all('/{*any}', function(req, res) { 
    res.status(404).send("<center><h1>ERROR - Unable to find a Page.</h1>\r\n<h2>" + DEF_APP_TITLE + " by YJ</h2></center>"); 
});

//HTTP 서버 시작
if(DEF_USING_HTTP == true)
{
    if(typeof DEF_EVP_LOCAL_HTTP_PORT != 'undefined') 
    {
        // Create an HTTP service.
        http.createServer(app).listen(DEF_EVP_LOCAL_HTTP_PORT, () => console.log(DEF_APP_TITLE  + " HTTP Server For Test(" + DEF_EVP_LOCAL_HTTP_PORT +")"));
    }
}
