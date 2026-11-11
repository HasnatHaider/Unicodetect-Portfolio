import { IMAGES } from "../../utils/Constant";
import { Film } from "lucide-react";
import {
  ServicesSection,
  ServicesToggle,
  SiteLink,
} from "../sharedUi/Interactive";
const HomeServices = () => {
  return (
    <ServicesSection
      className="layout-item home-services services-section layout-flex layout-boxed layout section-root is-loaded"
      id="services"
    >
      <div className="layout-inner is-loaded">
        <div className="layout-item home-services__layout layout-full layout-flex layout is-loaded">
          <div className="layout-item home-services__image width-custom content-block block-image">
            <div className="content-inner">
              <img
                loading="lazy"
                decoding="async"
                width="8"
                height="8"
                src={IMAGES.unicode_f7a0ebc7_0c17_42fb_868f_f8b7cfff7702}
                alt=""
              />
            </div>
          </div>
          <div className="layout-item home-services__our-services content-block block-heading">
            <div className="content-inner">
              <div className="heading">OUR SERVICES</div>
            </div>
          </div>
        </div>
        <div className="layout-item home-services__end-to-end-product-engineering-buil content-block block-heading">
          <div className="content-inner">
            <h3 className="heading">
              End-to-end product engineering, built to scale.
            </h3>
          </div>
        </div>
        <div className="layout-item home-services__layout-2 layout-full layout-grid services-grid layout is-loaded">
          <SiteLink
            className="layout-item home-services__layout-3 layout-full layout-transform service-card layout-flex layout is-loaded"
            href="/ai-agents-automation"
          >
            <div className="layout-item home-services__icon ui-view-default content-block">
              <div className="content-inner">
                <div className="icon-wrapper">
                  <div className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="45"
                      height="45"
                      viewBox="0 0 40 40"
                      fill="none"
                    >
                      <rect
                        width="50"
                        height="50"
                        rx="10"
                        fill="#050609"
                        fillOpacity="0.72"
                      ></rect>
                      <rect
                        x="0.625"
                        y="0.625"
                        width="38.75"
                        height="38.75"
                        rx="9.375"
                        stroke="#F55733"
                        strokeOpacity="0.95"
                        strokeWidth="1.25"
                      ></rect>
                      <path
                        d="M20 12.5L21.4 16.1L25 17.5L21.4 18.9L20 22.5L18.6 18.9L15 17.5L18.6 16.1L20 12.5Z"
                        stroke="#F55733"
                        strokeWidth="1.6"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M25.5 22.5L26.2 24.3L28 25L26.2 25.7L25.5 27.5L24.8 25.7L23 25L24.8 24.3L25.5 22.5Z"
                        stroke="#F55733"
                        strokeWidth="1.4"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="layout-item home-services__ai-agents-automation content-block block-heading">
              <div className="content-inner">
                <h5 className="heading">AI Agents &amp; Automation</h5>
              </div>
            </div>
            <div className="layout-item home-services__voice-ai-intelligent-workflows-cop content-block block-heading">
              <div className="content-inner">
                <p className="heading">
                  Voice AI, intelligent workflows, copilots and integrations
                  built for real business operations.
                </p>
              </div>
            </div>
          </SiteLink>
          <SiteLink
            className="layout-item home-services__layout-4 layout-full service-card layout-transform layout-flex layout is-loaded"
            href="/saas-development"
          >
            <div className="layout-item home-services__icon-2 ui-view-default content-block">
              <div className="content-inner">
                <div className="icon-wrapper">
                  <div className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="45"
                      height="45"
                      viewBox="0 0 40 40"
                      fill="none"
                    >
                      <rect
                        width="50"
                        height="50"
                        rx="10"
                        fill="#050609"
                        fillOpacity="0.72"
                      ></rect>
                      <rect
                        x="0.625"
                        y="0.625"
                        width="38.75"
                        height="38.75"
                        rx="9.375"
                        stroke="#F55733"
                        strokeOpacity="0.95"
                        strokeWidth="1.25"
                      ></rect>
                      <path
                        d="M20 13L27 16.5L20 20L13 16.5L20 13Z"
                        stroke="#F55733"
                        strokeWidth="1.6"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M13 20L20 23.5L27 20"
                        stroke="#F55733"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      ></path>
                      <path
                        d="M13 23.5L20 27L27 23.5"
                        stroke="#F55733"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="layout-item home-services__saas-development content-block block-heading">
              <div className="content-inner">
                <h5 className="heading">SaaS Development</h5>
              </div>
            </div>
            <div className="layout-item home-services__multi-tenant-platforms-dashboards content-block block-heading">
              <div className="content-inner">
                <p className="heading">
                  Multi-tenant platforms, dashboards, billing and operational
                  systems engineered to scale.
                </p>
              </div>
            </div>
          </SiteLink>
          <SiteLink
            className="layout-item home-services__layout-5 layout-full service-card layout-transform layout-flex layout is-loaded"
            href="/mobile-web-engineering"
          >
            <div className="layout-item home-services__icon-3 ui-view-default content-block">
              <div className="content-inner">
                <div className="icon-wrapper">
                  <div className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="45"
                      height="45"
                      viewBox="0 0 40 40"
                      fill="none"
                    >
                      <rect
                        width="50"
                        height="50"
                        rx="10"
                        fill="#050609"
                        fillOpacity="0.72"
                      ></rect>
                      <rect
                        x="0.625"
                        y="0.625"
                        width="38.75"
                        height="38.75"
                        rx="9.375"
                        stroke="#F55733"
                        strokeOpacity="0.95"
                        strokeWidth="1.25"
                      ></rect>
                      <path
                        d="M22 12.5H18C16.8954 12.5 16 13.3954 16 14.5V25.5C16 26.6046 16.8954 27.5 18 27.5H22C23.1046 27.5 24 26.6046 24 25.5V14.5C24 13.3954 23.1046 12.5 22 12.5Z"
                        stroke="#F55733"
                        strokeWidth="1.6"
                      ></path>
                      <path
                        d="M18.5 15H21.5"
                        stroke="#F55733"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      ></path>
                      <path
                        d="M20 25.8C20.4418 25.8 20.8 25.4418 20.8 25C20.8 24.5581 20.4418 24.2 20 24.2C19.5581 24.2 19.2 24.5581 19.2 25C19.2 25.4418 19.5581 25.8 20 25.8Z"
                        fill="#F55733"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="layout-item home-services__mobile-web-engineering content-block block-heading">
              <div className="content-inner">
                <h5 className="heading">Mobile &amp; Web Engineering</h5>
              </div>
            </div>
            <div className="layout-item home-services__high-performance-apps-and-responsive content-block block-heading">
              <div className="content-inner">
                <p className="heading">
                  High-performance apps and responsive product experiences
                  across web, iOS, and Android.
                </p>
              </div>
            </div>
          </SiteLink>
          <SiteLink
            className="layout-item home-services__layout-6 layout-full service-card layout-transform layout-flex layout is-loaded"
            href="/shopify-e-commerce"
          >
            <div className="layout-item home-services__icon-4 ui-view-default content-block">
              <div className="content-inner">
                <div className="icon-wrapper">
                  <div className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="45"
                      height="45"
                      viewBox="0 0 40 40"
                      fill="none"
                    >
                      <rect
                        width="40"
                        height="40"
                        rx="10"
                        fill="#050609"
                        fillOpacity="0.72"
                      ></rect>
                      <rect
                        x="0.625"
                        y="0.625"
                        width="38.75"
                        height="38.75"
                        rx="9.375"
                        stroke="#F55733"
                        strokeOpacity="0.95"
                        strokeWidth="1.25"
                      ></rect>
                      <path
                        d="M15 16.5H25L26 27H14L15 16.5Z"
                        stroke="#F55733"
                        strokeWidth="1.6"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M17.5 17V15.5C17.5 14.1 18.6 13 20 13C21.4 13 22.5 14.1 22.5 15.5V17"
                        stroke="#F55733"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="layout-item home-services__shopify-e-commerce content-block block-heading">
              <div className="content-inner">
                <h5 className="heading">Shopify &amp; E-commerce</h5>
              </div>
            </div>
            <div className="layout-item home-services__conversion-focused-shopify-stores-c content-block block-heading">
              <div className="content-inner">
                <p className="heading">
                  Conversion-focused Shopify stores, custom sections,
                  integrations and scalable commerce experiences.
                </p>
              </div>
            </div>
          </SiteLink>
          <SiteLink
            href="/ui-ux-design"
            className="layout-item home-services__layout-7 layout-full service-card layout-transform layout-flex layout is-loaded"
          >
            <div className="layout-item home-services__icon-5 ui-view-default content-block">
              <div className="content-inner">
                <div className="icon-wrapper">
                  <div className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="45"
                      height="45"
                      viewBox="0 0 40 40"
                      fill="none"
                    >
                      <rect
                        width="40"
                        height="40"
                        rx="10"
                        fill="#050609"
                        fillOpacity="0.72"
                      ></rect>
                      <rect
                        x="0.625"
                        y="0.625"
                        width="38.75"
                        height="38.75"
                        rx="9.375"
                        stroke="#F55733"
                        strokeOpacity="0.95"
                        strokeWidth="1.25"
                      ></rect>
                      <path
                        d="M14 25.5L18.2 24.6L25.7 17.1L22.9 14.3L15.4 21.8L14 25.5Z"
                        stroke="#F55733"
                        strokeWidth="1.6"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M21.7998 15.3999L24.5998 18.1999"
                        stroke="#F55733"
                        strokeWidth="1.6"
                      ></path>
                      <path
                        d="M14 27H26"
                        stroke="#F55733"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="layout-item home-services__ui-ux-design content-block block-heading">
              <div className="content-inner">
                <h5 className="heading">UI/UX Design</h5>
              </div>
            </div>
            <div className="layout-item home-services__research-flows-interfaces-and-desi content-block block-heading">
              <div className="content-inner">
                <p className="heading">
                  Research, flows, interfaces and design systems that make
                  complex products feel clear.
                </p>
              </div>
            </div>
          </SiteLink>
          <SiteLink
            href="/web-development"
            className="layout-item home-services__layout-8 layout-full service-card layout-transform layout-flex layout is-loaded"
          >
            <div className="layout-item home-services__icon-6 ui-view-default content-block">
              <div className="content-inner">
                <div className="icon-wrapper">
                  <div className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="45"
                      height="45"
                      viewBox="0 0 40 40"
                      fill="none"
                    >
                      <rect
                        width="40"
                        height="40"
                        rx="10"
                        fill="#050609"
                        fillOpacity="0.72"
                      ></rect>
                      <rect
                        x="0.625"
                        y="0.625"
                        width="38.75"
                        height="38.75"
                        rx="9.375"
                        stroke="#F55733"
                        strokeOpacity="0.95"
                        strokeWidth="1.25"
                      ></rect>
                      <path
                        d="M20 27C23.866 27 27 23.866 27 20C27 16.134 23.866 13 20 13C16.134 13 13 16.134 13 20C13 23.866 16.134 27 20 27Z"
                        stroke="#F55733"
                        strokeWidth="1.6"
                      ></path>
                      <path
                        d="M13.3999 20H26.5999M19.9999 13C21.9999 15 22.9999 17.3 22.9999 20C22.9999 22.7 21.9999 25 19.9999 27C17.9999 25 16.9999 22.7 16.9999 20C16.9999 17.3 17.9999 15 19.9999 13Z"
                        stroke="#F55733"
                        strokeWidth="1.4"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="layout-item home-services__web-development content-block block-heading">
              <div className="content-inner">
                <h5 className="heading">Web Development</h5>
              </div>
            </div>
            <div className="layout-item home-services__fast-responsive-websites-and-web-ap content-block block-heading">
              <div className="content-inner">
                <p className="heading">
                  Fast, responsive websites and web applications engineered for
                  modern businesses.
                </p>
              </div>
            </div>
          </SiteLink>
          <SiteLink
            href="/wordpress-development"
            className="layout-item home-services__layout-9 layout-full service-card layout-transform layout-flex layout is-loaded"
          >
            <div className="layout-item home-services__icon-7 ui-view-default content-block">
              <div className="content-inner">
                <div className="icon-wrapper">
                  <div className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="45"
                      height="45"
                      viewBox="0 0 40 40"
                      fill="none"
                    >
                      <rect
                        width="40"
                        height="40"
                        rx="10"
                        fill="#050609"
                        fillOpacity="0.72"
                      ></rect>
                      <rect
                        x="0.625"
                        y="0.625"
                        width="38.75"
                        height="38.75"
                        rx="9.375"
                        stroke="#F55733"
                        strokeOpacity="0.95"
                        strokeWidth="1.25"
                      ></rect>
                      <path
                        d="M20 27C23.866 27 27 23.866 27 20C27 16.134 23.866 13 20 13C16.134 13 13 16.134 13 20C13 23.866 16.134 27 20 27Z"
                        stroke="#F55733"
                        strokeWidth="1.5"
                      ></path>
                      <path
                        d="M15.4998 16.5L18.3998 24L20.1998 19.4L21.9998 24L24.4998 16.5M14.7998 16.5H18.4998M21.5998 16.5H24.9998"
                        stroke="#F55733"
                        strokeWidth="1.35"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="layout-item home-services__wordpress-development content-block block-heading">
              <div className="content-inner">
                <h5 className="heading">WordPress Development</h5>
              </div>
            </div>
            <div className="layout-item home-services__custom-wordpress-builds-themes-and content-block block-heading">
              <div className="content-inner">
                <p className="heading">
                  Custom WordPress builds, themes and business websites with
                  maintainable foundations.
                </p>
              </div>
            </div>
          </SiteLink>
          <SiteLink
            href="/custom-software-development"
            className="layout-item home-services__layout-10 layout-full service-card layout-transform layout-flex layout is-loaded"
          >
            <div className="layout-item home-services__icon-8 ui-view-default content-block">
              <div className="content-inner">
                <div className="icon-wrapper">
                  <div className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="45"
                      height="45"
                      viewBox="0 0 40 40"
                      fill="none"
                    >
                      <rect
                        width="40"
                        height="40"
                        rx="10"
                        fill="#050609"
                        fillOpacity="0.72"
                      ></rect>
                      <rect
                        x="0.625"
                        y="0.625"
                        width="38.75"
                        height="38.75"
                        rx="9.375"
                        stroke="#F55733"
                        strokeOpacity="0.95"
                        strokeWidth="1.25"
                      ></rect>
                      <path
                        d="M17 15L13 20L17 25M23 15L27 20L23 25M21.5 13.5L18.5 26.5"
                        stroke="#F55733"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="layout-item home-services__custom-software-development content-block block-heading">
              <div className="content-inner">
                <h5 className="heading">Custom Software Development</h5>
              </div>
            </div>
            <div className="layout-item home-services__purpose-built-software-mapped-to-you content-block block-heading">
              <div className="content-inner">
                <p className="heading">
                  Purpose-built software mapped to your workflows, operations
                  and growth model.
                </p>
              </div>
            </div>
          </SiteLink>
          <SiteLink
            href="/crm-erp-solutions"
            className="layout-item home-services__layout-11 layout-full service-card layout-transform layout-flex layout is-loaded"
          >
            <div className="layout-item home-services__icon-9 ui-view-default content-block">
              <div className="content-inner">
                <div className="icon-wrapper">
                  <div className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="45"
                      height="45"
                      viewBox="0 0 40 40"
                      fill="none"
                    >
                      <rect
                        width="40"
                        height="40"
                        rx="10"
                        fill="#050609"
                        fillOpacity="0.72"
                      ></rect>
                      <rect
                        x="0.625"
                        y="0.625"
                        width="38.75"
                        height="38.75"
                        rx="9.375"
                        stroke="#F55733"
                        strokeOpacity="0.95"
                        strokeWidth="1.25"
                      ></rect>
                      <path
                        d="M17.8 13H14.2C13.5373 13 13 13.5373 13 14.2V17.8C13 18.4627 13.5373 19 14.2 19H17.8C18.4627 19 19 18.4627 19 17.8V14.2C19 13.5373 18.4627 13 17.8 13Z"
                        stroke="#F55733"
                        strokeWidth="1.5"
                      ></path>
                      <path
                        d="M25.8 13H22.2C21.5373 13 21 13.5373 21 14.2V17.8C21 18.4627 21.5373 19 22.2 19H25.8C26.4627 19 27 18.4627 27 17.8V14.2C27 13.5373 26.4627 13 25.8 13Z"
                        stroke="#F55733"
                        strokeWidth="1.5"
                      ></path>
                      <path
                        d="M17.8 21H14.2C13.5373 21 13 21.5373 13 22.2V25.8C13 26.4627 13.5373 27 14.2 27H17.8C18.4627 27 19 26.4627 19 25.8V22.2C19 21.5373 18.4627 21 17.8 21Z"
                        stroke="#F55733"
                        strokeWidth="1.5"
                      ></path>
                      <path
                        d="M25.8 21H22.2C21.5373 21 21 21.5373 21 22.2V25.8C21 26.4627 21.5373 27 22.2 27H25.8C26.4627 27 27 26.4627 27 25.8V22.2C27 21.5373 26.4627 21 25.8 21Z"
                        stroke="#F55733"
                        strokeWidth="1.5"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="layout-item home-services__crm-erp-solutions content-block block-heading">
              <div className="content-inner">
                <h5 className="heading">CRM &amp; ERP Solutions</h5>
              </div>
            </div>
            <div className="layout-item home-services__operational-platforms-that-connect-c content-block block-heading">
              <div className="content-inner">
                <p className="heading">
                  Operational platforms that connect customer data, teams,
                  reporting and processes.
                </p>
              </div>
            </div>
          </SiteLink>
          <SiteLink
            href="/cloud-devops"
            className="layout-item home-services__layout-12 layout-full service-card layout-transform layout-flex layout is-loaded"
          >
            <div className="layout-item home-services__icon-10 ui-view-default content-block">
              <div className="content-inner">
                <div className="icon-wrapper">
                  <div className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="45"
                      height="45"
                      viewBox="0 0 40 40"
                      fill="none"
                    >
                      <rect
                        width="40"
                        height="40"
                        rx="10"
                        fill="#050609"
                        fillOpacity="0.72"
                      ></rect>
                      <rect
                        x="0.625"
                        y="0.625"
                        width="38.75"
                        height="38.75"
                        rx="9.375"
                        stroke="#F55733"
                        strokeOpacity="0.95"
                        strokeWidth="1.25"
                      ></rect>
                      <path
                        d="M16.2 25.5H24.2C26 25.5 27.5 24.1 27.5 22.3C27.5 20.6 26.2 19.2 24.5 19C24 16.7 22 15 19.6 15C17 15 14.8 17 14.5 19.5C12.9 19.9 12 21.1 12 22.6C12 24.2 13.3 25.5 15 25.5H16.2Z"
                        stroke="#F55733"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M22 21L20 19L18 21M20 19V24"
                        stroke="#F55733"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="layout-item home-services__cloud-devops content-block block-heading">
              <div className="content-inner">
                <h5 className="heading">Cloud &amp; DevOps</h5>
              </div>
            </div>
            <div className="layout-item home-services__deployment-ci-cd-infrastructure-an content-block block-heading">
              <div className="content-inner">
                <p className="heading">
                  Deployment, CI/CD, infrastructure and production environments
                  designed for reliability.
                </p>
              </div>
            </div>
          </SiteLink>
          <SiteLink
            href="/qa-testing"
            className="layout-item home-services__layout-13 layout-full service-card layout-transform layout-flex layout is-loaded"
          >
            <div className="layout-item home-services__icon-11 ui-view-default content-block">
              <div className="content-inner">
                <div className="icon-wrapper">
                  <div className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="45"
                      height="45"
                      viewBox="0 0 40 40"
                      fill="none"
                    >
                      <rect
                        width="40"
                        height="40"
                        rx="10"
                        fill="#050609"
                        fillOpacity="0.72"
                      ></rect>
                      <rect
                        x="0.625"
                        y="0.625"
                        width="38.75"
                        height="38.75"
                        rx="9.375"
                        stroke="#F55733"
                        strokeOpacity="0.95"
                        strokeWidth="1.25"
                      ></rect>
                      <path
                        d="M20 12.8L26 15V19.4C26 23 23.7 26 20 27.3C16.3 26 14 23 14 19.4V15L20 12.8Z"
                        stroke="#F55733"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M17 20L19 22L23 18"
                        stroke="#F55733"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="layout-item home-services__qa-testing content-block block-heading">
              <div className="content-inner">
                <h5 className="heading">QA &amp; Testing</h5>
              </div>
            </div>
            <div className="layout-item home-services__structured-functional-regression-an content-block block-heading">
              <div className="content-inner">
                <p className="heading">
                  Structured functional, regression and release testing for
                  stronger product quality.
                </p>
              </div>
            </div>
          </SiteLink>
          <SiteLink
            href="/dedicated-product-teams"
            className="layout-item home-services__layout-14 layout-full service-card layout-transform layout-flex layout is-loaded"
          >
            <div className="layout-item home-services__icon-12 ui-view-default content-block">
              <div className="content-inner">
                <div className="icon-wrapper">
                  <div className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="45"
                      height="45"
                      viewBox="0 0 40 40"
                      fill="none"
                    >
                      <rect
                        width="40"
                        height="40"
                        rx="10"
                        fill="#050609"
                        fillOpacity="0.72"
                      ></rect>
                      <rect
                        x="0.625"
                        y="0.625"
                        width="38.75"
                        height="38.75"
                        rx="9.375"
                        stroke="#F55733"
                        strokeOpacity="0.95"
                        strokeWidth="1.25"
                      ></rect>
                      <path
                        d="M17 19.5C18.3807 19.5 19.5 18.3807 19.5 17C19.5 15.6193 18.3807 14.5 17 14.5C15.6193 14.5 14.5 15.6193 14.5 17C14.5 18.3807 15.6193 19.5 17 19.5Z"
                        stroke="#F55733"
                        strokeWidth="1.5"
                      ></path>
                      <path
                        d="M24 20C25.1046 20 26 19.1046 26 18C26 16.8954 25.1046 16 24 16C22.8954 16 22 16.8954 22 18C22 19.1046 22.8954 20 24 20Z"
                        stroke="#F55733"
                        strokeWidth="1.4"
                      ></path>
                      <path
                        d="M13 26C13.5 22.9 15 21.5 17 21.5C19 21.5 20.5 22.9 21 26M21.5 25C22 22.9 23 22 24.5 22C26 22 27 23 27.4 25"
                        stroke="#F55733"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="layout-item home-services__dedicated-product-teams content-block block-heading">
              <div className="content-inner">
                <h5 className="heading">Dedicated Product Teams</h5>
              </div>
            </div>
            <div className="layout-item home-services__embedded-engineers-designers-and-qa content-block block-heading">
              <div className="content-inner">
                <p className="heading">
                  Embedded engineers, designers and QA aligned to your roadmap
                  and delivery cadence.
                </p>
              </div>
            </div>
          </SiteLink>
        </div>
        <div className="layout-item home-services__layout-15 layout-full layout-grid services-extra layout is-loaded">
          <SiteLink
            href="/api-systems-integration"
            className="layout-item home-services__layout-16 layout-full layout-transform service-card layout-flex layout is-loaded"
          >
            <div className="layout-item home-services__icon-13 ui-view-default content-block">
              <div className="content-inner">
                <div className="icon-wrapper">
                  <div className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="45"
                      height="45"
                      viewBox="0 0 40 40"
                      fill="none"
                    >
                      <rect
                        width="40"
                        height="40"
                        rx="10"
                        fill="#050609"
                        fillOpacity="0.72"
                      ></rect>
                      <rect
                        x="0.625"
                        y="0.625"
                        width="38.75"
                        height="38.75"
                        rx="9.375"
                        stroke="#F55733"
                        strokeOpacity="0.95"
                        strokeWidth="1.25"
                      ></rect>
                      <path
                        d="M15 22C16.1046 22 17 21.1046 17 20C17 18.8954 16.1046 18 15 18C13.8954 18 13 18.8954 13 20C13 21.1046 13.8954 22 15 22Z"
                        stroke="#F55733"
                        strokeWidth="1.5"
                      ></path>
                      <path
                        d="M25 17C26.1046 17 27 16.1046 27 15C27 13.8954 26.1046 13 25 13C23.8954 13 23 13.8954 23 15C23 16.1046 23.8954 17 25 17Z"
                        stroke="#F55733"
                        strokeWidth="1.5"
                      ></path>
                      <path
                        d="M25 27C26.1046 27 27 26.1046 27 25C27 23.8954 26.1046 23 25 23C23.8954 23 23 23.8954 23 25C23 26.1046 23.8954 27 25 27Z"
                        stroke="#F55733"
                        strokeWidth="1.5"
                      ></path>
                      <path
                        d="M17 19L23 16M17 21L23 24"
                        stroke="#F55733"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="layout-item home-services__api-systems-integration content-block block-heading">
              <div className="content-inner">
                <h5 className="heading">API &amp; Systems Integration</h5>
              </div>
            </div>
            <div className="layout-item home-services__connect-products-crms-payments-and content-block block-heading">
              <div className="content-inner">
                <p className="heading">
                  Connect products, CRMs, payments and business tools into one
                  reliable ecosystem.
                </p>
              </div>
            </div>
          </SiteLink>
          <SiteLink
            href="/product-discovery-strategy"
            className="layout-item home-services__layout-17 layout-full service-card layout-transform layout-flex layout is-loaded"
          >
            <div className="layout-item home-services__icon-14 ui-view-default content-block">
              <div className="content-inner">
                <div className="icon-wrapper">
                  <div className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="45"
                      height="45"
                      viewBox="0 0 40 40"
                      fill="none"
                    >
                      <rect
                        width="40"
                        height="40"
                        rx="10"
                        fill="#050609"
                        fillOpacity="0.72"
                      ></rect>
                      <rect
                        x="0.625"
                        y="0.625"
                        width="38.75"
                        height="38.75"
                        rx="9.375"
                        stroke="#F55733"
                        strokeOpacity="0.95"
                        strokeWidth="1.25"
                      ></rect>
                      <path
                        d="M20 27C23.866 27 27 23.866 27 20C27 16.134 23.866 13 20 13C16.134 13 13 16.134 13 20C13 23.866 16.134 27 20 27Z"
                        stroke="#F55733"
                        strokeWidth="1.5"
                      ></path>
                      <path
                        d="M22.8002 17.2L21.4002 21.4L17.2002 22.8L18.6002 18.6L22.8002 17.2Z"
                        stroke="#F55733"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M20 21C20.5523 21 21 20.5523 21 20C21 19.4477 20.5523 19 20 19C19.4477 19 19 19.4477 19 20C19 20.5523 19.4477 21 20 21Z"
                        fill="#F55733"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="layout-item home-services__product-discovery-strategy content-block block-heading">
              <div className="content-inner">
                <h5 className="heading">Product Discovery &amp; Strategy</h5>
              </div>
            </div>
            <div className="layout-item home-services__clarify-priorities-architecture-and content-block block-heading">
              <div className="content-inner">
                <p className="heading">
                  Clarify priorities, architecture and roadmap before committing
                  engineering investment.
                </p>
              </div>
            </div>
          </SiteLink>
          <SiteLink
            href="/maintenance-support"
            className="layout-item home-services__layout-18 layout-full service-card layout-transform layout-flex layout is-loaded"
          >
            <div className="layout-item home-services__icon-15 ui-view-default content-block">
              <div className="content-inner">
                <div className="icon-wrapper">
                  <div className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="45"
                      height="45"
                      viewBox="0 0 40 40"
                      fill="none"
                    >
                      <rect
                        width="40"
                        height="40"
                        rx="10"
                        fill="#050609"
                        fillOpacity="0.72"
                      ></rect>
                      <rect
                        x="0.625"
                        y="0.625"
                        width="38.75"
                        height="38.75"
                        rx="9.375"
                        stroke="#F55733"
                        strokeOpacity="0.95"
                        strokeWidth="1.25"
                      ></rect>
                      <path
                        d="M21.5752 13.3202C22.6752 12.8202 23.875 12.92 24.775 13.52L22.075 16.22L22.675 18.22L24.675 18.82L27.375 16.12C27.975 17.32 27.9752 19.2203 27.0752 20.3203C25.9752 21.6203 24.275 22.3202 22.675 21.6202L17.075 27.2202C16.175 28.1202 14.775 28.1202 13.875 27.2202L13.675 27.0202C12.775 26.1202 12.775 24.7202 13.675 23.8202L19.275 18.2202C18.575 16.5202 19.0752 14.3202 21.5752 13.3202Z"
                        stroke="#F55733"
                        strokeWidth="1.4"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="layout-item home-services__maintenance-support content-block block-heading">
              <div className="content-inner">
                <h5 className="heading">Maintenance &amp; Support</h5>
              </div>
            </div>
            <div className="layout-item home-services__post-launch-monitoring-fixes-itera content-block block-heading">
              <div className="content-inner">
                <p className="heading">
                  Post-launch monitoring, fixes, iteration and ongoing
                  engineering support.
                </p>
              </div>
            </div>
          </SiteLink>
          <SiteLink
            href="/ai-video-creation"
            className="home-video-creation-card service-card"
          >
            <span className="home-video-creation-card__icon">
              <Film size={27} strokeWidth={1.6} aria-hidden="true" />
            </span>
            <span>
              <span className="home-video-creation-card__title">
                AI Video Creation
              </span>
              <span className="home-video-creation-card__description">
                AI-powered video production, creative direction, and visual
                storytelling for your brand.
              </span>
            </span>
          </SiteLink>
        </div>
        <div className="layout-item home-services__button view-more-btn services-toggle content-block">
          <div className="content-inner">
            <div>
              <ServicesToggle
                className="button"
                role="button"
                aria-expanded="false"
              />
            </div>
          </div>
        </div>
        <div className="layout-item home-services__html content-block">
          <div className="content-inner"></div>
        </div>
        <div className="layout-item home-services__layout-19 layout-full layout-flex layout is-loaded"></div>
        <div className="layout-item home-services__layout-20 layout-full layout-flex layout is-loaded"></div>
      </div>
    </ServicesSection>
  );
};
export default HomeServices;
