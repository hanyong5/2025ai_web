# nginx 이미지를 기반으로 사용 
# docker hub nginx
FROM nginx:latest

# 현재 디렉토리의 모든 파일을 컨테이너의 웹 루트에 복사
COPY . /usr/share/nginx/html

# Nginx 기본 포트 80 노출
EXPOSE 80