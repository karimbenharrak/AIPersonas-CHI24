FROM python:3.9.17-alpine3.18

EXPOSE 8070

RUN apk update
RUN apk add make automake gcc g++ subversion python3-dev

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt
CMD ["gunicorn", "wsgi:app"]
