// Comprehensive Vulnerability Scanner with 30+ checks
import type { Vulnerability } from './types';

export interface VulnTemplate {
  id: string;
  name: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';
  description: string;
  remediation: string;
  category: string;
  check: (domain: string, html?: string) => Promise<{ vulnerable: boolean; evidence?: string }>;
}

// Helper to make safe fetch requests with timeout
async function safeFetch(url: string, options: RequestInit = {}, timeout = 5000): Promise<Response | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      mode: 'cors',
    });
    clearTimeout(timeoutId);
    return response;
  } catch {
    clearTimeout(timeoutId);
    return null;
  }
}

// Comprehensive vulnerability templates (30+)
export const vulnerabilityTemplates: VulnTemplate[] = [
  // ============ CRITICAL VULNERABILITIES ============
  {
    id: 'exposed-git',
    name: 'Exposed Git Repository',
    severity: 'CRITICAL',
    category: 'Sensitive Data',
    description: 'The .git directory is publicly accessible, potentially exposing source code and sensitive information.',
    remediation: 'Block access to .git directory in your web server configuration.',
    check: async (domain) => {
      const res = await safeFetch(`https://${domain}/.git/HEAD`);
      if (res && res.status === 200) {
        const text = await res.text();
        if (text.includes('ref:') || text.includes('refs/heads')) {
          return { vulnerable: true, evidence: 'Git HEAD file accessible' };
        }
      }
      return { vulnerable: false };
    }
  },
  {
    id: 'exposed-env',
    name: 'Exposed Environment File',
    severity: 'CRITICAL',
    category: 'Sensitive Data',
    description: 'The .env file is publicly accessible, potentially exposing API keys and credentials.',
    remediation: 'Block access to .env files in your web server configuration.',
    check: async (domain) => {
      const files = ['/.env', '/.env.local', '/.env.production', '/.env.backup'];
      for (const file of files) {
        const res = await safeFetch(`https://${domain}${file}`);
        if (res && res.status === 200) {
          const text = await res.text();
          if (text.includes('=') && (text.includes('KEY') || text.includes('SECRET') || text.includes('PASSWORD') || text.includes('DB_'))) {
            return { vulnerable: true, evidence: `Environment file found: ${file}` };
          }
        }
      }
      return { vulnerable: false };
    }
  },
  {
    id: 'exposed-config',
    name: 'Exposed Configuration Files',
    severity: 'CRITICAL',
    category: 'Sensitive Data',
    description: 'Configuration files with sensitive data are publicly accessible.',
    remediation: 'Block access to configuration files in your web server.',
    check: async (domain) => {
      const files = ['/config.php', '/wp-config.php.bak', '/configuration.php', '/settings.py', '/config.yml', '/database.yml'];
      for (const file of files) {
        const res = await safeFetch(`https://${domain}${file}`);
        if (res && res.status === 200) {
          const text = await res.text();
          if (text.includes('password') || text.includes('database') || text.includes('host')) {
            return { vulnerable: true, evidence: `Config file exposed: ${file}` };
          }
        }
      }
      return { vulnerable: false };
    }
  },
  {
    id: 'exposed-aws-keys',
    name: 'AWS Credentials Exposed',
    severity: 'CRITICAL',
    category: 'Sensitive Data',
    description: 'AWS access keys found in publicly accessible files.',
    remediation: 'Remove AWS credentials from public files and rotate compromised keys.',
    check: async (domain, html) => {
      if (html) {
        const awsKeyPattern = /AKIA[0-9A-Z]{16}/;
        if (awsKeyPattern.test(html)) {
          return { vulnerable: true, evidence: 'AWS Access Key ID found in HTML' };
        }
      }
      return { vulnerable: false };
    }
  },
  {
    id: 'sql-injection',
    name: 'Potential SQL Injection',
    severity: 'CRITICAL',
    category: 'Injection',
    description: 'Application may be vulnerable to SQL injection attacks.',
    remediation: 'Use parameterized queries and prepared statements.',
    check: async (domain) => {
      const res = await safeFetch(`https://${domain}/?id=1'`);
      if (res && res.status === 200) {
        const text = await res.text();
        if (text.toLowerCase().includes('sql') && (text.includes('syntax') || text.includes('mysql') || text.includes('query'))) {
          return { vulnerable: true, evidence: 'SQL error in response' };
        }
      }
      return { vulnerable: false };
    }
  },
  
  // ============ HIGH VULNERABILITIES ============
  {
    id: 'directory-listing',
    name: 'Directory Listing Enabled',
    severity: 'HIGH',
    category: 'Information Disclosure',
    description: 'Directory listing is enabled, exposing file structure to attackers.',
    remediation: 'Disable directory listing in your web server configuration.',
    check: async (domain) => {
      const paths = ['/uploads/', '/images/', '/assets/', '/files/', '/media/', '/backup/', '/data/', '/tmp/', '/logs/', '/admin/'];
      for (const path of paths) {
        const res = await safeFetch(`https://${domain}${path}`);
        if (res && res.status === 200) {
          const text = await res.text();
          if (text.includes('Index of') || text.includes('Directory listing') || text.includes('[To Parent Directory]')) {
            return { vulnerable: true, evidence: `Open directory at ${path}` };
          }
        }
      }
      return { vulnerable: false };
    }
  },
  {
    id: 'backup-files',
    name: 'Backup Files Exposed',
    severity: 'HIGH',
    category: 'Sensitive Data',
    description: 'Backup files are publicly accessible, potentially exposing sensitive data.',
    remediation: 'Remove or restrict access to backup files.',
    check: async (domain) => {
      const files = ['/backup.zip', '/backup.tar.gz', '/backup.sql', '/db.sql', '/site.zip', '/www.zip', '/public.zip', '/database.sql', '/dump.sql', '/.sql'];
      for (const file of files) {
        const res = await safeFetch(`https://${domain}${file}`, { method: 'HEAD' });
        if (res && res.status === 200) {
          return { vulnerable: true, evidence: `Backup file found: ${file}` };
        }
      }
      return { vulnerable: false };
    }
  },
  {
    id: 'cors-wildcard',
    name: 'CORS Wildcard Origin',
    severity: 'HIGH',
    category: 'Security Misconfiguration',
    description: 'CORS policy allows any origin, potentially exposing sensitive data.',
    remediation: 'Configure CORS to allow only trusted origins.',
    check: async (domain) => {
      const res = await safeFetch(`https://${domain}/`, {
        headers: { 'Origin': 'https://evil.com' }
      });
      if (res) {
        const acao = res.headers.get('access-control-allow-origin');
        if (acao === '*' || acao === 'https://evil.com') {
          return { vulnerable: true, evidence: `ACAO: ${acao}` };
        }
      }
      return { vulnerable: false };
    }
  },
  {
    id: 'admin-panel',
    name: 'Admin Panel Exposed',
    severity: 'HIGH',
    category: 'Access Control',
    description: 'Admin panel is publicly accessible without proper authentication.',
    remediation: 'Restrict admin panel access via IP, VPN, or additional authentication.',
    check: async (domain) => {
      const paths = ['/admin', '/admin/', '/administrator/', '/wp-admin/', '/admin.php', '/adminpanel/', '/cpanel/', '/manager/', '/backend/'];
      for (const path of paths) {
        const res = await safeFetch(`https://${domain}${path}`);
        if (res && (res.status === 200 || res.status === 401 || res.status === 403)) {
          const text = await res.text();
          if (text.includes('login') || text.includes('password') || text.includes('admin')) {
            return { vulnerable: true, evidence: `Admin panel at ${path}` };
          }
        }
      }
      return { vulnerable: false };
    }
  },
  {
    id: 'phpinfo',
    name: 'PHPInfo Exposed',
    severity: 'HIGH',
    category: 'Information Disclosure',
    description: 'PHP info page exposing server configuration details.',
    remediation: 'Remove or restrict access to phpinfo files.',
    check: async (domain) => {
      const paths = ['/phpinfo.php', '/info.php', '/test.php', '/i.php'];
      for (const path of paths) {
        const res = await safeFetch(`https://${domain}${path}`);
        if (res && res.status === 200) {
          const text = await res.text();
          if (text.includes('PHP Version') || text.includes('phpinfo()')) {
            return { vulnerable: true, evidence: `PHPInfo at ${path}` };
          }
        }
      }
      return { vulnerable: false };
    }
  },
  {
    id: 'source-maps',
    name: 'JavaScript Source Maps Exposed',
    severity: 'HIGH',
    category: 'Information Disclosure',
    description: 'Source maps expose original source code to attackers.',
    remediation: 'Remove source maps from production or restrict access.',
    check: async (domain, html) => {
      if (html) {
        const srcMapMatch = html.match(/\/\/# sourceMappingURL=([^\s"']+)/);
        if (srcMapMatch) {
          const mapUrl = srcMapMatch[1];
          if (!mapUrl.startsWith('data:')) {
            return { vulnerable: true, evidence: `Source map: ${mapUrl}` };
          }
        }
      }
      return { vulnerable: false };
    }
  },
  {
    id: 'svn-exposed',
    name: 'SVN Repository Exposed',
    severity: 'HIGH',
    category: 'Sensitive Data',
    description: 'SVN repository files are publicly accessible.',
    remediation: 'Block access to .svn directory.',
    check: async (domain) => {
      const res = await safeFetch(`https://${domain}/.svn/entries`);
      if (res && res.status === 200) {
        const text = await res.text();
        if (text.includes('dir') || /^\d+/.test(text)) {
          return { vulnerable: true, evidence: 'SVN entries file accessible' };
        }
      }
      return { vulnerable: false };
    }
  },
  
  // ============ MEDIUM VULNERABILITIES ============
  {
    id: 'debug-endpoints',
    name: 'Debug Endpoints Exposed',
    severity: 'MEDIUM',
    category: 'Information Disclosure',
    description: 'Debug or development endpoints are publicly accessible.',
    remediation: 'Disable or restrict access to debug endpoints in production.',
    check: async (domain) => {
      const paths = ['/debug', '/trace', '/actuator', '/actuator/health', '/actuator/env', '/_profiler', '/console', '/elmah.axd'];
      for (const path of paths) {
        const res = await safeFetch(`https://${domain}${path}`);
        if (res && res.status === 200) {
          return { vulnerable: true, evidence: `Debug endpoint: ${path}` };
        }
      }
      return { vulnerable: false };
    }
  },
  {
    id: 'missing-hsts',
    name: 'Missing HSTS Header',
    severity: 'MEDIUM',
    category: 'Security Headers',
    description: 'The site does not enforce HTTPS via Strict-Transport-Security header.',
    remediation: 'Add Strict-Transport-Security header with appropriate max-age.',
    check: async (domain) => {
      const res = await safeFetch(`https://${domain}/`);
      if (res) {
        const hsts = res.headers.get('strict-transport-security');
        if (!hsts) {
          return { vulnerable: true, evidence: 'HSTS header not present' };
        }
      }
      return { vulnerable: false };
    }
  },
  {
    id: 'missing-csp',
    name: 'Missing Content-Security-Policy',
    severity: 'MEDIUM',
    category: 'Security Headers',
    description: 'No CSP header, making the site vulnerable to XSS attacks.',
    remediation: 'Implement a Content-Security-Policy header.',
    check: async (domain) => {
      const res = await safeFetch(`https://${domain}/`);
      if (res) {
        const csp = res.headers.get('content-security-policy');
        if (!csp) {
          return { vulnerable: true, evidence: 'CSP header not present' };
        }
      }
      return { vulnerable: false };
    }
  },
  {
    id: 'missing-xframe',
    name: 'Clickjacking Vulnerable',
    severity: 'MEDIUM',
    category: 'Security Headers',
    description: 'Missing X-Frame-Options allows clickjacking attacks.',
    remediation: 'Add X-Frame-Options: DENY or SAMEORIGIN header.',
    check: async (domain) => {
      const res = await safeFetch(`https://${domain}/`);
      if (res) {
        const xframe = res.headers.get('x-frame-options');
        const csp = res.headers.get('content-security-policy');
        if (!xframe && (!csp || !csp.includes('frame-ancestors'))) {
          return { vulnerable: true, evidence: 'X-Frame-Options not set' };
        }
      }
      return { vulnerable: false };
    }
  },
  {
    id: 'insecure-cookies',
    name: 'Insecure Cookies',
    severity: 'MEDIUM',
    category: 'Session Management',
    description: 'Cookies missing Secure or HttpOnly flags.',
    remediation: 'Set Secure and HttpOnly flags on all sensitive cookies.',
    check: async (domain) => {
      const res = await safeFetch(`https://${domain}/`);
      if (res) {
        const cookies = res.headers.get('set-cookie');
        if (cookies && (!cookies.includes('Secure') || !cookies.includes('HttpOnly'))) {
          return { vulnerable: true, evidence: 'Cookies missing security flags' };
        }
      }
      return { vulnerable: false };
    }
  },
  {
    id: 'graphql-introspection',
    name: 'GraphQL Introspection Enabled',
    severity: 'MEDIUM',
    category: 'API Security',
    description: 'GraphQL introspection is enabled, exposing schema details.',
    remediation: 'Disable introspection in production.',
    check: async (domain) => {
      const paths = ['/graphql', '/api/graphql', '/v1/graphql'];
      for (const path of paths) {
        const res = await safeFetch(`https://${domain}${path}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: '{ __schema { types { name } } }' })
        });
        if (res && res.status === 200) {
          const text = await res.text();
          if (text.includes('__schema') || text.includes('types')) {
            return { vulnerable: true, evidence: `GraphQL at ${path}` };
          }
        }
      }
      return { vulnerable: false };
    }
  },
  {
    id: 'wordpress-readme',
    name: 'WordPress Version Exposed',
    severity: 'MEDIUM',
    category: 'Information Disclosure',
    description: 'WordPress readme.html exposes version information.',
    remediation: 'Remove or restrict access to readme.html.',
    check: async (domain) => {
      const res = await safeFetch(`https://${domain}/readme.html`);
      if (res && res.status === 200) {
        const text = await res.text();
        if (text.includes('WordPress') && text.includes('Version')) {
          const versionMatch = text.match(/Version\s+([\d.]+)/i);
          return { vulnerable: true, evidence: `WordPress ${versionMatch?.[1] || 'detected'}` };
        }
      }
      return { vulnerable: false };
    }
  },
  {
    id: 'exposed-logs',
    name: 'Log Files Exposed',
    severity: 'MEDIUM',
    category: 'Sensitive Data',
    description: 'Log files are publicly accessible.',
    remediation: 'Block access to log files.',
    check: async (domain) => {
      const files = ['/error.log', '/debug.log', '/access.log', '/app.log', '/logs/error.log', '/var/log/'];
      for (const file of files) {
        const res = await safeFetch(`https://${domain}${file}`);
        if (res && res.status === 200) {
          const text = await res.text();
          if (text.includes('[error]') || text.includes('Exception') || text.includes('Stack trace')) {
            return { vulnerable: true, evidence: `Log file: ${file}` };
          }
        }
      }
      return { vulnerable: false };
    }
  },
  
  // ============ LOW VULNERABILITIES ============
  {
    id: 'server-disclosure',
    name: 'Server Version Disclosure',
    severity: 'LOW',
    category: 'Information Disclosure',
    description: 'Server version is disclosed in HTTP headers.',
    remediation: 'Configure server to hide version information.',
    check: async (domain) => {
      const res = await safeFetch(`https://${domain}/`);
      if (res) {
        const server = res.headers.get('server');
        if (server && /\d+\.\d+/.test(server)) {
          return { vulnerable: true, evidence: `Server: ${server}` };
        }
      }
      return { vulnerable: false };
    }
  },
  {
    id: 'x-powered-by',
    name: 'X-Powered-By Header',
    severity: 'LOW',
    category: 'Information Disclosure',
    description: 'X-Powered-By header reveals technology stack.',
    remediation: 'Remove X-Powered-By header.',
    check: async (domain) => {
      const res = await safeFetch(`https://${domain}/`);
      if (res) {
        const xpb = res.headers.get('x-powered-by');
        if (xpb) {
          return { vulnerable: true, evidence: `X-Powered-By: ${xpb}` };
        }
      }
      return { vulnerable: false };
    }
  },
  {
    id: 'robots-secrets',
    name: 'Sensitive Paths in Robots.txt',
    severity: 'LOW',
    category: 'Information Disclosure',
    description: 'Robots.txt reveals sensitive paths.',
    remediation: 'Review and minimize sensitive paths in robots.txt.',
    check: async (domain) => {
      const res = await safeFetch(`https://${domain}/robots.txt`);
      if (res && res.status === 200) {
        const text = await res.text();
        const sensitivePatterns = ['admin', 'backup', 'private', 'secret', 'config', 'database', 'password'];
        for (const pattern of sensitivePatterns) {
          if (text.toLowerCase().includes(pattern)) {
            return { vulnerable: true, evidence: `Sensitive path: ${pattern}` };
          }
        }
      }
      return { vulnerable: false };
    }
  },
  {
    id: 'missing-permissions-policy',
    name: 'Missing Permissions-Policy',
    severity: 'LOW',
    category: 'Security Headers',
    description: 'No Permissions-Policy header to control browser features.',
    remediation: 'Add Permissions-Policy header.',
    check: async (domain) => {
      const res = await safeFetch(`https://${domain}/`);
      if (res) {
        const pp = res.headers.get('permissions-policy') || res.headers.get('feature-policy');
        if (!pp) {
          return { vulnerable: true, evidence: 'Permissions-Policy not set' };
        }
      }
      return { vulnerable: false };
    }
  },
  {
    id: 'api-keys-exposed',
    name: 'API Keys in HTML',
    severity: 'MEDIUM',
    category: 'Sensitive Data',
    description: 'API keys found in page source.',
    remediation: 'Move API keys to server-side or use environment variables.',
    check: async (domain, html) => {
      if (html) {
        const patterns = [
          /['"]?api[_-]?key['"]?\s*[:=]\s*['"][a-zA-Z0-9]{20,}['"]/i,
          /sk_live_[a-zA-Z0-9]{20,}/,
          /pk_live_[a-zA-Z0-9]{20,}/,
          /AIza[a-zA-Z0-9-_]{35}/,
        ];
        for (const pattern of patterns) {
          if (pattern.test(html)) {
            return { vulnerable: true, evidence: 'API key pattern detected' };
          }
        }
      }
      return { vulnerable: false };
    }
  },
];

// Comprehensive JavaScript Library CVE Database
export const jsLibraryCVEs: Record<string, { regex: RegExp; vulns: { version: string; cves: string[] }[] }> = {
  'jQuery': {
    regex: /jquery[\/\.\-@]([\d.]+)/i,
    vulns: [
      { version: '1.', cves: ['CVE-2011-4969', 'CVE-2012-6708', 'CVE-2015-9251'] },
      { version: '2.', cves: ['CVE-2015-9251', 'CVE-2019-11358'] },
      { version: '3.0', cves: ['CVE-2019-11358', 'CVE-2020-11022', 'CVE-2020-11023'] },
      { version: '3.1', cves: ['CVE-2019-11358', 'CVE-2020-11022', 'CVE-2020-11023'] },
      { version: '3.2', cves: ['CVE-2019-11358', 'CVE-2020-11022', 'CVE-2020-11023'] },
      { version: '3.3', cves: ['CVE-2019-11358', 'CVE-2020-11022', 'CVE-2020-11023'] },
      { version: '3.4', cves: ['CVE-2020-11022', 'CVE-2020-11023'] },
    ]
  },
  'Angular': {
    regex: /angular[\/\.\-@]([\d.]+)/i,
    vulns: [
      { version: '1.', cves: ['CVE-2019-10768', 'CVE-2020-7676', 'CVE-2022-25869'] },
    ]
  },
  'AngularJS': {
    regex: /angularjs[\/\.\-@]([\d.]+)/i,
    vulns: [
      { version: '1.', cves: ['CVE-2019-10768', 'CVE-2020-7676', 'CVE-2022-25869'] },
    ]
  },
  'React': {
    regex: /react[\/\.\-@]([\d.]+)/i,
    vulns: [
      { version: '0.', cves: ['CVE-2018-6341'] },
      { version: '15.', cves: ['CVE-2018-6341'] },
    ]
  },
  'Lodash': {
    regex: /lodash[\/\.\-@]([\d.]+)/i,
    vulns: [
      { version: '4.17.0', cves: ['CVE-2018-16487', 'CVE-2019-1010266'] },
      { version: '4.17.1', cves: ['CVE-2019-10744', 'CVE-2020-8203', 'CVE-2021-23337'] },
    ]
  },
  'Moment.js': {
    regex: /moment[\/\.\-@]([\d.]+)/i,
    vulns: [
      { version: '2.', cves: ['CVE-2022-24785', 'CVE-2022-31129'] },
    ]
  },
  'Underscore': {
    regex: /underscore[\/\.\-@]([\d.]+)/i,
    vulns: [
      { version: '1.', cves: ['CVE-2021-23358'] },
    ]
  },
  'Bootstrap': {
    regex: /bootstrap[\/\.\-@]([\d.]+)/i,
    vulns: [
      { version: '3.', cves: ['CVE-2018-14040', 'CVE-2018-14041', 'CVE-2018-14042', 'CVE-2019-8331'] },
      { version: '4.0', cves: ['CVE-2018-14040', 'CVE-2018-14042', 'CVE-2019-8331'] },
      { version: '4.1', cves: ['CVE-2018-14040', 'CVE-2019-8331'] },
      { version: '4.2', cves: ['CVE-2019-8331'] },
      { version: '4.3.0', cves: ['CVE-2019-8331'] },
    ]
  },
  'Vue.js': {
    regex: /vue[\/\.\-@]([\d.]+)/i,
    vulns: [
      { version: '2.', cves: ['CVE-2018-7732'] },
    ]
  },
  'Handlebars': {
    regex: /handlebars[\/\.\-@]([\d.]+)/i,
    vulns: [
      { version: '4.0', cves: ['CVE-2019-19919', 'CVE-2019-20920', 'CVE-2021-23369'] },
      { version: '4.1', cves: ['CVE-2019-19919', 'CVE-2019-20920', 'CVE-2021-23369'] },
      { version: '4.2', cves: ['CVE-2019-19919', 'CVE-2019-20920', 'CVE-2021-23369'] },
      { version: '4.3', cves: ['CVE-2019-19919', 'CVE-2019-20920', 'CVE-2021-23369'] },
      { version: '4.4', cves: ['CVE-2019-20920', 'CVE-2021-23369'] },
      { version: '4.5', cves: ['CVE-2019-20920', 'CVE-2021-23369'] },
      { version: '4.6', cves: ['CVE-2021-23369'] },
    ]
  },
};

// Wappalyzer-style technology detection patterns
export const techPatterns: Record<string, { html?: RegExp[]; headers?: Record<string, RegExp>; scripts?: RegExp[]; cookies?: string[]; meta?: Record<string, RegExp>; category: string }> = {
  'WordPress': {
    html: [/wp-content/i, /wp-includes/i, /<meta name=["']generator["'] content=["']WordPress/i],
    scripts: [/wp-content\/themes/i, /wp-content\/plugins/i],
    cookies: ['wordpress_logged_in', 'wp-settings'],
    category: 'CMS'
  },
  'Drupal': {
    html: [/Drupal\.settings/i, /drupal\.js/i],
    headers: { 'x-drupal-cache': /./ },
    category: 'CMS'
  },
  'Joomla': {
    html: [/\/media\/jui\/js/i, /Joomla!/i],
    meta: { 'generator': /Joomla/i },
    category: 'CMS'
  },
  'Shopify': {
    html: [/cdn\.shopify\.com/i, /Shopify\.theme/i],
    headers: { 'x-shopify-stage': /./ },
    category: 'E-commerce'
  },
  'WooCommerce': {
    html: [/woocommerce/i, /wc-cart/i],
    scripts: [/woocommerce/i],
    category: 'E-commerce'
  },
  'Magento': {
    html: [/Magento/i, /mage\/cookies/i],
    cookies: ['frontend', 'admin'],
    category: 'E-commerce'
  },
  'React': {
    html: [/data-reactroot/i, /react\.development\.js/i, /react\.production\.min\.js/i, /__REACT_DEVTOOLS_GLOBAL_HOOK__/i],
    scripts: [/react(-dom)?\.min\.js/i, /react\.js/i],
    category: 'Framework'
  },
  'Vue.js': {
    html: [/data-v-[a-f0-9]+/i, /Vue\.config/i],
    scripts: [/vue\.min\.js/i, /vue\.runtime/i],
    category: 'Framework'
  },
  'Angular': {
    html: [/ng-version/i, /ng-app/i, /angular\.min\.js/i],
    scripts: [/angular(-\d)?\.min\.js/i],
    category: 'Framework'
  },
  'Next.js': {
    html: [/__NEXT_DATA__/i, /_next\/static/i],
    scripts: [/_next\/static/i],
    category: 'Framework'
  },
  'Nuxt.js': {
    html: [/__NUXT__/i, /_nuxt\//i],
    scripts: [/_nuxt\//i],
    category: 'Framework'
  },
  'Express': {
    headers: { 'x-powered-by': /Express/i },
    category: 'Framework'
  },
  'jQuery': {
    html: [/jquery[\.-][\d.]+\.(?:min\.)?js/i],
    scripts: [/jquery[\.-][\d.]+\.(?:min\.)?js/i, /jquery\.min\.js/i],
    category: 'Library'
  },
  'Bootstrap': {
    html: [/bootstrap[\.-][\d.]+\.(?:min\.)?css/i],
    scripts: [/bootstrap[\.-][\d.]+\.(?:min\.)?js/i],
    category: 'CSS Framework'
  },
  'Tailwind CSS': {
    html: [/tailwindcss/i],
    category: 'CSS Framework'
  },
  'Nginx': {
    headers: { 'server': /nginx/i },
    category: 'Web Server'
  },
  'Apache': {
    headers: { 'server': /apache/i },
    category: 'Web Server'
  },
  'IIS': {
    headers: { 'server': /IIS/i },
    category: 'Web Server'
  },
  'Cloudflare': {
    headers: { 'cf-ray': /./, 'server': /cloudflare/i },
    category: 'CDN'
  },
  'AWS CloudFront': {
    headers: { 'x-amz-cf-id': /./, 'x-cache': /CloudFront/i },
    category: 'CDN'
  },
  'Fastly': {
    headers: { 'x-served-by': /cache/i, 'x-fastly-request-id': /./ },
    category: 'CDN'
  },
  'Akamai': {
    headers: { 'x-akamai-request-id': /./ },
    category: 'CDN'
  },
  'Google Analytics': {
    html: [/google-analytics\.com\/analytics\.js/i, /gtag\(/i, /UA-\d{6,}/i, /G-[A-Z0-9]+/i],
    scripts: [/googletagmanager\.com/i],
    category: 'Analytics'
  },
  'Google Tag Manager': {
    html: [/googletagmanager\.com\/gtm\.js/i, /GTM-[A-Z0-9]+/i],
    category: 'Analytics'
  },
  'Hotjar': {
    html: [/static\.hotjar\.com/i],
    scripts: [/hotjar\.com/i],
    category: 'Analytics'
  },
  'reCAPTCHA': {
    html: [/recaptcha/i, /grecaptcha/i],
    scripts: [/google\.com\/recaptcha/i],
    category: 'Security'
  },
  'hCaptcha': {
    html: [/hcaptcha/i],
    scripts: [/hcaptcha\.com/i],
    category: 'Security'
  },
  'PHP': {
    headers: { 'x-powered-by': /PHP/i },
    cookies: ['PHPSESSID'],
    category: 'Language'
  },
  'ASP.NET': {
    headers: { 'x-powered-by': /ASP\.NET/i, 'x-aspnet-version': /./ },
    cookies: ['ASP.NET_SessionId', '.AspNetCore.'],
    category: 'Language'
  },
  'Laravel': {
    cookies: ['laravel_session', 'XSRF-TOKEN'],
    html: [/laravel/i],
    category: 'Framework'
  },
  'Django': {
    cookies: ['csrftoken', 'sessionid'],
    html: [/django/i],
    category: 'Framework'
  },
  'Ruby on Rails': {
    headers: { 'x-powered-by': /Phusion Passenger/i },
    cookies: ['_rails_session'],
    category: 'Framework'
  },
};

export async function scanVulnerabilities(domain: string, html?: string): Promise<Vulnerability[]> {
  const findings: Vulnerability[] = [];
  
  for (const template of vulnerabilityTemplates) {
    try {
      const result = await template.check(domain, html);
      if (result.vulnerable) {
        findings.push({
          id: template.id,
          name: template.name,
          severity: template.severity,
          target: domain,
          description: template.description,
          remediation: template.remediation,
          evidence: result.evidence,
          timestamp: new Date().toISOString()
        });
      }
    } catch {
      // Skip failed checks
    }
  }
  
  return findings;
}

export async function detectVulnerableLibraries(html: string): Promise<Vulnerability[]> {
  const findings: Vulnerability[] = [];
  
  for (const [libName, libData] of Object.entries(jsLibraryCVEs)) {
    const match = html.match(libData.regex);
    if (match) {
      const version = match[1];
      for (const vuln of libData.vulns) {
        if (version.startsWith(vuln.version)) {
          findings.push({
            id: `js-${libName.toLowerCase()}-${version}`,
            name: `Vulnerable ${libName} ${version}`,
            severity: 'HIGH',
            target: libName,
            description: `${libName} version ${version} has known vulnerabilities: ${vuln.cves.join(', ')}`,
            remediation: `Update ${libName} to the latest version.`,
            evidence: vuln.cves.join(', '),
            timestamp: new Date().toISOString()
          });
          break;
        }
      }
    }
  }
  
  return findings;
}

// Wappalyzer-style technology detection
export function detectTechnologiesAdvanced(html: string, headers: Headers): { name: string; category: string; confidence: number; version?: string }[] {
  const detected: { name: string; category: string; confidence: number; version?: string }[] = [];
  
  for (const [techName, patterns] of Object.entries(techPatterns)) {
    let confidence = 0;
    let version: string | undefined;
    
    // Check HTML patterns
    if (patterns.html) {
      for (const regex of patterns.html) {
        const match = html.match(regex);
        if (match) {
          confidence += 30;
          if (match[1]) version = match[1];
        }
      }
    }
    
    // Check script patterns
    if (patterns.scripts) {
      for (const regex of patterns.scripts) {
        const match = html.match(regex);
        if (match) {
          confidence += 25;
          // Extract version from script URL if possible
          const versionMatch = html.match(new RegExp(regex.source.replace(/\(\[\\d\.\]\+\)/, '([\\d.]+)'), 'i'));
          if (versionMatch?.[1]) version = versionMatch[1];
        }
      }
    }
    
    // Check headers
    if (patterns.headers) {
      for (const [headerName, regex] of Object.entries(patterns.headers)) {
        const headerValue = headers.get(headerName);
        if (headerValue && regex.test(headerValue)) {
          confidence += 40;
          const versionMatch = headerValue.match(/[\d.]+/);
          if (versionMatch) version = versionMatch[0];
        }
      }
    }
    
    // Check meta tags
    if (patterns.meta) {
      for (const [metaName, regex] of Object.entries(patterns.meta)) {
        const metaMatch = html.match(new RegExp(`<meta[^>]+name=["']${metaName}["'][^>]+content=["']([^"']+)["']`, 'i'));
        if (metaMatch && regex.test(metaMatch[1])) {
          confidence += 35;
          const versionMatch = metaMatch[1].match(/[\d.]+/);
          if (versionMatch) version = versionMatch[0];
        }
      }
    }
    
    if (confidence > 0) {
      detected.push({
        name: techName,
        category: patterns.category,
        confidence: Math.min(confidence, 100),
        version
      });
    }
  }
  
  // Sort by confidence
  return detected.sort((a, b) => b.confidence - a.confidence);
}

// Open directory scanner
export async function scanOpenDirectories(domain: string): Promise<{ path: string; files: string[] }[]> {
  const openDirs: { path: string; files: string[] }[] = [];
  const pathsToCheck = [
    '/uploads/', '/images/', '/assets/', '/files/', '/media/', '/backup/', 
    '/data/', '/tmp/', '/logs/', '/admin/', '/private/', '/public/',
    '/documents/', '/docs/', '/downloads/', '/attachments/', '/content/',
    '/static/', '/resources/', '/includes/', '/lib/', '/vendor/'
  ];
  
  for (const path of pathsToCheck) {
    try {
      const res = await safeFetch(`https://${domain}${path}`);
      if (res && res.status === 200) {
        const text = await res.text();
        if (text.includes('Index of') || text.includes('Directory listing') || text.includes('[To Parent Directory]')) {
          // Extract file names from directory listing
          const files: string[] = [];
          const linkMatches = text.matchAll(/<a[^>]+href=["']([^"']+)["'][^>]*>/gi);
          for (const match of linkMatches) {
            const href = match[1];
            if (href && !href.startsWith('?') && !href.startsWith('/') && href !== '../') {
              files.push(href);
            }
          }
          openDirs.push({ path, files: files.slice(0, 20) }); // Limit to 20 files
        }
      }
    } catch {
      // Skip failed checks
    }
  }
  
  return openDirs;
}
