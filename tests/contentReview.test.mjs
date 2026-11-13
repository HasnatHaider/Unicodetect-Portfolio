import test from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { companyContent } from "../src/utils/companyContent.js";
import { legalPolicies } from "../src/utils/legalPolicies.js";

const caseStudyDir = new URL("../src/caseStudies/projects/", import.meta.url);
const projectDetails = Object.fromEntries(
  await Promise.all(
    (await readdir(caseStudyDir)).map(async (slug) => [
      slug,
      (await import(new URL(`${slug}/detail.js`, caseStudyDir))).default,
    ]),
  ),
);

const readRepoFile = (relPath) =>
  readFile(new URL(`../${relPath}`, import.meta.url), "utf8");

test("Task 1: companyContent centralizes Lahore location, 2023 founding year, dual phone numbers, stats, and 5-step process", () => {
  assert.equal(companyContent.foundedYear, 2023);
  assert.equal(companyContent.officeUS, undefined);
  assert.equal(companyContent.locationLabel, "Based in Lahore, Pakistan");
  assert.match(companyContent.locationSummary, /Based in Lahore/i);
  assert.equal(companyContent.office.city, "Lahore");
  assert.equal(companyContent.office.country, "Pakistan");
  assert.equal(companyContent.office.phone, "+92 324 4559088");
  assert.equal(companyContent.consultationPhone, "+1 (415) 749-9364");
  assert.doesNotMatch(JSON.stringify(companyContent), /0324\s*4559088/);
  assert.doesNotMatch(JSON.stringify(companyContent), /New York|United States/i);
  assert.doesNotMatch(companyContent.description, /We excel in/i);
  assert.equal(companyContent.stats.length, 4);
  assert.equal(companyContent.deliveryProcess.length, 5);
});

test("Task 1: index.html, Footer.jsx, Contact.jsx, AboutUs.jsx, and legalPolicies.js remove US office claims and align phone/legal details", async () => {
  const indexHtml = await readRepoFile("index.html");
  assert.doesNotMatch(indexHtml, /New York/i);
  assert.match(indexHtml, /"addressLocality":\s*"Lahore"/);
  assert.match(indexHtml, /"addressRegion":\s*"Punjab"/);
  assert.match(indexHtml, /"addressCountry":\s*"PK"/);

  const footer = await readRepoFile("src/components/siteNavigation/Footer.jsx");
  assert.doesNotMatch(footer, /New York|United States/i);
  assert.match(footer, /companyContent\.locationLabel|Based in Lahore, Pakistan/);
  assert.doesNotMatch(footer, /0324\s*4559088/);
  const pakIdx = footer.indexOf("companyContent.office.phone");
  const usIdx = footer.indexOf("companyContent.consultationPhone");
  assert.ok(pakIdx !== -1 && usIdx !== -1 && pakIdx < usIdx, "Pakistan phone must appear before US consultation phone in Footer");

  const contact = await readRepoFile("src/pages/Contact.jsx");
  assert.doesNotMatch(contact, /contact-offices-section|Our Offices|officeUS|teams across key locations/i);
  assert.match(contact, /1 business day \(PKT\)/i);
  assert.doesNotMatch(contact, /0324\s*4559088/);

  const about = await readRepoFile("src/pages/AboutUs.jsx");
  assert.doesNotMatch(about, /United States|where innovation meets imagination|bring your ideas to life|8\+/i);
  assert.match(about, /companyContent\.foundedYear|2023/);
  assert.match(about, /Lahore, Pakistan/);

  const legalJson = JSON.stringify(legalPolicies);
  assert.doesNotMatch(legalJson, /servers in the United States/i);
  assert.match(legalJson, /Vercel/);
  assert.match(legalJson, /Google Analytics/);
  assert.match(legalJson, /Calendly/);
  assert.match(legalJson, /laws of Pakistan/i);
  assert.match(legalJson, /courts of Lahore/i);
  assert.match(legalJson, /UnicodeTech \(Pvt\) Ltd/);
});

test("Task 2: Homepage sections fix duplicate stats, AI badges, Listah quote, Mohsin (Mo), and concrete FAQ", async () => {
  const hero = await readRepoFile("src/components/homeSections/HomeHero.jsx");
  assert.doesNotMatch(hero, /8\+\s*Years/i);
  assert.match(hero, /View Case Studies/);

  const exp = await readRepoFile("src/components/homeSections/HomeExperience.jsx");
  assert.doesNotMatch(exp, /8\+\s*Years/i);
  assert.doesNotMatch(exp, /100\+/);

  const aiEng = await readRepoFile("src/components/homeSections/HomeAiEngineering.jsx");
  assert.doesNotMatch(aiEng, /IN DEVELOPMENT|In development/i);
  assert.match(aiEng, /INTERNAL PRODUCT · LAUNCHING 2027/);

  const trust = await readRepoFile("src/components/homeSections/HomeClientTrust.jsx");
  assert.doesNotMatch(trust, /great service, good communication/i);
  assert.match(trust, /Great service, clear communication, and reliable deadlines\./);

  const stories = await readRepoFile("src/components/homeSections/HomeSuccessStories.jsx");
  assert.match(stories, /Mohsin \(Mo\)/);

  const faq = await readRepoFile("src/components/homeSections/HomeFaq.jsx");
  assert.match(faq, /1–2 weeks|1-2 weeks/i);
  assert.match(faq, /weekly working demos/i);
});

test("Task 2: projectDetails structures all 6 case studies and restricts numeric metrics to Spin The Night and TaskHive Pro", async () => {
  const slugs = [
    "spin-the-night",
    "carecompass",
    "daily-digest",
    "contractor-connect",
    "task-hive",
    "iconic-beauti",
  ];
  for (const slug of slugs) {
    const item = projectDetails[slug];
    assert.ok(item, `Missing projectDetails for ${slug}`);
    assert.ok(item.client, `Missing client for ${slug}`);
    assert.ok(item.challenge, `Missing challenge for ${slug}`);
    assert.ok(item.role, `Missing role for ${slug}`);
    assert.ok(Array.isArray(item.built) && item.built.length > 0, `Missing built for ${slug}`);
    assert.ok(item.results, `Missing results for ${slug}`);
  }

  assert.deepEqual(projectDetails["spin-the-night"].metrics, [
    { value: "4.6★", label: "App Store rating" },
    { value: "20k+", label: "Active users" },
  ]);
  assert.deepEqual(projectDetails["task-hive"].metrics, [
    { value: "2.0", label: "Platform rating" },
    { value: "10k+", label: "Active users" },
  ]);

  for (const slug of ["carecompass", "daily-digest", "contractor-connect", "iconic-beauti"]) {
    assert.equal(projectDetails[slug].metrics, undefined, `Unexpected metrics on ${slug}`);
  }

  assert.match(JSON.stringify(projectDetails["spin-the-night"].review), /Mohsin \(Mo\)/);

  const bms = await readRepoFile("src/pages/BmsEcosystem.jsx");
  assert.doesNotMatch(bms, /seamless/i);
});

test("Task 3: Service pages remove unbacked numbers, soften HIPAA/SOC 2 claims, replace 8+ years and boilerplate notes, and show dual phones on Shopify CTA", async () => {
  const servicesPage = await readRepoFile("src/pages/ServicesPage.jsx");
  assert.doesNotMatch(servicesPage, /8\+\s*Yrs|Years in Business|\$10M\+|\$2M\+|4\.9-star|99\.98%|500k\+|1\.4M\+|SOC-2 compliant/i);
  assert.match(servicesPage, /Est\. 2023/);

  const serviceSections = await readRepoFile("src/components/professionalServiceSections/ServiceSections.jsx");
  assert.doesNotMatch(serviceSections, /An illustrative approach\. Your scope and milestones are defined\s+together\./i);

  const aiSpotlight = await readRepoFile("src/components/aiAgentsAutomationServiceSections/AiCaseStudySpotlight.jsx");
  assert.doesNotMatch(aiSpotlight, /67%|HIPAA-compliant/i);
  assert.match(aiSpotlight, /can design for HIPAA and SOC 2 requirements with your compliance team/i);

  const aiUseCases = await readRepoFile("src/components/aiAgentsAutomationServiceSections/AiUseCases.jsx");
  assert.doesNotMatch(aiUseCases, /67%|\+34%|120h\+/i);

  const aiWhy = await readRepoFile("src/components/aiAgentsAutomationServiceSections/AiWhyUnicodetechSection.jsx");
  assert.doesNotMatch(aiWhy, /\brobust\b/i);

  const apiBenefits = await readRepoFile("src/components/apiSystemsIntegrationServiceSections/ApiSystemsIntegrationBenefits.jsx");
  assert.match(apiBenefits, /can design for HIPAA and SOC 2 requirements with your compliance team/i);

  const apiFaq = await readRepoFile("src/components/apiSystemsIntegrationServiceSections/ApiSystemsIntegrationFaq.jsx");
  assert.match(apiFaq, /can design for HIPAA and SOC 2 requirements with your compliance team/i);

  const apiCaseStudy = await readRepoFile("src/components/apiSystemsIntegrationServiceSections/ApiSystemsIntegrationCaseStudy.jsx");
  assert.doesNotMatch(apiCaseStudy, /3\.1×|99\.9%|42%/);

  const mobileCaseStudy = await readRepoFile("src/components/mobileWebEngineeringServiceSections/MobileCaseStudy.jsx");
  assert.doesNotMatch(mobileCaseStudy, /3x Faster|98%\+|40%|\brobust\b/i);
  assert.match(mobileCaseStudy, /4\.6★/);
  assert.match(mobileCaseStudy, /20k\+/);

  const saasBeyond = await readRepoFile("src/components/saasDevelopmentServiceSections/SaasBeyondLaunch.jsx");
  assert.doesNotMatch(saasBeyond, /8\+\s*years/i);
  assert.match(saasBeyond, /Since 2023|Est\. 2023/i);

  const shopifyProof = await readRepoFile("src/components/shopifyEcommerceServiceSections/ShopifyOverviewProof.jsx");
  assert.doesNotMatch(shopifyProof, /\+32%|< 900ms/);

  const shopifyCta = await readRepoFile("src/components/shopifyEcommerceServiceSections/ShopifyCtaBanner.jsx");
  assert.match(shopifyCta, /companyContent\.office\.phone/);
  assert.match(shopifyCta, /companyContent\.consultationPhone/);
  assert.doesNotMatch(shopifyCta, /0324\s*4559088/);

  const webCaseStudy = await readRepoFile("src/components/webDevelopmentServiceSections/WebDevelopmentCaseStudy.jsx");
  assert.doesNotMatch(webCaseStudy, /34%|5x/);

  const wpCaseStudy = await readRepoFile("src/components/wordpressDevelopmentServiceSections/WordpressDevelopmentCaseStudy.jsx");
  assert.doesNotMatch(wpCaseStudy, /up from 31|0\.8s|2x/);

  const noRobustOrSeamlessFiles = [
    "src/components/apiSystemsIntegrationServiceSections/ApiSystemsIntegrationCapabilities.jsx",
    "src/components/apiSystemsIntegrationServiceSections/ApiSystemsIntegrationHero.jsx",
    "src/components/mobileWebEngineeringServiceSections/MobileCapabilities.jsx",
    "src/components/saasDevelopmentServiceSections/SaasSaasProductDevelopment.jsx",
    "src/components/shopifyEcommerceServiceSections/ShopifyCapabilities.jsx",
    "src/components/shopifyEcommerceServiceSections/ShopifyProcess.jsx",
    "src/components/webDevelopmentServiceSections/WebDevelopmentCapabilities.jsx",
    "src/components/webDevelopmentServiceSections/WebDevelopmentHero.jsx",
    "src/components/webDevelopmentServiceSections/WebDevelopmentMetrics.jsx",
    "src/components/webDevelopmentServiceSections/WebDevelopmentProcess.jsx",
    "src/components/wordpressDevelopmentServiceSections/WordpressDevelopmentBenefits.jsx",
    "src/components/wordpressDevelopmentServiceSections/WordpressDevelopmentStack.jsx",
  ];
  for (const rel of noRobustOrSeamlessFiles) {
    const content = await readRepoFile(rel);
    assert.doesNotMatch(content, /\b(robust|seamless)\b/i, `Found robust/seamless in ${rel}`);
  }
});
