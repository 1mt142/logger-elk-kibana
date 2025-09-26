# NestJS ELK Stack Logging Project

## What's Happening?

This project demonstrates centralized logging using the ELK stack:

- **NestJS App** → Creates logs (`info`, `error`, `warn`)
- **Winston Logger** → Formats and sends logs to Elasticsearch
- **Elasticsearch** → Stores all logs in searchable format
- **Logstash** → Processes and transforms log data (optional)
- **Kibana** → Visualizes logs in web dashboard

**Flow:**  
App generates logs → Winston sends to Elasticsearch → View/search in Kibana

---

## Quick Start

### 1. Setup

```bash
# Clone and install dependencies
npm install
```

### 2. Start ELK Stack

```bash
docker-compose up -d
# Wait 2-3 minutes for services to start
```

Check if Elasticsearch is ready:

```bash
curl http://localhost:9200
```

### 3. Run Application

```bash
npm run start:dev
```

### 4. Generate Logs

```bash
# Normal log
curl http://localhost:3000

# Error log
curl http://localhost:3000/error

# Warning log
curl -X POST http://localhost:3000/user -H "Content-Type: application/json" -d '{"name":"John"}'
```

### 5. View Logs in Kibana

- Open: [http://localhost:5601](http://localhost:5601)
- Go to **Stack Management → Index Patterns**
- Create pattern: `nestjs-logs*`
- Go to **Discover** to see logs

---

## Project Structure

```
├── src/
│   ├── logger/
│   │   └── logger.service.ts      # Winston + Elasticsearch setup
│   ├── app.controller.ts          # Test endpoints
│   ├── app.module.ts              # Main module
│   └── main.ts                    # Bootstrap with logger
├── docker-compose.yml             # ELK stack setup
├── logstash.conf                  # Log processing config
└── package.json                   # Dependencies
```

---

## Key Files Explained

- **logger.service.ts**: Winston logger that sends logs to both console and Elasticsearch
- **docker-compose.yml**: Sets up Elasticsearch (9200), Kibana (5601), and Logstash (5044)
- **app.controller.ts**: Sample endpoints that generate different types of logs

---

## Services & Ports

| Service       | Port | Purpose           |
| ------------- | ---- | ----------------- |
| NestJS        | 3000 | Main application  |
| Elasticsearch | 9200 | Log storage       |
| Kibana        | 5601 | Log visualization |
| Logstash      | 5044 | Log processing    |

---

## Log Structure

Logs are stored as:

```json
{
  "timestamp": "2025-01-01T12:00:00.000Z",
  "level": "info",
  "message": "Hello endpoint accessed",
  "context": "AppController"
}
```

---

## Benefits

- **Centralized**: All logs in one place
- **Searchable**: Find logs by level, context, time
- **Scalable**: Handle logs from multiple services
- **Visual**: Charts and dashboards in Kibana
- **Real-time**: See logs as they happen

---

## Troubleshooting

- Wait 2-3 minutes for Elasticsearch to be ready
- Check `docker-compose` logs if services fail
- Ensure ports 3000, 5601, 9200 are available
