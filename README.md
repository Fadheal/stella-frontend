# Stella Frontend Prod

## Requirements
- Node.js 18 or newer  
- npm  
- Git  
- PM2 (installed automatically by the script)

## Installation

1. Clone the repository  
   ```bash
   git clone https://github.com/Fadheal/stella-frontend.git
   cd stella-frontend
   ```

2. Make the deploy script executable  
   ```bash
   chmod +x deploy.sh
   ```

3. Run the deployment  
   ```bash
   ./deploy.sh
   ```

4. Optional: enable PM2 auto-start  
   When prompted:  
   ```bash
   Do you want to enable PM2 startup on reboot? (y/n):
   ```
   Type `y` to enable auto-start on boot.

5. Access the app  
   Default port:  
   ```bash
   http://your-server-ip:3000
   ```

## Useful Commands
Restart app  
```bash
pm2 restart nextjs-app
```

View logs  
```bash
pm2 logs nextjs-app
```

Stop app  
```bash
pm2 stop nextjs-app
```

List running apps  
```bash
pm2 list
```

## Environment Variables
Create a `.env` file in the project root if needed:  
```bash
JWT_KEY=random_JWT_key
NEXT_PUBLIC_API_KEY=your_backend_key
```

## Notes
- The deploy script installs Node, npm, and PM2 automatically.  
- It builds the Next.js project before starting it.  
- PM2 keeps the app running in the background, even after reboot.  
