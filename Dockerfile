FROM node:18

WORKDIR /usr/src/app

# Copy everything from our directory into the work directory
COPY . .

RUN apt-get update
RUN apt-get install python3 -y && apt-get install python3-pip -y
RUN pip3 install PyYAML --break-system-packages
RUN python3 swagger-to-html.py < documentation/swaggerDoc.yaml > doc.html
RUN npm install -g pnpm


EXPOSE 3000

CMD [ "pnpm", "start"]