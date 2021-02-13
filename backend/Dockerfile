FROM python:3

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

WORKDIR /backend
COPY . .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt


