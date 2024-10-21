# 使用官方的 Node.js 作为基础镜像
FROM node:latest as build-stage

# 设置工作目录
WORKDIR /app

# 复制项目文件到工作目录
COPY . /app

# 安装依赖并构建应用
RUN npm install
RUN npm run build-only

# 使用Nginx作为基础镜像
FROM nginx:alpine

# 复制Vue应用的构建产物到Nginx默认的静态文件目录

COPY --from=build-stage /app/dist /usr/share/nginx/html


# 设置目录权限

# 暴露端口
EXPOSE 80

# 启动Nginx
CMD ["nginx", "-g", "daemon off;"]
