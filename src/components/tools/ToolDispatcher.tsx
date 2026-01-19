import React from 'react';
import { Wrench } from 'lucide-react';
import LocalBusinessSchema from './structured-data/LocalBusinessSchema';
import FAQSchema from './structured-data/FAQSchema';
import UTMBuilder from './tracking-analytics/UTMBuilder';
import UAEVATCalculator from './gcc-compliance/UAEVATCalculator';
import SitemapGenerator from './sitemaps-robots/SitemapGenerator';
import MetaTagGenerator from './meta-tags/MetaTagGenerator';
import RobotsGenerator from './sitemaps-robots/RobotsGenerator';
import ProductSchema from './structured-data/ProductSchema';
import ArticleSchema from './structured-data/ArticleSchema';
import OrganizationSchema from './structured-data/OrganizationSchema';
import HowToSchema from './structured-data/HowToSchema';
import EventSchema from './structured-data/EventSchema';
import RedirectGenerator from './redirects-migrations/RedirectGenerator';
import SecurityHeaders from './security-headers/SecurityHeaders';
import CanonicalGenerator from './sitemaps-robots/CanonicalGenerator';
import SocialMetaGenerator from './meta-tags-social/SocialMetaGenerator';
import GA4EventGenerator from './tracking-analytics/GA4EventGenerator';
import BreadcrumbSchema from './structured-data/BreadcrumbSchema';
import ReviewSchema from './structured-data/ReviewSchema';
import VideoSchema from './structured-data/VideoSchema';
import MetaTagOptimizer from './meta-tags/MetaTagOptimizer';
import MetaRobotsBuilder from './meta-tags-social/MetaRobotsBuilder';
import ArabicMetaGenerator from './arabic-seo/ArabicMetaGenerator';
import FaviconGenerator from './meta-tags-social/FaviconGenerator';
import PWAManifest from './meta-tags-social/PWAManifest';
import BulkUrlMapper from './redirects-migrations/BulkUrlMapper';
import UTMValidator from './tracking-analytics/UTMValidator';
import CSPGenerator from './security-headers/CSPGenerator';
import GA4Ecommerce from './tracking-analytics/GA4Ecommerce';
import RTLAuditor from './arabic-seo/RTLAuditor';
import KSAVATCalculator from './gcc-compliance/KSAVATCalculator';
import BusinessNameChecker from './gcc-compliance/BusinessNameChecker';
import LicenseFeeEstimator from './gcc-compliance/LicenseFeeEstimator';
import HreflangGenerator from './arabic-seo/HreflangGenerator';
import SchemaValidator from './structured-data/SchemaValidator';
import RobotsPowerPack from './sitemaps-robots/RobotsPowerPack';
import JamstackRedirects from './redirects-migrations/JamstackRedirects';
import AdvancedSocialMeta from './meta-tags-social/AdvancedSocialMeta';
import ContentOptimizer from './content-copy/ContentOptimizer';
import AdvancedSecuritySuite from './security-headers/AdvancedSecuritySuite';
import AnalyticsPowerSuite from './tracking-analytics/AnalyticsPowerSuite';
import MigrationMastery from './redirects-migrations/MigrationMastery';
import AnalyticsStrategySuite from './tracking-analytics/AnalyticsStrategySuite';
import LocalBusinessAudit from './structured-data/LocalBusinessAudit';
import ArchitectureSuite from './content-copy/ArchitectureSuite';
import CrawlIntelligence from './sitemaps-robots/CrawlIntelligence';
import ContentStrategySuite from './content-copy/ContentStrategySuite';
import GCCComplianceSuite from './gcc-compliance/GCCComplianceSuite';
import ContentAnalysisSuite from './content-copy/ContentAnalysisSuite';
import EmailAuthoritySuite from './security-headers/EmailAuthoritySuite';
import ContentEditingSuite from './content-copy/ContentEditingSuite';
import AdvancedAssetSuite from './structured-data/AdvancedAssetSuite';
import PerformanceSuite from './performance/PerformanceSuite';
import ArabicPowerPack from './arabic-seo/ArabicPowerPack';
import VATInvoiceGenerator from './gcc-compliance/VATInvoiceGenerator';
import GCCMultiVATCalculator from './gcc-compliance/GCCMultiVATCalculator';
import TitleGenerator from './content-copy/TitleGenerator';
import DescriptionGenerator from './content-copy/DescriptionGenerator';
import BlogOutlineGenerator from './content-copy/BlogOutlineGenerator';
import ArabicTransliterator from './arabic-seo/ArabicTransliterator';
import DataLayerEcommerce from './tracking-analytics/DataLayerEcommerce';
import SPFGenerator from './security-headers/SPFGenerator';
import CTAGenerator from './content-copy/CTAGenerator';
import HeadingGenerator from './content-copy/HeadingGenerator';
import DMARCGenerator from './security-headers/DMARCGenerator';
import SERPChecker from './local-seo/SERPChecker';
import ReviewLinkGenerator from './local-seo/ReviewLinkGenerator';
import LocalSchemaGenerator from './local-seo/LocalSchemaGenerator';
import JSONFormatter from './formatters/JSONFormatter';
import XMLFormatter from './formatters/XMLFormatter';
import SQLFormatter from './formatters/SQLFormatter';
import YAMLFormatter from './formatters/YAMLFormatter';
import JSONToCSV from './formatters/JSONToCSV';
import CSVToJSON from './formatters/CSVToJSON';
import CurlToCode from './formatters/CurlToCode';
import HTMLMinifier from './formatters/HTMLMinifier';
import CSSMinifier from './formatters/CSSMinifier';
import JSMinifier from './formatters/JSMinifier';
import JWTDebugger from './formatters/JWTDebugger';
import RegexTester from './formatters/RegexTester';
import Base64Tool from './security/Base64Tool';
import HexTool from './security/HexTool';
import URLEncoder from './security/URLEncoder';
import HTMLEntityEncoder from './security/HTMLEntityEncoder';
import Base64URLTool from './security/Base64URLTool';
import HashGenerator from './security/HashGenerator';
import HMACGenerator from './security/HMACGenerator';
import PasswordGenerator from './security/PasswordGenerator';
import UUIDGenerator from './security/UUIDGenerator';
import WordCounter from './string/WordCounter';
import CaseConverter from './string/CaseConverter';
import LoremIpsumGenerator from './string/LoremIpsumGenerator';
import RemoveDuplicateLines from './string/RemoveDuplicateLines';
import StringReverser from './string/StringReverser';
import TextDiff from './string/TextDiff';
import SlugGenerator from './string/SlugGenerator';
import MarkdownToHTML from './string/MarkdownToHTML';
import TextReplacement from './string/TextReplacement';
import ASCIIArtGenerator from './string/ASCIIArtGenerator';
import UnicodeDetector from './string/UnicodeDetector';
import ImageCompressor from './image/ImageCompressor';
import ImageConverter from './image/ImageConverter';
import ImageCropper from './image/ImageCropper';
import ColorPicker from './image/ColorPicker';
import GradientGenerator from './css-ui/GradientGenerator';
import BoxShadowGenerator from './css-ui/BoxShadowGenerator';
import BorderRadiusGenerator from './css-ui/BorderRadiusGenerator';
import GlassmorphismGenerator from './css-ui/GlassmorphismGenerator';
import ClipPathGenerator from './css-ui/ClipPathGenerator';
import PixelRemConverter from './calculators/PixelRemConverter';
import AspectRatioCalculator from './calculators/AspectRatioCalculator';
import SocialMediaSizes from './calculators/SocialMediaSizes';
import SvgToPngConverter from './image/SvgToPngConverter';
import Base64ImageDecoder from './image/Base64ImageDecoder';
import EpochConverter from './math-network/EpochConverter';
import UnitConverter from './math-network/UnitConverter';
import IpAddressLookup from './math-network/IpAddressLookup';
import SubnetCalculator from './math-network/SubnetCalculator';
import ScientificCalculator from './math-network/ScientificCalculator';
import DiscountCalculator from './math-network/DiscountCalculator';
import IpConverter from './math-network/IpConverter';
import ColorConverter from './css-ui/ColorConverter';
import Base64Encoder from './security/Base64Encoder';
import UrlEntityEncoder from './security/UrlEntityEncoder';
import DomainReconScanner from './domain-tools/DomainReconScanner';

const COMPONENTS: Record<string, any> = {
  'localbusiness-schema': LocalBusinessSchema,
  'faq-schema': FAQSchema,
  'utm-builder': UTMBuilder,
  'uae-vat-calculator': UAEVATCalculator,
  'sitemap-generator': SitemapGenerator,
  'meta-tags-generator': MetaTagGenerator,
  'robots-txt-generator': RobotsGenerator,
  'product-schema': ProductSchema,
  'article-schema': ArticleSchema,
  'organization-schema': OrganizationSchema,
  'howto-schema': HowToSchema,
  'event-schema': EventSchema,
  'redirect-301': RedirectGenerator,
  'security-headers': SecurityHeaders,
  'canonical-tool': CanonicalGenerator,
  'opengraph-generator': SocialMetaGenerator,
  'twitter-card': SocialMetaGenerator,
  'ga4-event-naming': GA4EventGenerator,
  'breadcrumb-schema': BreadcrumbSchema,
  'review-schema': ReviewSchema,
  'video-schema': VideoSchema,
  'meta-tag-optimizer': MetaTagOptimizer,
  'meta-robots-builder': MetaRobotsBuilder,
  'arabic-meta-generator': ArabicMetaGenerator,
  'favicon-generator': FaviconGenerator,
  'pwa-manifest': PWAManifest,
  'bulk-url-mapper': BulkUrlMapper,
  'utm-validator': UTMValidator,
  'csp-generator': CSPGenerator,
  'ga4-ecommerce': GA4Ecommerce,
  'rtl-auditor': RTLAuditor,
  'ksa-vat-calculator': KSAVATCalculator,
  'business-name-checker': BusinessNameChecker,
  'license-fee-estimator': LicenseFeeEstimator,
  'hreflang-generator': HreflangGenerator,
  'schema-validator': SchemaValidator,
  'robots-validator': RobotsPowerPack,
  'robots-templates': RobotsPowerPack,
  'netlify-redirects': JamstackRedirects,
  'vercel-redirects': JamstackRedirects,
  'linkedin-meta': AdvancedSocialMeta,
  'pinterest-pins': AdvancedSocialMeta,
  'instagram-meta': AdvancedSocialMeta,
  'seo-title-generator': ContentOptimizer,
  'meta-description-generator': ContentOptimizer,
  'cors-generator': AdvancedSecuritySuite,
  'hsts-generator': AdvancedSecuritySuite,
  'ssl-checker': AdvancedSecuritySuite,
  'datalayer-forms': AnalyticsPowerSuite,
  'conversion-pixel': AnalyticsPowerSuite,
  'gtm-cheatsheet': AnalyticsPowerSuite,
  'htaccess-generator': MigrationMastery,
  'nginx-rewrite': MigrationMastery,
  'migration-checklist': MigrationMastery,
  'ga4-conversions': AnalyticsStrategySuite,
  'ga3-to-ga4': AnalyticsStrategySuite,
  'campaign-naming': AnalyticsStrategySuite,
  'localbusiness-audit': LocalBusinessAudit,
  'heading-optimizer': ArchitectureSuite,
  'dashboard-wizard': CrawlIntelligence,
  'dynamic-sitemap': CrawlIntelligence,
  'robots-breakage': CrawlIntelligence,
  'lsi-keyword-finder': ContentStrategySuite,
  'content-brief-generator': ContentStrategySuite,
  'ksa-cr-number-validator': GCCComplianceSuite,
  'arabic-keyword-transliteration': ArabicPowerPack,
  'gcc-data-protection-law-checker': GCCComplianceSuite,
  'keyword-density': ContentAnalysisSuite,
  'readability-checker': ContentAnalysisSuite,
  'sentiment-analyzer': ContentAnalysisSuite,
  'spf-dkim-dmarc-generator': EmailAuthoritySuite,
  'article-summarizer': ContentEditingSuite,
  'content-rewriter': ContentEditingSuite,
  'content-tone-adjuster': ContentEditingSuite,
  'uae-business-license-renewal-checker': GCCComplianceSuite,
  'gcc-trademark-search': GCCComplianceSuite,
  'arabic-content-sentiment-analyzer': ArabicPowerPack,
  'arabic-local-citation-builder': ArabicPowerPack,
  'arabic-google-my-business-post-generator': ArabicPowerPack,
  'http3-checker': EmailAuthoritySuite,
  'dnssec-checker': EmailAuthoritySuite,
  'ssl-comparison': EmailAuthoritySuite,
  'anchor-text': ContentStrategySuite,
  'arabic-benchmarking': ArabicPowerPack,
  'arabic-brand-checker': ArabicPowerPack,
  'arabic-intent': ArabicPowerPack,
  'arabic-intent-patterns': ArabicPowerPack,
  'arabic-keyword-planner': ArabicPowerPack,
  'arabic-seo-checklist': ArabicPowerPack,
  'arabic-stopwords': ArabicPowerPack,
  'arabic-transliteration': ArabicTransliterator,
  'blog-outline': BlogOutlineGenerator,
  'compliance-timeline': GCCComplianceSuite,
  'content-brief': ContentStrategySuite,
  'content-gap': ContentStrategySuite,
  'content-parity': ArabicPowerPack,
  'crawl-simulator': CrawlIntelligence,
  'cta-generator': CTAGenerator,
  'datalayer-ecommerce': DataLayerEcommerce,
  'description-generator': DescriptionGenerator,
  'dialect-selector': ArabicPowerPack,
  'dmarc-generator': DMARCGenerator,
  'email-auth-analyzer': EmailAuthoritySuite,
  'freezone-mainland': GCCComplianceSuite,
  'ga4-event-mapper': AnalyticsPowerSuite,
  'gcc-registration-checklist': GCCComplianceSuite,
  'gcc-vat-calculator': GCCMultiVATCalculator,
  'heading-generator': HeadingGenerator,
  'hreflang-arabic': ArabicPowerPack,
  'meta-generator': ContentOptimizer,
  'meta-width': ContentOptimizer,
  'msa-dialect-advisor': ArabicPowerPack,
  'pillar-content': ContentStrategySuite,
  'pricing-mapper': ArabicPowerPack,
  'product-description': ContentStrategySuite,
  'punycode-converter': ArabicPowerPack,
  'redirect-tester': MigrationMastery,
  'robots-generator': CrawlIntelligence,
  'rtl-meta-generator': ArabicPowerPack,
  'snippet-optimizer': ContentOptimizer,
  'spf-generator': SPFGenerator,
  'title-checker': ContentOptimizer,
  'title-generator': TitleGenerator,
  'uae-activity-selector': GCCComplianceSuite,
  'utm-best-practices': AnalyticsPowerSuite,
  'vat-invoice-template': VATInvoiceGenerator,
  'vat-return-calculator': GCCComplianceSuite,
  'vat-threshold': GCCComplianceSuite,
  'serp-checker': SERPChecker,
  'review-link-generator': ReviewLinkGenerator,
  'local-schema-generator': LocalSchemaGenerator,
  'json-formatter': JSONFormatter,
  'xml-formatter': XMLFormatter,
  'sql-formatter': SQLFormatter,
  'yaml-formatter': YAMLFormatter,
  'json-to-csv': JSONToCSV,
  'csv-to-json': CSVToJSON,
  'curl-to-code': CurlToCode,
  'html-minifier': HTMLMinifier,
  'css-minifier': CSSMinifier,
  'js-minifier': JSMinifier,
  'jwt-debugger': JWTDebugger,
  'regex-tester': RegexTester,
  'base64-encoder': Base64Encoder,
  'base64-tool': Base64Tool,
  'hex-converter': HexTool,
  'url-encoder': UrlEntityEncoder,
  'html-entity-encoder': HTMLEntityEncoder,
  'base64url-encoder': Base64URLTool,
  'hash-generator-md5': HashGenerator,
  'hash-generator-sha1': HashGenerator,
  'hash-generator-sha256': HashGenerator,
  'hash-generator-sha512': HashGenerator,
  'hash-generator-sha224': HashGenerator,
  'hash-generator-sha384': HashGenerator,
  'hmac-generator': HMACGenerator,
  'password-generator': PasswordGenerator,
  'uuid-generator': UUIDGenerator,
  'word-counter': WordCounter,
  'case-converter': CaseConverter,
  'lorem-ipsum-generator': LoremIpsumGenerator,
  'remove-duplicate-lines': RemoveDuplicateLines,
  'string-reverser': StringReverser,
  'text-diff': TextDiff,
  'slug-generator': SlugGenerator,
  'markdown-to-html': MarkdownToHTML,
  'text-replacement': TextReplacement,
  'ascii-art': ASCIIArtGenerator,
  'unicode-detector': UnicodeDetector,
  'image-compressor': ImageCompressor,
  'image-converter': ImageConverter,
  'image-cropper': ImageCropper,
  'color-picker': ColorPicker,
  'css-gradient-generator': GradientGenerator,
  'box-shadow-generator': BoxShadowGenerator,
  'border-radius-generator': BorderRadiusGenerator,
  'glassmorphism-generator': GlassmorphismGenerator,
  'clip-path-generator': ClipPathGenerator,
  'pixel-rem-converter': PixelRemConverter,
  'aspect-ratio-calculator': AspectRatioCalculator,
  'social-media-sizes': SocialMediaSizes,
  'svg-to-png': SvgToPngConverter,
  'base64-image': Base64ImageDecoder,
  'epoch-converter': EpochConverter,
  'unit-converter': UnitConverter,
  'ip-lookup': IpAddressLookup,
  'subnet-calculator': SubnetCalculator,
  'scientific-calculator': ScientificCalculator,
  'discount-calculator': DiscountCalculator,
  'ip-converter': IpConverter,
  'color-converter': ColorConverter,
  'domain-recon-scanner': DomainReconScanner
};

interface ToolDispatcherProps {
  slug: string;
  [key: string]: any;
}

const ToolDispatcher: React.FC<ToolDispatcherProps> = ({ slug, ...props }) => {
  const Component = COMPONENTS[slug];
  
  if (!Component) {
    return (
      <div className="bg-[var(--bg-card)] border-2 border-dashed border-[var(--border-subtle)] rounded-[3rem] p-24 text-center">
        <div className="w-24 h-24 rounded-3xl bg-[var(--accent-red)]/10 flex items-center justify-center text-[var(--accent-red)] mx-auto mb-8">
          <Wrench className="w-12 h-12" />
        </div>
        <h3 className="text-3xl font-black uppercase tracking-tight text-[var(--text-primary)] mb-4">
          Under Engineering
        </h3>
        <p className="text-xl text-[var(--text-secondary)] max-w-md mx-auto">
          We are currently building this tool for maximum precision. Check back in a few hours.
        </p>
      </div>
    );
  }

  return <Component {...props} />;
};

export default ToolDispatcher;
