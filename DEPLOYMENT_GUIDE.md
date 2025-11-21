# Supplier Management System - Deployment Guide

## 🚀 Production Deployment Guide

This guide provides step-by-step instructions for deploying the Supplier Management System to production.

## 📋 Pre-Deployment Checklist

### ✅ Frontend Ready
- [x] All components completed and tested
- [x] Production build tested locally
- [x] Responsive design verified
- [x] Cross-browser compatibility confirmed
- [x] Performance optimizations applied

### 🔧 Backend Requirements
- [ ] API endpoints implemented
- [ ] Database schema created
- [ ] Authentication system integrated
- [ ] Error handling implemented
- [ ] Input validation added
- [ ] Security measures in place

## 🏗 Infrastructure Setup

### 1. Server Requirements

#### Minimum Specifications
- **CPU**: 2 cores
- **RAM**: 4GB
- **Storage**: 20GB SSD
- **OS**: Ubuntu 20.04 LTS or CentOS 8

#### Recommended Specifications
- **CPU**: 4 cores
- **RAM**: 8GB
- **Storage**: 50GB SSD
- **OS**: Ubuntu 22.04 LTS

### 2. Software Dependencies

#### Frontend (Static Files)
- **Web Server**: Nginx or Apache
- **Node.js**: 18+ (for build process)
- **SSL Certificate**: Let's Encrypt or commercial

#### Backend API
- **Runtime**: Node.js 18+ or Python 3.9+
- **Database**: PostgreSQL 14+ (recommended) or MySQL 8+
- **Cache**: Redis 6+ (optional but recommended)
- **Process Manager**: PM2 or systemd

## 🔧 Environment Configuration

### 1. Environment Variables

Create `.env.production` file:

```env
# API Configuration
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_API_VERSION=v1

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_ERROR_REPORTING=true

# Environment
VITE_ENVIRONMENT=production

# Security
VITE_ENABLE_HTTPS=true
```

### 2. Backend Environment Variables

```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/supplier_management
DATABASE_POOL_SIZE=10

# Security
JWT_SECRET=your-super-secure-jwt-secret
BCRYPT_ROUNDS=12
CORS_ORIGIN=https://yourdomain.com

# Email (for notifications)
SMTP_HOST=smtp.yourdomain.com
SMTP_PORT=587
SMTP_USER=noreply@yourdomain.com
SMTP_PASS=your-smtp-password

# File Upload
MAX_FILE_SIZE=10MB
UPLOAD_PATH=/var/uploads/suppliers

# Monitoring
SENTRY_DSN=your-sentry-dsn
LOG_LEVEL=info
```

## 🗄 Database Setup

### 1. PostgreSQL Installation

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib

# CentOS/RHEL
sudo dnf install postgresql postgresql-server postgresql-contrib
sudo postgresql-setup --initdb
sudo systemctl enable postgresql
sudo systemctl start postgresql
```

### 2. Database Creation

```sql
-- Connect as postgres user
sudo -u postgres psql

-- Create database and user
CREATE DATABASE supplier_management;
CREATE USER supplier_app WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE supplier_management TO supplier_app;

-- Exit psql
\q
```

### 3. Schema Migration

```sql
-- Run the complete schema from DEVELOPMENT_NOTES.md
-- This includes all tables, indexes, and relationships

-- Suppliers table
CREATE TABLE suppliers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(50),
  zip VARCHAR(20),
  country VARCHAR(100) DEFAULT 'USA',
  category VARCHAR(100),
  status VARCHAR(20) DEFAULT 'active',
  primary_contact VARCHAR(255),
  technical_contact VARCHAR(255),
  technical_email VARCHAR(255),
  technical_phone VARCHAR(20),
  parts_contact VARCHAR(255),
  parts_email VARCHAR(255),
  parts_phone VARCHAR(20),
  billing_contact VARCHAR(255),
  billing_email VARCHAR(255),
  billing_phone VARCHAR(20),
  website VARCHAR(255),
  tax_id VARCHAR(100),
  payment_terms VARCHAR(50) DEFAULT 'Net 30',
  join_date DATE DEFAULT CURRENT_DATE,
  last_order DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Continue with all other tables from DEVELOPMENT_NOTES.md...
```

## 🏗 Frontend Deployment

### 1. Build Process

```bash
# Install dependencies
npm install

# Create production build
npm run build

# Verify build
npm run preview
```

### 2. Nginx Configuration

Create `/etc/nginx/sites-available/supplier-management`:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Document Root
    root /var/www/supplier-management/dist;
    index index.html;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript;

    # Handle React Router
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API Proxy
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Static Assets Caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### 3. Enable Site

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/supplier-management /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### 4. SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

## 🔧 Backend Deployment

### 1. API Server Setup (Node.js Example)

```bash
# Create application directory
sudo mkdir -p /var/www/supplier-api
cd /var/www/supplier-api

# Clone or copy your backend code
# Install dependencies
npm install --production

# Create PM2 ecosystem file
```

Create `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [{
    name: 'supplier-api',
    script: 'server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    error_file: '/var/log/supplier-api/error.log',
    out_file: '/var/log/supplier-api/out.log',
    log_file: '/var/log/supplier-api/combined.log',
    time: true
  }]
};
```

### 2. Start API Server

```bash
# Install PM2 globally
sudo npm install -g pm2

# Start application
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 startup
pm2 startup
# Follow the instructions provided
```

## 📊 Monitoring & Logging

### 1. Application Monitoring

#### Install Monitoring Tools

```bash
# Install monitoring packages
npm install --save @sentry/node @sentry/tracing
```

#### Configure Sentry (Error Tracking)

```javascript
// In your backend server.js
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});
```

### 2. Log Management

#### Configure Log Rotation

Create `/etc/logrotate.d/supplier-management`:

```
/var/log/supplier-api/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 www-data www-data
    postrotate
        pm2 reloadLogs
    endscript
}
```

### 3. System Monitoring

#### Install System Monitoring

```bash
# Install htop and iotop
sudo apt install htop iotop

# Install and configure fail2ban
sudo apt install fail2ban
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

## 🔒 Security Configuration

### 1. Firewall Setup

```bash
# Configure UFW
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

### 2. Database Security

```bash
# Secure PostgreSQL
sudo -u postgres psql

-- Change default passwords
ALTER USER postgres PASSWORD 'secure_postgres_password';

-- Restrict connections
-- Edit /etc/postgresql/14/main/postgresql.conf
-- listen_addresses = 'localhost'

-- Edit /etc/postgresql/14/main/pg_hba.conf
-- local   all             all                                     md5
-- host    all             all             127.0.0.1/32            md5
```

### 3. Application Security

#### Rate Limiting (Express.js example)

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
});

app.use('/api/', limiter);
```

## 🚀 Deployment Script

Create `deploy.sh`:

```bash
#!/bin/bash

# Supplier Management System Deployment Script

set -e

echo "🚀 Starting deployment..."

# Variables
APP_DIR="/var/www/supplier-management"
API_DIR="/var/www/supplier-api"
BACKUP_DIR="/var/backups/supplier-management"

# Create backup
echo "📦 Creating backup..."
sudo mkdir -p $BACKUP_DIR
sudo tar -czf $BACKUP_DIR/backup-$(date +%Y%m%d-%H%M%S).tar.gz $APP_DIR

# Frontend deployment
echo "🎨 Deploying frontend..."
cd $APP_DIR
git pull origin main
npm install
npm run build

# Backend deployment
echo "🔧 Deploying backend..."
cd $API_DIR
git pull origin main
npm install --production

# Database migrations
echo "🗄 Running database migrations..."
npm run migrate

# Restart services
echo "🔄 Restarting services..."
pm2 reload all
sudo systemctl reload nginx

# Health check
echo "🏥 Running health check..."
sleep 5
curl -f http://localhost:3001/api/health || exit 1

echo "✅ Deployment completed successfully!"
```

Make it executable:

```bash
chmod +x deploy.sh
```

## 🧪 Testing in Production

### 1. Health Checks

Create health check endpoints:

```javascript
// Backend health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version
  });
});

// Database health check
app.get('/api/health/db', async (req, res) => {
  try {
    await db.query('SELECT 1');
    res.json({ status: 'healthy', database: 'connected' });
  } catch (error) {
    res.status(500).json({ status: 'unhealthy', database: 'disconnected' });
  }
});
```

### 2. Automated Testing

```bash
# Create test script
cat > test-production.sh << 'EOF'
#!/bin/bash

echo "🧪 Testing production deployment..."

# Test frontend
echo "Testing frontend..."
curl -f https://yourdomain.com || exit 1

# Test API health
echo "Testing API health..."
curl -f https://yourdomain.com/api/health || exit 1

# Test database connection
echo "Testing database..."
curl -f https://yourdomain.com/api/health/db || exit 1

echo "✅ All tests passed!"
EOF

chmod +x test-production.sh
```

## 📈 Performance Optimization

### 1. Database Optimization

```sql
-- Add indexes for better performance
CREATE INDEX CONCURRENTLY idx_suppliers_name_gin ON suppliers USING gin(to_tsvector('english', name));
CREATE INDEX CONCURRENTLY idx_suppliers_email ON suppliers(email);
CREATE INDEX CONCURRENTLY idx_suppliers_status ON suppliers(status);
CREATE INDEX CONCURRENTLY idx_suppliers_category ON suppliers(category);

-- Analyze tables
ANALYZE suppliers;
ANALYZE parts;
ANALYZE tags;
```

### 2. Caching Strategy

```javascript
// Redis caching example
const redis = require('redis');
const client = redis.createClient();

// Cache frequently accessed data
app.get('/api/suppliers', async (req, res) => {
  const cacheKey = `suppliers:${JSON.stringify(req.query)}`;
  
  try {
    const cached = await client.get(cacheKey);
    if (cached) {
      return res.json(JSON.parse(cached));
    }
    
    const suppliers = await getSuppliers(req.query);
    await client.setex(cacheKey, 300, JSON.stringify(suppliers)); // 5 min cache
    
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

## 🔄 Backup & Recovery

### 1. Database Backup

Create backup script `backup-db.sh`:

```bash
#!/bin/bash

BACKUP_DIR="/var/backups/database"
DATE=$(date +%Y%m%d_%H%M%S)
DB_NAME="supplier_management"

mkdir -p $BACKUP_DIR

# Create database backup
pg_dump -h localhost -U supplier_app $DB_NAME | gzip > $BACKUP_DIR/supplier_db_$DATE.sql.gz

# Keep only last 30 days of backups
find $BACKUP_DIR -name "supplier_db_*.sql.gz" -mtime +30 -delete

echo "Database backup completed: supplier_db_$DATE.sql.gz"
```

### 2. Automated Backups

```bash
# Add to crontab
sudo crontab -e

# Daily database backup at 2 AM
0 2 * * * /var/scripts/backup-db.sh

# Weekly full system backup
0 3 * * 0 /var/scripts/backup-system.sh
```

## 📞 Support & Maintenance

### 1. Monitoring Checklist

- [ ] Server resources (CPU, RAM, Disk)
- [ ] Application logs for errors
- [ ] Database performance
- [ ] SSL certificate expiration
- [ ] Backup completion
- [ ] Security updates

### 2. Maintenance Schedule

#### Daily
- Check application logs
- Monitor server resources
- Verify backup completion

#### Weekly
- Review performance metrics
- Check for security updates
- Test backup restoration

#### Monthly
- Update dependencies
- Review and rotate logs
- Performance optimization review

---

## 🏆 Deployment Complete!

Your Supplier Management System is now deployed and ready for production use. 

### 📋 Post-Deployment Checklist

- [ ] All services running correctly
- [ ] SSL certificates installed and working
- [ ] Database connections established
- [ ] Monitoring and logging configured
- [ ] Backups scheduled and tested
- [ ] Security measures in place
- [ ] Performance optimizations applied
- [ ] Health checks passing

### 🆘 Emergency Contacts

- **System Administrator**: [Your contact]
- **Database Administrator**: [DBA contact]
- **Development Team**: [Dev team contact]
- **Hosting Provider**: [Provider support]

### 📚 Additional Resources

- **Application Logs**: `/var/log/supplier-api/`
- **Nginx Logs**: `/var/log/nginx/`
- **Database Logs**: `/var/log/postgresql/`
- **Backup Location**: `/var/backups/supplier-management/`

Your Supplier Management System is now live and ready to serve your users!