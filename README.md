# realworld

# 实现功能
注册/登录 、文章发表//列表/标签/详情、个人中心，个人信息更新

# 访问地址
数据库是自己的 需要先注册，接口服务node+express
http://42.192.42.107:3000/

# 部署出现问题
1. 部署外网无法访问
  需要在package.json里加 "config": {
    "nuxt": {
      "host": "0.0.0.0"
    }
