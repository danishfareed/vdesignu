// Types for Domain Recon Scanner
export interface GraphNode {
  id: string;
  type: 'root' | 'subdomain' | 'ip' | 's3bucket' | 'email' | 'technology';
  label: string;
  status: 'live' | 'dead' | 'vulnerable' | 'unknown';
  risk: 'critical' | 'high' | 'medium' | 'low' | 'none';
  data?: Record<string, any>;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

export interface GraphEdge {
  source: string | GraphNode;
  target: string | GraphNode;
  type: 'A_RECORD' | 'CNAME' | 'MX' | 'NS' | 'RESOLVES_TO' | 'REFERENCES' | 'CONTAINS';
}

export interface Subdomain {
  hostname: string;
  ip?: string;
  status: 'live' | 'dead' | 'unknown';
  source: string;
  dnsRecords?: DNSRecord[];
}

export interface DNSRecord {
  type: string;
  value: string;
  ttl?: number;
}

export interface Vulnerability {
  id: string;
  name: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';
  target: string;
  description: string;
  remediation: string;
  evidence?: string;
  timestamp: string;
}

export interface TechStack {
  category: string;
  name: string;
  version?: string;
  confidence: number;
  cves?: string[];
}

export interface SecurityHeader {
  name: string;
  present: boolean;
  value?: string;
  recommendation?: string;
  severity: 'good' | 'warning' | 'bad';
}

export interface ScanResult {
  domain: string;
  startTime: string;
  endTime?: string;
  subdomains: Subdomain[];
  vulnerabilities: Vulnerability[];
  techStack: TechStack[];
  securityHeaders: SecurityHeader[];
  nodes: GraphNode[];
  edges: GraphEdge[];
  dnsRecords: DNSRecord[];
  ipInfo?: {
    ip: string;
    city?: string;
    country?: string;
    org?: string;
    asn?: string;
  };
}

export interface ScanProgress {
  phase: string;
  progress: number;
  message: string;
}

export interface SSLInfo {
  valid: boolean;
  protocol?: string;
  issuer?: string;
}

export interface WhoisData {
  domainName: string;
  registrar?: string;
  registrarUrl?: string;
  creationDate?: string;
  expirationDate?: string;
  updatedDate?: string;
  nameServers?: string[];
  status?: string[] | string;
  dnssec?: string;
  registrantOrg?: string;
  registrantCountry?: string;
  daysUntilExpiry?: number;
  domainAge?: number;
}

export interface EmailSecurityData {
  hasSPF: boolean;
  spfRecord?: string;
  hasDMARC: boolean;
  dmarcRecord?: string;
  hasMX: boolean;
  mxRecords: string[];
}

export interface RobotsTxtData {
  exists: boolean;
  content?: string;
  userAgents: string[];
  disallowedPaths: string[];
  allowedPaths: string[];
  sitemaps: string[];
  crawlDelay?: number;
}

export interface WaybackSnapshot {
  timestamp: string;
  displayDate: string;
  url: string;
  statusCode?: string;
  mimeType?: string;
}

export interface ExtendedScanResult extends ScanResult {
  whois?: WhoisData | null;
  responseTime?: number;
  waf?: string | null;
  emailSecurity?: EmailSecurityData;
  robotsTxt?: RobotsTxtData;
  sitemaps?: string[];
  waybackSnapshots?: WaybackSnapshot[];
  waybackSummary?: { firstSeen?: string; lastSeen?: string; totalSnapshots?: number } | null;
  openDirectories?: any[]; // Keep any for now or define type
  advancedTech?: TechStack[];
}
