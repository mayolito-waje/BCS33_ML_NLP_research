FROM node:16

RUN npm install -g pnpm

WORKDIR /app/frontend
COPY /frontend/package.json /frontend/pnpm-lock.yaml ./
RUN pnpm install

COPY /frontend/ ./
RUN pnpm build

WORKDIR /app/server
RUN mv ../frontend/dist .

FROM ubuntu:latest

COPY --from=0 /app/ /app/

RUN apt-get update && apt-get install -y \
    libenchant-2-dev \
    python3.9 \
    python3-pip

WORKDIR /app
COPY /requirements.txt ./

RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY ./ /app/

WORKDIR /app/server

RUN python3 -m nltk.downloader stopwords

ENV PYTHONPATH /app/
CMD ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "80"]
