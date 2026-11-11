import { paths } from "../../routes/paths";
import { useLocation } from "react-router-dom";
import { pendingServices } from "../../utils/pendingServices";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { IMAGES } from "../../utils/Constant";
import {
  SiteLink,
  NavigationMenu,
  NavigationToggle,
  NavigationLinks,
  SubmenuTrigger,
  NavigationSubmenuItem,
} from "../sharedUi/Interactive";

const additionalServices = pendingServices
  .filter((service) => service.slug !== "ai-video-creation")
  .flatMap((service) =>
    service.slug === "dedicated-product-teams"
      ? [
          service,
          {
            key: "apiSystemsIntegration",
            slug: "api-systems-integration",
            title: "API & Systems Integration Services",
          },
        ]
      : [service],
  );

const Header = () => {
  const { pathname } = useLocation();
  const currentPath = pathname.replace(/\/+$/, "") || "/";
  const servicePaths = [
    paths.aiAgents,
    paths.aiVideoCreation,
    paths.saas,
    paths.mobileWeb,
    paths.shopify,
    paths.uiUx,
    paths.webDevelopment,
    paths.wordpressDevelopment,
    ...additionalServices.map((service) => `/${service.slug}`),
  ];
  const servicesActive = servicePaths.includes(currentPath);
  const homePaths = [
    paths.homeReDesign,
    paths.homeBetterContent,
    paths.homeAnimated,
  ];
  const homeActive = homePaths.includes(currentPath);
  const workActive =
    currentPath === paths.caseStudies ||
    currentPath.startsWith(`${paths.caseStudies}/`) ||
    [
      "/portfolio-case-studies",
      "/spin-the-night",
      "/carecompass",
      "/daily-digest",
      "/contractor-connect",
      "/task-hive",
    ].includes(currentPath);
  const activeLinkProps = (href) => ({
    "aria-current":
      currentPath === href || (href === paths.caseStudies && workActive)
        ? "page"
        : undefined,
  });
  return (
    <header className="app-header">
      <div className="page-content header-page">
        <div className="layout-item header-hero layout-flex layout-boxed layout section-root is-loaded">
          <div className="layout-inner is-loaded">
            <div className="layout-item header-hero-inner-left">
              <div className="layout-item header-hero__layout layout-full layout-flex layout is-loaded">
                <div className="layout-item header-hero__image content-block block-image">
                  <div className="content-inner">
                    <SiteLink href="/">
                      <img
                        width="300"
                        height="30"
                        src={IMAGES.Frame_16_1_300x30}
                        alt="UnicodeTech"
                        srcSet={`${IMAGES.Frame_16_1_300x30} 300w, ${IMAGES.Frame_16_1} 552w`}
                        sizes="(max-width: 300px) 100vw, 300px"
                      />
                    </SiteLink>
                  </div>
                </div>
              </div>
              <div className="layout-item header-hero__layout-2 layout-full layout-flex layout is-loaded">
                <NavigationMenu className="layout-item header-hero__navigation-menu test-nav-menu nav-submenu-animation-slide_up navigation-list__align-left navigation-arrow navigation-list__breakpoint-tablet content-block block-navigation-menu">
                  <div className="content-inner">
                    <div className="navigation-list navigation-horizontal">
                      <NavigationToggle
                        role="button"
                        className="navigation-toggle"
                        tabIndex="0"
                        aria-label="Menu Toggle"
                        aria-haspopup="true"
                        aria-expanded="false"
                      />
                      <NavigationLinks className="navigation-links navigation-list__submenu-arrow">
                        <ul id="main-navigation" className="navigation-list">
                          <NavigationSubmenuItem
                            id="navigation-item-5342"
                            className="menu-item menu-item-has-children parent has-submenu parent-has-child"
                          >
                            <SubmenuTrigger
                              className="navigation-submenu-trigger"
                              data-active={servicesActive || undefined}
                              tabIndex="0"
                              role="button"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <span className="navigation-link">
                                Services
                                <span className="navigation-arrow-toggle sub-arrow">
                                  <ChevronDown size="1em" aria-hidden="true" />
                                </span>
                              </span>
                            </SubmenuTrigger>
                            <ul
                              id="navigation-item-5342-submenu"
                              className="sub-menu services-submenu services-submenu--expanded"
                            >
                              <li className="menu-item services-submenu__view-all">
                                <SiteLink
                                  {...activeLinkProps("/services")}
                                  href="/services"
                                  className="navigation-submenu-link"
                                >
                                  View all services
                                  <ArrowUpRight
                                    className="services-submenu__arrow"
                                    size={16}
                                    aria-hidden="true"
                                  />
                                </SiteLink>
                              </li>
                              <li
                                id="navigation-item-7219"
                                className="menu-item"
                              >
                                <SiteLink
                                  {...activeLinkProps("/ai-agents-automation")}
                                  href="/ai-agents-automation"
                                  className="navigation-submenu-link"
                                >
                                  AI Agents &amp; Automation Services
                                  <ArrowUpRight
                                    className="services-submenu__arrow"
                                    size={16}
                                    aria-hidden="true"
                                  />
                                </SiteLink>
                              </li>
                              <li className="menu-item">
                                <SiteLink
                                  {...activeLinkProps(paths.aiVideoCreation)}
                                  href={paths.aiVideoCreation}
                                  className="navigation-submenu-link"
                                >
                                  AI Video Creation
                                  <ArrowUpRight
                                    className="services-submenu__arrow"
                                    size={16}
                                    aria-hidden="true"
                                  />
                                </SiteLink>
                              </li>
                              <li
                                id="navigation-item-7218"
                                className="menu-item"
                              >
                                <SiteLink
                                  {...activeLinkProps("/saas-development")}
                                  href="/saas-development"
                                  className="navigation-submenu-link"
                                >
                                  SaaS Development Services
                                  <ArrowUpRight
                                    className="services-submenu__arrow"
                                    size={16}
                                    aria-hidden="true"
                                  />
                                </SiteLink>
                              </li>
                              <li
                                id="navigation-item-7217"
                                className="menu-item"
                              >
                                <SiteLink
                                  {...activeLinkProps(
                                    "/mobile-web-engineering",
                                  )}
                                  href="/mobile-web-engineering"
                                  className="navigation-submenu-link"
                                >
                                  Mobile &amp; Web Engineering Services
                                  <ArrowUpRight
                                    className="services-submenu__arrow"
                                    size={16}
                                    aria-hidden="true"
                                  />
                                </SiteLink>
                              </li>
                              <li
                                id="navigation-item-7216"
                                className="menu-item"
                              >
                                <SiteLink
                                  {...activeLinkProps("/shopify-e-commerce")}
                                  href="/shopify-e-commerce"
                                  className="navigation-submenu-link"
                                >
                                  Shopify &amp; E-commerce Services
                                  <ArrowUpRight
                                    className="services-submenu__arrow"
                                    size={16}
                                    aria-hidden="true"
                                  />
                                </SiteLink>
                              </li>
                              <li className="menu-item">
                                <SiteLink
                                  {...activeLinkProps("/ui-ux-design")}
                                  href="/ui-ux-design"
                                  className="navigation-submenu-link"
                                >
                                  UI/UX Design Services
                                  <ArrowUpRight
                                    className="services-submenu__arrow"
                                    size={16}
                                    aria-hidden="true"
                                  />
                                </SiteLink>
                              </li>
                              <li className="menu-item">
                                <SiteLink
                                  {...activeLinkProps("/web-development")}
                                  href="/web-development"
                                  className="navigation-submenu-link"
                                >
                                  Web Development Services
                                  <ArrowUpRight
                                    className="services-submenu__arrow"
                                    size={16}
                                    aria-hidden="true"
                                  />
                                </SiteLink>
                              </li>
                              <li className="menu-item">
                                <SiteLink
                                  {...activeLinkProps("/wordpress-development")}
                                  href="/wordpress-development"
                                  className="navigation-submenu-link"
                                >
                                  WordPress Development Services
                                  <ArrowUpRight
                                    className="services-submenu__arrow"
                                    size={16}
                                    aria-hidden="true"
                                  />
                                </SiteLink>
                              </li>
                              {additionalServices.map((service) => (
                                <li className="menu-item" key={service.key}>
                                  <SiteLink
                                    {...activeLinkProps(`/${service.slug}`)}
                                    href={`/${service.slug}`}
                                    className="navigation-submenu-link"
                                  >
                                    {service.title}
                                    <ArrowUpRight
                                      className="services-submenu__arrow"
                                      size={16}
                                      aria-hidden="true"
                                    />
                                  </SiteLink>
                                </li>
                              ))}
                            </ul>
                          </NavigationSubmenuItem>
                          <li
                            id="navigation-item-5343"
                            className="menu-item parent"
                          >
                            <SiteLink
                              {...activeLinkProps(paths.caseStudies)}
                              href={paths.caseStudies}
                              className="navigation-link"
                            >
                              Work
                            </SiteLink>
                          </li>
                          <li
                            id="navigation-item-5346"
                            className="menu-item parent"
                          >
                            <SiteLink
                              {...activeLinkProps(paths.blog)}
                              href={paths.blog}
                              className="navigation-link"
                            >
                              Blog
                            </SiteLink>
                          </li>
                          <li
                            id="navigation-item-5344"
                            className="menu-item parent"
                          >
                            <SiteLink
                              {...activeLinkProps(paths.about)}
                              href={paths.about}
                              className="navigation-link"
                            >
                              About
                            </SiteLink>
                          </li>
                          <li
                            id="navigation-item-5345"
                            className="menu-item parent"
                          >
                            <SiteLink
                              {...activeLinkProps(paths.contact)}
                              href={paths.contact}
                              className="navigation-link"
                            >
                              Contact
                            </SiteLink>
                          </li>
                        </ul>
                        <div className="nav-mobile-cta">
                          <SiteLink schedule className="nav-mobile-cta-btn">
                            Book a Strategy Call
                          </SiteLink>
                        </div>
                      </NavigationLinks>
                    </div>
                  </div>
                </NavigationMenu>
              </div>
            </div>
            <div className="layout-item header-hero__layout-3 layout-full hide-on-mobile layout-flex layout is-loaded">
              <div className="layout-item header-hero__button ui-align-right content-block">
                <div className="content-inner">
                  <div>
                    <SiteLink schedule className="button">
                      <span className="button-content">
                        <span className="button-label">
                          Book a Strategy Call
                        </span>
                      </span>
                    </SiteLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
