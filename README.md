# title

#####  获取包
```$xslt
    npm install -g xl_tinypng
```
#####  获取并设置 key
######  https://tinypng.com/dashboard/api
######  免费的key每个月只能操作 500 张图片
```$xslt
    xl_tiny  set  key
    xl_tiny  show
```

##### 压缩优化文件
```$xslt
    xl_tiny file filePath 
    xl_tiny file filePath.png -o distPath.png
```

##### 压缩优化文件夹下面的图片
```$xslt
    xl_tiny dir dirPath
    xl_tiny dir dirPath -o distPath
```

















