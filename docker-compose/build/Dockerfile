FROM node:11
WORKDIR /code
COPY ./build/entrypoint.sh /root
RUN /bin/chmod +x /root/entrypoint.sh 
CMD [ "/root/entrypoint.sh"]
