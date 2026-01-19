import React, { useState, useCallback } from 'react';
import {
  Network, Search, Shield, Globe, Server, AlertTriangle,
  CheckCircle, XCircle, Download, RefreshCw, Activity,
  Lock, FileCode, Mail, MapPin, Zap, ExternalLink, Calendar,
  Clock, Building, FileText, Bot, Link2, ShieldCheck, History, Archive, FolderOpen
} from 'lucide-react';
import { NetworkGraph } from './NetworkGraph';
import { DomainDashboard } from './DomainDashboard';
import { DNSRecordsTable } from './DNSRecordsTable';
import type {
  ScanResult, ScanProgress, GraphNode, Subdomain,
  Vulnerability, TechStack, SecurityHeader,
  ExtendedScanResult, WhoisData, RobotsTxtData,
  EmailSecurityData, WaybackSnapshot
} from './types';
import {
  getCrtShSubdomains, bruteforceSubdomains, getArchiveSubdomains,
  dnsLookup, checkSubdomainStatus, getIpInfo, detectTechnologies,
  analyzeSecurityHeaders, buildNetworkGraph, getWhoisData,
  analyzeRobotsTxt, checkEmailSecurity, detectSitemap, detectWAF,
  getWaybackSnapshots, getWaybackSummary, resolveSubdomainIPs,
  extractImportantHeaders
} from './reconUtils';
import { scanVulnerabilities, detectVulnerableLibraries, detectTechnologiesAdvanced, scanOpenDirectories } from './vulnScanner';

type TabId = 'subdomains' | 'vulnerabilities' | 'whois' | 'dns' | 'tech' | 'headers' | 'email' | 'robots' | 'wayback' | 'opendirs' | 'geo';

const TABS: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: 'subdomains', label: 'Subdomains', icon: Globe },
  { id: 'vulnerabilities', label: 'Vulnerabilities', icon: Shield },
  { id: 'whois', label: 'WHOIS', icon: FileText },
  { id: 'dns', label: 'DNS Records', icon: Server },
  { id: 'tech', label: 'Tech Stack', icon: FileCode },
  { id: 'headers', label: 'Security Headers', icon: Lock },
  { id: 'email', label: 'Email Security', icon: Mail },
  { id: 'robots', label: 'Robots & Sitemap', icon: Bot },
  { id: 'wayback', label: 'Wayback Machine', icon: History },
  { id: 'opendirs', label: 'Open Directories', icon: FolderOpen },
  { id: 'geo', label: 'Geolocation', icon: MapPin },
];



const DomainReconScanner: React.FC = () => {
  const [domain, setDomain] = useState('');
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState<ScanProgress>({ phase: '', progress: 0, message: '' });
  const [result, setResult] = useState<ExtendedScanResult | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>('subdomains');
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [error, setError] = useState('');

  const validateDomain = (d: string): boolean => {
    const pattern = /^([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
    return pattern.test(d);
  };

  const runScan = useCallback(async () => {
    const cleanDomain = domain.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '');

    if (!validateDomain(cleanDomain)) {
      setError('Please enter a valid domain (e.g., example.com)');
      return;
    }

    setError('');
    setScanning(true);
    setResult(null);
    setSelectedNode(null);

    const scanResult: ExtendedScanResult = {
      domain: cleanDomain,
      startTime: new Date().toISOString(),
      subdomains: [],
      vulnerabilities: [],
      techStack: [],
      securityHeaders: [],
      nodes: [],
      edges: [],
      dnsRecords: []
    };

    try {
      // Phase 1: WHOIS Lookup
      setProgress({ phase: 'WHOIS Lookup', progress: 5, message: 'Fetching domain registration data...' });
      scanResult.whois = await getWhoisData(cleanDomain);

      // Phase 2: DNS Records
      setProgress({ phase: 'DNS Records', progress: 15, message: 'Fetching DNS records...' });
      const [aRecords, aaaaRecords, mxRecords, nsRecords, txtRecords, cnameRecords] = await Promise.all([
        dnsLookup(cleanDomain, 'A'),
        dnsLookup(cleanDomain, 'AAAA'),
        dnsLookup(cleanDomain, 'MX'),
        dnsLookup(cleanDomain, 'NS'),
        dnsLookup(cleanDomain, 'TXT'),
        dnsLookup(cleanDomain, 'CNAME')
      ]);
      scanResult.dnsRecords = [...aRecords, ...aaaaRecords, ...mxRecords, ...nsRecords, ...txtRecords, ...cnameRecords];

      // Get IP info
      if (aRecords.length > 0) {
        const ipInfo = await getIpInfo(aRecords[0].value);
        if (ipInfo) {
          scanResult.ipInfo = {
            ip: aRecords[0].value,
            city: ipInfo.city,
            country: ipInfo.country,
            org: ipInfo.org,
            asn: ipInfo.asn
          };
        }
      }

      // Phase 3: Email Security
      setProgress({ phase: 'Email Security', progress: 25, message: 'Checking SPF, DMARC, MX records...' });
      scanResult.emailSecurity = await checkEmailSecurity(cleanDomain);

      // Phase 4: Subdomain Enumeration
      setProgress({ phase: 'Subdomain Discovery', progress: 35, message: 'Querying certificate transparency...' });
      const crtSubdomains = await getCrtShSubdomains(cleanDomain);

      setProgress({ phase: 'Subdomain Discovery', progress: 45, message: 'Brute forcing common subdomains...' });
      const bruteSubdomains = await bruteforceSubdomains(cleanDomain, (found) => {
        setProgress(p => ({ ...p, message: `Found ${found} subdomains via DNS...` }));
      });

      setProgress({ phase: 'Subdomain Discovery', progress: 55, message: 'Checking archive.org...' });
      const archiveSubdomains = await getArchiveSubdomains(cleanDomain);

      // Combine and deduplicate
      const allSubdomains = new Set([...crtSubdomains, ...bruteSubdomains, ...archiveSubdomains]);
      allSubdomains.add(cleanDomain);

      // Check status for each subdomain (limit to first 50 for performance)
      setProgress({ phase: 'Status Check', progress: 65, message: 'Checking subdomain status...' });
      const subdomainList: Subdomain[] = [];
      const subArray = Array.from(allSubdomains).slice(0, 50);

      for (let i = 0; i < subArray.length; i += 5) {
        const batch = subArray.slice(i, i + 5);
        const results = await Promise.all(
          batch.map(async (hostname) => {
            const status = await checkSubdomainStatus(hostname);
            const aRecs = await dnsLookup(hostname, 'A');
            return {
              hostname,
              ip: aRecs[0]?.value,
              status,
              source: crtSubdomains.includes(hostname) ? 'crt.sh' :
                      bruteSubdomains.includes(hostname) ? 'DNS' :
                      archiveSubdomains.includes(hostname) ? 'Archive.org' : 'Root'
            } as Subdomain;
          })
        );
        subdomainList.push(...results);
      }
      scanResult.subdomains = subdomainList;

      // Phase 5: IP Resolution & Analysis
      setProgress({ phase: 'IP Analysis', progress: 50, message: 'Resolving subdomain IPs...' });

      // Resolve IPs for all subdomains
      const uniqueSubdomainsMap = new Map<string, Subdomain>();
      subdomainList.forEach(s => uniqueSubdomainsMap.set(s.hostname, s));
      const uniqueSubdomainObjs = Array.from(uniqueSubdomainsMap.values());

      const resolvedSubdomains = await resolveSubdomainIPs(uniqueSubdomainObjs);

      // Get main IP info (if not already set from A records)
      if (!scanResult.ipInfo && aRecords.length > 0) {
        const ipInfo = await getIpInfo(aRecords[0].value);
        if (ipInfo) {
          scanResult.ipInfo = {
            ip: aRecords[0].value,
            city: ipInfo.city,
            country: ipInfo.country, // Use Code (US) not Name
            org: ipInfo.org,
            asn: ipInfo.asn
          };
        }
      }
      scanResult.subdomains = resolvedSubdomains; // Update with resolved IPs

      // Phase 6: Fetch main page for analysis
      setProgress({ phase: 'Page Analysis', progress: 75, message: 'Analyzing main page...' });
      let mainHtml = '';
      let mainHeaders: Headers | null = null;
      const startTime = Date.now();
      
      try {
        const pageRes = await fetch(`https://${cleanDomain}/`, { mode: 'cors' });
        mainHtml = await pageRes.text();
        mainHeaders = pageRes.headers;
        scanResult.responseTime = Date.now() - startTime;
      } catch {
        try {
          const pageRes = await fetch(`http://${cleanDomain}/`, { mode: 'cors' });
          mainHtml = await pageRes.text();
          mainHeaders = pageRes.headers;
          scanResult.responseTime = Date.now() - startTime;
        } catch {}
      }

      // Tech detection & WAF
      if (mainHeaders) {
        scanResult.techStack = detectTechnologies(mainHtml, mainHeaders);
        scanResult.securityHeaders = analyzeSecurityHeaders(mainHeaders);
        scanResult.waf = detectWAF(mainHeaders);
        // Advanced Wappalyzer-style detection
        scanResult.advancedTech = detectTechnologiesAdvanced(mainHtml, mainHeaders);
      }

      // Vulnerable JS libraries
      if (mainHtml) {
        const jsVulns = await detectVulnerableLibraries(mainHtml);
        scanResult.vulnerabilities.push(...jsVulns);
      }

      // Phase 6: Robots.txt & Sitemap
      setProgress({ phase: 'Robots & Sitemap', progress: 72, message: 'Analyzing robots.txt...' });
      scanResult.robotsTxt = await analyzeRobotsTxt(cleanDomain);
      scanResult.sitemaps = await detectSitemap(cleanDomain);

      // Phase 7: Wayback Machine
      setProgress({ phase: 'Wayback Machine', progress: 78, message: 'Fetching historical snapshots...' });
      const [waybackSnapshots, waybackSummary] = await Promise.all([
        getWaybackSnapshots(cleanDomain),
        getWaybackSummary(cleanDomain)
      ]);
      scanResult.waybackSnapshots = waybackSnapshots;
      scanResult.waybackSummary = waybackSummary;

      // Phase 8: Open Directory Scanning
      setProgress({ phase: 'Directory Scan', progress: 84, message: 'Scanning for open directories...' });
      scanResult.openDirectories = await scanOpenDirectories(cleanDomain);

      // Phase 9: Vulnerability Scanning
      setProgress({ phase: 'Vulnerability Scan', progress: 90, message: 'Running 30+ security checks...' });
      const vulns = await scanVulnerabilities(cleanDomain, mainHtml);
      scanResult.vulnerabilities.push(...vulns);

      // Phase 10: Build Graph
      setProgress({ phase: 'Building Graph', progress: 97, message: 'Generating visualization...' });
      const { nodes, edges } = buildNetworkGraph(cleanDomain, subdomainList, scanResult.vulnerabilities);
      scanResult.nodes = nodes;
      scanResult.edges = edges;

      scanResult.endTime = new Date().toISOString();
      setResult(scanResult);
      setProgress({ phase: 'Complete', progress: 100, message: 'Scan complete!' });

    } catch (err: any) {
      setError(err.message || 'Scan failed. Please try again.');
    } finally {
      setScanning(false);
    }
  }, [domain]);

  const exportJSON = () => {
    if (!result) return;
    const exportData = {
      ...result,
      exportedBy: 'VDesignU Domain Intelligence Scanner',
      exportedAt: new Date().toISOString(),
      version: '1.0'
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${result.domain.replace(/\./g, '_')}_vdesignu_report.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportCSV = () => {
    if (!result) return;
    const headers = ['Hostname', 'IP Address', 'Status', 'Source'];
    const rows = result.subdomains.map(s => [
      s.hostname,
      s.ip || 'N/A',
      s.status,
      s.source
    ]);
    const csvContent = [
      `# VDesignU Domain Intelligence Report`,
      `# Domain: ${result.domain}`,
      `# Generated: ${new Date().toISOString()}`,
      '',
      headers.join(','),
      ...rows.map(r => r.join(','))
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${result.domain.replace(/\./g, '_')}_vdesignu_subdomains.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'N/A';
    try {
      return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  const formatDays = (days?: number) => {
    if (!days) return 'N/A';
    if (days < 0) return 'Expired';
    if (days < 30) return `${days} days ⚠️`;
    if (days < 365) return `${Math.floor(days / 30)} months`;
    return `${Math.floor(days / 365)} years`;
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border-subtle)]">
        <form onSubmit={(e) => { e.preventDefault(); runScan(); }} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="Enter domain (e.g., example.com)"
              disabled={scanning}
              className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-xl px-4 py-4 pl-12 text-lg font-mono text-[var(--text-primary)] focus:border-[var(--accent-red)] focus:outline-none disabled:opacity-50"
            />
            <Network className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
          </div>
          <button
            type="submit"
            disabled={scanning || !domain.trim()}
            className="bg-[var(--accent-red)] text-white px-8 py-4 rounded-xl font-black uppercase tracking-tight text-lg hover:bg-black transition-all shadow-lg disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {scanning ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Scanning...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                Analyze
              </>
            )}
          </button>
        </form>
        
        {error && (
          <div className="mt-4 bg-red-500/10 border border-red-500/30 p-4 rounded-xl flex items-center gap-3 text-red-500">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <span className="font-bold">{error}</span>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      {scanning && (
        <div className="bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border-subtle)]">
          <div className="flex items-center justify-between mb-3">
            <span className="font-bold text-[var(--text-primary)]">{progress.phase}</span>
            <span className="text-[var(--text-muted)]">{progress.progress}%</span>
          </div>
          <div className="h-3 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[var(--accent-red)] to-[var(--accent-yellow)] transition-all duration-300"
              style={{ width: `${progress.progress}%` }}
            />
          </div>
          <p className="mt-3 text-sm text-[var(--text-muted)]">{progress.message}</p>
        </div>
      )}

      {/* Results */}
      {result && (
        <>
          {/* Dashboard Summary */}
          <DomainDashboard result={result} />

          {/* Network Graph */}
          <div className="bg-[var(--bg-card)] rounded-2xl p-1 border border-[var(--border-subtle)] overflow-hidden shadow-2xl">
            <div className="bg-[var(--bg-secondary)] px-4 py-2 border-b border-[var(--border-subtle)] flex justify-between items-center">
              <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Network Topology Map</span>
              <div className="flex gap-2">
                 <span className="text-[10px] bg-blue-500/20 text-blue-500 px-2 py-0.5 rounded border border-blue-500/30">Tree Layout</span>
              </div>
            </div>
            <NetworkGraph 
              nodes={result.nodes} 
              edges={result.edges}
              onNodeClick={setSelectedNode}
              height={600}
            />
          </div>

          {/* Tabs - Full Width */}
          <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] overflow-hidden">
            {/* Tab Headers */}
            <div className="flex overflow-x-auto border-b border-[var(--border-subtle)]">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-4 font-bold text-xs uppercase tracking-tight whitespace-nowrap flex items-center gap-2 transition-colors ${
                    activeTab === tab.id
                      ? 'text-[var(--accent-red)] border-b-2 border-[var(--accent-red)] bg-[var(--bg-secondary)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'subdomains' && <DNSRecordsTable subdomains={result.subdomains} />}
              {activeTab === 'vulnerabilities' && <VulnerabilitiesTab vulnerabilities={result.vulnerabilities} />}
              {activeTab === 'whois' && <WhoisTab whois={result.whois} />}
              {activeTab === 'dns' && <DNSTab records={result.dnsRecords} />}
              {activeTab === 'tech' && <TechStackTab techStack={result.techStack} advancedTech={result.advancedTech} />}
              {activeTab === 'headers' && <HeadersTab headers={result.securityHeaders} />}
              {activeTab === 'email' && <EmailSecurityTab data={result.emailSecurity} />}
              {activeTab === 'robots' && <RobotsTab robotsTxt={result.robotsTxt} sitemaps={result.sitemaps} />}
              {activeTab === 'wayback' && <WaybackTab snapshots={result.waybackSnapshots} summary={result.waybackSummary} domain={result.domain} />}
              {activeTab === 'opendirs' && <OpenDirsTab directories={result.openDirectories} domain={result.domain} />}
              {activeTab === 'geo' && <GeoTab ipInfo={result.ipInfo} />}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Sub-components
const StatCard: React.FC<{ label: string; value: number | string; icon: React.ElementType; color?: string; isText?: boolean }> = ({ label, value, icon: Icon, color = 'default', isText }) => (
  <div className="bg-[var(--bg-secondary)] rounded-xl p-4">
    <div className="flex items-center gap-2 mb-2">
      <Icon className={`w-4 h-4 ${color === 'green' ? 'text-green-500' : color === 'red' ? 'text-red-500' : 'text-[var(--text-muted)]'}`} />
      <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">{label}</span>
    </div>
    <div className={`${isText ? 'text-lg' : 'text-2xl'} font-black ${color === 'green' ? 'text-green-500' : color === 'red' ? 'text-red-500' : 'text-[var(--text-primary)]'}`}>
      {value}
    </div>
  </div>
);

const SubdomainsTab: React.FC<{ subdomains: Subdomain[] }> = ({ subdomains }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left text-[var(--text-muted)] uppercase text-xs tracking-wider">
          <th className="pb-4 pr-4">Hostname</th>
          <th className="pb-4 pr-4">IP Address</th>
          <th className="pb-4 pr-4">Status</th>
          <th className="pb-4">Source</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-[var(--border-subtle)]">
        {subdomains.map((sub, i) => (
          <tr key={i} className="hover:bg-[var(--bg-secondary)]">
            <td className="py-3 pr-4 font-mono font-bold text-[var(--text-primary)]">{sub.hostname}</td>
            <td className="py-3 pr-4 font-mono text-[var(--text-muted)]">{sub.ip || '-'}</td>
            <td className="py-3 pr-4">
              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${
                sub.status === 'live' ? 'bg-green-500/10 text-green-500' : 'bg-gray-500/10 text-gray-500'
              }`}>
                {sub.status === 'live' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                {sub.status}
              </span>
            </td>
            <td className="py-3 text-[var(--text-muted)]">{sub.source}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const VulnerabilitiesTab: React.FC<{ vulnerabilities: Vulnerability[] }> = ({ vulnerabilities }) => (
  <div className="space-y-4">
    {vulnerabilities.length === 0 ? (
      <div className="text-center py-12 text-[var(--text-muted)]">
        <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500" />
        <p className="font-bold">No vulnerabilities detected</p>
      </div>
    ) : (
      vulnerabilities.map((v, i) => (
        <div key={i} className="bg-[var(--bg-secondary)] rounded-xl p-5 border border-[var(--border-subtle)]">
          <div className="flex items-start justify-between mb-3">
            <div>
              <span className={`inline-block px-3 py-1 rounded-lg text-xs font-black uppercase ${
                v.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-500' :
                v.severity === 'HIGH' ? 'bg-orange-500/20 text-orange-500' :
                v.severity === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-500' :
                'bg-blue-500/20 text-blue-500'
              }`}>
                {v.severity}
              </span>
              <h4 className="mt-2 font-bold text-lg text-[var(--text-primary)]">{v.name}</h4>
            </div>
          </div>
          <p className="text-[var(--text-primary)] mb-3 leading-relaxed">{v.description}</p>
          {v.evidence && (
            <div className="bg-[var(--bg-secondary)] rounded-lg p-3 font-mono text-xs text-[var(--text-muted)] mb-3 border border-[var(--border-subtle)]">
              Evidence: {v.evidence}
            </div>
          )}
          <div className="text-sm">
            <span className="font-bold text-[var(--text-primary)]">Remediation:</span>
            <span className="text-[var(--text-muted)] ml-2">{v.remediation}</span>
          </div>
        </div>
      ))
    )}
  </div>
);

const WhoisTab: React.FC<{ whois: WhoisData | null | undefined }> = ({ whois }) => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
    {whois ? (
      <>
        <InfoCard label="Registrar" value={whois.registrar || 'N/A'} icon={Building} />
        <InfoCard label="Created" value={whois.creationDate ? new Date(whois.creationDate).toLocaleDateString() : 'N/A'} icon={Calendar} />
        <InfoCard label="Expires" value={whois.expirationDate ? new Date(whois.expirationDate).toLocaleDateString() : 'N/A'} icon={Clock} highlight={!!(whois.daysUntilExpiry && whois.daysUntilExpiry < 30)} />
        <InfoCard label="Domain Age" value={whois.domainAge ? `${Math.floor(whois.domainAge / 365)} years ${Math.floor((whois.domainAge % 365) / 30)} months` : 'N/A'} icon={Activity} />
        <InfoCard label="Days Until Expiry" value={whois.daysUntilExpiry?.toString() || 'N/A'} icon={AlertTriangle} highlight={!!(whois.daysUntilExpiry && whois.daysUntilExpiry < 30)} />
        <InfoCard label="DNSSEC" value={whois.dnssec || 'N/A'} icon={ShieldCheck} />
        <InfoCard label="Registrant Org" value={whois.registrantOrg || 'N/A'} icon={Building} />
        <InfoCard label="Registrant Country" value={whois.registrantCountry || 'N/A'} icon={MapPin} />
        <InfoCard label="Updated" value={whois.updatedDate ? new Date(whois.updatedDate).toLocaleDateString() : 'N/A'} icon={RefreshCw} />
        {whois.nameServers && whois.nameServers.length > 0 && (
          <div className="md:col-span-2 lg:col-span-3 bg-[var(--bg-secondary)] rounded-xl p-4">
            <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">Nameservers</div>
            <div className="flex flex-wrap gap-2">
              {whois.nameServers.map((ns, i) => (
                <span key={i} className="bg-[var(--bg-card)] border border-[var(--border-subtle)] px-3 py-1 rounded-lg font-mono text-sm text-[var(--text-primary)]">{ns}</span>
              ))}
            </div>
          </div>
        )}
      </>
    ) : (
      <div className="col-span-full text-center py-12 text-[var(--text-muted)]">
        <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>WHOIS data not available</p>
      </div>
    )}
  </div>
);

const InfoCard: React.FC<{ label: string; value: string; icon: React.ElementType; highlight?: boolean }> = ({ label, value, icon: Icon, highlight }) => (
  <div className={`bg-[var(--bg-secondary)] rounded-xl p-4 ${highlight ? 'border-2 border-red-500/50' : ''}`}>
    <div className="flex items-center gap-2 mb-2">
      <Icon className={`w-4 h-4 ${highlight ? 'text-red-500' : 'text-[var(--text-muted)]'}`} />
      <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">{label}</span>
    </div>
    <div className={`font-bold ${highlight ? 'text-red-500' : 'text-[var(--text-primary)]'}`}>{value}</div>
  </div>
);

const DNSTab: React.FC<{ records: { type: string; value: string; ttl?: number }[] }> = ({ records }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left text-[var(--text-muted)] uppercase text-xs tracking-wider">
          <th className="pb-4 pr-4">Type</th>
          <th className="pb-4 pr-4">Value</th>
          <th className="pb-4">TTL</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-[var(--border-subtle)]">
        {records.map((rec, i) => (
          <tr key={i} className="hover:bg-[var(--bg-secondary)]">
            <td className="py-3 pr-4">
              <span className="bg-[var(--accent-red)]/20 text-[var(--accent-red)] px-2 py-1 rounded font-bold text-xs">{rec.type}</span>
            </td>
            <td className="py-3 pr-4 font-mono text-[var(--text-primary)] break-all">{rec.value}</td>
            <td className="py-3 text-[var(--text-muted)]">{rec.ttl || '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const HeadersTab: React.FC<{ headers: SecurityHeader[] }> = ({ headers }) => (
  <div className="space-y-3">
    {headers.map((h, i) => (
      <div key={i} className={`flex items-center justify-between p-4 rounded-xl ${
        h.present ? 'bg-green-500/5 border border-green-500/20' : 'bg-red-500/5 border border-red-500/20'
      }`}>
        <div className="flex items-center gap-3">
          {h.present ? <CheckCircle className="w-5 h-5 text-green-500" /> : <XCircle className="w-5 h-5 text-red-500" />}
          <span className="font-bold text-[var(--text-primary)]">{h.name}</span>
        </div>
        <div className="text-right max-w-md">
          {h.value ? (
            <code className="text-xs bg-[var(--bg-card)] border border-[var(--border-subtle)] px-2 py-1 rounded text-[var(--text-muted)] break-all">
              {h.value.length > 50 ? h.value.slice(0, 50) + '...' : h.value}
            </code>
          ) : h.recommendation ? (
            <span className="text-xs text-red-400">{h.recommendation}</span>
          ) : null}
        </div>
      </div>
    ))}
  </div>
);

const TechStackTab: React.FC<{ techStack: TechStack[]; advancedTech?: { name: string; category: string; confidence: number; version?: string }[] }> = ({ techStack, advancedTech }) => {
  // Combine basic and advanced tech detection
  const allTech = [
    ...(advancedTech || []).map(t => ({ name: t.name, category: t.category, confidence: t.confidence, version: t.version })),
    ...techStack.filter(t => !advancedTech?.some(at => at.name.toLowerCase() === t.name.toLowerCase()))
  ].sort((a, b) => b.confidence - a.confidence);

  // Group by category
  const grouped = allTech.reduce((acc, tech) => {
    if (!acc[tech.category]) acc[tech.category] = [];
    acc[tech.category].push(tech);
    return acc;
  }, {} as Record<string, typeof allTech>);

  return (
    <div className="space-y-6">
      {Object.keys(grouped).length === 0 ? (
        <div className="text-center py-12 text-[var(--text-muted)]">
          <Server className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No technologies detected</p>
        </div>
      ) : (
        Object.entries(grouped).map(([category, techs]) => (
          <div key={category}>
            <h4 className="font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2">
              <FileCode className="w-4 h-4 text-[var(--accent-red)]" /> {category}
            </h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {techs.map((t, i) => (
                <div key={i} className="bg-[var(--bg-secondary)] rounded-xl p-4 border border-[var(--border-subtle)]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-[var(--text-primary)]">{t.name}</span>
                    {t.version && <span className="text-xs bg-[var(--accent-red)]/20 text-[var(--accent-red)] px-2 py-0.5 rounded-full font-bold">v{t.version}</span>}
                  </div>
                  <div className="h-1.5 bg-[var(--text-muted)]/20 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[var(--accent-red)] to-[var(--accent-yellow)]" style={{ width: `${t.confidence}%` }} />
                  </div>
                  <div className="text-xs text-[var(--text-muted)] mt-1">{t.confidence}% confidence</div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const EmailSecurityTab: React.FC<{ data?: EmailSecurityData }> = ({ data }) => (
  <div className="space-y-4">
    {data ? (
      <>
        <div className={`flex items-center justify-between p-4 rounded-xl ${data.hasSPF ? 'bg-green-500/5 border border-green-500/20' : 'bg-red-500/5 border border-red-500/20'}`}>
          <div className="flex items-center gap-3">
            {data.hasSPF ? <CheckCircle className="w-5 h-5 text-green-500" /> : <XCircle className="w-5 h-5 text-red-500" />}
            <span className="font-bold text-[var(--text-primary)]">SPF Record</span>
          </div>
          {data.spfRecord && <code className="text-xs bg-[var(--bg-card)] border border-[var(--border-subtle)] px-2 py-1 rounded text-[var(--text-muted)] max-w-lg truncate">{data.spfRecord}</code>}
        </div>
        <div className={`flex items-center justify-between p-4 rounded-xl ${data.hasDMARC ? 'bg-green-500/5 border border-green-500/20' : 'bg-red-500/5 border border-red-500/20'}`}>
          <div className="flex items-center gap-3">
            {data.hasDMARC ? <CheckCircle className="w-5 h-5 text-green-500" /> : <XCircle className="w-5 h-5 text-red-500" />}
            <span className="font-bold text-[var(--text-primary)]">DMARC Record</span>
          </div>
          {data.dmarcRecord && <code className="text-xs bg-[var(--bg-card)] border border-[var(--border-subtle)] px-2 py-1 rounded text-[var(--text-muted)] max-w-lg truncate">{data.dmarcRecord}</code>}
        </div>
        <div className={`flex items-center justify-between p-4 rounded-xl ${data.hasMX ? 'bg-green-500/5 border border-green-500/20' : 'bg-yellow-500/5 border border-yellow-500/20'}`}>
          <div className="flex items-center gap-3">
            {data.hasMX ? <CheckCircle className="w-5 h-5 text-green-500" /> : <AlertTriangle className="w-5 h-5 text-yellow-500" />}
            <span className="font-bold text-[var(--text-primary)]">MX Records ({data.mxRecords.length})</span>
          </div>
        </div>
        {data.mxRecords.length > 0 && (
          <div className="bg-[var(--bg-secondary)] rounded-xl p-4">
            <div className="flex flex-wrap gap-2">
              {data.mxRecords.map((mx, i) => (
                <span key={i} className="bg-[var(--bg-card)] border border-[var(--border-subtle)] px-3 py-1 rounded-lg font-mono text-sm text-[var(--text-primary)]">{mx}</span>
              ))}
            </div>
          </div>
        )}
      </>
    ) : (
      <div className="text-center py-12 text-[var(--text-muted)]">
        <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>Email security data not available</p>
      </div>
    )}
  </div>
);

const RobotsTab: React.FC<{ robotsTxt?: RobotsTxtData; sitemaps?: string[] }> = ({ robotsTxt, sitemaps }) => (
  <div className="space-y-6">
    <div>
      <h4 className="font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
        <Bot className="w-5 h-5" /> Robots.txt
      </h4>
      {robotsTxt?.exists ? (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-[var(--bg-secondary)] rounded-xl p-4">
              <div className="text-xs font-bold uppercase text-[var(--text-muted)] mb-2">Disallowed Paths ({robotsTxt.disallowedPaths.length})</div>
              <div className="flex flex-wrap gap-2">
                {robotsTxt.disallowedPaths.slice(0, 10).map((p, i) => (
                  <span key={i} className="bg-red-500/10 text-red-400 px-2 py-1 rounded font-mono text-xs">{p}</span>
                ))}
                {robotsTxt.disallowedPaths.length > 10 && <span className="text-[var(--text-muted)] text-xs">+{robotsTxt.disallowedPaths.length - 10} more</span>}
              </div>
            </div>
            <div className="bg-[var(--bg-secondary)] rounded-xl p-4">
              <div className="text-xs font-bold uppercase text-[var(--text-muted)] mb-2">User Agents ({robotsTxt.userAgents.length})</div>
              <div className="flex flex-wrap gap-2">
                {robotsTxt.userAgents.map((ua, i) => (
                  <span key={i} className="bg-blue-500/10 text-blue-400 px-2 py-1 rounded font-mono text-xs">{ua}</span>
                ))}
              </div>
            </div>
          </div>
          {robotsTxt.crawlDelay && (
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
              <span className="font-bold text-yellow-500">Crawl Delay: {robotsTxt.crawlDelay} seconds</span>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-4">
          <span className="text-yellow-500">No robots.txt found</span>
        </div>
      )}
    </div>

    <div>
      <h4 className="font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
        <Link2 className="w-5 h-5" /> Sitemaps
      </h4>
      {sitemaps && sitemaps.length > 0 ? (
        <div className="space-y-2">
          {sitemaps.map((sitemap, i) => (
            <a key={i} href={sitemap} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-green-500/5 border border-green-500/20 rounded-xl p-4 hover:bg-green-500/10 transition-colors">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="font-mono text-[var(--text-primary)]">{sitemap}</span>
              <ExternalLink className="w-4 h-4 text-[var(--text-muted)] ml-auto" />
            </a>
          ))}
        </div>
      ) : (
        <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-4">
          <span className="text-yellow-500">No sitemaps detected</span>
        </div>
      )}
    </div>
  </div>
);

const WaybackTab: React.FC<{ snapshots?: WaybackSnapshot[]; summary?: { firstSeen?: string; lastSeen?: string; totalSnapshots?: number } | null; domain: string }> = ({ snapshots, summary, domain }) => (
  <div className="space-y-6">
    {/* Summary Stats */}
    {summary && (
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-[var(--bg-secondary)] rounded-xl p-4">
          <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">First Archived</div>
          <div className="font-bold text-[var(--text-primary)]">{summary.firstSeen || 'Unknown'}</div>
        </div>
        <div className="bg-[var(--bg-secondary)] rounded-xl p-4">
          <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">Last Archived</div>
          <div className="font-bold text-[var(--text-primary)]">{summary.lastSeen || 'Unknown'}</div>
        </div>
        <div className="bg-[var(--bg-secondary)] rounded-xl p-4">
          <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">Total Pages</div>
          <div className="font-bold text-[var(--text-primary)]">{summary.totalSnapshots || 0}</div>
        </div>
      </div>
    )}

    {/* View on Wayback Machine */}
    <a
      href={`https://web.archive.org/web/*/${domain}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-3 bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 hover:bg-blue-500/20 transition-colors"
    >
      <Archive className="w-5 h-5 text-blue-500" />
      <span className="font-bold text-blue-500">View All Snapshots on Wayback Machine</span>
      <ExternalLink className="w-4 h-4 text-blue-500" />
    </a>

    {/* Snapshot Timeline */}
    <div>
      <h4 className="font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
        <History className="w-5 h-5" /> Historical Snapshots
      </h4>
      {snapshots && snapshots.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[var(--text-muted)] uppercase text-xs tracking-wider">
                <th className="pb-4 pr-4">Date</th>
                <th className="pb-4 pr-4">Status</th>
                <th className="pb-4 pr-4">Type</th>
                <th className="pb-4">View Archive</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              {snapshots.map((snap, i) => (
                <tr key={i} className="hover:bg-[var(--bg-secondary)]">
                  <td className="py-3 pr-4">
                    <span className="font-mono font-bold text-[var(--text-primary)]">{snap.displayDate}</span>
                  </td>
                  <td className="py-3 pr-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${
                      snap.statusCode === '200' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                    }`}>
                      {snap.statusCode || '200'}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-[var(--text-muted)]">
                    {snap.mimeType?.split(';')[0] || 'text/html'}
                  </td>
                  <td className="py-3">
                    <a
                      href={snap.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-400 font-bold"
                    >
                      View <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-6 text-center">
          <History className="w-12 h-12 mx-auto mb-4 text-yellow-500 opacity-50" />
          <p className="text-yellow-500">No historical snapshots found</p>
          <p className="text-sm text-[var(--text-muted)] mt-2">This domain may not have been archived by the Wayback Machine</p>
        </div>
      )}
    </div>
  </div>
);

const OpenDirsTab: React.FC<{ directories?: { path: string; files: string[] }[]; domain: string }> = ({ directories, domain }) => (
  <div className="space-y-6">
    {directories && directories.length > 0 ? (
      <>
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <div>
              <span className="font-bold text-red-500">{directories.length} Open Director{directories.length > 1 ? 'ies' : 'y'} Found!</span>
              <p className="text-sm text-[var(--text-muted)] mt-1">These directories expose files to anyone on the internet</p>
            </div>
          </div>
        </div>

        {directories.map((dir, i) => (
          <div key={i} className="bg-[var(--bg-secondary)] rounded-xl p-5 border border-red-500/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <FolderOpen className="w-5 h-5 text-red-500" />
                <a
                  href={`https://${domain}${dir.path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono font-bold text-[var(--text-primary)] hover:text-[var(--accent-red)] transition-colors"
                >
                  {dir.path}
                </a>
              </div>
              <a
                href={`https://${domain}${dir.path}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[var(--accent-red)]/10 text-[var(--accent-red)] px-3 py-1 rounded-lg text-sm font-bold hover:bg-[var(--accent-red)]/20 transition-colors"
              >
                Browse <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            
            {dir.files.length > 0 && (
              <div className="bg-[var(--bg-card)] rounded-lg p-4 border border-[var(--border-subtle)]">
                <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                  Exposed Files ({dir.files.length})
                </div>
                <div className="flex flex-wrap gap-2">
                  {dir.files.map((file, j) => (
                    <a
                      key={j}
                      href={`https://${domain}${dir.path}${file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[var(--bg-secondary)] px-3 py-1 rounded-lg font-mono text-xs text-[var(--text-primary)] hover:text-[var(--accent-red)] transition-colors"
                    >
                      {file}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </>
    ) : (
      <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-6 text-center">
        <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500" />
        <p className="font-bold text-green-500">No Open Directories Found</p>
        <p className="text-sm text-[var(--text-muted)] mt-2">Directory listing appears to be disabled (good security practice)</p>
      </div>
    )}
  </div>
);

const GeoTab: React.FC<{ ipInfo?: ScanResult['ipInfo'] }> = ({ ipInfo }) => (
  <div className="grid md:grid-cols-2 gap-6">
    {ipInfo ? (
      <>
        <div className="bg-[var(--bg-secondary)] rounded-xl p-6">
          <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">IP Address</div>
          <div className="font-mono text-2xl font-bold text-[var(--text-primary)]">{ipInfo.ip}</div>
        </div>
        <div className="bg-[var(--bg-secondary)] rounded-xl p-6">
          <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">Location</div>
          <div className="font-bold text-xl text-[var(--text-primary)]">{ipInfo.city}, {ipInfo.country}</div>
        </div>
        <div className="bg-[var(--bg-secondary)] rounded-xl p-6">
          <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">Organization</div>
          <div className="font-bold text-[var(--text-primary)]">{ipInfo.org || 'Unknown'}</div>
        </div>
        <div className="bg-[var(--bg-secondary)] rounded-xl p-6">
          <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">ASN</div>
          <div className="font-mono text-[var(--text-primary)]">{ipInfo.asn || 'Unknown'}</div>
        </div>
      </>
    ) : (
      <div className="col-span-full text-center py-12 text-[var(--text-muted)]">
        <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>No geolocation data available</p>
      </div>
    )}
  </div>
);

export default DomainReconScanner;
